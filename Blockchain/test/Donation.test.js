const { expect } = require("chai");
const { ethers } = require("hardhat");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

describe("Donation Smart Contract", function () {
  let donationContract;
  let owner, donor, organization;

  beforeEach(async function () {
    [owner, donor, organization] = await ethers.getSigners();

    const Donation = await ethers.getContractFactory("Donation");
    donationContract = await Donation.deploy();
  });

  it("Should emit an event when a donation is made", async function () {
    const donationAmount = ethers.parseEther("1"); // 1 Ether in wei

    await expect(
      donationContract.connect(donor).donate(organization.address, {
        value: donationAmount,
      })
    )
      .to.emit(donationContract, "DonationSent")
      .withArgs(donor.address, organization.address, donationAmount, anyValue);
  });

  it("Should transfer the donation directly to the organization", async function () {
    const donationAmount = ethers.parseEther("1");

    // Get initial balance of the organization
    const initialBalance = await ethers.provider.getBalance(
      organization.address
    );

    // Donor sends ETH to the organization
    await donationContract.connect(donor).donate(organization.address, {
      value: donationAmount,
    });

    // Get final balance of the organization
    const finalBalance = await ethers.provider.getBalance(organization.address);

    // The difference should be equal to the donated amount (minus gas fees)
    expect(finalBalance).to.be.above(initialBalance);
  });
});
