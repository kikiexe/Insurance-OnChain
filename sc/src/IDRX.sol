pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IDRX is ERC20, Ownable {
    constructor() ERC20("IDR eXperimental", "IDRX") Ownable(msg.sender) {
        // Mint 1 juta token untuk deployer saat awal
        _mint(msg.sender, 1_000_000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
