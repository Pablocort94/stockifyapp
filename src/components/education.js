import React from 'react';
import { Link } from 'react-router-dom';
import './education.css';

const Education = () => {
  return (
    <div className="education-container">
      <h1>Education</h1>
      <p>
        Want to learn more about value investing? Visit our{' '}
        <Link to="/learninglounge">Learning Lounge</Link> for exclusive videos and content!
      </p>
    </div>
  );
};

export default Education;