// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Donation {
    struct DonationData {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => DonationData[]) public donations;
    address public owner;

    event DonationSent(address indexed donor, address indexed organization, uint256 amount, uint256 timestamp);

    constructor() {
        owner = msg.sender; // Deploying account is the contract owner
    }

    function donate(address _organization) public payable {
        require(msg.value > 0, "Must send some ETH");
        require(_organization != address(0), "Invalid organization address");

        // Store donation data
        donations[_organization].push(DonationData(msg.sender, msg.value, block.timestamp));

        // Directly send ETH to the organization's wallet
        (bool sent, ) = payable(_organization).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        emit DonationSent(msg.sender, _organization, msg.value, block.timestamp);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    // Optional: Fallback function to prevent accidental direct transfers
    receive() external payable {
        revert("Direct Ether transfers are not supported. Use the donate function.");
    }
}