import React, { useState, useEffect } from 'react';
import './learninglounge.css';

const videos = [
  {
    title: 'The Basics of Value Investing',
    url: 'https://www.youtube.com/embed/tI4P3IiVsBw',
    description: 'Learn the foundations of investing with beginner-friendly guides on how markets work, the basics of stocks, and key financial principles.',
    level: 'beginner',
  },
  {
    title: 'Value Investing Explained',
    url: 'https://www.youtube.com/embed/HKB2H7IM6NY',
    description: 'Understand what value investing is, its principles, and why it\'s a reliable long-term strategy.',
    level: 'intermediate',
  },
  {
    title: 'Bill Ackman: Lemonade Stand Case Study',
    url: 'https://www.youtube.com/embed/WEDIj9JBTC8',
    description: 'Learn the basics of finance and investing with Bill Ackman in less than one hour',
    level: 'beginner',
  },
  {
    title: 'Benjamin Graham: The Intelligent Investor summary',
    url: 'https://www.youtube.com/embed/npoyc_X5zO8',
    description: 'Learn the core principles of value investing, a time-tested approach to stock investing championed by Benjamin Graham.',
    level: 'advanced',
  },
  {
    title: 'Peter Lynch: Beating the Street',
    url: 'https://www.youtube.com/embed/ihsCWCiJozQ',
    description: 'Discover how to beat the market with Peter Lynch\'s proven strategies.',
    level: 'expert',
  },
  {
    title: 'How to detect a Pyramidal/Ponzi scheme',
    url: 'https://www.youtube.com/embed/SBGfHk91Vrk',
    description: 'Learn to spot the warning signs of pyramid schemes before you get caught in a financial trap.',
    level: 'intermediate',
  },
];

const LearningLounge = () => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredVideos = videos
    .filter(
      (video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
      return levels.indexOf(a.level) - levels.indexOf(b.level);
    });

  return (
    <div className="learning-lounge-container">
      <h1>Learning Lounge</h1>
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="video-list">
        {filteredVideos.map((video, index) => (
          <div key={index} className={`video-card ${video.level}`}>
            <span className={`level-label ${video.level}`}>{video.level}</span>
            <h2>{video.title}</h2>
            <iframe
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <p>{video.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningLounge;


