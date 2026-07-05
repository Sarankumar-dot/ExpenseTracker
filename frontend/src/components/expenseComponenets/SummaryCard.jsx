import React from 'react';

const SummaryCard = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>

      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
};

export default SummaryCard;
