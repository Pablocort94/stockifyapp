import React from 'react';
import { Link } from 'react-router-dom';
import './products.css';
import stockScreenerImg from '../assets/stockscreener.jpg';
import financialStatements from '../assets/financialstatements.jpg';
import compAdvChart from '../assets/compadvchart.jpg';
import priceSimulator from '../assets/pricesimulator.jpg';
import comparableGraph from '../assets/comparablegraph.jpg';



const Products = () => {
  const tools = [
    { name: 'Stock Screener', path: '/stockscreener', img: stockScreenerImg},
    { name: 'Financial Statements', path: '/financialStatements', img: financialStatements },
    { name: 'Comparable Graph', path: '/comparablegraph', img: comparableGraph },
    { name: 'Competitive Advantage Ranking', path: '/competitive-advantage', img: compAdvChart },
    { name: 'AI Simulator', path: '/simulationgame', img: priceSimulator }
  ];

  return (
    <div className="products-container">
      <h1>Our Tools</h1>
      <div className="products-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card">
            <Link to={tool.path}>
              <img src={tool.img} alt={tool.name} className="tool-image" />
              <h2 className="tool-name">{tool.name}</h2>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;