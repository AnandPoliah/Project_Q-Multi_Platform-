// src/components/NavBar/Navbar.js

import React, { useContext, useState } from 'react';
import './Navigationbar.css';
import QICON from '../../Files/QICON.jpg';
import { FaJava, FaPython, FaReact, FaTrophy, FaRobot, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Modal from '../login_signup/Modal';
import LoginComponent from '../login_signup/LoginComponent';
import { QuizContext } from '../context/QuizContext';


const Navigationbar = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const updateQuizTopic = (topic) => {
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
          navigate('/form');
          break;
        case 'Home':
          navigate('/');
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

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <img src={QICON} alt="QICON" className="navbar-image" onClick={()=> updateQuizTopic("Home")}/>
          </li>
          <li className="tooltip-container">
            <FaJava className="navbar-icon" onClick={() => updateQuizTopic('Java')} />
            <div className="tooltip">Java</div>
          </li>
          <li className="tooltip-container">
            <FaPython className="navbar-icon" onClick={() => updateQuizTopic('Python')} />
            <div className="tooltip">Python</div>
          </li>
          <li className="tooltip-container">
            <FaReact className="navbar-icon" onClick={() => updateQuizTopic('React')} />
            <div className="tooltip">React</div>
          </li>
          <li className="tooltip-container">
            <FaTrophy className="navbar-icon" onClick={() => updateQuizTopic('Leader')} />
            <div className="tooltip">Leaderboard</div>
          </li>
          <li className="tooltip-container">
            <FaRobot className="navbar-icon" onClick={() => updateQuizTopic('AI')} />
            <div className="tooltip">AI Quiz</div>
          </li>
          <li className="tooltip-container">
            <FaUserCircle className="navbar-icon" onClick={() => updateQuizTopic('profile')} />
            <div className="tooltip">Profile</div>
          </li>
        </ul>
      </nav>

      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>
    </div>
  );
};

export default Navigationbar;
