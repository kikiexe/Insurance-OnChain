// file: src/policies/BasePolicy.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Abstract contract, tidak bisa di-deploy langsung
abstract contract BasePolicy {
    address public immutable policyHolder;
    address public immutable beneficiary;
    uint256 public immutable payoutValue;
    IERC20 public immutable paymentToken; // Dulu IDRX, sekarang bisa token apa saja

    enum Status { Pending, Active, Claimed, Expired }
    Status public currentStatus;

    event PolicyActivated(address indexed policyHolder);
    event PolicyClaimed(address indexed beneficiary, uint256 amount);

    constructor(
        address _policyHolder,
        address _beneficiary,
        uint256 _payoutValue,
        address _tokenAddress
    ) {
        policyHolder = _policyHolder;
        beneficiary = _beneficiary;
        payoutValue = _payoutValue;
        paymentToken = IERC20(_tokenAddress);
        currentStatus = Status.Pending;
    }

    // Fungsi untuk klaim akan didefinisikan di kontrak turunan
    function claim() external virtual;
}