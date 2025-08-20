import React, { useState } from "react";
import {
  FaPiggyBank,
  FaHeartbeat,
  FaGraduationCap,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaStar,
  FaUsers,
  FaClock,
  FaCoins,
  FaBitcoin,
} from "react-icons/fa";
import "./index.css"; // Make sure this CSS is imported

const InsuranceSelection = () => {
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  // NEW STATE to track the payment method
  const [paymentMethod, setPaymentMethod] = useState("IDRX"); 

  const insuranceTypes = [
    // Product data remains the same, price will be rendered dynamically
    { id: "pension", title: "Pension Fund Insurance", subtitle: "A secure retirement preparation", icon: FaPiggyBank, color: "from-blue-500 to-cyan-500", features: ["Funds locked in a smart contract", "Automatic disbursement at maturity", "Assignable beneficiary"], benefits: ["Assets safe from inflation", "Transparent and cannot be manipulated", "Funds are 100% yours"], priceIDRX: "50,000 IDRX", priceBTC: "0.0001 BTC", coverage: "One-time Premium" },
    { id: "health", title: "Health Insurance", subtitle: "Comprehensive health protection", icon: FaHeartbeat, color: "from-green-500 to-emerald-500", features: ["Inpatient and outpatient care", "Surgery and medications", "Critical illness protection"], benefits: ["Global hospital coverage", "No age limit", "Instant claim process"], priceIDRX: "30,000 IDRX", priceBTC: "0.00006 BTC", coverage: "One-time Premium" },
    { id: "education", title: "Education Insurance", subtitle: "Guaranteed education for your child's future", icon: FaGraduationCap, color: "from-purple-500 to-indigo-500", features: ["Guaranteed education funds", "Flexible time period", "Protection in case of risk"], benefits: ["Guaranteed funds through university", "Smart contract secured", "Automatic disbursement"], priceIDRX: "40,000 IDRX", priceBTC: "0.00008 BTC", coverage: "One-time Premium" },
    { id: "life", title: "Life Insurance", subtitle: "Financial protection for your family", icon: FaShieldAlt, color: "from-rose-500 to-red-500", features: ["Comprehensive life protection", "Death benefit in IDRX/BTC", "Permanent disability protection"], benefits: ["100% automatic death benefit", "Total permanent disability protection", "Instant payout"], priceIDRX: "20,000 IDRX", priceBTC: "0.00004 BTC", coverage: "One-time Premium" },
  ];

  const handleInsuranceSelect = (insurance) => {
    window.scrollTo(0, 0);
    setSelectedInsurance(insurance);
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedInsurance(null), 300);
  };
  
  // Product detail view
  if (showDetails && selectedInsurance) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="max-w-4xl mx-auto w-full">
          {/* ... (code for back button and header remains the same) ... */}
          <div className="text-center mb-8">
            <button onClick={handleBack} className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors">
              <FaArrowRight className="rotate-180 mr-2" />
              Back
            </button>
            <h1 className="text-4xl font-bold text-white mb-2">{selectedInsurance.title}</h1>
            <p className="text-gray-300 text-lg">{selectedInsurance.subtitle}</p>
          </div>

          <div className="glass-card overflow-hidden">
            {/* ... (code for detail card header remains the same) ... */}
            <div className={`bg-gradient-to-r ${selectedInsurance.color} text-white p-8`}>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center text-center sm:text-left">
                        <selectedInsurance.icon className="text-5xl mr-4 flex-shrink-0" />
                        <div><h2 className="text-3xl font-bold">{selectedInsurance.title}</h2></div>
                    </div>
                    <div className="text-center sm:text-right flex-shrink-0">
                        {/* DYNAMIC PRICE */}
                        <p className="text-3xl font-bold">{paymentMethod === 'IDRX' ? selectedInsurance.priceIDRX : selectedInsurance.priceBTC}</p>
                        <p className="text-white/80">{selectedInsurance.coverage}</p>
                    </div>
                </div>
            </div>

            <div className="p-8">
              {/* ... (code for features and benefits remains the same) ... */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Main Features</h3>
                  <ul className="space-y-3">
                    {selectedInsurance.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaStar className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {selectedInsurance.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="text-green-400 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* --- DYNAMIC PAYMENT SECTION --- */}
              <div className="mt-8 pt-8 border-t border-white/20">
                {paymentMethod === 'IDRX' ? (
                  // View if IDRX is selected
                  <button className="w-full btn-gradient-blue py-3 px-6 text-lg flex items-center justify-center gap-2">
                      <FaCoins />
                      Buy Policy with IDRX
                  </button>
                ) : (
                  // View if BTC is selected
                  <div>
                    <h3 className="text-xl font-semibold text-center text-white mb-4">Payment with Bitcoin</h3>
                    <div className="bg-white/10 p-4 rounded-lg text-center">
                        <p className="text-gray-300">The feature to pay with BTC is coming soon!</p>
                        <p className="font-bold text-orange-400 text-lg mt-2">Coming Soon</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main view
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Choose Your Insurance Product</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built on smart contracts for transparency, security, and automated claims.
          </p>

          {/* --- PAYMENT SELECTION BUTTONS --- */}
          <div className="flex justify-center items-center gap-2 mt-6 p-2 glass-card max-w-sm mx-auto">
            <button 
              onClick={() => setPaymentMethod('IDRX')}
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${paymentMethod === 'IDRX' ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-300'}`}
            >
              <FaCoins /> Buy with IDRX
            </button>
            <button 
              onClick={() => setPaymentMethod('BTC')}
              className={`flex-1 py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${paymentMethod === 'BTC' ? 'bg-orange-500 text-white' : 'bg-transparent text-gray-300'}`}
            >
              <FaBitcoin /> Buy with BTC
            </button>
          </div>
        </div>

        {/* Insurance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {insuranceTypes.map((insurance) => (
            <div key={insurance.id} className="glass-card overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 cursor-pointer" onClick={() => handleInsuranceSelect(insurance)}>
              <div className={`bg-gradient-to-r ${insurance.color} text-white p-6 text-center`}>
                <insurance.icon className="text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-bold">{insurance.title}</h3>
                <p className="text-sm opacity-80 h-10">{insurance.subtitle}</p>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <ul className="space-y-2 mb-4 flex-grow">
                  {insurance.features.slice(0, 2).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <FaCheckCircle className="text-green-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/20 pt-4 mt-auto">
                  <p className="text-sm text-gray-400">{insurance.coverage}</p>
                  {/* DYNAMIC PRICE */}
                  <p className="text-2xl font-bold text-white mb-4">{paymentMethod === 'IDRX' ? insurance.priceIDRX : insurance.priceBTC}</p>
                  <button className="w-full btn-gradient-blue font-semibold py-2">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* ... (code for "Why Choose Us" remains the same) ... */}
        <div className="mt-16 text-center">
            <div className="glass-card p-8 max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6">Why Choose On-Chain Insurance?</h2>
                <div className="grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <FaShieldAlt className="text-5xl text-blue-400 mb-4" />
                    <h3 className="font-semibold text-white text-lg mb-2">Trusted Smart Contract</h3>
                    <p className="text-gray-300 text-sm">Built with a transparent and audited smart contract for maximum security.</p>
                </div>
                <div className="flex flex-col items-center">
                    <FaUsers className="text-5xl text-blue-400 mb-4" />
                    <h3 className="font-semibold text-white text-lg mb-2">Fully User-Owned</h3>
                    <p className="text-gray-300 text-sm">No intermediaries. Your funds are managed by immutable code.</p>
                </div>
                <div className="flex flex-col items-center">
                    <FaClock className="text-5xl text-blue-400 mb-4" />
                    <h3 className="font-semibold text-white text-lg mb-2">Instant Claims</h3>
                    <p className="text-gray-300 text-sm">Claim payouts are processed instantly by the smart contract without human intervention.</p>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSelection;