// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/IDRX.sol";
import "../src/Insurance.sol";

contract InsuranceTest is Test {
    IDRX public token;
    Insurance public insurance;
    address user = address(1);
    address beneficiary = address(2);

    function setUp() public {
        token = new IDRX();
        insurance = new Insurance(address(token));

        token.mint(user, 1000 * 1e18);
        vm.prank(user);
        token.approve(address(insurance), type(uint256).max);

        token.mint(address(insurance), 1000 * 1e18); // supply buat payout
    }

    function testBeliPolisDanKlaim() public {
        vm.startPrank(user);
        insurance.beliPolis(beneficiary, 100 * 1e18, 30 days);

        (, , uint256 startDate, , ) = insurance.getPolis(user, 0);

        vm.warp(startDate + 31 days);
        insurance.klaimPolis(user, 0);

        (, , , , bool claimed) = insurance.getPolis(user, 0);
        assertTrue(claimed);
        vm.stopPrank();
    }

    function testCannotClaimBeforeDuration() public {
        vm.startPrank(user);
        insurance.beliPolis(beneficiary, 100 * 1e18, 30 days);

        vm.expectRevert("Belum jatuh tempo");
        insurance.klaimPolis(user, 0);
        vm.stopPrank();
    }

    function testCannotClaimTwice() public {
        vm.startPrank(user);
        insurance.beliPolis(beneficiary, 100 * 1e18, 30 days);
        (, , uint256 startDate, , ) = insurance.getPolis(user, 0);

        vm.warp(startDate + 31 days);
        insurance.klaimPolis(user, 0);

        vm.expectRevert("Sudah diklaim");
        insurance.klaimPolis(user, 0);
        vm.stopPrank();
    }

    function testOrangLainTidakBisaKlaimPolisOrangLain() public {
        address orangLain = address(3);

        vm.startPrank(user);
        insurance.beliPolis(beneficiary, 100 * 1e18, 30 days);
        (, , uint256 startDate, , ) = insurance.getPolis(user, 0);
        vm.stopPrank();

        vm.warp(startDate + 31 days);
        vm.prank(orangLain);
        insurance.klaimPolis(user, 0);

        assertEq(token.balanceOf(beneficiary), 1000 * 1e18);
    }

    function testIsiPolisSesuai() public {
        vm.startPrank(user);
        insurance.beliPolis(beneficiary, 100 * 1e18, 30 days);
        vm.stopPrank();

        (
            address beneficiary_,
            uint256 payout,
            uint256 startDate,
            uint256 duration,
            bool claimed
        ) = insurance.getPolis(user, 0);

        assertEq(beneficiary_, beneficiary);
        assertEq(payout, 100 * 1e18);
        assertEq(duration, 30 days);
        assertEq(claimed, false);
        assertGt(startDate, 0);
    }
}
