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

    event DonationReceived(address indexed donor, uint256 amount, uint256 timestamp);

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "Must send some ETH");

        donations[msg.sender].push(DonationData(msg.sender, msg.value, block.timestamp));

        emit DonationReceived(msg.sender, msg.value, block.timestamp);
    }

    function getDonations(address _donor) public view returns (DonationData[] memory) {
        return donations[_donor];
    }
}
