import { ethers } from "ethers";

export async function connectWallet() {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    return { address: accounts[0] };
  } catch (error) {
    console.error("Connection error:", error);
    alert("Failed to connect MetaMask.");
  }
}
