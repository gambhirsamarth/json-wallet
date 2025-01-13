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

  const JsonViewer = ({ content }) => {
    try {
      // Parse and re-stringify the JSON with proper indentation
      const formattedJson = JSON.stringify(JSON.parse(content), null, 2);
      const lines = formattedJson.split('\n');

      return (
        <div className="bg-gray-900 p-4 rounded-lg my-1">
          <div className="flex">
            {/* Line numbers */}
            <div className="pr-4 select-none border-r border-gray-700 text-gray-500">
              {lines.map((_, i) => (
                <div key={i} className="text-right font-mono text-sm leading-6">
                  {i + 1}
                </div>
              ))}
            </div>
            {/* Code content */}
            <pre className="pl-4 flex-1 overflow-x-auto font-mono text-sm">
              <code>
                {lines.map((line, i) => {
                  // Match the different parts of each line
                  const keyMatch = line.match(/^(\s*)"(.+)":/);
                  const valueMatch = line.match(/:\s*"([^"]+)"/);
                  const numberMatch = line.match(/:\s*(-?\d+\.?\d*)/);
                  const booleanMatch = line.match(/:\s*(true|false|null)(,?)$/);
                  let formattedLine = line;

                  if (keyMatch) {
                    formattedLine = formattedLine.replace(
                      /"(.+)":/,
                      '<span class="text-purple-400">"$1"</span>:'
                    );
                  }
                  if (valueMatch) {
                    formattedLine = formattedLine.replace(
                      /:\s*"([^"]+)"/,
                      ': <span class="text-green-400">"$1"</span>'
                    );
                  }
                  if (numberMatch) {
                    formattedLine = formattedLine.replace(
                      /(-?\d+\.?\d*)/,
                      '<span class="text-yellow-400">$1</span>'
                    );
                  }
                  if (booleanMatch) {
                    formattedLine = formattedLine.replace(
                      /(true|false|null)/,
                      '<span class="text-blue-400">$1</span>'
                    );
                  }

                  return (
                    <div
                      key={i}
                      className="leading-6 hover:bg-gray-800"
                      dangerouslySetInnerHTML={{ __html: formattedLine }}
                    />
                  );
                })}
              </code>
            </pre>
          </div>
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

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
        w-full max-w-2xl min-h-[80vh] bg-white dark:bg-gray-900 rounded-2xl 
        shadow-xl p-6 z-50 flex flex-col transition-colors">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-500 dark:text-gray-400 
            hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-white text-center mt-4 mb-8">
          Your JSON Wallet
        </h2>

        {Object.keys(wallet).length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Your wallet is empty. Add some JSONs to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto px-4">
            {Object.keys(wallet).map((label) => (
              <div key={label} className="rounded-lg">
                <div className="flex items-center justify-between px-4 py-3 
                  bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <button
                    onClick={() => handleJsonClick(label)}
                    className="font-medium text-purple-700 dark:text-purple-400 
                      hover:text-purple-900 dark:hover:text-purple-300 
                      transition-colors flex-1 text-left"
                  >
                    {label}
                  </button>
                  <div className="flex items-center gap-2">
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