import React, { useState, useContext } from 'react';
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
import './Random.css';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import Modal from '../login_signup/Modal';
import LoginComponent from '../login_signup/LoginComponent';
import { Ripple } from 'primereact/ripple';
import Navigationbar from '../NavBar/Navigationbar';

const Random = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const updateQuizTopic = (topic) => {
    if (!username) {
      setShowLoginModal(true);
    } else {
      switch(topic) {
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
          navigate('/QuizPage');
          break;
      }
    }
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="r-home-container">
    <Navigationbar/>
      <div className='r-background'>

        <div className='r-thirdBig'>
                        <div className='r-thirdBigcc' onClick={() => updateQuizTopic('Java')}>
                        <div className='r-thirdBig0101'>
                        <img src={JICON} alt='Java Quiz Challenge' />
                        </div>
                        <div className='r-thirdBig0102'>
                        <h1>Java Basics</h1>
                        <h3>Test your Java knowledge</h3>
                        </div>
                      </div>  


                        <div className='r-thirdBigcc' onClick={() => updateQuizTopic('Python')}>
                        <div className='r-thirdBig0101'>
                        </div>
                        <img src={PYTHON} alt='Python Quiz Challenge' />
                        <div className='r-thirdBig0102'>
                        <h1>Python Essentials</h1>
                        <h3>Challenge your Python skills</h3>
                        </div>
                      </div>


                        <div className='r-thirdBigcc' onClick={() => updateQuizTopic('React')}>
                        <div className='r-thirdBig0101'>
                        <img src={REACT} alt='React Quiz Challenge' />
                        </div>
                        <div className='r-thirdBig0102'>
                        <h1>React Proficiency</h1>
                        <h3>Measure your React expertise</h3>
                        </div>
                        <Ripple />
                      </div>


                        

                      <div className='r-thirdBigcc' onClick={() => updateQuizTopic('Aptitude')}>
                      <div className='r-thirdBig0101'>
                      <img src={APTI} alt='CPP Quiz Challenge' />
                      </div>
                      <div className='r-thirdBig0102'>
                      <h1>Aptitude</h1>
                      <h3>Test your Intelligence</h3>
                      </div>
                      <Ripple />
                      </div>


                      <div className='r-thirdBigcc' onClick={() => updateQuizTopic('NEET')}>
                      <div className='r-thirdBig0101'>
                      <img src={NEET} alt='CPP Quiz Challenge' />
                      </div>
                      <div className='r-thirdBig0102'>
                      <h1>NEET </h1>
                      <h3>Test your Intelligence</h3>
                      </div>
                      <Ripple />
                      </div>


                      <div className='r-thirdBigcc' onClick={() => updateQuizTopic('JEE')}>
                      <div className='r-thirdBig0101'>
                      <img src={JEE} alt='CPP Quiz Challenge' />
                      </div>
                      <div className='r-thirdBig0102'>
                      <h1>JEE</h1>
                      <h3>Test your Intelligence</h3>
                      </div>
                      <Ripple />
                      </div>

        </div>
      </div>

      <div className='r-footer'>
        <div className='r-footer-content'>
          <div className='r-footer-section'>
            <h2>Contact Us</h2>
            <p>If you have any questions or feedback, feel free to reach out to us:</p>
            <p>Email: <a href="mailto:support@quizmaster.com">support@quizmaster.com</a></p>
            <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
          </div>
          <div className='r-footer-section'>
            <h2>Follow Us</h2>
            <p>Stay updated with our latest news and updates:</p>
            <div className='r-social-links'>
              <a href="https://facebook.com/quizmaster" target="_blank" rel="noopener noreferrer" className='social-icon'>
                <img src={FB} alt="Facebook"/>
              </a>
              <a href="https://twitter.com/quizmaster" target="_blank" rel="noopener noreferrer" className='social-icon'>
                <img src={X} alt="Twitter"/>
              </a>
              <a href="https://instagram.com/quizmaster" target="_blank" rel="noopener noreferrer" className='social-icon'>
                <img src={IG} alt="Instagram"/>
              </a>
            </div>
          </div>
          <div className='r-footer-section'>
            <h2>About Us</h2>
            <p>QuizMaster is dedicated to bringing you the best quizzes to test and improve your knowledge across various topics. Join our community and challenge yourself today!</p>
          </div>
        </div>
        <div className='r-footer-bottom'>
          <p>&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
        </div>
      </div>

      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>
    </div>
  );
};

export default Random;
