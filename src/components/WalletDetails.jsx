import React from "react";

const WalletDetails = ({ selectedLabel, wallet }) => {
  if (!selectedLabel) return null;

  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
      <p className="text-lg font-bold text-gray-700">
        Label: <span className="text-purple-600">{selectedLabel}</span>
      </p>
      <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-auto mt-4">
        {wallet[selectedLabel]}
      </pre>
    </div>
  );
};

export default WalletDetails;
