import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import glossaryEntries from "./glossaryentries"; // Import the data
import './glossary.css';


const Glossary = () => {
  const { conceptId } = useParams();

  useEffect(() => {
    if (conceptId) {
      const element = document.getElementById(conceptId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [conceptId]);

  return (
    <div className="glossary-container">
      <h1>Glossary</h1>
      {glossaryEntries.map((entry) => (
        <div id={entry.id} key={entry.id} style={{ marginBottom: "20px" }}>
          <h2>{entry.name}</h2>
          <p><strong>Definition:</strong> {entry.details.definition}</p>
          <p><strong>Importance:</strong> {entry.details.importance}</p>
          <p><strong>What It Tells Us:</strong> {entry.details.whatItTellsUs}</p>
        </div>
      ))}
    </div>
  );
};
export default Glossary;