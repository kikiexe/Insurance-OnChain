// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Insurance {
    IERC20 public idrx;

    constructor(address _idrx) {
        idrx = IERC20(_idrx);
    }

    struct Polis {
        address beneficiary;
        uint256 payout;
        uint256 startDate;
        uint256 duration;
        bool claimed;
    }

    // Policyholder → list polis
    mapping(address => Polis[]) public polisByUser;

    // Event
    event PolisDibeli(address indexed insured, address indexed beneficiary, uint256 payout, uint256 duration);
    event PolisDiklaim(address indexed insured, address indexed beneficiary, uint256 amount);

    // Beli satu polis untuk satu beneficiary
    function beliPolis(address beneficiary, uint256 payout, uint256 duration) external {
        require(payout > 0, "Nominal tidak valid");
        require(beneficiary != address(0), "Beneficiary tidak valid");

        // Transfer IDRX dari policyholder ke smart contract
        require(idrx.transferFrom(msg.sender, address(this), payout), "Transfer IDRX gagal");

        Polis memory p = Polis({
            beneficiary: beneficiary,
            payout: payout,
            startDate: block.timestamp,
            duration: duration,
            claimed: false
        });

        polisByUser[msg.sender].push(p);

        emit PolisDibeli(msg.sender, beneficiary, payout, duration);
    }

    // Klaim dana oleh siapa pun — tapi hanya cair ke beneficiary
    function klaimPolis(address insured, uint256 index) external {
        require(index < polisByUser[insured].length, "Index tidak valid");

        Polis storage p = polisByUser[insured][index];

        require(!p.claimed, "Sudah diklaim");
        require(block.timestamp >= p.startDate + p.duration, "Belum jatuh tempo");
        require(msg.sender == p.beneficiary, "Bukan beneficiary");
        require(idrx.balanceOf(address(this)) >= p.payout, "Tidak cukup IDRX di kontrak");
        p.claimed = true;

        require(idrx.transfer(p.beneficiary, p.payout), "Transfer klaim gagal");

        emit PolisDiklaim(insured, p.beneficiary, p.payout);
    }

    // Getter untuk jumlah polis yang dibeli oleh insured
    function getJumlahPolis(address insured) external view returns (uint256) {
        return polisByUser[insured].length;
    }

    // Getter untuk detail polis
    function getPolis(address insured, uint256 index)
        external
        view
        returns (address beneficiary, uint256 payout, uint256 startDate, uint256 duration, bool claimed)
    {
        require(index < polisByUser[insured].length, "Index tidak valid");
        Polis memory p = polisByUser[insured][index];
        return (p.beneficiary, p.payout, p.startDate, p.duration, p.claimed);
    }
}
