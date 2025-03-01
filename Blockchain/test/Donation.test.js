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
  });

  it("Should emit an event when a donation is made", async function () {
    const donationAmount = "1000000000000000000"; // 1 Ether in wei
    const organization = addr2;

    await expect(
      donationContract
        .connect(addr1)
        .donate(organization, { value: donationAmount })
    )
      .to.emit(donationContract, "DonationReceived")
      .withArgs(addr1.address, organization, donationAmount, anyValue);
  });

  it("Should allow organizations to withdraw funds", async function () {
    const donationAmount = "1000000000000000000";
    const organization = addr2;

    await donationContract
      .connect(addr1)
      .donate(organization, { value: donationAmount });

    await expect(donationContract.connect(organization).withdrawFunds())
      .to.emit(donationContract, "FundsWithdrawn")
      .withArgs(organization, donationAmount, anyValue);
  });
});
