import { useEffect, useState } from "react";
import { connectWallet } from "./Wallet";
import { donate } from "../Donation";
import { ethers } from "ethers";

function App() {
    const [walletAddress, setWalletAddress] = useState(localStorage.getItem("walletAddress") || "");
    const [donationAmount, setDonationAmount] = useState("");
    const [balance, setBalance] = useState("0");

    let provider;

    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
    } else {
        alert("Please install MetaMask!");
    }

    const getBalance = async () => {
        if (!walletAddress) return;
        try {
            const balanceWei = await provider.getBalance(walletAddress);
            setBalance(ethers.formatEther(balanceWei)); // Convert balance from Wei to ETH
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    const handleConnect = async () => {
        const wallet = await connectWallet();
        if (wallet) {
            setWalletAddress(wallet.address);
            localStorage.setItem("walletAddress", wallet.address); // ✅ Store wallet address
            await getBalance(); // ✅ Fetch balance after connecting
        }
    };

    const handleDisconnect = () => {
        setWalletAddress("");
        localStorage.removeItem("walletAddress"); // ✅ Remove wallet address from localStorage
        setBalance("0");
    };

    const handleDonate = async () => {
        if (!donationAmount || isNaN(donationAmount) || Number(donationAmount) <= 0) {
            alert("Enter a valid amount!");
            return;
        }

        try {
            console.log(`⏳ Sending ${donationAmount} ETH...`);

            const txResponse = await donate(donationAmount); // ✅ Only pass amount
            console.log("Transaction sent:", txResponse.hash);

            alert("⏳ Waiting for transaction confirmation...");
            const receipt = await txResponse.wait();

            if (receipt.status === 1) {
                alert("Donation Successful!");
                setDonationAmount(""); // ✅ Clear input
                await getBalance(); // ✅ Refresh balance
            } else {
                alert("Transaction reverted!");
            }
        } catch (error) {
            console.error("Donation failed:", error);

            if (error.code === "INSUFFICIENT_FUNDS") {
                alert("Insufficient balance!");
            } else {
                console.log("Donation failed!");
            }
        }
    };


    useEffect(() => {
        if (walletAddress) {
            getBalance();
        }
    }, [walletAddress]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
            <h1 className="text-3xl font-bold">ChainAid</h1>
            {!walletAddress ? (
                <button
                    className="mt-5 px-5 py-2 bg-blue-500 text-white rounded-lg"
                    onClick={handleConnect}
                >
                    Connect MetaMask
                </button>
            ) : (
                <div className="mt-5 flex flex-col items-center">
                    <p className="text-lg">Connected: {walletAddress}</p>
                    <p className="text-lg">Balance: {balance} ETH</p>
                    <button
                        className="mt-3 px-5 py-2 bg-red-500 text-white rounded-lg"
                        onClick={handleDisconnect}
                    >
                        Disconnect
                    </button>
                </div>
            )}

            <div className="mt-5">
                <input
                    type="number"
                    placeholder="Enter amount in ETH"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                />
                <button
                    className="ml-3 px-5 py-2 bg-indigo-500 text-white rounded-lg"
                    onClick={handleDonate}
                >
                    Donate
                </button>
            </div>
        </div>
    );
}

export default App;
