import React, { useState, useContext, useEffect } from 'react';
import QICON from '../../Files/QICON.jpg';
import JICON from '../../Files/Java.png';
import PYTHON from '../../Files/PHYTHON.jpg';
import REACT from '../../Files/React.jpg';
import SPRING from '../../Files/Spring.png';
import CPP from '../../Files/CPP.png';
import FB from '../../Files/FB.png';
import IG from '../../Files/instagram.png';
import X from '../../Files/twitter.png';
import APTI from '../../Files/Apti.webp';
import JEE from '../../Files/JEE2.jpg';
import NEET from '../../Files/Neet2.jpg';
import GK from '../../Files/GK.webp';
import './AdaptList.css'; // Ensure this file includes the styles provided
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../login_signup/Modal';
import LoginComponent from '../login_signup/LoginComponent';
import Navigationbar from '../.Sub_component/NavBar/Navigationbar';
import Footer from '../.Sub_component/Footer/Footer';

const AdaptList = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  useEffect(() => {
    // Automatically show the welcome popup on page load
    setShowWelcomePopup(true);
  }, []);

  const updateQuizTopic = (topic) => {
    if (!username) {
      setShowLoginModal(true);
    } else {
      switch(topic) {
        case 'JEE':
          navigate('/Adapt', { state: { topic } });
          break;
        case 'NEET':
          navigate('/Adapt', { state: { topic } });
          break;
        case 'GATE':
          navigate('/Adapt', { state: { topic } });
          break;
        case 'quizQuestions':
          navigate('/Adapt', { state: { topic } });
          break;
        default:
          setQuizTopic(topic);
          navigate('/QuizPage');
          break;
      }
    }
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handlePopupClose = () => {
    setShowWelcomePopup(false);
  };

  return (
    <div className="nt-home-container">
      <Navigationbar />
      <div className="nt-content">
        <h1 className="nt-title">Choose Your Quiz Topic</h1>
        <div className="nt-grid">
          <div className="nt-card" onClick={() => updateQuizTopic('JEE')}>
            <img src={JEE} alt="Java" className="nt-icon" />
            <div className="nt-card-content">
              <h2>JEE</h2>
              <p>Get ready for engineering entrance</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('NEET')}>
            <img src={NEET} alt="Python" className="nt-icon" />
            <div className="nt-card-content">
              <h2>NEET</h2>
              <p>Prepare for your medical entrance</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('GATE')}>
            <img src={APTI} alt="JEE" className="nt-icon" />
            <div className="nt-card-content">
              <h2>GATE</h2>
              <p>Get ready for your GATE exams</p>
            </div>
          </div>
          <div className="nt-card" onClick={() => updateQuizTopic('quizQuestions')}>
            <img src={GK} alt="JEE" className="nt-icon" />
            <div className="nt-card-content">
              <h2>General Knowledge</h2>
              <p>Try on some random Questions</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>

      {showWelcomePopup && (
        <div style={{height:'100vh',width:'100%', backgroundColor:"blue"}}> 
        <div className="welcome-popup">
          <div className="welcome-content">
            <h2 style ={{ fontSize: '30px'}}>What does this do?</h2>

            <p>1.Select a quiz topic of your choice</p>
            <p>2.Answers the questions in it</p>
            <p>3.The Response of the First three questions is tracked and used to recommend the remaining questions</p>
            <p>4.The Following Question is rendered based on your past wrongly answered question</p>
            <button className="welcome-close-button" onClick={handlePopupClose}>Got it</button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default AdaptList;
