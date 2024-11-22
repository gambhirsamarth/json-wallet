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
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-teal-700 to-pink-600 p-8">
  <Header />
  
  {/* Form Section */}
  <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 mx-auto mb-8">
    <AddJsonForm onAdd={handleAddJson} />
  </div>
  
  {/* JSON Wallet Section */}
  <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 mx-auto">
    <h2 className="text-3xl font-semibold mb-6 text-gray-700">Your JSON Wallet</h2>
    <WalletList wallet={wallet} onSelect={handleSelectLabel} />
    <WalletDetails selectedLabel={selectedLabel} wallet={wallet} />
  </div>
</div>
  );
};

export default App;
