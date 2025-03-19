import './App.css';
import React, {useRef} from 'react';
import { BrowserRouter as Router, Routes, Route/*, Link*/ } from 'react-router-dom';
import Navbar from './components/navbar';
import About from './components/about';
import Products from './components/products';
import Community from './components/community';
import Contact from './components/contact';
import Education from './components/education';
import LearningLounge from './components/learninglounge'; // New component
import StockData from './components/stockdata'; // New component
import StockScreener from './components/stockscreener'; // New component
import ComparableGraph from './components/comparablegraph'; // New component
import CompetitiveAdvantageRanking from './components/compadvranking';
import SimulationGame from './components/simulationgame';
import Glossary from './components/glossary';






//import StockData from './components/stockdata';

const App = () => {
   // Create references for each section
  const aboutRef = useRef(null);
  const productsRef = useRef(null);
  const communityRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  // Function to handle smooth scrolling
  const scrollToSection = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop - 80, // Adjust for the navbar height
      behavior: 'smooth',
    });
  };

  return (
    <Router>
      <div>
        <Navbar
          scrollToSection={scrollToSection}
          refs={{ aboutRef, productsRef, communityRef, educationRef, contactRef }}
        />
        <div style={{ marginTop: '80px', padding: '20px' }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <section ref={aboutRef}>
                    <About />
                  </section>
                  <section ref={productsRef}>
                    <Products />
                  </section>
                  <section ref={educationRef}>
                    <Education />
                  </section>
                  <section ref={communityRef}>
                    <Community />
                  </section>
                  <section ref={contactRef}>
                    <Contact />
                  </section>
                </>
              }
            />
            <Route path="/financialStatements" element={<StockData />} />
            <Route path="/competitive-advantage" element={< CompetitiveAdvantageRanking/>} />
            <Route path="/comparablegraph" element={<ComparableGraph />} />
            <Route path="/stockscreener" element={<StockScreener />} />
            <Route path="/learninglounge" element={<LearningLounge />} />
            <Route path="/simulationgame" element={< SimulationGame/>} />
            <Route path="/glossary" element={< Glossary/>} />
            <Route path="/glossary/:conceptId?" element={<Glossary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;