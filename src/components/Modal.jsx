import React, { useState } from "react";
import { Copy, Trash2, Check, ChevronDown, ChevronRight } from "lucide-react";

const Modal = ({ isOpen, onClose, wallet, onDelete }) => {
  const [selectedJson, setSelectedJson] = useState(null);
  const [copiedLabel, setCopiedLabel] = useState(null);
  const [collapsedSections, setCollapsedSections] = useState({});

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

  const toggleCollapse = (path) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderJson = (data, path = "") => {
    if (typeof data !== "object" || data === null) {
      return <span>{JSON.stringify(data)}</span>;
    }

    const isArray = Array.isArray(data);

    return (
      <div className="pl-4 border-l border-gray-200">
        {Object.keys(data).map((key, index) => {
          const itemPath = path ? `${path}.${key}` : key;
          const value = data[key];
          const isCollapsible = typeof value === "object" && value !== null;

          return (
            <div key={itemPath} className="mb-2">
              <div className="flex items-center gap-1">
                {isCollapsible && (
                  <button
                    onClick={() => toggleCollapse(itemPath)}
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                  >
                    {collapsedSections[itemPath] ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
                <span className="font-medium">{isArray ? `[${key}]` : `"${key}"`}:</span>
                {!isCollapsible && (
                  <span className="ml-2 text-gray-700">{JSON.stringify(value)}</span>
                )}
              </div>
              {isCollapsible && !collapsedSections[itemPath] && (
                <div className="pl-4">{renderJson(value, itemPath)}</div>
              )}
            </div>
          );
        })}
      </div>
    );
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
                  <div className="bg-gray-100 p-4 overflow-x-auto text-sm border-t">
                    {renderJson(JSON.parse(wallet[label]))}
                  </div>
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
