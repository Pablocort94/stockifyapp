import React, { useEffect, useState } from 'react';

const SimulationGame = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [simulationResults, setSimulationResults] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [remainingFunds, setRemainingFunds] = useState(10000);
  const [investments, setInvestments] = useState({});

  // Fetch data from the main API
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/simulationgame?target_year=2018');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStocks(data.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStocks();
  }, []);

  // Fetch data for simulation results
  const fetchSimulationResults = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/simulationgameresults?target_year=2017');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Filter results to include only the selected stocks
      const filteredResults = data.data.filter((result) =>
        selectedStocks.some((stock) => stock.ticker === result.ticker)
      );

      // Add average_price_increase field to each stock
      const updatedResults = filteredResults.map((result) => {
        const originalStock = selectedStocks.find((stock) => stock.ticker === result.ticker);
        const priceIncrease =
          originalStock && originalStock.average_price
            ? ((result.averageprice - originalStock.average_price) / originalStock.average_price) * 100
            : null;

        const investment = investments[result.ticker] || 0;
        const appraisedInvestment =
          priceIncrease !== null
            ? investment * (1 + priceIncrease / 100)
            : investment;

        return {
          ...result,
          average_price_increase: priceIncrease ? `${priceIncrease.toFixed(2)}%` : 'N/A',
          appraised_investment: appraisedInvestment ? `$${appraisedInvestment.toFixed(2)}` : 'N/A',
        };
      });

      setSimulationResults(updatedResults);
      setResultsVisible(true);
    } catch (error) {
      console.error('Error fetching simulation results:', error);
    }
  };

  // Pick 3 random stocks from the fetched data
  const pickRandomStocks = () => {
    if (stocks.length >= 3) {
      const shuffled = stocks.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setSelectedStocks(selected);
      setGameStarted(true);
      setInvestments({});
      setRemainingFunds(10000);
      setResultsVisible(false);
    }
  };

  const handleInvestmentChange = (ticker, value) => {
    const amount = parseInt(value, 10);

    // Validation for integers and non-negative values
    if (isNaN(amount) || amount < 0) return;

    const newInvestments = { ...investments, [ticker]: amount };
    const totalInvested = Object.values(newInvestments).reduce((a, b) => a + b, 0);

    // Check if total investment exceeds $10,000
    if (totalInvested > 10000) return;

    setInvestments(newInvestments);
    setRemainingFunds(10000 - totalInvested);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Simulation Game</h2>
      <p>
        You will be given <strong>$10,000</strong> to manage with 3 randomly selected stocks. Allocate your investments wisely!
      </p>
      {!gameStarted && (
        <button
          onClick={pickRandomStocks}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          Play Game
        </button>
      )}

      {gameStarted && (
        <div>
          <h3>Remaining Funds: ${remainingFunds.toLocaleString()}</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            {selectedStocks.map((stock, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  width: '30%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <h4 style={{ textAlign: 'center' }}>{stock.company_name}</h4>
                <div>
                  {Object.entries(stock).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                    </p>
                  ))}
                </div>
                <div>
                  <label>
                    Invest: $
                    <input
                      type="number"
                      value={investments[stock.ticker] || ''}
                      onChange={(e) => handleInvestmentChange(stock.ticker, e.target.value)}
                      style={{ width: '100px', marginLeft: '10px' }}
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={pickRandomStocks}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginTop: '20px',
            }}
          >
            Play Again
          </button>

          <button
            onClick={fetchSimulationResults}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#FF5722',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              marginTop: '20px',
              marginLeft: '10px',
            }}
          >
            See Results
          </button>
        </div>
      )}

      {resultsVisible && (
        <div>
          <h3>Simulation Results</h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
            {simulationResults.map((result, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  padding: '16px',
                  width: '30%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
              >
                <h4 style={{ textAlign: 'center' }}>{result.company_name}</h4>
                <div>
                  {Object.entries(result).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key.replace(/_/g, ' ')}:</strong> {value}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button
              onClick={pickRandomStocks}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px',
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
       {/* Default Play Again Button (if results are not visible) */}
      {!resultsVisible && (
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
              onClick={pickRandomStocks}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                cursor: 'pointer',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                marginTop: '20px',
              }}
              >
              Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SimulationGame;
