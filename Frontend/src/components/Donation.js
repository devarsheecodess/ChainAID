import { ethers } from "ethers";
import rawABI from "../contracts/DonationABI.json";
const DonationABI = rawABI.abi; // Extract ABI if it's nested inside an object
import { CONTRACT_ADDRESS } from "../contracts/constants";

export async function getContract(signer) {
  if (!Array.isArray(DonationABI)) {
    console.error("Invalid ABI format:", DonationABI);
    throw new Error("Contract ABI must be an array.");
  }

  return new ethers.Contract(CONTRACT_ADDRESS, DonationABI, signer);
}

export async function donate(amount) {
  if (!window.ethereum) {
    alert("MetaMask not found!");
    return;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = await getContract(signer);

    const tx = await contract.donate({
      value: ethers.parseEther(amount),
    });

    await tx.wait();
    alert("Donation successful!");
  } catch (error) {
    console.error("Donation failed:", error);
    alert("Donation failed. Check console for details.");
  }
}
