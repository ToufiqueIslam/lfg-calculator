import React, { useState } from 'react';
import './App.css';

function LFGCalculator() {
  const [binaryBalance, setBinaryBalance] = useState('');
  const [signalRatio, setSignalRatio] = useState('');
  const [isSunday, setIsSunday] = useState(false);

  const handleBinaryChange = (e) => {
    setBinaryBalance(e.target.value);
  };

  const handleSignalChange = (value) => {
    setSignalRatio(value);
  };

  const handleSundayChange = (value) => {
    setIsSunday(value);
  };

  const calculateResults = () => {
    const signalRate = signalRatio ? signalRatio / 100 : 0; // Convert percentage to decimal
    const balance = binaryBalance ? Number(binaryBalance) : 0;
    let position = balance * signalRate;
    if (signalRatio==7 && position>4000) position=4000; 
    if (signalRatio==8 && position>4500) position=4500; 
    if (signalRatio==9 && position>5000) position=5000; 
    if (signalRatio==10 && position>8000) position=8000; 
    if (signalRatio==11 && position>12000) position=12000; 
    if (signalRatio==12 && position>20000) position=20000; 
    const profit = isSunday ? 0 : position * 0.75;
    const settlement = isSunday ? 0 : position + profit;
    const loss = isSunday ? position : 0;

    return { position, profit, settlement, loss };
  };

  const { position, profit, settlement, loss } = calculateResults();

  return (
    <div className="calculator">
      <h1>LFG CALCULATOR</h1>

      <div className="input-section">
        <label>
          BINARY BALANCE:
          <input
            type="number"
            style={{ width: "80%" }}
            value={binaryBalance}
            onChange={handleBinaryChange}
          />
        </label>

        <label>SIGNAL RATIO:</label>
        <div className="signal-ratio-buttons">
          {[7, 8, 9, 10, 11, 12].map((value) => (
            <button
              key={value}
              type="button"
              className={`signal-button ${signalRatio === value ? 'selected' : ''}`}
              onClick={() => handleSignalChange(value)}
            >
              {value}%
            </button>
          ))}
        </div>

        <div className="sunday-section">
          <label>IS IT SUNDAY?</label>
          <div
          className="yes-no-button">
            <button
              type="button"
              className={`yes-button ${isSunday ? 'selected' : ''}`}
              onClick={() => handleSundayChange(true)}
            >
              YES
            </button>
            <button
              type="button"
              className={`no-button ${!isSunday ? 'selected' : ''}`}
              onClick={() => handleSundayChange(false)}
            >
              NO
            </button>
          </div>
        </div>
      </div>

      <div className="results-section">
        <h2>RESULTS</h2>
        <p>POSITION: {position.toFixed(2)}</p>
        {isSunday ? <p>LOSS: {loss.toFixed(2)}</p> : <p>PROFIT: {profit.toFixed(2)}</p>}
        <p>SETTLEMENT: {settlement.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default LFGCalculator;
