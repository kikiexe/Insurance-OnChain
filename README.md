Foundry
Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.

Foundry consists of:

Forge: Ethereum testing framework (like Truffle, Hardhat and DappTools).
Cast: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
Anvil: Local Ethereum node, akin to Ganache, Hardhat Network.
Chisel: Fast, utilitarian, and verbose solidity REPL.
Documentation
https://book.getfoundry.sh/

Usage
Build
$ forge build
Test
$ forge test
Format
$ forge fmt
Gas Snapshots
$ forge snapshot
Anvil
$ anvil
Deploy
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
Cast
$ cast <subcommand>
Help
$ forge --help
$ anvil --help
$ cast --help
