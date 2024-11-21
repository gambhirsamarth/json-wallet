import React from "react";

const WalletList = ({ wallet, onSelect }) => {
  return (
    <div className="space-y-4">
      {Object.keys(wallet).map((label) => (
        <button
          key={label}
          onClick={() => onSelect(label)}
          className="block w-full text-left p-3 bg-purple-100 text-purple-800 font-bold rounded hover:bg-purple-200"
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default WalletList;
