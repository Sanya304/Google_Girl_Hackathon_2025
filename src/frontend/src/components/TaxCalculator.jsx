"use client"; // Required for state and event handling in Next.js

import { useState } from "react";

const TaxCalculator = () => {
  const [income, setIncome] = useState("");
  const [homeLoanInterest, setHomeLoanInterest] = useState("");
  const [homeLoanPrincipal, setHomeLoanPrincipal] = useState("");
  const [isFirstTimeHomeBuyer, setIsFirstTimeHomeBuyer] = useState(false);
  const [carLoanInterest, setCarLoanInterest] = useState("");
  const [isElectricCar, setIsElectricCar] = useState(false);
  const [tax, setTax] = useState(null);

  // Function to calculate tax with deductions
  const calculateTax = (income, homeInterest, homePrincipal, carInterest) => {
    let taxableIncome = parseFloat(income) || 0;
    homeInterest = parseFloat(homeInterest) || 0;
    homePrincipal = parseFloat(homePrincipal) || 0;
    carInterest = parseFloat(carInterest) || 0;

    // 🏡 **House Loan Deductions**
    taxableIncome -= Math.min(homePrincipal, 150000); // Section 80C (Max ₹1.5L)
    taxableIncome -= Math.min(homeInterest, 200000); // Section 24(b) (Max ₹2L)

    if (isFirstTimeHomeBuyer) {
      taxableIncome -= Math.min(homeInterest, 150000); // Section 80EEA (Extra ₹1.5L for first-time buyers)
    }

    // 🚗 **Car Loan Deductions (Only for Electric Cars)**
    if (isElectricCar) {
      taxableIncome -= Math.min(carInterest, 150000); // Section 80EEB (Max ₹1.5L for EV loans)
    }

    // **Calculate Tax on Adjusted Income**
    let taxAmount = 0;

    if (taxableIncome <= 250000) {
      taxAmount = 0; // No tax for income up to ₹2.5L
    } else if (taxableIncome <= 500000) {
      taxAmount = (taxableIncome - 250000) * 0.05; // 5% tax
    } else if (taxableIncome <= 1000000) {
      taxAmount = 12500 + (taxableIncome - 500000) * 0.2; // 20% tax
    } else {
      taxAmount = 112500 + (taxableIncome - 1000000) * 0.3; // 30% tax
    }

    return taxAmount;
  };

  const handleCalculate = () => {
    const calculatedTax = calculateTax(
      income,
      homeLoanInterest,
      homeLoanPrincipal,
      carLoanInterest
    );
    setTax(calculatedTax);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">Advanced Tax Calculator</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Income Input */}
        <label className="block mb-2 text-lg">Enter Your Income (₹):</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter income..."
        />

        {/* 🏡 House Loan Inputs */}
        <h2 className="text-xl font-semibold mt-4">Home Loan Deductions</h2>
        <label className="block mt-2">Home Loan Principal Paid (₹):</label>
        <input
          type="number"
          value={homeLoanPrincipal}
          onChange={(e) => setHomeLoanPrincipal(e.target.value)}
          className="w-full p-2 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Max ₹1,50,000 under 80C"
        />

        <label className="block">Home Loan Interest Paid (₹):</label>
        <input
          type="number"
          value={homeLoanInterest}
          onChange={(e) => setHomeLoanInterest(e.target.value)}
          className="w-full p-2 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Max ₹2,00,000 under 24(b)"
        />

        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={isFirstTimeHomeBuyer}
            onChange={(e) => setIsFirstTimeHomeBuyer(e.target.checked)}
            className="mr-2"
          />
          First-time Home Buyer (Extra ₹1.5L Deduction under 80EEA)
        </label>

        {/* 🚗 Car Loan Inputs */}
        <h2 className="text-xl font-semibold mt-4">Car Loan Deductions</h2>
        <label className="block mt-2">Car Loan Interest Paid (₹):</label>
        <input
          type="number"
          value={carLoanInterest}
          onChange={(e) => setCarLoanInterest(e.target.value)}
          className="w-full p-2 mb-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Max ₹1,50,000 for EVs under 80EEB"
        />

        <label className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={isElectricCar}
            onChange={(e) => setIsElectricCar(e.target.checked)}
            className="mr-2"
          />
          Electric Vehicle Purchase (Eligible for 80EEB Deduction)
        </label>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded-lg transition duration-200"
        >
          Calculate Tax
        </button>

        {/* Tax Display */}
        {tax !== null && (
          <div className="mt-4 p-3 bg-gray-700 rounded-lg">
            <h2 className="text-lg font-semibold">
              Estimated Tax: ₹{tax.toFixed(2)}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxCalculator;
