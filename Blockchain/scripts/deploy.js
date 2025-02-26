const hre = require("hardhat");

async function main() {
  const Donation = await hre.ethers.getContractFactory("Donation");
  const donation = await Donation.deploy();

  await donation.waitForDeployment();

  console.log("Donation contract deployed at:", await donation.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
