import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, wallet }) => {
  const [selectedJson, setSelectedJson] = useState(null);

  if (!isOpen) return null;

  const handleJsonClick = (label) => {
    setSelectedJson(selectedJson === label ? null : label);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl min-h-[80vh] bg-white rounded-2xl shadow-xl p-6 z-50">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mt-4 mb-8">Your JSON Wallet</h2>

        {Object.keys(wallet).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your wallet is empty. Add some JSONs to get started!</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-4">
            {Object.keys(wallet).map((label) => (
              <div key={label} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => handleJsonClick(label)}
                  className="w-full text-left px-4 py-3 font-medium text-purple-700 hover:bg-purple-50 transition-colors"
                >
                  {label}
                </button>
                {selectedJson === label && (
                  <pre className="bg-gray-100 p-4 overflow-x-auto text-sm">
                    {JSON.stringify(JSON.parse(wallet[label]), null, 2)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;