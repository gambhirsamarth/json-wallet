import React, { useState } from "react";
import { Copy, Trash2, Check } from "lucide-react";

const Modal = ({ isOpen, onClose, wallet, onDelete }) => {
  const [selectedJson, setSelectedJson] = useState(null);
  const [copiedLabel, setCopiedLabel] = useState(null);

  if (!isOpen) return null;

  const handleJsonClick = (label) => {
    setSelectedJson(selectedJson === label ? null : label);
  };

  const handleCopy = async (label) => {
    try {
      await navigator.clipboard.writeText(wallet[label]);
      setCopiedLabel(label);
      setTimeout(() => setCopiedLabel(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl min-h-[80vh] bg-white rounded-2xl shadow-xl p-6 z-50 flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mt-4 mb-8">
          Your JSON Wallet
        </h2>

        {Object.keys(wallet).length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Your wallet is empty. Add some JSONs to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-4">
            {Object.keys(wallet).map((label) => (
              <div key={label} className="border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-t-lg">
                  <button
                    onClick={() => handleJsonClick(label)}
                    className="font-medium text-purple-700 hover:text-purple-900 transition-colors flex-1 text-left"
                  >
                    {label}
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(label)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Copy JSON"
                    >
                      {copiedLabel === label ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(label)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                      title="Delete JSON"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                {selectedJson === label && (
                  <pre className="bg-gray-100 p-4 overflow-x-auto text-sm border-t">
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
