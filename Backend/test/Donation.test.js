const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("Donation Smart Contract", function () {
  let donationContract;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the contract
    const Donation = await ethers.getContractFactory("Donation");
    donationContract = await Donation.deploy();
    await donationContract.waitForDeployment(); // Ensure deployment completes
  });

  it("Should emit an event when a donation is made", async function () {
    await expect(
      donationContract.connect(addr1).donate({ value: ethers.parseEther("1") })
    )
      .to.emit(donationContract, "DonationReceived")
      .withArgs(addr1.address, ethers.parseEther("1"), anyValue);
  });
});
