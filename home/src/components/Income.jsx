import React from "react";

const Income = () => {
  const incomeData = [
    { source: "Salary", amount: 5000 },
    { source: "Freelancing", amount: 2000 },
    { source: "Investments", amount: 1500 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Income</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">
        {incomeData.map((income, index) => (
          <div key={index} className="border-b py-2">{income.source} - ${income.amount}</div>
        ))}
      </div>
    </div>
  );
};

export default Income;
