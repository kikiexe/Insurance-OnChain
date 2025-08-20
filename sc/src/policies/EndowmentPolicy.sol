// file: src/policies/EndowmentPolicy.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./BasePolicy.sol";

contract EndowmentPolicy is BasePolicy {
    uint256 public immutable maturityDate;

    constructor(
        address _policyHolder,
        address _beneficiary,
        uint256 _payoutValue,
        address _tokenAddress,
        uint256 _duration
    ) BasePolicy(_policyHolder, _beneficiary, _payoutValue, _tokenAddress) {
        maturityDate = block.timestamp + _duration;
        currentStatus = Status.Active;
        emit PolicyActivated(_policyHolder);
    }

    function claim() external override {
        require(currentStatus == Status.Active, "Policy not active");
        require(msg.sender == beneficiary, "Only beneficiary can claim");
        require(block.timestamp >= maturityDate, "Policy has not matured");

        currentStatus = Status.Claimed;
        emit PolicyClaimed(beneficiary, payoutValue);

        // Kirim token IDRX
        require(paymentToken.transfer(beneficiary, payoutValue), "Transfer failed");
    }
}
