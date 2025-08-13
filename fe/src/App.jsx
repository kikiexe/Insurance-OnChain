// App.jsx
import { useState } from "react";
import { ethers } from "ethers";
// Menggunakan kembali react-icons untuk ikon yang modern
import { FaWallet, FaCheckCircle, FaSignOutAlt } from "react-icons/fa";
import "./index.css";

export default function App() {
  const [account, setAccount] = useState(null);

  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } else {
      alert("Metamask not found! Please install the extension.");
    }
  }

  function disconnectWallet() {
    setAccount(null);
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        {/* --- Navbar Modern --- */}
        <nav className="flex justify-between items-center p-5 glass-card">
          <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            Sathafy Assurance
          </div>

          {account ? (
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2 text-sm">
                <FaCheckCircle className="text-green-400" />
                <span>
                  {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="btn-gradient-red flex items-center gap-2"
              >
                <FaSignOutAlt />
                <span className="hidden sm:inline">Disconnect</span>
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="btn-gradient-blue flex items-center gap-2"
            >
              <FaWallet />
              <span>Connect Wallet</span>
            </button>
          )}
        </nav>

        {/* --- Main Content --- */}
        <main className="flex-1 flex flex-col items-center justify-center text-center p-12 glass-card">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Decentralized Insurance Platform
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Secure your digital assets with transparent, on-chain insurance policies powered by smart contracts.
          </p>
        </main>
      </div>
    </div>
  );
}