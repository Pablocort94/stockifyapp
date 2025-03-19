import React from "react";
import { Typewriter } from "react-simple-typewriter";
import "./about.css";
import logo from "../assets/logo.jpg"; // Replace with your actual logo path

const About = () => {
  return (
    <div className="about-container">
      {/* Top Section: Logo and Heading Side by Side */}
      <div className="about-top">
        <img src={logo} alt="Company Logo" className="about-logo" />
        <h1 className="about-heading">
          <Typewriter
            words={["We Don't Gamble\nWe Don’t Trade\nWe Invest"]}
            loop={false}
            cursor={false}
            typeSpeed={100}
            deleteSpeed={1000000000000}
            delaySpeed={1000000000}
          />
        </h1>
      </div>

      {/* Bottom Section: About Text */}
      <div className="about-bottom">
        <p className="about-text">
          Welcome to Stockify! Say goodbye to the chaos of day trading. Join a community where we
          learn, grow, and invest together. With a foundation built on patience,
          principles, and data, we empower you to master value investing and
          create lasting wealth for the future.
        </p>
      </div>
    </div>
  );
};

export default About;
