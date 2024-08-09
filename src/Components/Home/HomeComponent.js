import React, { useState, useContext } from 'react';
import './HomeComponent.css';
import Navbar from '../NavBar/Navigationbar';
import Modal from '../login_signup/Modal';
import LoginComponent from '../login_signup/LoginComponent';
import { useNavigate } from 'react-router-dom';

import FB from '../../Files/FB.png';
import IG from '../../Files/instagram.png';
import X from '../../Files/twitter.png';
import { QuizContext } from '../context/QuizContext';

const HomeComponent = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const updateQuizTopic = (topic) => 
  {
    if (!username) {
      setShowLoginModal(true);
    } else {
      switch (topic) {
        case 'profile':
          navigate('/profile');
          break;
        case 'result':
          navigate('/result');
          break;
        case 'Leader':
          navigate('/leaderboard');
          break;
        case 'AI':
          navigate('/AI');
          break;
        default:
          setQuizTopic(topic);
          navigate('/Random');
      }
    }
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="content-wrapper">
        <section className="intro-section">
          <div className="intro-text">
            <h1>Discover Your Potential</h1>
            <p>Join our interactive quizzes and expand your knowledge.</p>
            <button onClick={() => updateQuizTopic('Random')} className="cta-button">Start Now</button>
          </div>
          <div className="intro-image">
            <img src="path_to_image" alt="Learning" />
          </div>
        </section>

        <section className="features-section">
          <div className="feature-block" onClick={() => updateQuizTopic('Random')}>
            <div className="feature-icon">📚</div>
            <h3>Explore Quizzes</h3>
            <p>Browse through a diverse range of quizzes.</p>
          </div>
          <div className="feature-block" onClick={() => updateQuizTopic('AI')}>
            <div className="feature-icon">🤖</div>
            <h3>AI Insights</h3>
            <p>Get smart insights tailored to your performance.</p>
          </div>
          <div className="feature-block" onClick={() => updateQuizTopic('Leader')}>
            <div className="feature-icon">🏆</div>
            <h3>Leaderboard</h3>
            <p>See how you rank against others.</p>
          </div>
        </section>

        <section className="footer-section">
          <div className="footer-content">
            <div className="footer-column">
              <h4>About Us</h4>
              <p>We offer a platform for knowledge and fun through quizzes.</p>
            </div>
            <div className="footer-column">
              <h4>Contact Us</h4>
              <p>Email: support@quizplatform.com</p>
            </div>
            <div className="footer-column">
              <h4>Connect With Us</h4>
              <div className="social-icons">
                <a href="#"><img src={FB} alt="Facebook" /></a>
                <a href="#"><img src={IG} alt="Instagram" /></a>
                <a href="#"><img src={X} alt="Twitter" /></a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Quiz Platform. All rights reserved.</p>
          </div>
        </section>
      </div>
      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>
    </div>
  );
};

export default HomeComponent;
