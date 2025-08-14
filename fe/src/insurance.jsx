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
  FaChartLine,
  FaEthereum,
  FaBitcoin,
  FaCoins,
} from "react-icons/fa";
import "./insurance.css";

const InsuranceSelection = () => {
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const insuranceTypes = [
    {
      id: "pension",
      title: "Asuransi Dana Pensiun",
      subtitle: "Persiapan masa pensiun yang aman dan terjamin",
      icon: FaPiggyBank,
      color: "card-header-pension",
      features: [
        "Dana pensiun dalam IDRX terjamin",
        "Yield farming otomatis",
        "Perlindungan keluarga",
        "Smart contract escrow",
      ],
      benefits: [
        "Jaminan penghasilan bulanan dalam IDRX",
        "Perlindungan terhadap volatilitas crypto",
        "Manfaat kematian untuk keluarga",
        "Staking rewards tambahan",
      ],
      price: "50,000 IDRX/bulan",
      coverage: "Coverage hingga 50,000,000 IDRX",
    },
    {
      id: "health",
      title: "Asuransi Kesehatan",
      subtitle: "Perlindungan kesehatan komprehensif untuk Anda dan keluarga",
      icon: FaHeartbeat,
      color: "card-header-health",
      features: [
        "Rawat inap dan rawat jalan",
        "Pembedahan dan obat-obatan",
        "Medical check-up tahunan",
        "Perlindungan penyakit kritis",
      ],
      benefits: [
        "Cakupan rumah sakit global",
        "Tidak ada batasan usia",
        "Perlindungan hingga 100,000,000 IDRX",
        "Instant claim processing",
      ],
      price: "30,000 IDRX/bulan",
      coverage: "Coverage hingga 100,000,000 IDRX",
    },
    {
      id: "education",
      title: "Asuransi Pendidikan Berjangka",
      subtitle: "Jaminan pendidikan berkualitas untuk masa depan anak",
      icon: FaGraduationCap,
      color: "card-header-education",
      features: [
        "Dana pendidikan dalam IDRX",
        "Fleksibilitas jangka waktu",
        "Perlindungan orang tua",
        "Yield farming untuk pendidikan",
      ],
      benefits: [
        "Jaminan dana pendidikan hingga perguruan tinggi",
        "Perlindungan jika orang tua meninggal",
        "Smart contract terjamin",
        "Pencairan otomatis via smart contract",
      ],
      price: "40,000 IDRX/bulan",
      coverage: "Coverage hingga 75,000,000 IDRX",
    },
    {
      id: "life",
      title: "Asuransi Jiwa",
      subtitle: "Perlindungan finansial keluarga jika terjadi risiko",
      icon: FaShieldAlt,
      color: "card-header-life",
      features: [
        "Perlindungan jiwa komprehensif",
        "Manfaat kematian dalam IDRX",
        "Perlindungan cacat tetap",
        "Smart contract execution",
      ],
      benefits: [
        "Perlindungan hingga 200,000,000 IDRX",
        "Manfaat kematian 100% otomatis",
        "Perlindungan cacat tetap total",
        "Instant payout via smart contract",
      ],
      price: "20,000 IDRX/bulan",
      coverage: "Coverage hingga 200,000,000 IDRX",
    },
  ];

  const handleInsuranceSelect = (insurance) => {
    setSelectedInsurance(insurance);
    setShowDetails(true);
  };

  const handleBack = () => {
    setShowDetails(false);
    setSelectedInsurance(null);
  };

  if (showDetails && selectedInsurance) {
    return (
      <div className="insurance-container py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="insurance-header text-center mb-8">
            <button
              onClick={handleBack}
              className="back-btn inline-flex items-center text-blue-400 hover:text-blue-300 mb-4"
            >
              <FaArrowRight className="rotate-180 mr-2" />
              Kembali ke Pilihan Asuransi
            </button>
            <h1 className="insurance-title text-3xl font-bold mb-2">
              {selectedInsurance.title}
            </h1>
            <p className="insurance-subtitle text-gray-300 text-lg">
              {selectedInsurance.subtitle}
            </p>
          </div>

          {/* Insurance Details */}
          <div className="insurance-detail rounded-2xl shadow-xl overflow-hidden">
            {/* Header Card */}
            <div
              className={`detail-header ${selectedInsurance.color} text-white p-8`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <selectedInsurance.icon className="feature-icon text-4xl mr-4" />
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedInsurance.title}
                    </h2>
                    <p className="text-blue-100">
                      {selectedInsurance.subtitle}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="price-display">
                    <p className="text-2xl font-bold">
                      {selectedInsurance.price}
                    </p>
                    <p className="text-blue-100">Premi bulanan</p>
                    <p className="text-blue-100 text-sm">
                      {selectedInsurance.coverage}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="card-content p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <FaCheckCircle className="feature-icon text-green-400 mr-2" />
                    Fitur Utama
                  </h3>
                  <ul className="feature-list space-y-3">
                    {selectedInsurance.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FaStar className="feature-icon text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="benefits-section">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <FaUsers className="feature-icon text-blue-400 mr-2" />
                    Manfaat
                  </h3>
                  <ul className="feature-list space-y-3">
                    {selectedInsurance.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheckCircle className="feature-icon text-green-400 mt-1 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-8 border-t border-gray-600">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="insurance-btn flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center">
                    <FaChartLine className="mr-2" />
                    Bandingkan Premi
                  </button>
                  <button className="insurance-btn flex-1 font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center">
                    <FaCoins className="mr-2" />
                    Bayar dengan IDRX
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="insurance-container py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="insurance-header text-center mb-12">
          <h1 className="insurance-title text-4xl font-bold mb-4">
            Pilih Asuransi On-Chain
          </h1>
          <p className="insurance-subtitle text-xl text-gray-300 max-w-2xl mx-auto">
            Lindungi aset digital Anda dengan smart contract yang transparan dan
            terdesentralisasi
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="crypto-badge idrx flex items-center gap-2 px-4 py-2">
              <FaCoins className="text-green-400" />
              <span className="text-green-300 font-semibold">
                Bayar dengan IDRX
              </span>
            </div>
            <div className="crypto-badge btc flex items-center gap-2 px-4 py-2">
              <FaBitcoin className="text-orange-400" />
              <span className="text-orange-300 font-semibold">Support BTC</span>
            </div>
          </div>
        </div>

        {/* Insurance Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animation">
          {insuranceTypes.map((insurance) => (
            <div
              key={insurance.id}
              className="insurance-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => handleInsuranceSelect(insurance)}
            >
              {/* Card Header */}
              <div
                className={`card-header-${insurance.id} text-white p-6 rounded-t-2xl`}
              >
                <div className="text-center">
                  <insurance.icon className="feature-icon text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {insurance.title}
                  </h3>
                  <p className="text-sm opacity-90">{insurance.subtitle}</p>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content p-6">
                <div className="mb-4">
                  <h4 className="font-semibold text-white mb-2">
                    Fitur Utama:
                  </h4>
                  <ul className="feature-list space-y-2">
                    {insurance.features.slice(0, 3).map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start text-sm text-gray-300"
                      >
                        <FaCheckCircle className="feature-icon text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-600 pt-4">
                  <div className="price-display mb-3">
                    <p className="text-lg font-bold text-blue-400 mb-1">
                      {insurance.price}
                    </p>
                    <p className="text-sm text-gray-400">
                      {insurance.coverage}
                    </p>
                  </div>
                  <button className="insurance-btn w-full font-semibold py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center">
                    Pilih Asuransi
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="why-choose-section rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="why-choose-content">
              <h2 className="text-2xl font-bold text-white mb-4">
                Mengapa Memilih Asuransi Kami?
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <FaShieldAlt className="feature-icon text-4xl text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">
                    Smart Contract Terpercaya
                  </h3>
                  <p className="text-gray-300">
                    Dibangun dengan smart contract yang transparan dan teraudit
                  </p>
                </div>
                <div className="text-center">
                  <FaUsers className="feature-icon text-4xl text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">DeFi Native</h3>
                  <p className="text-gray-300">
                    Integrasi dengan ekosistem DeFi untuk yield farming dan
                    staking
                  </p>
                </div>
                <div className="text-center">
                  <FaClock className="feature-icon text-4xl text-blue-400 mx-auto mb-3" />
                  <h3 className="font-semibold text-white mb-2">
                    Instant Settlement
                  </h3>
                  <p className="text-gray-300">
                    Klaim asuransi diproses otomatis melalui smart contract
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceSelection;
