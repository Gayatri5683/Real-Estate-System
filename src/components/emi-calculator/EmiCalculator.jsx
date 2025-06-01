import React, { useState } from 'react';

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(null);

  const calculateEmi = (e) => {
    e.preventDefault();
    if (!principal || !rate || !tenure) return;
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(tenure) * 12;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">EMI Calculator</h2>
      <form onSubmit={calculateEmi} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Principal Amount (₹)</label>
          <input type="number" className="w-full border px-3 py-2 rounded" value={principal} onChange={e => setPrincipal(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium mb-1">Annual Interest Rate (%)</label>
          <input type="number" step="0.01" className="w-full border px-3 py-2 rounded" value={rate} onChange={e => setRate(e.target.value)} required />
        </div>
        <div>
          <label className="block font-medium mb-1">Tenure (years)</label>
          <input type="number" className="w-full border px-3 py-2 rounded" value={tenure} onChange={e => setTenure(e.target.value)} required />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Calculate EMI</button>
      </form>
      {emi && (
        <div className="mt-6 text-center">
          <span className="text-lg font-semibold text-green-700">Monthly EMI: ₹{emi}</span>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;
