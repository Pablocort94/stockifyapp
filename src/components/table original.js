import React from 'react';
import './table.css';


const Table = ({ data }) => {
    if (!Array.isArray(data) || data.length === 0) {
      return <p>No data available</p>;
    }
  
    // Fields to exclude
    const fieldsToExclude = ['fiscal_date_ending', 'another_field_to_exclude', 'yet_another_field'];

    const revenueLikeFields = ['total_revenue', 'gross_profit', 'net_income', 'operating_income'];

    const conditionalStyles = {
      // Apply the same logic for revenue-like fields
      revenueLogic: (value) => ({
        backgroundColor: value > 0 ? 'lightgreen' : 'lightcoral',
      }),
    };
  
    // Extract all unique fields from the data except for the ones in the exclusion list
    const fields = Array.from(new Set(data.flatMap(Object.keys))).filter(field => !fieldsToExclude.includes(field));

  
    // Create a header row with the field names and fiscal dates
    return (
      <table>
        <thead>
          <tr>
            <th>Field</th>
            {data.map((row, index) => (
              <th key={index}>{row.fiscal_date_ending}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field}>
              <td>{field}</td>
              {data.map((row, index) => {
              // Apply conditional styling for the "net_income field" field
              const cellValue = row[field];
              const cellStyle = revenueLikeFields.includes(field)
                ? conditionalStyles.revenueLogic(cellValue)
                : {};

              return (
                <td key={index} style={cellStyle}>
                  {cellValue}
                </td>
              );
            })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
export default Table;