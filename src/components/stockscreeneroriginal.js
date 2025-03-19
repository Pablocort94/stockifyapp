import React, { useState, useEffect } from "react";
import './stockscreener.css';

const StockScreener = () => {
  const [fields, setFields] = useState([]);
  const [filters, setFilters] = useState([]);
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);
  const defaultFields = ["ticker", "company_name", "sector"];
  const [selectedFields, setSelectedFields] = useState(defaultFields);


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

  const groupedFields = {
    Profitability: [
      "net_profit_margin",
      "ebitda_revenue_margin",
      "operating_profit_margin",
      "roe",
      "roic",
    ],
    Liquidity: [
      "current_ratio",
      "quick_ratio",
      "cash_to_current_liabilities_ratio",
    ],
    Efficiency: [
      "asset_turnover_ratio",
      "accounts_receivables_turnover_ratio",
      "dso",
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
    const updatedFilters = [...filters];
    updatedFilters[index][key] = value;
    setFilters(updatedFilters);
  };

  const removeFilter = (index) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  const searchStocks = () => {
    // Map display names back to original field names for the request payload
    const requestPayload = {
      filters: filters.map((filter) => ({
        field: displayToFieldMap[filter.field] || filter.field,
        condition: filter.condition,
        value: filter.value,
      })),
    };

    console.log("Request payload:", JSON.stringify(requestPayload, null, 2)); // esto era para mostrar la request y ver que llegaba se puede sacar

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
    if (defaultFields.includes(displayToFieldMap[field] || field)) {
      // Prevent toggling default fields
      return;
    }

    if (selectedFields.includes(field)) {
      setSelectedFields(selectedFields.filter((f) => f !== field));
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };



  return (
    <div className="stock-screener">
      <h2>Stock Screener</h2>
      <button onClick={addFilter}>+ Add New Filter</button>
  
      {filters.map((filter, index) => (
        <div key={index} className="filter-row">
          <select
            value={filter.field}
            onChange={(e) => updateFilter(index, "field", e.target.value)}
          >
            <option value="">Select Field</option>
            {fields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
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
            placeholder="Value"
            value={filter.value}
            onChange={(e) => updateFilter(index, "value", e.target.value)}
          />
  
          <button onClick={() => removeFilter(index)}>- Remove</button>
        </div>
      ))}
  
      <button onClick={searchStocks}>Search</button>
  
      <h3>Select Fields to Display</h3>
      <div className="field-selector">
        {fields.map((field) => (
          <label key={field} className="field-item">
            <input
              type="checkbox"
              checked={selectedFields.includes(field)}
              onChange={() => toggleFieldSelection(field)}
              disabled={defaultFields.includes(displayToFieldMap[field] || field)} // Disable default fields
            />
            {field}
          </label>
        ))}
      </div>
  
      <h3>Results: {count} stocks found</h3>
      <table>
        <thead>
          <tr>
            {selectedFields.map((field) => (
              <th key={field}>
                {fieldNameMapping[field] || field} {/* Use the mapped name, fallback to original if not found */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((stock, index) => (
            <tr key={index}>
              {selectedFields.map((field) => (
                <td key={field}>{stock[displayToFieldMap[field] || field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockScreener;