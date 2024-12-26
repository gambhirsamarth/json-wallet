import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import AddJsonForm from "./components/AddJsonForm";
import Modal from "./components/Modal";

const App = () => {
  const [wallet, setWallet] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference from localStorage
    const darkModePreference = localStorage.getItem("dark-mode");
    if (darkModePreference === "true") {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Load wallet data
    const keys = Object.keys(localStorage).filter(key => 
      key.startsWith("jsonWallet_")
    );
    const loadedWallet = keys.reduce((acc, key) => {
      const label = key.replace("jsonWallet_", "");
      acc[label] = localStorage.getItem(key);
      return acc;
    }, {});
    setWallet(loadedWallet);
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    localStorage.setItem("dark-mode", newDarkModeState);
    
    // Toggle dark class on root element
    if (newDarkModeState) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAddJson = (label, json) => {
    if (localStorage.getItem(`jsonWallet_${label}`)) {
      alert("A JSON with this label already exists!");
      return;
    }

    localStorage.setItem(`jsonWallet_${label}`, json);
    setWallet(prev => ({ ...prev, [label]: json }));
  };

  const handleDeleteJson = (label) => {
    if (window.confirm(`Are you sure you want to delete "${label}"?`)) {
      localStorage.removeItem(`jsonWallet_${label}`);
      setWallet(prev => {
        const updatedWallet = { ...prev };
        delete updatedWallet[label];
        return updatedWallet;
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-16 relative transition-theme">
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
          className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 
            text-gray-800 dark:text-white font-semibold px-8 py-3 rounded-xl 
            shadow-lg transition-colors"
        >
          View Wallet {Object.keys(wallet).length > 0 && `(${Object.keys(wallet).length})`}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wallet={wallet}
        onDelete={handleDeleteJson}
      />

      <button
        onClick={toggleDarkMode}
        className="fixed bottom-8 right-8 bg-gray-800 dark:bg-white text-white 
          dark:text-gray-800 p-3 rounded-full shadow-lg transition-transform 
          transform hover:scale-105"
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default App;