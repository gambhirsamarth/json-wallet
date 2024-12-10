import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddJsonForm from "./components/AddJsonForm";
import Modal from "./components/Modal";

const App = () => {
  const [wallet, setWallet] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load all JSONs from localStorage into wallet on initialization
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("jsonWallet_")
    );
    const loadedWallet = keys.reduce((acc, key) => {
      const label = key.replace("jsonWallet_", "");
      acc[label] = localStorage.getItem(key);
      return acc;
    }, {});
    setWallet(loadedWallet);
  }, []);

  const handleAddJson = (label, json) => {
    if (localStorage.getItem(`jsonWallet_${label}`)) {
      alert("A JSON with this label already exists!");
      return;
    }

    localStorage.setItem(`jsonWallet_${label}`, json);

    setWallet((prev) => ({ ...prev, [label]: json }));
  };

  const handleDeleteJson = (label) => {
    if (window.confirm(`Are you sure you want to delete "${label}"?`)) {
      localStorage.removeItem(`jsonWallet_${label}`);

      setWallet((prev) => {
        const updatedWallet = { ...prev };
        delete updatedWallet[label];
        return updatedWallet;
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-16 relative">
      {/* Liquid Background */}
      <div className="liquid-background"></div>

      <Header />

      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-3xl">
          <AddJsonForm onAdd={handleAddJson} />
        </div>
      </div>

      <div className="text-center px-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-8 py-3 rounded-xl shadow-lg transition-colors"
        >
          View Wallet{" "}
          {Object.keys(wallet).length > 0 && `(${Object.keys(wallet).length})`}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wallet={wallet}
        onDelete={handleDeleteJson}
      />
    </div>
  );
};

export default App;
