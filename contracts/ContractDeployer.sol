// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ContractDeployer
 * @dev This contract allows deploying other contracts from its bytecode.
 */
contract ContractDeployer {
 
    /**
     * @notice Deploys a contract using its bytecode.
     * @param bytecode The bytecode of the contract to deploy.
     * @return newContract The address of the newly deployed contract.
     */
    function deployFromBytecode(bytes memory bytecode) public returns (address newContract) {
        // Ensure the bytecode is not empty
        require(bytecode.length > 0, "Bytecode cannot be empty");

        assembly {
            // Create a new contract
            // `create` returns the address of the new contract on success, or 0 on failure
            newContract := create(0, add(bytecode, 0x20), mload(bytecode))
        }

        // Verify that the contract deployment was successful
        require(newContract != address(0), "Contract deployment failed");
    }
}
