// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Donation {
    struct DonationData {
        address donor;
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => DonationData[]) public donations;
    mapping(address => uint256) public organizationBalances;
    address public owner;

    event DonationReceived(address indexed donor, address indexed organization, uint256 amount, uint256 timestamp);
    event FundsWithdrawn(address indexed organization, uint256 amount, uint256 timestamp);

    constructor() {
        owner = msg.sender; // Deploying account is the contract owner
    }

    function donate(address _organization) public payable {
        require(msg.value > 0, "Must send some ETH");
        require(_organization != address(0), "Invalid organization address");
        
        donations[_organization].push(DonationData(msg.sender, msg.value, block.timestamp));
        organizationBalances[_organization] += msg.value;
        
        emit DonationReceived(msg.sender, _organization, msg.value, block.timestamp);
    }

    function withdrawFunds() external {
        uint256 balance = organizationBalances[msg.sender];
        require(balance > 0, "No funds to withdraw");

        organizationBalances[msg.sender] = 0;
        payable(msg.sender).transfer(balance);
        emit FundsWithdrawn(msg.sender, balance, block.timestamp);
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getOrganizationBalance(address _organization) external view returns (uint256) {
        return organizationBalances[_organization];
    }
}
