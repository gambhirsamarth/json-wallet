import React, { useState } from "react";
import Header from "./components/Header";
import AddJsonForm from "./components/AddJsonForm";
import WalletList from "./components/WalletList";
import WalletDetails from "./components/WalletDetails";

const App = () => {
  const [wallet, setWallet] = useState({});
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleAddJson = (label, json) => {
    if (wallet[label]) {
      alert("A JSON with this label already exists!");
      return;
    }

    setWallet((prev) => ({ ...prev, [label]: json }));
  };

  const handleSelectLabel = (label) => {
    setSelectedLabel(label);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-6 text-white">
      <Header />
      <AddJsonForm onAdd={handleAddJson} />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 mt-8 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Your JSON Wallet</h2>
        <WalletList wallet={wallet} onSelect={handleSelectLabel} />
        <WalletDetails selectedLabel={selectedLabel} wallet={wallet} />
      </div>
    </div>
  );
};

export default App;
