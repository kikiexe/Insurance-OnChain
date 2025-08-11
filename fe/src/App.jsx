import { useState } from "react";
import { ethers } from "ethers";
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
      alert("Metamask not found");
    }
  }

  function disconnectWallet() {
    setAccount(null); // cukup hapus state account
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-white px-6 py-4 shadow">
        <div className="text-xl font-bold text-gray-800">My DApp</div>

        {account ? (
          <div className="flex items-center gap-3">
            <span className="truncate max-w-[150px] text-gray-700">
              {account}
            </span>
            <button
              onClick={disconnectWallet}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              <FaSignOutAlt />
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <FaWallet />
            Connect Wallet
          </button>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My DApp</h1>
        {account && (
          <div className="flex items-center gap-2 text-green-600 font-medium">
            <FaCheckCircle />
            Connected
          </div>
        )}
      </main>
    </div>
  );
}
