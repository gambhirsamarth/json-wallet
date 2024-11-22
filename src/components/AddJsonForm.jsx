import React, { useState, useEffect } from "react";

const AddJsonForm = ({ onAdd }) => {
  const [label, setLabel] = useState("");
  const [json, setJson] = useState("");
  const [isValidJson, setIsValidJson] = useState(true);

  useEffect(() => {
    try {
      if (json) {
        JSON.parse(json);
        setIsValidJson(true);
      } else {
        setIsValidJson(true); // Allow empty JSON as valid initially
      }
    } catch {
      setIsValidJson(false);
    }
  }, [json]); // Validate JSON on every change

  const handleSubmit = () => {
    if (!label || !json) {
      alert("Both label and JSON are required!");
      return;
    }

    if (!isValidJson) {
      alert("Invalid JSON format!");
      return;
    }

    onAdd(label, json);
    setLabel("");
    setJson("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-gray-800">
      <h2 className="text-3xl font-semibold mb-6">Add JSON</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300"
          placeholder="Enter a label for your JSON"
        />
        <textarea
  value={json}
  onChange={(e) => setJson(e.target.value)}
  className={`w-full h-32 p-3 rounded-lg border ${json === "" ? "border-gray-300" : isValidJson ? "border-teal-500" : "border-red-500"} focus:outline-none focus:ring-2 ${isValidJson ? 'focus:ring-teal-300' : 'focus:ring-red-500'} resize-none transition-all duration-300 ease-in-out`}
  placeholder="Paste your JSON here..."
></textarea>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddJsonForm;
