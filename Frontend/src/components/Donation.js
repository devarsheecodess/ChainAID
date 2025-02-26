import { ethers } from "ethers";
import rawABI from "../contracts/DonationABI.json";
const DonationABI = rawABI.abi; // Extract ABI if it's nested inside an object
import { CONTRACT_ADDRESS } from "../contracts/constants";

export async function donate(amount) {
  if (!window.ethereum) {
    alert("MetaMask not found!");
    return;
  }

  try {
    // Connect to MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get the user's signer (private key stays secure inside MetaMask)
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, DonationABI, signer);

    // Send donation transaction
    const tx = await contract.donate({
      value: ethers.parseEther(amount), // Convert amount to Wei
    });
    await tx.wait(); // Wait for transaction to be confirmed

    alert("Donation successful!");
  } catch (error) {
    console.error("Donation failed:", error);
    alert("Transaction failed!");
  }
}
