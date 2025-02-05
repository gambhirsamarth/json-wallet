import React, { useState } from "react";
import { Copy, Trash2, Check, Search } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

const Modal = ({ isOpen, onClose, wallet, onDelete }) => {
  const [selectedJson, setSelectedJson] = useState(null);
  const [copiedLabel, setCopiedLabel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  const JsonViewer = ({ content }) => {
    try {
      const formattedJson = JSON.stringify(JSON.parse(content), null, 2);
      return (
        <div className="bg-gray-900 p-4 rounded-lg my-1 overflow-auto max-h-64">
          <SyntaxHighlighter
            language="json"
            style={nightOwl}
            showLineNumbers
            lineNumberStyle={{ color: "#999", fontSize: "0.75rem" }}
            customStyle={{
              backgroundColor: "transparent",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }}
          >
            {formattedJson}
          </SyntaxHighlighter>
        </div>
      );
    } catch (err) {
      return (
        <div className="bg-gray-900 p-4 rounded-lg my-1 text-red-400 font-mono text-sm">
          Invalid JSON
        </div>
      );
    }
  };

  // Filter JSONs based on search query
  const filteredWallet = Object.keys(wallet).filter((label) =>
    label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
        w-full max-w-2xl min-h-[80vh] bg-white dark:bg-gray-900 rounded-2xl 
        shadow-xl p-6 z-50 flex flex-col transition-colors"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 dark:text-gray-400 
            hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mt-4 mb-8">
          Your JSON Wallet
        </h2>

        {/* Search Bar */}
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center mb-4">
          <Search className="text-gray-500 dark:text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search JSONs..."
            className="w-full p-2 bg-transparent text-gray-900 dark:text-white focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Wallet Content */}
        {filteredWallet.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No JSONs found.
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-4">
            {filteredWallet.map((label) => (
              <div key={label} className="rounded-lg">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  {/* JSON Label */}
                  <button
                    onClick={() => handleJsonClick(label)}
                    className="font-medium text-purple-700 dark:text-purple-400 
                      hover:text-purple-900 dark:hover:text-purple-300 
                      transition-colors flex-1 text-left"
                  >
                    {label}
                  </button>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(label)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 
                        rounded-lg transition-colors"
                      title="Copy"
                    >
                      {copiedLabel === label ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => onDelete(label)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 
                        rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>

                {/* JSON Viewer */}
                {selectedJson === label && (
                  <JsonViewer content={wallet[label]} />
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
