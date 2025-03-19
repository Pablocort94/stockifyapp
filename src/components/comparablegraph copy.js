import React, { useState, useEffect } from "react";
import GraphComponent from './graph.js';
import './comparablegraph.css';

const ComparableGraph = () => {
    const [fields, setFields] = useState([]); // Available fields for the dropdown
    const [selectedField, setSelectedField] = useState(''); // Currently selected field
    const [tickers, setTickers] = useState([]); // List of all available tickers
    const [selectedTickers, setSelectedTickers] = useState([]); // Selected tickers
    const [searchInput, setSearchInput] = useState(''); // Input for predictive search
    const [suggestions, setSuggestions] = useState([]); // Suggestions for predictive search
    const [graphData, setGraphData] = useState(null); // Data for the graph

    const fieldNameMapping = {
        mean_ebitda_revenue_margin_sector: "Mean EBITDA Revenue Margin (Sector)",
                change_in_cash_and_cash_equivalents:"Net Cash Flow"
    };

    // Fetch fields and tickers
    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/graph_fields")
            .then(response => response.json())
            .then(data => {
                const excludedFields = ["ticker","operating_income_sector"];
                const filteredFields = data.fields.filter(
                    field => !excludedFields.includes(field)
                );
                const remappedFields = filteredFields.map(
                    field =>  Object.keys(fieldNameMapping).find(key => fieldNameMapping[key] === field) || field
                );
                setFields(remappedFields);
            })
            .catch(error => console.error("Error fetching fields:", error));

        fetch("http://127.0.0.1:5000/api/comparable_graph_predictive_search")
            .then(response => response.json())
            .then(data => setTickers(data.data || []))
            .catch(error => console.error("Error fetching tickers:", error));
    }, []);

    // Filter suggestions based on input
    useEffect(() => {
        if (searchInput) {
            const filteredSuggestions = tickers
                .filter(ticker =>
                    ticker.symbol.toUpperCase().includes(searchInput.trim().toUpperCase()) ||
                    ticker.company_name.toUpperCase().includes(searchInput.trim().toUpperCase())
                )
                .slice(0, 5);
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchInput, tickers]);

    // Handle API search on button click

    const handleSearch = () => {
        // Check if more than 5 tickers are selected
        if (selectedTickers.length > 5) {
            alert("You can only select up to 5 tickers.");
            return; // Prevent the search from proceeding
        }
    
        // Check if a field and at least one ticker are selected
        if (selectedField && selectedTickers.length > 0) {
            console.log("Selected Field:", selectedField);
            console.log("Selected Tickers:", selectedTickers);
    
            fetch("http://127.0.0.1:5000/api/graph_data")
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    // Filter the data on the frontend
                    const filteredData = data.data
                        .filter(item => selectedTickers.includes(item.ticker)) // Include only selected tickers
                        .map(item => ({
                            ticker: item.ticker,
                            fiscal_date_ending: item.fiscal_date_ending, // Ensure this field is included
                            value: item[selectedField] || null, // Dynamically include the selected field
                        }));
    
                    console.log("Filtered Data:", filteredData);
                    setGraphData(filteredData); // Update the graph data
                })
                .catch(error => console.error("Error fetching graph data:", error));
        } else {
            alert("Please select a field and at least one ticker.");
        }
    };
    


    const handleFieldChange = (event) => {
        setSelectedField(event.target.value);
    };

    const handleTickerSelection = (ticker) => {
        if (!selectedTickers.includes(ticker.symbol)) {
            if (selectedTickers.length < 5) {
                setSelectedTickers([...selectedTickers, ticker.symbol]);
                setSearchInput(""); // Clear input
                setSuggestions([]); // Clear suggestions
            } else {
                alert("You can only select up to 5 tickers."); // Display an alert
            }
        }
    };

    const handleRemoveTicker = (tickerToRemove) => {
        setSelectedTickers(selectedTickers.filter(ticker => ticker !== tickerToRemove));
    };

//console.log("fields: ",fields)

    return (
        <div className="comparable-graph-container">
            <div className="select-field">
                <h1>Graph Data</h1>
                    {/* Field Dropdown */}
                    <select value={selectedField} onChange={handleFieldChange}>
                    <option value="">Select a field</option>
                        {fields.map((field, index) => (
                            <option key={index} value={field}>
                                {fieldNameMapping[field] || field} 
                            </option>
                        ))}
                    </select>

                    {/* Ticker Input with Suggestions */}
                    <div className="select-company">
                        <input
                            type="text"
                            placeholder="Search ticker or company"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        {suggestions.length > 0 && (
                                <ul className="suggestions-dropdown">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleTickerSelection(suggestion)}
                                            className="suggestion-item"
                                        >
                                            {suggestion.symbol} - {suggestion.company_name}
                                        </li>
                                    ))}
                                </ul>
                            
                        )}
                    </div>
                

                {/* Selected Ticker Display */}
                <div className="selected-tickers">
                    {selectedTickers.map((ticker, index) => (
                        <span key={index} className="ticker-tag">
                            {ticker}
                            <button 
                                onClick={() => handleRemoveTicker(ticker)} 
                                className="remove-ticker-btn"
                            >
                                ✖
                            </button>
                        </span>
                    ))}
                </div>
                

                {/* Search Button */}
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>

                {/* Chart Placeholder */}
                {graphData ? (
                    <div className="graph-container">                        
                        <pre> <GraphComponent data={graphData} /></pre>
                        {/* Replace with your chart component */}
                    </div>
                ) : (
                    <p style={{ textAlign: "center" }}>Select a field and add at least one ticker, then click "Search" to fetch the graph data.</p>
                )}

            </div>
        </div>
    );
};

export default ComparableGraph;