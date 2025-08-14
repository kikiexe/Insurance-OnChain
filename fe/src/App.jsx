// App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ethers } from "ethers";
// Menggunakan kembali react-icons untuk ikon yang modern
import { FaWallet, FaCheckCircle, FaSignOutAlt, FaHome } from "react-icons/fa";
import "./index.css";
import InsuranceSelection from "./insurance.jsx";

// Component untuk halaman Wallet Connection
function WalletConnection({ onWalletConnect }) {
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        onWalletConnect(accounts[0]);
        // Navigate ke halaman asuransi setelah wallet terhubung
        navigate("/insurance");
      } catch (error) {
        console.error("Error connecting wallet:", error);
        alert("Failed to connect wallet. Please try again.");
      }
    } else {
      alert("Metamask not found! Please install the extension.");
    }
  }

  function disconnectWallet() {
    setAccount(null);
    onWalletConnect(null);
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
                  {`${account.substring(0, 6)}...${account.substring(
                    account.length - 4
                  )}`}
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
            Secure your digital assets with transparent, on-chain insurance
            policies powered by smart contracts.
          </p>

          {!account && (
            <div className="mt-8">
              <button
                onClick={connectWallet}
                className="btn-gradient-blue flex items-center gap-2 text-lg px-8 py-4"
              >
                <FaWallet />
                <span>Connect Wallet to Continue</span>
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Component untuk halaman Insurance dengan Navbar
function InsurancePage({ account, onWalletConnect }) {
  const navigate = useNavigate();

  function disconnectWallet() {
    onWalletConnect(null);
    navigate("/");
  }

  return (
    <div className="min-h-screen insurance-container">
      {/* Navbar untuk halaman Insurance */}
      <nav className="glass-card border-b border-gray-700/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate("/")}
                className="nav-home-btn flex items-center text-blue-400 hover:text-blue-300 transition-all duration-300 group"
              >
                <FaHome className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-medium">Home</span>
              </button>
              <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                Sathafy Assurance
              </div>
            </div>

            {account && (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 glass-card px-4 py-2 rounded-lg text-sm border border-gray-600/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 font-medium">
                    {`${account.substring(0, 6)}...${account.substring(
                      account.length - 4
                    )}`}
                  </span>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="nav-disconnect-btn bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-red-500/25"
                >
                  <FaSignOutAlt className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="hidden sm:inline font-medium">
                    Disconnect
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Insurance Selection Component */}
      <InsuranceSelection />
    </div>
  );
}

export default function App() {
  const [account, setAccount] = useState(null);
  const location = useLocation();

  // Check if wallet is already connected on app load
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  const handleWalletConnect = (newAccount) => {
    setAccount(newAccount);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<WalletConnection onWalletConnect={handleWalletConnect} />}
      />
      <Route
        path="/insurance"
        element={
          <InsurancePage
            account={account}
            onWalletConnect={handleWalletConnect}
          />
        }
      />
    </Routes>
  );
}
