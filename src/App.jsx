import React, { useState } from "react";
import Header from "./components/Header";
import AddJsonForm from "./components/AddJsonForm";
import Modal from "./components/Modal";

const App = () => {
  const [wallet, setWallet] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddJson = (label, json) => {
    if (wallet[label]) {
      alert("A JSON with this label already exists!");
      return;
    }

    setWallet((prev) => ({ ...prev, [label]: json }));
  };

  const handleDeleteJson = (label) => {
    if (window.confirm(`Are you sure you want to delete "${label}"?`)) {
      setWallet((prev) => {
        const newWallet = { ...prev };
        delete newWallet[label];
        return newWallet;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-teal-700 to-pink-600 flex flex-col justify-between py-16">
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
