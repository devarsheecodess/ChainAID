import { ethers } from "ethers";
import rawABI from "../../contracts/DonationABI.json";
const DonationABI = rawABI.abi; // Extract ABI if it's nested inside an object
import { CONTRACT_ADDRESS } from "../../contracts/constants";

export async function donate(amount) {
  if (!window.ethereum) {
    alert("MetaMask not found!");
    return;
  }

  try {
    // Connect to MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, DonationABI, signer);

    // Ensure amount is a string
    const donationAmount = ethers.parseEther(amount.toString());

    // Estimate gas
    const gasLimit = await contract.donate.estimateGas({
      value: donationAmount,
    });

    console.log(`Estimated Gas Limit: ${gasLimit.toString()}`);

    // Send transaction with estimated gas
    const tx = await contract.donate({
      value: donationAmount,
      gasLimit: gasLimit, // Apply estimated gas
    });

    console.log("Transaction Hash:", tx.hash);
    alert("Waiting for confirmation...");

    const receipt = await tx.wait();
    console.log("Transaction Receipt:", receipt);

    if (receipt.status === 1) {
      alert("Donation successful!");
    } else {
      alert("Transaction reverted!");
    }
  } catch (error) {
    console.error("Donation failed:", error);

    if (error.code === "INSUFFICIENT_FUNDS") {
      alert("Insufficient balance! Add ETH to cover gas fees.");
    } else if (error.message.includes("gas required exceeds allowance")) {
      alert("Gas limit too high! Try increasing gas.");
    } else {
      alert(`Transaction failed: ${error.reason || error.message}`);
    }
  }
}
