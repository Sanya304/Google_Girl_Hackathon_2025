"use client";
import { useState } from "react";

const PredictiveTaxPlanning = () => {
  const [formData, setFormData] = useState({
    income: "",
    age: "",
    hra: "",
    investments: "",
    insurance: "",
    educationLoan: "",
    donations: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const income = parseFloat(formData.income) || 0;
      const hra = parseFloat(formData.hra) || 0;
      const investments = parseFloat(formData.investments) || 0;
      const insurance = parseFloat(formData.insurance) || 0;
      const educationLoan = parseFloat(formData.educationLoan) || 0;
      const donations = parseFloat(formData.donations) || 0;

      // ✅ Standard Deduction (Flat ₹50,000 for salaried individuals)
      const standardDeduction = 50000;

      // ✅ HRA Exemption (Assuming 40% of basic salary)
      const hraExemption = Math.min(hra, income * 0.4);

      // ✅ Section 80C (Max ₹1.5L)
      const deduction80C = Math.min(investments, 150000);

      // ✅ Section 80D (Health Insurance) (Max ₹25,000 for individuals)
      const deduction80D = Math.min(insurance, 25000);

      // ✅ Section 80E (Education Loan) (Unlimited, assuming full claim)
      const deduction80E = educationLoan;

      // ✅ Section 80G (Donations) (Assuming 50% deduction)
      const deduction80G = donations * 0.5;

      // **Calculate Old Taxable Income**
      let taxableIncomeOld =
        income -
        (standardDeduction +
          hraExemption +
          deduction80C +
          deduction80D +
          deduction80E +
          deduction80G);
      taxableIncomeOld = Math.max(taxableIncomeOld, 0);

      // **Calculate New Taxable Income** (No deductions in New Regime)
      let taxableIncomeNew = income - standardDeduction;
      taxableIncomeNew = Math.max(taxableIncomeNew, 0);

      // **Tax Calculation for Old Regime**
      let taxOld = 0;
      if (taxableIncomeOld > 250000) {
        if (taxableIncomeOld <= 500000)
          taxOld = (taxableIncomeOld - 250000) * 0.05;
        else if (taxableIncomeOld <= 1000000)
          taxOld = 12500 + (taxableIncomeOld - 500000) * 0.2;
        else taxOld = 112500 + (taxableIncomeOld - 1000000) * 0.3;
      }

      // **Tax Calculation for New Regime**
      let taxNew = 0;
      if (taxableIncomeNew > 250000) {
        if (taxableIncomeNew <= 500000)
          taxNew = (taxableIncomeNew - 250000) * 0.05;
        else if (taxableIncomeNew <= 1000000)
          taxNew = 12500 + (taxableIncomeNew - 500000) * 0.2;
        else taxNew = 112500 + (taxableIncomeNew - 1000000) * 0.3;
      }

      // **Choose Best Option**
      const bestOption =
        taxOld < taxNew
          ? "Old Regime (With Deductions)"
          : "New Regime (Without Deductions)";
      const taxSavings = Math.abs(taxOld - taxNew);

      setPrediction({
        oldRegimeTax: taxOld.toFixed(2),
        newRegimeTax: taxNew.toFixed(2),
        bestOption,
        taxSavings,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">
        AI-Powered Predictive Tax Planning
      </h1>
      <p className="text-gray-400 text-center mb-6">
        Compare tax regimes and maximize your tax savings.
      </p>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        {prediction ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-400">
              Best Option: {prediction.bestOption}
            </h2>
            <p className="text-lg mt-2">
              Old Regime Tax: ₹{prediction.oldRegimeTax}
            </p>
            <p className="text-lg">
              New Regime Tax: ₹{prediction.newRegimeTax}
            </p>
            <p className="text-lg text-yellow-400 mt-2">
              You can save ₹{prediction.taxSavings} by choosing the best regime.
            </p>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
              onClick={() => setPrediction(null)}
            >
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="income"
              placeholder="Annual Income (₹)"
              value={formData.income}
              onChange={handleChange}
              className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
              required
            />
            <input
              type="number"
              name="hra"
              placeholder="HRA Received (₹)"
              value={formData.hra}
              onChange={handleChange}
              className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="number"
              name="investments"
              placeholder="Total 80C Investments (₹)"
              value={formData.investments}
              onChange={handleChange}
              className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="number"
              name="insurance"
              placeholder="Health Insurance Premium (₹)"
              value={formData.insurance}
              onChange={handleChange}
              className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="number"
              name="educationLoan"
              placeholder="Education Loan Interest (₹)"
              value={formData.educationLoan}
              onChange={handleChange}
              className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
            <input
              type="number"
              name="donations"
              placeholder="Donations (₹)"
              value={formData.donations}
              onChange={handleChange}
              className="w-full p-3 mb-3 bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? "Analyzing..." : "Get AI Tax Plan"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PredictiveTaxPlanning;
