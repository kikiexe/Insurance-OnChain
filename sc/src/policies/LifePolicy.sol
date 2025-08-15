// file: src/policies/LifePolicy.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./BasePolicy.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LifePolicy is BasePolicy, Ownable {

    constructor(
        address _policyHolder,
        address _beneficiary,
        uint256 _payoutValue,
        address _tokenAddress
    ) BasePolicy(_policyHolder, _beneficiary, _payoutValue, _tokenAddress) Ownable(msg.sender) {
         // Saat dibuat, `owner` adalah Factory Contract, yang bisa mentransfer ownership ke admin terpercaya
        currentStatus = Status.Active;
        emit PolicyActivated(_policyHolder);
    }

    // Fungsi ini dipanggil oleh oracle/admin untuk memicu pembayaran
    function triggerClaim() external onlyOwner {
        require(currentStatus == Status.Active, "Policy not active");
        currentStatus = Status.Claimed;
        emit PolicyClaimed(beneficiary, payoutValue);
        require(paymentToken.transfer(beneficiary, payoutValue), "Transfer failed");
    }

    // Kita override fungsi claim() agar tidak bisa dipanggil sembarangan
    function claim() external pure override {
        revert("Cannot be claimed directly. Must be triggered by oracle.");
    }
}