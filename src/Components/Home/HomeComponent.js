import React, { useState, useContext } from 'react';
import './HomeComponent.css';
import Modal from '../login_signup/Modal';
import LoginComponent from '../login_signup/LoginComponent';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';


import Navigationbar from '../.Sub_component/NavBar/Navigationbar';
import Footer from '../.Sub_component/Footer/Footer';

const HomeComponent = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const updateQuizTopic = (topic) => 
  {
    if (!username) 
    {
      setShowLoginModal(true);
    } 
    else if(topic === "AI")
    {
      navigate('/form');
    }
    else if(topic === "Adapt")
    {
      navigate('/Adapt');
    }
    else if(topic === "LeaderBoard")
    {
      navigate('/leaderboard');
    }
    else if(topic === "create")
    {
      navigate('/create');
    }
    else 
    {
      setQuizTopic(topic);
      navigate('/TopicList');
    }
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handleCardClick = (topic) => {
    updateQuizTopic(topic);
  };

  return (
    <div className="new-home-container">
      <Navigationbar />
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to QuizMaster</h1>
          <p>Your journey to knowledge starts here.</p>
          <button className="explore-button" onClick={() => handleCardClick('Random')}>Explore Quizzes</button>
        </div>
      </section>

      <section className="info-section">

              <div className="info-card" onClick={() => handleCardClick('AI')}>
                  <div className="feature-icon">🤖</div>
                  <h2>Smart QuiZ</h2>
                  <p>Explore quizzes meticulously designed by an Intelligence to challenge your knowledge.</p>
              </div>


              <div className="info-card" onClick={() => handleCardClick('Adapt')}>
                  <div className="feature-icon">📈</div>
                  <h2>Adaptive Learning</h2>
                  <p>Get questions tailored to your performance, targeting areas for improvement to boost your knowledge.</p>
              </div>
      
              <div className="info-card" onClick={() => handleCardClick('LeaderBoard')}>
                  <div className="feature-icon">🏆</div>
                  <h2>Compete</h2>
                  <p>Challenge your friends and see who tops the leaderboard.</p>
              </div>


              <div className="info-card" onClick={() => handleCardClick('create')}>
                  <div className="feature-icon">➕</div>
                  <h2>Create</h2>
                  <p>Craft Unique Quizzes: Challenge Others and Showcase Your Creativity! </p>
              </div>
        
      </section>




    

      <Footer/>

      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>
    </div>
  );
};

export default HomeComponent;


