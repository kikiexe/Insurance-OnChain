pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/PolicyFactory.sol";
import "../src/IDRX.sol";

contract Deploy is Script {
    function run() external returns (PolicyFactory, address) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);

        IDRX idrxToken = new IDRX();
        console.log("IDRX token deployed at:", address(idrxToken));

        PolicyFactory factory = new PolicyFactory(address(idrxToken));
        console.log("PolicyFactory deployed at:", address(factory));

        vm.stopBroadcast();
        
        return (factory, address(idrxToken));
    }
}