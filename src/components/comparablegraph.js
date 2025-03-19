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
        net_profit_margin: "Net Profit Margin",
        sga_gross_profit_margin: "SG&A to Gross Profit Margin",
        rnd_gross_profit_margin: "R&D to Gross Profit Margin",
        depreciation_gross_profit_margin: "Depreciation to Gross Profit Margin",
        inteexp_operating_income_margin: "Interest Expense to Operating Income Margin",
        ebitda_revenue_margin: "EBITDA to Revenue Margin",
        cr_revenue_margin: "Cash Ratio to Revenue Margin",
        current_ratio: "Current Ratio",
        cash_to_current_liabilities_ratio: "Cash to Current Liabilities Ratio",
        roa: "Return on Assets (ROA)",
        longtermdebt_to_net_earnings: "Long-term Debt to Net Earnings",
        debt_to_shequity: "Debt to Shareholders' Equity",
        book_value_per_share: "Book Value Per Share",
        retained_earnings: "Retained Earnings",
        roe: "Return on Equity (ROE)",
        net_cash_flow: "Net Cash Flow",
        capex_to_net_income: "Capital Expenditures to Net Income",
        dso: "Days Sales Outstanding (DSO)",
        free_cash_flow: "Free Cash Flow",
        mean_accounts_receivables_turnover_ratio_sector: "Mean Accounts Receivables Turnover Ratio (Sector Average)",
        mean_quick_ratio_sector: "Mean Quick Ratio (Sector Average)",
        mean_debt_to_equity_ratio_sector: "Mean Debt to Equity Ratio (Sector Average)",
        mean_interest_coverage_ratio_sector: "Mean Interest Coverage Ratio (Sector Average)",
        mean_gross_profit_margin_sector: "Mean Gross Profit Margin (Sector Average)",
        gross_profit_sector: "Gross Profit (Sector Average)",
        operating_income_sector: "Operating Income (Sector Average)",
        free_cash_flow_margin: "Free Cash Flow Margin",
        nopat: "Net Operating Profit After Tax (NOPAT)",
        invested_capital: "Invested Capital",
        roic: "Return on Invested Capital (ROIC)",
        operating_profit_margin: "Operating Profit Margin",
        asset_turnover_ratio: "Asset Turnover Ratio",
        accounts_receivables_turnover_ratio: "Accounts Receivables Turnover Ratio",
        quick_ratio: "Quick Ratio",
        debt_to_equity_ratio: "Debt to Equity Ratio",
        interest_coverage_ratio: "Interest Coverage Ratio",
        cagr_revenue: "Compound Annual Growth Rate (CAGR) of Revenue",
        cagr_total_assets: "CAGR of Total Assets",
        cagr_total_liabilities: "CAGR of Total Liabilities",
        cagr_cost_of_revenue: "CAGR of Cost of Revenue",
        cagr_selling_general_and_administrative: "CAGR of Selling, General, and Administrative (SG&A) Expenses",
        cagr_research_and_development: "CAGR of Research and Development (R&D)",
        mean_net_profit_margin: "Mean Net Profit Margin",
        mean_sga_gross_profit_margin: "Mean SG&A to Gross Profit Margin",
        mean_rnd_gross_profit_margin: "Mean R&D to Gross Profit Margin",
        mean_depreciation_gross_profit_margin: "Mean Depreciation to Gross Profit Margin",
        mean_inteexp_operating_income_margin: "Mean Interest Expense to Operating Income Margin",
        mean_ebitda_revenue_margin: "Mean EBITDA to Revenue Margin",
        mean_cr_revenue_margin: "Mean Cash Ratio to Revenue Margin",
        mean_current_ratio: "Mean Current Ratio",
        mean_cash_to_current_liabilities_ratio: "Mean Cash to Current Liabilities Ratio",
        mean_roa: "Mean ROA",
        mean_longtermdebt_to_net_earnings: "Mean Long-term Debt to Net Earnings",
        mean_roe: "Mean ROE",
        mean_capex_to_net_income: "Mean Capital Expenditures to Net Income",
        mean_dso: "Mean DSO",
        mean_free_cash_flow_margin: "Mean Free Cash Flow Margin",
        mean_roic: "Mean ROIC",
        mean_operating_profit_margin: "Mean Operating Profit Margin",
        mean_asset_turnover_ratio: "Mean Asset Turnover Ratio",
        mean_accounts_receivables_turnover_ratio: "Mean Accounts Receivables Turnover Ratio",
        mean_quick_ratio: "Mean Quick Ratio",
        mean_debt_to_equity_ratio: "Mean Debt to Equity Ratio",
        mean_interest_coverage_ratio: "Mean Interest Coverage Ratio",
        mean_gross_profit_margin: "Mean Gross Profit Margin",
        cagr_gross_profit: "CAGR of Gross Profit",
        cagr_operating_income: "CAGR of Operating Income",
        cagr_revenue_sector: "CAGR of Revenue (Sector Average)",
        cagr_total_assets_sector: "CAGR of Total Assets (Sector Average)",
        cagr_total_liabilities_sector: "CAGR of Total Liabilities (Sector Average)",
        cagr_cost_of_revenue_sector: "CAGR of Cost of Revenue (Sector Average)",
        cagr_selling_general_and_administrative_sector: "CAGR of SG&A (Sector Average)",
        cagr_research_and_development_sector: "CAGR of R&D (Sector Average)",
        mean_net_profit_margin_sector: "Mean Net Profit Margin (Sector Average)",
        mean_sga_gross_profit_margin_sector: "Mean SG&A to Gross Profit Margin (Sector Average)",
        mean_rnd_gross_profit_margin_sector: "Mean R&D to Gross Profit Margin (Sector Average)",
        mean_depreciation_gross_profit_margin_sector: "Mean Depreciation to Gross Profit Margin (Sector Average)",
        mean_inteexp_operating_income_margin_sector: "Mean Interest Expense to Operating Income Margin (Sector Average)",
        gross_profit_margin: "Gross Profit Margin",
        mean_cr_revenue_margin_sector: "Mean Cash Ratio to Revenue Margin (Sector Average)",
        mean_current_ratio_sector: "Mean Current Ratio (Sector Average)",
        mean_cash_to_current_liabilities_ratio_sector: "Mean Cash to Current Liabilities Ratio (Sector Average)",
        mean_roa_sector: "Mean ROA (Sector Average)",
        mean_longtermdebt_to_net_earnings_sector: "Mean Long-term Debt to Net Earnings (Sector Average)",
        mean_roe_sector: "Mean ROE (Sector Average)",
        mean_capex_to_net_income_sector: "Mean Capital Expenditures to Net Income (Sector Average)",
        mean_dso_sector: "Mean DSO (Sector Average)",
        mean_free_cash_flow_margin_sector: "Mean Free Cash Flow Margin (Sector Average)",
        mean_roic_sector: "Mean ROIC (Sector Average)",
        mean_operating_profit_margin_sector: "Mean Operating Profit Margin (Sector Average)",
        mean_asset_turnover_ratio_sector: "Mean Asset Turnover Ratio (Sector Average)",
        fiscal_date_ending: "Fiscal Date Ending",
        ticker: "Ticker Symbol",
        sector: "Sector",
        industry: "Industry",
        company_name: "Company Name",
        exchange: "Exchange",
        description: "Company Description",
        total_revenue: "Total Revenue",
        cost_of_goods_and_services_sold: "Cost Of Goods Sold (COGS)",
        gross_profit: "Gross Profit",
        research_and_development: "Research And Development (R&D)",
        selling_general_and_administrative: "Selling And Administrative (S&G)",
        operating_income:"Operating Income",
        investment_income_net:"Investment Income Net",
        net_interest_income: "Interest Income Net",
        other_non_operating_income: "Other Non Operating Income",
        income_before_tax: "Income Before Tax",
        interest_expense: "Interest Expense",
        income_tax_expense: "Income Tax Expense",
        net_income: "Net Income",
        ebit: "EBIT",
        ebitda:"EBITDA",
        cash_and_short_term_investments:"Cash On Hand",
        current_net_receivables:"Current Receivables",
        inventory:"Inventory",
        other_current_assets:"Other Current Assets",
        total_current_assets:"Total Current Assets",
        property_plant_equipment:"Property, Plant & Equipment",
        long_term_investments:"Long Term Investments",
        intangible_assets: "Goodwill and Intangible Assets",
        other_non_current_assets:"Other Non Current Assets",
        total_non_current_assets:"Total Non Current Assets",
        total_assets:"Total Assets",
        current_accounts_payable:"Current Payable Accounts",
        current_debt:"Current Debt",
        other_current_liabilities:"Other Current Liabilities",
        total_current_liabilities:"Total Current Liabilities",
        long_term_debt:"Long Term Debt",
        other_non_current_liabilities:"Other Non Current Liabilities",
        total_non_current_liabilities:"Total Non Current Liabilities",
        total_liabilities:"Total Liabilities",
        common_stock:"Common Stock",
        retained_earnings:"Retained Earnings",
        total_share_holder_equity:"Total Share Holder Equity",
        profit_loss:"Net Income",
        depreciation_depletion_and_amortization:"Total Depreciation and Amortization",
        change_in_receivables:"Change In Receivables",
        change_in_inventory:"Change In Inventory",
        operating_cashflow:"Cash Flow From operating Activities",
        capital_expenditures:"Capital Expenditures (CAPEX)",
        cashflow_from_investment:"Cash Flow From Investing Activities",
        proceeds_from_repurchase_of_equity:"Total Equity Issued/Repurchased",
        dividend_payout_common_stock:"Dividend Payments From Common Stocks",
        cashflow_from_financing:"Cashflow From Financing Activities",
        change_in_cash_and_cash_equivalents:"Net Cash Flow"
    };

    // Fetch fields and tickers
    useEffect(() => {
        fetch("http://127.0.0.1:5000/api/graph_fields")
            .then(response => response.json())
            .then(data => {
                const excludedFields = ["ticker","operating_income_sector","mean_quick_ratio_sector","mean_ebitda_revenue_margin_sector","mean_accounts_receivables_turnover_ratio_sector","mean_debt_to_equity_ratio_sector","mean_interest_coverage_ratio_sector",
                    "gross_profit_sector","operating_income_sector","cagr_revenue_sector","cagr_total_assets_sector","cagr_total_liabilities_sector","cagr_cost_of_revenue_sector","cagr_selling_general_and_administrative_sector",
                    "cagr_research_and_development_sector","mean_net_profit_margin_sector","mean_sga_gross_profit_margin_sector","mean_rnd_gross_profit_margin_sector",
                    "mean_depreciation_gross_profit_margin_sector","mean_inteexp_operating_income_margin_sector","mean_cr_revenue_margin_sector","mean_current_ratio_sector",
                    "mean_cash_to_current_liabilities_ratio_sector","mean_roa_sector","mean_longtermdebt_to_net_earnings_sector","mean_roe_sector","mean_capex_to_net_income_sector","mean_dso_sector","mean_free_cash_flow_margin_sector",
                    "mean_roic_sector","mean_operating_profit_margin_sector","mean_asset_turnover_ratio_sector","mean_gross_profit_margin_sector","mean_accounts_receivables_turnover_ratio_sector","cagr_revenue","cagr_total_assets","cagr_total_liabilities",
                    "cagr_cost_of_revenue","cagr_selling_general_and_administrative","cagr_research_and_development","mean_net_profit_margin","mean_sga_gross_profit_margin","mean_rnd_gross_profit_margin","mean_depreciation_gross_profit_margin",
                    "mean_inteexp_operating_income_margin","mean_ebitda_revenue_margin","mean_cr_revenue_margin","mean_current_ratio_assets","mean_cash_to_current_liabilities_ratio","mean_roa","mean_longtermdebt_to_net_earnings","mean_roe","mean_capex_to_net_income",
                    "mean_dso","mean_free_cash_flow_margin","mean_roic","mean_operating_profit_margin","mean_asset_turnover_ratio","mean_accounts_receivables_turnover_ratio","mean_quick_ratio","mean_debt_to_equity_ratio","mean_interest_coverage_ratio",
                    "mean_gross_profit_margin","cagr_gross_profit","cagr_operating_income","reported_currency","mean_current_ratio","fiscal_date_ending","sector","company_name"];
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

useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

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


// a resolver tenes que podes seleccionar varios tickers as de 5 pero cuando seleccionas mas de 5 y apretas search te tiene que figurar que solo podes seleccionar 5 tickers.