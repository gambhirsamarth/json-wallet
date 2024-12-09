import React, { useState, useEffect } from "react";
import { Save, AlignJustify } from "lucide-react"; // Using appropriate icons

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
        setIsValidJson(true); // Allow empty JSON as valid initially
      }
    } catch {
      setIsValidJson(false);
    }
  }, [json]);

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

  const formatJson = () => {
    try {
      const parsedJson = JSON.parse(json);
      const formatted = JSON.stringify(parsedJson, null, 2); // Format the JSON with indentation
      setFormattedJson(formatted);
      setJson(formatted); // Update the textarea with the formatted JSON
    } catch (err) {
      setIsValidJson(false); // Invalid JSON, don't format
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-gray-800">
      <h2 className="text-3xl font-semibold mb-6 text-center">Add JSON</h2>
      <div className="space-y-4">
        {/* Label Input */}
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-300 text-center"
          placeholder="Enter a label for your JSON"
        />

        {/* JSON Textarea */}
        <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          className={`w-full h-32 p-3 rounded-lg border ${json === "" ? "border-gray-300" : isValidJson ? "border-teal-500" : "border-red-500"} focus:outline-none focus:ring-2 ${isValidJson ? 'focus:ring-teal-300' : 'focus:ring-red-500'} resize-none transition-all duration-300 ease-in-out`}
          placeholder="Paste your JSON here..."
        ></textarea>

        {/* Buttons */}
        <div className="flex gap-4 mt-4 justify-center">
          {/* Save JSON Button */}
          <button
            onClick={handleSubmit}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Save JSON"
          >
            <Save className="w-5 h-5 text-blue-600" />
          </button>

          {/* Format JSON Button */}
          <button
            onClick={formatJson} // Format JSON functionality
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            title="Format JSON"
          >
            <AlignJustify className="w-5 h-5 text-purple-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJsonForm;
