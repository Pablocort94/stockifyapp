import React from 'react';
import './table.css';
import { Link } from 'react-router-dom'; // If you're using React Router



const Table = ({ data, tableName }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No data available</p>;
    }
  
    const fieldMappings = {
      income_statement: [
        { key: 'total_revenue', label: 'Total Revenue' },
        { key: 'cost_of_goods_and_services_sold', label: 'Cost Of Goods Sold (COGS)' },
        { key: 'gross_profit', label: 'Gross Profit' },
        { key: 'research_and_development', label: 'Research And Development (R&D)' },
        { key: 'selling_general_and_administrative', label: 'Selling And Administrative (S&G)' },
        { key: 'operating_income', label: 'Operating Income' },
        { key: 'investment_income_net', label: 'Investment Income Net' },
        { key: 'net_interest_income', label: 'Interest Income Net' },
        { key: 'other_non_operating_income', label: 'Other Non Operating Income' },
        { key: 'income_before_tax', label: 'Income Before Tax' },
        { key: 'interest_expense', label: 'Interest Expense' },
        { key: 'income_tax_expense', label: 'Income Tax Expense' },
        { key: 'net_income', label: 'Net Income' },
        { key: 'ebit', label: 'EBIT' },
        { key: 'ebitda', label: 'EBITDA' }
      ],
      balance_sheet: [
        { key: 'cash_and_short_term_investments', label: 'Cash On Hand' },
        { key: 'current_net_receivables', label: 'Current Receivables' },
        { key: 'inventory', label: 'Inventory' },
        { key: 'other_current_assets', label: 'Other Current Assets' },
        { key: 'total_current_assets', label: 'Total Current Assets' },
        { key: 'property_plant_equipment', label: 'Property, Plant & Equipment' },
        { key: 'long_term_investments', label: 'Long Term Investments' },
        { key: 'intangible_assets', label: 'Goodwill and Intangible Assets' },
        { key: 'other_non_current_assets', label: 'Other Non Current Assets' },
        { key: 'total_non_current_assets', label: 'Total Non Current Assets' },
        { key: 'total_assets', label: 'Total Assets' },
        { key: 'current_accounts_payable', label: 'Current Payable Accounts' },
        { key: 'current_debt', label: 'Current Debt' },
        { key: 'other_current_liabilities', label: 'Other Current Liabilities' },
        { key: 'total_current_liabilities', label: 'Total Current Liabilities' },
        { key: 'long_term_debt', label: 'Long Term Debt' },
        { key: 'other_non_current_liabilities', label: 'Other Non Current Liabilities' },
        { key: 'total_non_current_liabilities', label: 'Total Non Current Liabilities' },
        { key: 'total_liabilities', label: 'Total Liabilities' },
        { key: 'common_stock', label: 'Common Stock' },
        { key: 'retained_earnings', label: 'Retained Earnings' },
        { key: 'total_share_holder_equity', label: 'Total Share Holder Equity' }


      ],
      cash_flow: [
        { key: 'profit_loss', label: 'Net Income' },
        { key: 'depreciation_depletion_and_amortization', label: 'Total Depreciation and Amortization' },
        { key: 'change_in_receivables', label: 'Change In Receivables' },
        { key: 'change_in_inventory', label: 'Change In Inventory' },
        { key: 'operating_cashflow', label: 'Cash Flow From operating Activities' },
        { key: 'capital_expenditures', label: 'Capital Expenditures (CAPEX)' },
        { key: 'cashflow_from_investment', label: 'Cash Flow From Investing Activities' },
        { key: 'proceeds_from_repurchase_of_equity', label: 'Total Equity Issued/Repurchased' },
        { key: 'dividend_payout_common_stock', label: 'Dividend Payments From Common Stocks' },
        { key: 'cashflow_from_financing', label: 'Cashflow From Financing Activities' },
        { key: 'change_in_cash_and_cash_equivalents', label: 'Net Cash Flow' }
      ],
      keyfinancialindicators: [
        { key: 'gross_profit_margin', label: 'Gross Profit Margin' },
        { key: 'net_profit_margin', label: 'Net Profit Margin' },
        { key: 'sga_gross_profit_margin', label: 'SGA to Gross Profit Margin' },
        { key: 'rnd_gross_profit_margin', label: 'R&D to Gross Profit Margin' },
        { key: 'depreciation_gross_profit_margin', label: 'Depreciation to Gross Profit Margin' },
        { key: 'inteexp_operating_income_margin', label: 'Interest Expense to Operating Income Margin' },
        { key: 'ebitda_revenue_margin', label: 'EBITDA to Revenue Ratio' },
        { key: 'cr_revenue_margin', label: 'Current Receivables to Revenue Ratio' },
        { key: 'current_ratio', label: 'Current Ratio' },
        { key: 'cash_to_current_liabilities_ratio', label: 'Cash to Current Liabilities Ratio' },
        { key: 'roa', label: 'Return On Assets (ROA)' },
        { key: 'longtermdebt_to_net_earnings', label: 'Long Term Debt to Net Earnings Ratio' },
        { key: 'debt_to_shequity', label: 'Total Liabilities to Share Holder Equity Ratio' },
        { key: 'book_value_per_share', label: 'Book Value per Share' },
        { key: 'retained_earnings', label: 'Retained Earnings' },
        { key: 'roe', label: 'Return On Equity' },
        { key: 'net_cash_flow', label: 'Net Cash Flow' },
        { key: 'capex_to_net_income', label: 'Capex to Net Income Ratio' },
        { key: 'dso', label: 'Days Sales Outstanding (DSO)' },
        { key: 'free_cash_flow', label: 'Free Cash Flow' },
        { key: 'free_cash_flow_margin', label: 'Free Cash Flow Ratio' },
        { key: 'nopat', label: 'Net Operating Profit After Tax (NOPAT)' },
        { key: 'invested_capital', label: 'Invested Capital' },
        { key: 'roic', label: 'Return on Invested Capital (ROIC)' },
        { key: 'operating_profit_margin', label: 'Operating Profit Margin' },
        { key: 'asset_turnover_ratio', label: 'Assets Turnover Ratio' },
        { key: 'accounts_receivables_turnover_ratio', label: 'Accounts receivables Turnover Ratio' },
        { key: 'quick_ratio', label: 'Quick Ratio' },
        { key: 'debt_to_equity_ratio', label: 'Long Term Debt to Equity Ratio' },
        { key: 'interest_coverage_ratio', label: 'Interest Coverage Ratio' }
      ]
    };
  
    const fieldsToDisplay = fieldMappings[tableName] || [];
    const boldFields = ['total_revenue', 'gross_profit', 'net_income', 'operating_income', 'income_before_tax','total_current_assets',
      'total_non_current_assets','total_assets', 'total_current_liabilities','total_non_current_liabilities','total_liabilities','total_share_holder_equity',
    'profit_loss','operating_cashflow','cashflow_from_investment','cashflow_from_financing','change_in_cash_and_cash_equivalents'];
    const revenueLikeFields = ['total_revenue', 'gross_profit', 'net_income', 'operating_income', 'income_before_tax'];
  
    const percentageFields = [
      'gross_profit_margin', 
      'net_profit_margin', 
      'sga_gross_profit_margin', 
      'rnd_gross_profit_margin',
      'depreciation_gross_profit_margin',
      'inteexp_operating_income_margin',
      'ebitda_revenue_margin',
      'cr_revenue_margin',
      'roa',
      'capex_to_net_income',
      'free_cash_flow_margin', 
      'debt_to_equity_ratio', 
      'roe', 
      'roic',
      'operating_profit_margin',
  ]; // Add fields to be displayed as percentages

    const conditionalStyles = (value, key) => {
      if (revenueLikeFields.includes(key) && value !== undefined) {
        return { backgroundColor: value > 0 ? 'lightgreen' : 'lightcoral' };
      }
      return {};
    };

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
    
  return (
    <div className="table-container">
        <table className="scrollable-table">
            <thead>
                <tr>
                    <th className="frozen-column">Field</th>
                    {data.map((row, index) => (
                        <th key={index}>{row.fiscal_date_ending}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {fieldsToDisplay.map(({ key, label }) => (
                    <tr key={key}>
                        <td className={`frozen-column ${boldFields.includes(key) ? 'bold-text' : ''}`}>
                            <Link to={`/glossary/${key}`} title={`Learn more about ${label}`}>
                                {label}
                            </Link>
                        </td>
                        {data.map((row, index) => {
                            const cellValue = row[key];
                            const cellStyle = conditionalStyles(cellValue, key);
                            return (
                                <td key={index} style={cellStyle}>
                                    {formatCellValue(cellValue, key)}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
};
  
  export default Table;

//CUANDO PASO EL SLICER VEO COMO ME PASAN LA DATA POR ATRAS DEBERIA PONERLE MAS PADDING PARA QUE LO CUBRA MEJOR