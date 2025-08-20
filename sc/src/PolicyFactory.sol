pragma solidity ^0.8.19;

import "./policies/EndowmentPolicy.sol";
import "./policies/LifePolicy.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract PolicyFactory {
    address[] public endowmentPolicies;
    address[] public lifePolicies;
    address public immutable idrxTokenAddress;

    event PolicyCreated(address indexed policyContract, address indexed policyHolder, string policyType);

    constructor(address _idrxTokenAddress) {
        idrxTokenAddress = _idrxTokenAddress;
    }

    function createEndowmentPolicy(address _beneficiary, uint256 _payoutValue, uint256 _duration) external {
        // 1. Tarik premi dari pengguna (msg.sender) ke Factory
        IERC20(idrxTokenAddress).transferFrom(msg.sender, address(this), _payoutValue);

        // 2. Deploy kontrak polis baru
        EndowmentPolicy newPolicy =
            new EndowmentPolicy(msg.sender, _beneficiary, _payoutValue, idrxTokenAddress, _duration);

        // 3. Kirim premi dari Factory ke kontrak polis baru tersebut
        IERC20(idrxTokenAddress).transfer(address(newPolicy), _payoutValue);

        // 4. Catat alamatnya
        endowmentPolicies.push(address(newPolicy));
        emit PolicyCreated(address(newPolicy), msg.sender, "Endowment");
    }

    // Fungsi untuk membuat Asuransi Jiwa (mirip)
    function createLifePolicy(address _beneficiary, uint256 _payoutValue, uint256 _premium) external {
        // Untuk asuransi jiwa, premi bisa berbeda dari payout
        IERC20(idrxTokenAddress).transferFrom(msg.sender, address(this), _premium);

        LifePolicy newPolicy = new LifePolicy(msg.sender, _beneficiary, _payoutValue, idrxTokenAddress);

        // Kirim dana ke polis baru
        IERC20(idrxTokenAddress).transfer(address(newPolicy), _premium);

        lifePolicies.push(address(newPolicy));
        emit PolicyCreated(address(newPolicy), msg.sender, "Life");
    }
}
