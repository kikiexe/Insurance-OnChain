    // SPDX-License-Identifier: UNLICENSED
    pragma solidity ^0.8.19;

    import "forge-std/Test.sol";
    import "../src/IDRX.sol";
    import "../src/Insurance.sol";

    contract InsuranceTest is Test {
        IDRX public idrx;
        Insurance public insurance;
        address public ayah = address(0x1);
        address public anak = address(0x2);
        address public orangLain = address(0x3);

        function setUp() public {
            // Deploy token IDRX
            idrx = new IDRX();

            // Deploy contract Insurance
            insurance = new Insurance(address(idrx));

            // Mint saldo ke ayah
            idrx.mint(ayah, 1_000 ether);

            // Approve IDRX dari ayah ke insurance
            vm.startPrank(ayah);
            idrx.approve(address(insurance), type(uint256).max);
            vm.stopPrank();
        }

        function testBeliPolisDanKlaim() public {
            vm.startPrank(ayah);
            insurance.beliPolis(anak, 100 ether, 10 days);
            vm.stopPrank();

            vm.warp(block.timestamp + 11 days);
            vm.startPrank(anak);
            insurance.klaimPolis(ayah, 0);
            vm.stopPrank();

            assertEq(idrx.balanceOf(anak), 100 ether);
        }

        function testCannotClaimBeforeDuration() public {
            vm.startPrank(ayah);
            insurance.beliPolis(anak, 100 ether, 10 days);
            vm.stopPrank();

            vm.startPrank(anak);
            vm.expectRevert(bytes("Belum jatuh tempo"));
            insurance.klaimPolis(ayah, 0);
            vm.stopPrank();
        }

        function testCannotClaimTwice() public {
            vm.startPrank(ayah);
            insurance.beliPolis(anak, 100 ether, 10 days);
            vm.stopPrank();

            vm.warp(block.timestamp + 11 days);
            vm.startPrank(anak);
            insurance.klaimPolis(ayah, 0);
            vm.expectRevert(bytes("Sudah diklaim"));
            insurance.klaimPolis(ayah, 0);
            vm.stopPrank();
        }

        function testOrangLainTidakBisaKlaimPolisOrangLain() public {
            vm.startPrank(ayah);
            insurance.beliPolis(anak, 100 ether, 10 days);
            vm.stopPrank();

            vm.warp(block.timestamp + 11 days);
            vm.startPrank(orangLain);
            vm.expectRevert(bytes("Bukan beneficiary"));
            insurance.klaimPolis(ayah, 0);
            vm.stopPrank();
        }

        function testGagalKlaimJikaSaldoKontrakKurang() public {
            vm.startPrank(ayah);
            insurance.beliPolis(anak, 100 ether, 10 days);
            vm.stopPrank();

            deal(address(idrx), address(insurance), 0);

            vm.warp(block.timestamp + 11 days);
            vm.startPrank(anak);
            vm.expectRevert(bytes("Tidak cukup IDRX di kontrak"));
            insurance.klaimPolis(ayah, 0);
            vm.stopPrank();
        }


        function testIsiPolisSesuai() public {
            vm.startPrank(ayah);
            insurance.beliPolis(anak, 100 ether, 30 days);
            vm.stopPrank();

            (
                address beneficiary,
                uint256 payout,
                uint256 startDate,
                uint256 duration,
                bool claimed
            ) = insurance.getPolis(ayah, 0);

            assertEq(beneficiary, anak);
            assertEq(payout, 100 ether);
            assertEq(duration, 30 days);
            assertFalse(claimed);
            assertEq(startDate, block.timestamp);
        }
    }