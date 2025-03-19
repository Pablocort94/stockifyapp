import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import "./graph.css";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const GraphComponent = ({ data }) => {
  // Transform and sort the data
  const transformData = () => {
    const processedData = {};
  
    data.forEach((item) => {
      // Replace null values with 0
      const value = item.value === null ? 0 : item.value;
      const year = item.fiscal_date_ending.substring(0, 4);
  
      if (!processedData[item.ticker]) {
        processedData[item.ticker] = [];
      }
      processedData[item.ticker].push({ year, value });
    });
  
    // Sort the data for each ticker by year
    Object.keys(processedData).forEach((ticker) => {
      processedData[ticker].sort((a, b) => parseInt(a.year) - parseInt(b.year));
    });

    console.log("Processed Data:", processedData);
    return processedData;
  };

  const processedData = transformData();

  // Extract and sort unique years for the x-axis labels
  const labels = Array.from(
    new Set(data.map((item) => item.fiscal_date_ending.substring(0, 4)))
  ).sort((a, b) => parseInt(a) - parseInt(b)); // Sort years in ascending order

  // Generate datasets for the graph
  const chartData = {
    labels: labels,
    datasets: Object.keys(processedData).map((ticker, index) => {
      const colors = ["blue", "green", "red", "orange", "purple"];
      const color = colors[index % colors.length];
  
      // Align data with labels, filling missing years with null or 0
      const dataByYear = labels.map((year) => {
        const found = processedData[ticker].find((item) => item.year === year);
        return found ? found.value : null; // Use null to avoid distorting the graph
      });
  
      return {
        label: ticker,
        data: dataByYear,
        borderColor: color,
        backgroundColor: `${color}33`,
        pointBackgroundColor: color,
        pointBorderColor: "#004953",
        pointHoverRadius: 6,
        tension: 0.4,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#333",
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default GraphComponent;

