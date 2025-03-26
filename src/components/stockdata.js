import React, { useState, useRef, useEffect } from 'react';
import Table from './table';
import './stockdata.css';
import API_URL from "../config"; // Import API_URL

const StockData = () => {
  const [stockName, setStockName] = useState('');
  const [tableName, setTableName] = useState('income_statement');
  const [selectedTableName, setSelectedTableName] = useState('income_statement');
  const [data, setData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  const handleStockNameChange = (event) => {
    const value = event.target.value;
    setStockName(value);

    if (value) {
      fetch(`${API_URL}/api/search_stocks?query=${value}`)
        .then(response => response.json())
        .then(data => setSuggestions(data))
        .catch(error => console.error('Error fetching suggestions:', error));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setStockName(suggestion.symbol);
    setSuggestions([]);
  };

  //const handleTableNameChange = (event) => {
    //setTableName(event.target.value);// esto es lo que te hace que cambie la tabla cuando seleccionas el table name y no apretas search
  //  setSelectedTableName(event.target.value); // Only update selectedTableName here

  //};


  const handleSearchClick = () => {
    setTableName(selectedTableName); // Update selectedTableName only when Search is clicked
    const url = `${API_URL}/api/stocks/${stockName}/${selectedTableName}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data.data))//seteas para que vaya dentro del objeto data al path del json data seria el equivalente a decir $.data en nifi
      .catch(error => console.error('Error fetching data:', error));
      console.log(data);
  };

useEffect(() => {
        window.scrollTo(0, 0);
      }, []);


  return (
    <div className="stock-data-container">
      <h1>Financial Statements</h1>
      <div className="input-group">
        <label>
          Stock Name:
          <div className="search-bar-container">
            <input
              type="text"
              value={stockName}
              onChange={handleStockNameChange}
              placeholder="Enter stock name or ticker"
              ref={inputRef}
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map(suggestion => (
                  <li 
                    key={suggestion.symbol} 
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion.company_name} ({suggestion.symbol})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </label>
      </div>
      <div className="input-group">
        <label>
          Table Name:
          <select value={selectedTableName} onChange={(e) => setSelectedTableName(e.target.value)}>
            <option value="income_statement">Income Statement</option>
            <option value="balance_sheet">Balance Sheet</option>
            <option value="cash_flow">Cash Flow</option>
            <option value="keyfinancialindicators">Key Financial Indicators</option>
          </select>
        </label>
      </div>
      <button className="search-button" onClick={handleSearchClick}>Search</button>
      {data && (
        <div className="data-display">
          <Table data={data} tableName={tableName}/>
        </div>
      )}
    </div>
  );
};

export default StockData;
