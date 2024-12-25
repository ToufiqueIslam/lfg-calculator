import React, { useState } from 'react';
import './App.css';

function LFGCalculator() {
  const [binaryBalance, setBinaryBalance] = useState('');
  const [signalRatio, setSignalRatio] = useState(7);
  const [isSunday, setIsSunday] = useState(false);

  const handleBinaryChange = (e) => {
    setBinaryBalance(e.target.value);
  };

  const handleSignalChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 7 && value <= 12) {
      setSignalRatio(value);
    }
  };

  const handleSundayChange = (e) => {
    setIsSunday(e.target.checked);
  };

  const calculateResults = () => {
    const signalRate = signalRatio / 100; // Convert percentage to decimal
    const balance = binaryBalance ? Number(binaryBalance) : 0;
    const position = balance * signalRate;
    const profit = isSunday ? 0 : position * 0.75;
    const settlement = isSunday ? 0 : position + profit;
    const loss = isSunday ? position : 0;

    return { position, profit, settlement, loss };
  };

  const { position, profit, settlement, loss } = calculateResults();

  return (
    <div className="calculator">
      <h1>LFG Calculator</h1>

      <div className="input-section">
        <label>
          Binary Balance:
          <input
            type="number"
            value={binaryBalance}
            onChange={handleBinaryChange}
          />
        </label>

        <label>
          Signal Ratio (7-12):
          <input
            type="number"
            value={signalRatio}
            onChange={handleSignalChange}
            min="7"
            max="12"
          />
        </label>

        <label>
          Is Sunday:
          <input
            type="checkbox"
            checked={isSunday}
            onChange={handleSundayChange}
          />
        </label>
      </div>

      <div className="results-section">
        <h2>Results</h2>
        <p>Position: {position.toFixed(2)}</p>
        {isSunday ? <p>Loss: {loss.toFixed(2)}</p> : <p>Profit: {profit.toFixed(2)}</p>}
        <p>Settlement: {settlement.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default LFGCalculator;
