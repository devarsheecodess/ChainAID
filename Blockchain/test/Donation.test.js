const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("Donation Smart Contract", function () {
  let donationContract;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const Donation = await ethers.getContractFactory("Donation");
    donationContract = await Donation.deploy();
    await donationContract.waitForDeployment();
  });

  it("Should emit an event when a donation is made", async function () {
    const donationAmount = ethers.parseEther("1");

    await expect(
      addr1.sendTransaction({
        to: donationContract.target, // ✅ FIXED: Use `target` for contract address
        value: donationAmount,
      })
    )
      .to.emit(donationContract, "DonationReceived")
      .withArgs(addr1.address, donationAmount, anyValue);
  });
});
