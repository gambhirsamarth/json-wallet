import React from "react";

const WalletDetails = ({ selectedLabel, wallet }) => {
  if (!selectedLabel) return null;

  return (
    <div className="mt-6 bg-gray-100 p-6 rounded-xl shadow-inner">
      <p className="text-lg font-semibold text-gray-700">
        Label: <span className="text-purple-600">{selectedLabel}</span>
      </p>
      <pre className="bg-gray-800 text-white p-6 rounded-xl overflow-auto mt-4">
        {JSON.stringify(wallet[selectedLabel], null, 2)}
      </pre>
    </div>
  );
};

export default WalletDetails;
