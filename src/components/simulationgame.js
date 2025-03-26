import React, { useEffect, useState } from 'react';
import "./simulationgame.css";
import API_URL from "../config"; // Import API_URL

const SimulationGame = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [simulationResults, setSimulationResults] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [remainingFunds, setRemainingFunds] = useState(10000);
  const [investments, setInvestments] = useState({});
  const [totalAppraisedValue, setTotalAppraisedValue] = useState(0);
  const [fullInvestmentValues, setFullInvestmentValues] = useState([]);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(`${API_URL}/api/simulationgame?target_year=2018`);
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

  const fetchSimulationResults = async () => {
    try {
      const response = await fetch(`${API_URL}/api/simulationgameresults?target_year=2017`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      const filteredResults = data.data.filter((result) =>
        selectedStocks.some((stock) => stock.ticker === result.ticker)
      );

      let totalAppraised = 0;
      const investmentValues = [];

      const updatedResults = filteredResults.map((result) => {
        const originalStock = selectedStocks.find((stock) => stock.ticker === result.ticker);
        const priceIncrease =
          originalStock && originalStock.average_price
            ? (result.average_price - originalStock.average_price) / originalStock.average_price
            : 0;

        const investment = investments[result.ticker] || 0;
        const appraisedInvestment = investment * (1 + priceIncrease);

        totalAppraised += appraisedInvestment;

        // Calculate 100% investment value for each stock
        const fullInvestmentValue = 10000 * (1 + priceIncrease);
        investmentValues.push(fullInvestmentValue);

        return {
          ...result,
          average_price_increase: `${(priceIncrease * 100).toFixed(2)}%`,
          appraised_investment: `$${appraisedInvestment.toFixed(2)}`,
        };
      });

      setSimulationResults(updatedResults);
      setTotalAppraisedValue(totalAppraised);
      setFullInvestmentValues(investmentValues);
      setResultsVisible(true);
    } catch (error) {
      console.error('Error fetching simulation results:', error);
    }
  };

  const pickRandomStocks = () => {
    if (stocks.length >= 3) {
      const shuffled = stocks.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      const sortedSelected = selected.sort((a, b) => a.ticker.localeCompare(b.ticker));
      setSelectedStocks(sortedSelected);
      setGameStarted(true);
      setInvestments({});
      setRemainingFunds(10000);
      setResultsVisible(false);
    }
  };

  const handleInvestmentChange = (ticker, value) => {
    if (value === "") {
      // If input is cleared, remove the investment entry
      const newInvestments = { ...investments };//esta es la parte que me soluciona que no le deja borrar el primer numero
      delete newInvestments[ticker];
  
      const totalInvested = Object.values(newInvestments).reduce((a, b) => a + Number(b || 0), 0);
  
      setInvestments(newInvestments);
      setRemainingFunds(10000 - totalInvested);
      return;
    }
  
    const amount = parseInt(value, 10);
    if (isNaN(amount) || amount < 0) return;
  
    const newInvestments = { ...investments, [ticker]: amount };
    const totalInvested = Object.values(newInvestments).reduce((a, b) => a + Number(b || 0), 0);
  
    if (totalInvested > 10000) return;
  
    setInvestments(newInvestments);
    setRemainingFunds(10000 - totalInvested);
  };

const percentageFields = ['cagr_revenue', 'capex_to_net_income','mean_gross_profit_margin','mean_net_profit_margin','rnd_gross_profit_margin','roa','roe','roic','sga_gross_profit_margin']; // Fields to display as percentages
const excludedFields = ['ticker', 'company_name']; // Fields to exclude

const formatCellValue = (value, key) => {
  if (value === undefined) return "";
  if (percentageFields.includes(key)) {
      // Format as a percentage
      const percentage = (parseFloat(value) * 100).toFixed(2); // Multiply by 100 if needed
      return `${percentage}%`;
  }
  if (!isNaN(parseFloat(value)) && isFinite(value) && !Number.isInteger(parseFloat(value))) {
      // Format numeric values to 2 decimal places
      return parseFloat(value).toFixed(2);
  }
  return value; // Return non-numeric values as is
};

useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="simulation-game-container">
      <h1>Simulation Game</h1>
      <p>
        This is simulation scenario, The year 2018 is about to start, You will be given <strong>$10,000</strong> to manage with 3 randomly selected stocks. Allocate your investments wisely!
      </p>
      {!gameStarted && (
        <button className="play-game-button" onClick={pickRandomStocks}>
          Play Game
        </button>
      )}

      {gameStarted && (
        <div className="simulation-game-starts">
          <h2>Remaining Funds: ${remainingFunds.toLocaleString()}</h2>
          <div className="simulation-game-cards-container">
            {selectedStocks.map((stock, index) => (
              <div className="simulation-game-stock-card" key={index}>
                <h4>{stock.company_name}</h4>
                <div className="invest-input-container">
                  <label>
                    INVEST: $
                    <input // tengo que mejorar como se escriben los nros ver como lo resolvi en el stock screener
                      className="invest-input"
                      type="number"
                      value={investments[stock.ticker] || ''}
                      onChange={(e) => handleInvestmentChange(stock.ticker, e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  {Object.entries(stock)
                    .filter(([key]) => !excludedFields.includes(key)) // Exclude certain fields
                    .sort(([keyA], [keyB]) => {
                      if (keyA === 'average_price') return -1; // Put 'average_price' first
                      if (keyB === 'average_price') return 1;
                      return keyA.localeCompare(keyB); // Sort the rest alphabetically
                    })
                    .map(([key, value]) => (
                      <p key={key}>
                        <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {formatCellValue(value, key)}
                      </p>
                    ))}
                </div>                            
              </div>
            ))}
          </div>          
          <button className="see-results-button" onClick={fetchSimulationResults}>
            See Results
          </button>
        </div>
      )}

{resultsVisible && (
        <div className="simulation-results-container">
          <h3>Simulation Results</h3>
          <p>
          {(() => {
        // Create a mapping of tickers to their respective investment values
        const investmentMapping = selectedStocks.reduce((acc, stock, index) => {
          acc[stock.ticker] = fullInvestmentValues[index];
          return acc;
        }, {});

     
        const sortedStocks = selectedStocks.slice().sort((a, b) =>
          a.company_name.localeCompare(b.company_name)
        );

        return (
          <>
          You have invested wisely. From the $10,000 initially invested, you now have <strong>${totalAppraisedValue.toFixed(2)}</strong>. after 7 years <br />
          {sortedStocks.map((stock, idx) => (
              <span key={idx}>
                If you had invested 100% in {stock.company_name}: 
                <strong>${investmentMapping[stock.ticker]?.toFixed(2)}</strong>
                {idx < sortedStocks.length - 1 && ', '}
              </span>
            ))}
          </>
        );
      })()}
          </p>
          <div className="simulation-game-cards-container">
            {simulationResults.map((result, index) => (
              <div className="simulation-game-stock-card-results" key={index}
              >
                <h4>{result.company_name}</h4>
                <div>
                {console.log('Result object:', result)}
                  {Object.entries(result)
                    .filter(([key]) => !excludedFields.includes(key)) // Exclude certain fields
                    .sort(([keyA], [keyB]) => {
                      const order = ['average_price', 'appraised_investment', 'average_price_increase'];
                      const indexA = order.indexOf(keyA);
                      const indexB = order.indexOf(keyB);

                      if (indexA !== -1 && indexB !== -1) return indexA - indexB; // If both keys are in the order array
                      if (indexA !== -1) return -1; // If only keyA is in the order array, it goes first
                      if (indexB !== -1) return 1; // If only keyB is in the order array, it goes first

                      return keyA.localeCompare(keyB); // Sort the rest alphabetically
                    })
                    .map(([key, value]) => (
                      <p key={key}>
                        <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {formatCellValue(value, key)}
                      </p>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <button className="play-again-button" onClick={pickRandomStocks}>
              Play Again
            </button>
          </div>
        </div>
      )}
       {/* Default Play Again Button (if results are not visible) */}
      {!resultsVisible && (
      <div>
        <button className="play-again-button" onClick={pickRandomStocks}>
            Play Again
          </button>
      </div>
      )}
    </div>
  );
};

export default SimulationGame;
