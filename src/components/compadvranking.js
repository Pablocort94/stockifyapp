import React, { useState, useEffect } from "react";
import './compadvranking.css';


const CompetitiveAdvantageRanking = () => {
    const [rankingData, setRankingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from API
        const fetchRankingData = async () => {
            try {
                const response = await fetch("https://stockify-backend-4lkh.onrender.com/api/competitive_advantage_score");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                const sortedData = result.data
                    .map(item => ({
                        companyName: item.company_name,
                        sector: item.sector,
                        score: item.score,
                    }))
                    .sort((a, b) => b.score - a.score);
                const maxScore = getMaxScore(sortedData); // Get the max score after sorting
                setRankingData(sortedData);
                console.log("Max Score:", maxScore);  // Sort in descending order
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRankingData();
    }, []);

    const getMaxScore = (data) => {
        const maxScore = Math.max(...data.map(item => item.score));
        console.log("Max Score:", maxScore); // For testing purposes
        return maxScore;
    };
    
    const renderStars = (score, maxScore) => {
        const stars = (score / maxScore) * 5;
        const roundedStars = stars.toFixed(2);
        const fullStars = Math.round(stars);
        return (
            <>
                {"★".repeat(fullStars) + "☆".repeat(5 - fullStars)}
                <span className="moat-score"> ({roundedStars})</span>
            </>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="competitive-advantage-container">
            <h1>Competitive Advantage Ranking</h1>
            <div className="table-wrapper">
                <table className="competitive-advantage-table">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Company Name</th>
                            <th>Sector</th>
                            <th>Score</th>
                            <th>Moat Strength</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankingData.map((item, index) => (
                            <tr key={index} >
                                <td>{index + 1}</td>
                                <td>{item.companyName}</td>
                                <td>{item.sector}</td>
                                <td>{item.score}</td>
                                <td className="moat-strength">{renderStars(item.score, getMaxScore(rankingData))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompetitiveAdvantageRanking;