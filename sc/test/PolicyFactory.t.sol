// file: sc/test/PolicyFactory.t.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/PolicyFactory.sol";
import "../src/IDRX.sol";
import "../src/policies/EndowmentPolicy.sol";
import "../src/policies/LifePolicy.sol"; // <-- Tambahkan import ini

contract PolicyFactoryTest is Test {
    PolicyFactory public factory;
    IDRX public idrx;
    address public policyHolder = address(0x1);
    address public beneficiary = address(0x2);
    address public oracleAdmin = address(0x5); // Alamat untuk admin/oracle

    function setUp() public {
        idrx = new IDRX();
        factory = new PolicyFactory(address(idrx));

        idrx.mint(policyHolder, 1_000 ether);

        vm.startPrank(policyHolder);
        idrx.approve(address(factory), type(uint256).max);
        vm.stopPrank();
    }

    // --- Tes untuk Endowment Policy ---

    function test_Endowment_CreatePolicy() public {
        vm.startPrank(policyHolder);
        factory.createEndowmentPolicy(beneficiary, 100 ether, 30 days);
        vm.stopPrank();

        address newPolicyAddress = factory.endowmentPolicies(0);
        assertTrue(newPolicyAddress != address(0));
        assertEq(idrx.balanceOf(newPolicyAddress), 100 ether);

        EndowmentPolicy newPolicy = EndowmentPolicy(newPolicyAddress);
        assertEq(newPolicy.policyHolder(), policyHolder);
        assertEq(newPolicy.beneficiary(), beneficiary);
    }

    function test_Endowment_SuccessfulClaim() public {
        vm.startPrank(policyHolder);
        factory.createEndowmentPolicy(beneficiary, 100 ether, 30 days);
        vm.stopPrank();

        address newPolicyAddress = factory.endowmentPolicies(0);
        EndowmentPolicy newPolicy = EndowmentPolicy(newPolicyAddress);

        vm.warp(block.timestamp + 31 days);

        vm.startPrank(beneficiary);
        newPolicy.claim();
        vm.stopPrank();

        assertEq(idrx.balanceOf(beneficiary), 100 ether);
    }

    // --- Tes untuk Life Policy ---

    function test_Life_CreatePolicy() public {
        vm.startPrank(policyHolder);
        // Untuk LifePolicy, premi (10 ether) bisa berbeda dari payout (100 ether)
        factory.createLifePolicy(beneficiary, 100 ether, 10 ether);
        vm.stopPrank();

        address newPolicyAddress = factory.lifePolicies(0);
        assertTrue(newPolicyAddress != address(0));
        // Saldo yang masuk ke polis adalah premi, bukan payout
        assertEq(idrx.balanceOf(newPolicyAddress), 10 ether);

        LifePolicy newPolicy = LifePolicy(newPolicyAddress);
        assertEq(newPolicy.policyHolder(), policyHolder);
        assertEq(newPolicy.beneficiary(), beneficiary);
    }

    function test_Life_SuccessfulClaimTrigger() public {
        vm.startPrank(policyHolder);
        factory.createLifePolicy(beneficiary, 100 ether, 100 ether);
        vm.stopPrank();

        address newPolicyAddress = factory.lifePolicies(0);
        LifePolicy newPolicy = LifePolicy(newPolicyAddress);

        vm.prank(address(factory));
        newPolicy.transferOwnership(oracleAdmin);

        vm.startPrank(oracleAdmin);
        newPolicy.triggerClaim();
        vm.stopPrank();

        assertEq(idrx.balanceOf(beneficiary), 100 ether);
    }

    function test_RevertWhen_CreatePolicyWithNoBalance() public {
        address noBalanceHolder = address(0x3);
        vm.expectRevert();
        vm.startPrank(noBalanceHolder);
        factory.createEndowmentPolicy(beneficiary, 100 ether, 30 days);
        vm.stopPrank();
    }
}