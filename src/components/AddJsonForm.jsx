import React, { useState, useEffect } from "react";
import { Save, AlignJustify } from "lucide-react";

const AddJsonForm = ({ onAdd }) => {
  const [label, setLabel] = useState("");
  const [json, setJson] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [isValidJson, setIsValidJson] = useState(true);

  useEffect(() => {
    try {
      if (json) {
        JSON.parse(json);
        setIsValidJson(true);
      } else {
        setIsValidJson(true);
      }
    } catch {
      setIsValidJson(false);
    }
  }, [json]);

  const handleSubmit = () => {
    if (!label || !json || !isValidJson) return;
    onAdd(label, json);
    setLabel("");
    setJson("");
  };

  const formatJson = () => {
    try {
      const parsedJson = JSON.parse(json);
      const formatted = JSON.stringify(parsedJson, null, 2);
      setFormattedJson(formatted);
      setJson(formatted);
    } catch (err) {
      setIsValidJson(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-gray-800 dark:text-gray-200 transition-colors">
      <h2 className="text-3xl font-extrabold tracking-wide mb-6 text-center text-black dark:text-white">
        Add JSON
      </h2>

      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 
              dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
              focus:ring-purple-300 dark:focus:ring-purple-500 text-center 
              transition-colors"
            placeholder="Enter a label for your JSON"
          />
          {!label && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">Label is required</p>
          )}
        </div>

        <div>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className={`w-full h-32 p-3 rounded-lg border transition-colors
              ${json === "" ? "border-gray-300 dark:border-gray-600" 
                : isValidJson ? "border-purple-500" 
                : "border-red-500"} 
              dark:bg-gray-700 dark:text-white
              focus:outline-none focus:ring-2 
              ${isValidJson ? "focus:ring-purple-300 dark:focus:ring-purple-500" 
                : "focus:ring-red-500"}
              resize-none`}
            placeholder="Paste your JSON here..."
          ></textarea>
          {json && !isValidJson && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              Invalid JSON format
            </p>
          )}
        </div>

        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={handleSubmit}
            disabled={!label || !json || !isValidJson}
            className={`p-2 rounded-lg transition-colors ${
              !label || !json || !isValidJson
                ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                : "hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            title="Save JSON"
          >
            <Save
              className={`w-5 h-5 ${
                !label || !json || !isValidJson
                  ? "text-gray-500 dark:text-gray-400"
                  : "text-purple-600 dark:text-purple-400"
              }`}
            />
          </button>

          <button
            onClick={formatJson}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 
              rounded-lg transition-colors"
            title="Format JSON"
          >
            <AlignJustify className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJsonForm;