// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IDRX is ERC20, Ownable {
    constructor() ERC20("IDR eXperimental", "IDRX") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 ether); // supply awal untuk deployer
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
