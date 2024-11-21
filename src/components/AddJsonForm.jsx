import React, { useState } from "react";

const AddJsonForm = ({ onAdd }) => {
  const [label, setLabel] = useState("");
  const [json, setJson] = useState("");

  const handleSubmit = () => {
    if (!label || !json) {
      alert("Both label and JSON are required!");
      return;
    }

    try {
      JSON.parse(json); // Validate JSON
    } catch {
      alert("Invalid JSON format!");
      return;
    }

    onAdd(label, json);
    setLabel("");
    setJson("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-6 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">Add JSON</h2>
      <div className="space-y-4">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Enter a label for your JSON"
        />
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className="w-full h-32 p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Paste your JSON here..."
        ></textarea>
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:opacity-90"
        >
          Add to Wallet
        </button>
      </div>
    </div>
  );
};

export default AddJsonForm;
