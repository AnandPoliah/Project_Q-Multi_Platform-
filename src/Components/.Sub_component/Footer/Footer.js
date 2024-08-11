// src/components/Footer.js

import React from 'react';
import './Footer.css';  // Import footer-specific styles

import FB from '../../../Files/FB.png';
import IG from '../../../Files/instagram.png';
import X from '../../../Files/twitter.png';

const Footer = () => {
  return (
    <footer className="nt-footer">
      <div className="nt-footer-content">
        <div className="nt-contact">
          <h2>Contact Us</h2>
          <p>Email: <a href="mailto:support@quizmaster.com">support@quizmaster.com</a></p>
          <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
        </div>
        <div className="nt-social">
          <h2>Follow Us</h2>
          <div className="nt-social-links">
            <a href="https://facebook.com/quizmaster" target="_blank" rel="noopener noreferrer">
              <img src={FB} alt="Facebook" />
            </a>
            <a href="https://twitter.com/quizmaster" target="_blank" rel="noopener noreferrer">
              <img src={X} alt="Twitter" />
            </a>
            <a href="https://instagram.com/quizmaster" target="_blank" rel="noopener noreferrer">
              <img src={IG} alt="Instagram" />
            </a>
          </div>
        </div>
        <div className="nt-about">
          <h2>About Us</h2>
          <p>QuizMaster brings you engaging quizzes across various topics. Challenge yourself and expand your knowledge!</p>
        </div>
      </div>
      <div className="nt-footer-bottom">
        <p>&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
