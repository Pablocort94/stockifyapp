import React, { useState, useEffect } from "react";
import './stockscreener.css';

const StockScreener = () => {
  const [fields, setFields] = useState([]);
  const [filters, setFilters] = useState([]);
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const defaultFields = ["ticker", "company_name", "sector"];
  const [selectedFields, setSelectedFields] = useState(defaultFields);
  const [expandedGroups, setExpandedGroups] = useState({});



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
  };

  const percentageFields = ["net_profit_margin", 
    "operating_profit_margin", 
    "gross_profit_margin"  , 
    "ebitda_revenue_margin", 
    "free_cash_flow_margin",
    "roic",
    "roa", 
    "roe",
    "sga_gross_profit_margin",
    "rnd_gross_profit_margin",
    "depreciation_gross_profit_margin",
    "inteexp_operating_income_margin"];

  const groupedFields = {
    Profitability: [
      "net_profit_margin",
      "ebitda_revenue_margin",
      "operating_profit_margin",
      "gross_profit_margin",
      "free_cash_flow_margin",
      "sga_gross_profit_margin",
      "rnd_gross_profit_margin",
      "depreciation_gross_profit_margin",
      "inteexp_operating_income_margin"
    ],
    Liquidity: [
      "current_ratio",
      "quick_ratio",
      "cash_to_current_liabilities_ratio",
      "cr_revenue_margin"
    ],
    Efficiency: [
      "asset_turnover_ratio",
      "accounts_receivables_turnover_ratio",
      "dso",
      "roa",
      "capex_to_net_income",
      "roe",
      "roic"

    ],
    Leverage: [
      "debt_to_equity_ratio",
      "interest_coverage_ratio",
      "longtermdebt_to_net_earnings",
    ],
    Growth: [
      "cagr_revenue",
      "cagr_total_assets",
      "cagr_total_liabilities",
      "cagr_cost_of_revenue",
      "cagr_selling_general_and_administrative",
      "cagr_research_and_development",
      "cagr_gross_profit",
      "cagr_operating_income"
    ],
  };

  // Reverse mapping to map display names back to original field names
  const displayToFieldMap = Object.fromEntries(
    Object.entries(fieldNameMapping).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/stock_screener_available_fields")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch fields");
        }
        return response.json();
      })
      .then((data) => {
        const remappedFields = data.fields.map(
          (field) => fieldNameMapping[field] || field
        );
        setFields(remappedFields); // Use display names for dropdown
      })
      .catch((error) => console.error("Error fetching fields:", error));
  }, []);

  const addFilter = () => {
    setFilters([...filters, { field: "", condition: "", value: "" }]);
  };

  const updateFilter = (index, key, value) => {
    setFilters((prevFilters) => {
      const updatedFilters = [...prevFilters];
  
      if (key === "value" && percentageFields.includes(displayToFieldMap[updatedFilters[index].field] || updatedFilters[index].field)) {
        // Store backend value as decimal but keep displayValue intact
        updatedFilters[index]["backendValue"] = value !== "" ? (parseFloat(value) / 100).toFixed(4) : "";
        updatedFilters[index]["displayValue"] = value; // Keep user's input unchanged
      } else {
        updatedFilters[index][key] = value;
      }
  
      return updatedFilters;
    });
  };
  

  const removeFilter = (index) => {
    setFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));
  };

  const searchStocks = () => {
    const requestPayload = {
      filters: filters.map((filter) => ({
        field: displayToFieldMap[filter.field] || filter.field,
        condition: filter.condition,
        value: percentageFields.includes(displayToFieldMap[filter.field] || filter.field)
          ? filter.backendValue // Use the transformed value for percentage fields
          : filter.value, // Use regular value for other fields
      })),
    };
  
    console.log("Request payload:", JSON.stringify(requestPayload, null, 2));
  
    fetch("http://127.0.0.1:5000/api/screener/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch stock search results");
        }
        return response.json();
      })
      .then((data) => {
        setResults(data.data);
        setCount(data.count);
      })
      .catch((error) => console.error("Error searching stocks:", error));
  };

  const toggleFieldSelection = (field) => {
    const originalField = displayToFieldMap[field] || field;
    if (defaultFields.includes(originalField)) return;

    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const toggleGroup = (category) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);



  return (
    <div className="stock-screener">
      <h1>Stock Screener</h1>
      <button className="add-filter-btn" onClick={addFilter}>+ Add New Filter</button>
  
      {filters.map((filter, index) => (
        <div key={index} className="filter-row">
           <select
    value={filter.field}
    onChange={(e) => updateFilter(index, "field", e.target.value)}
  >
    <option classname="select-field" value="">Select Field</option>
    {Object.entries(groupedFields).map(([category, fields]) => (
      <optgroup key={category} label={category}>
        {fields.map((field) => (
          <option key={field} value={field}>
            {fieldNameMapping[field] || field}
          </option>
        ))}
      </optgroup>
    ))}
  </select>
  
          <select
            value={filter.condition}
            onChange={(e) => updateFilter(index, "condition", e.target.value)}
          >
            <option value="">Select Condition</option>
            <option value="greater_than">Greater Than</option>
            <option value="less_than">Less Than</option>
            <option value="equal_to">Equal To</option>
            <option value="between">Between</option>
          </select>

          <input
            type="text"
            value={percentageFields.includes(displayToFieldMap[filter.field] || filter.field) ? filter.displayValue || "" : filter.value}
            onChange={(e) => {
              let inputValue = e.target.value;

                // Allow empty input
                if (inputValue === "") {
                  updateFilter(index, "value", "");
                  return;
                }

                // Validate: Only allow numbers
                if (/^\d*\.?\d*$/.test(inputValue)) {
                  updateFilter(index, "value", inputValue);
                }
              }}
              placeholder={percentageFields.includes(displayToFieldMap[filter.field] || filter.field) ? "Enter %" : "Enter Value"}
              onBlur={() => {
                if (percentageFields.includes(displayToFieldMap[filter.field] || filter.field) && filter.value !== "") {
                  updateFilter(index, "value", filter.value); // Store as 0.XX for backend
                }
              }}
          />  
          <button className="remove-filter-btn" onClick={() => removeFilter(index)}>- Remove</button>
        </div>
      ))}
  
      <button onClick={searchStocks}>Search</button>

      <h2>Select Fields to Display</h2>
<div className="field-selector">
  {Object.entries(groupedFields).map(([category, fields]) => (
    <div key={category} className="field-group">
      <h4 onClick={() => toggleGroup(category)} className="group-title">
        {category} {expandedGroups[category] ? "▼" : "▶"}
      </h4>
      {expandedGroups[category] && (
        <div className="fields-list">
          {fields.map((field) => (
            <label key={field} className="field-item">
              <span
  className={`field-item ${selectedFields.includes(field) ? "selected" : ""} ${
    defaultFields.includes(displayToFieldMap[field] || field) ? "disabled" : ""
  }`}
  onClick={() => !defaultFields.includes(displayToFieldMap[field] || field) && toggleFieldSelection(field)}
>
  {fieldNameMapping[field] || field}
</span>
            </label>
          ))}
        </div>
      )}
    </div>
  ))}
</div>


  
      <h3>Results: {count} stocks found</h3>
      
      <div className="table-container">
      <table  className="scrollable-table">
  <thead>
    <tr>
      {selectedFields.map((field) => (
        <th key={field}>
          {fieldNameMapping[field] || field}
        </th>
      ))}
    </tr>
  </thead>
  <tbody>
    {results.map((stock, index) => (
      <tr key={index}>
        {selectedFields.map((field) => {
          const value = stock[displayToFieldMap[field] || field];  // Get the value
          const isPercentage = percentageFields.includes(displayToFieldMap[field] || field);
          const isFloat = typeof value === "number" && !Number.isInteger(value); // Check if it's a float

          return (
            <td key={field}>
              {isPercentage
                ? (value * 100).toFixed(2) + "%" // Percentage logic
                : isFloat
                ? value.toFixed(2)              // Float logic
                : value}                        
            </td>
          );
        })}
      </tr>
    ))}
  </tbody>
</table>
</div>

    </div>
  );
};

export default StockScreener;

//esta raro como el usuairio ingresa los nros con porcentajes