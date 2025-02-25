import { useState } from "react";
import { connectWallet } from "./components/Wallet";
import { donate } from "./components/Donation";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  const handleConnect = async () => {
    const wallet = await connectWallet();
    if (wallet) {
      setWalletAddress(wallet.address);
    }
  };

  const handleDonate = async () => {
    if (!donationAmount) {
      alert("Enter a valid amount!");
      return;
    }
    await donate(donationAmount);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-5">
      <h1 className="text-3xl font-bold">ChainAid</h1>
      <button
        className="mt-5 px-5 py-2 bg-blue-500 text-white rounded-lg"
        onClick={handleConnect}
      >
        Connect MetaMask
      </button>
      {walletAddress && <p className="mt-3 text-lg">Connected: {walletAddress}</p>}

      <div className="mt-5">
        <input
          type="number"
          placeholder="Enter amount in ETH"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          className="px-3 py-2 border rounded-md"
        />
        <button
          className="ml-3 px-5 py-2 bg-green-500 text-white rounded-lg"
          onClick={handleDonate}
        >
          Donate
        </button>
      </div>
    </div>
  );
}

export default App;
