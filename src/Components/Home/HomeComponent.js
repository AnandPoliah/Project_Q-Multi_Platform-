import React, { useState, useContext } from 'react';
import QICON from '../../Files/QICON.jpg';
import JICON from '../../Files/Java.png';
import PYTHON from '../../Files/PHYTHON.jpg'
import REACT from '../../Files/React.jpg';
import SPRING from '../../Files/Spring.png';
import CPP from '../../Files/CPP.png';
import FB from '../../Files/FB.png';
import IG from '../../Files/instagram.png';
import X from '../../Files/twitter.png'
import './HomeComponent.css';
import './Button.css';
import './Button2.css';
import { QuizContext } from '../context/Quizcontext';
import { useNavigate } from 'react-router-dom';
import Modal from '../login_signup/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faTrophy, faChartBar, faRobot, faUserCircle } from '@fortawesome/free-solid-svg-icons';


import LoginComponent from '../login_signup/LoginComponent';
import { Ripple } from 'primereact/ripple';

const HomeComponent = () => {
  const { setQuizTopic, username } = useContext(QuizContext);
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const updateQuizTopic = (topic) => 
  {
    // if (!username) 
    // {
    //   setShowLoginModal(true);
    // } 
    if(topic==='profile')
    {
      navigate('/profile');
    }
    else if(topic === "result")
    {
      navigate('/result');
    }
    else if(topic === "Leader")
    {
      navigate('/leaderboard');
    }
    else if(topic === 'AI')
    {
      navigate('/AI');
    }
    else
    {
      setQuizTopic(topic);
      navigate('/QuizPage');
    }
  };
    
  
  

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  return (
    <div className="home-container">
      <div className='background' >

      <nav className="navbar">
      <ul>
    <li><img src={QICON} alt="QICON" className="navbar-image" /></li>
    <li><button className="button-27" onClick={() => updateQuizTopic('Leader')}><FontAwesomeIcon icon={faTrophy} size='xl' /><Ripple /></button></li>
    <li><button className="button-27" onClick={() => updateQuizTopic('result')}><FontAwesomeIcon icon={faChartBar} size="xl" /> {username ? username : ""}<Ripple/></button></li>
    <li><button className="button-27" onClick={() => updateQuizTopic('profile')}><FontAwesomeIcon icon={faUserCircle} size="xl" /> {username ? username : ""}<Ripple/></button></li>
    <li><button className="button-27" onClick={() => updateQuizTopic('AI')}><FontAwesomeIcon icon={faRobot} size="xl" /> {username ? username : ""}<Ripple/></button></li>
</ul>

    </nav>
    
        <div className='secondBig'>
          <div className='secondBig01'>
            <h1>Welcome to the Quiz Master!</h1>
            <p>Dive into an ocean of knowledge and discover your true potential. Sharpen your skills with each quiz and enjoy the journey of learning!</p>
          </div>
        </div>
    

      <div className='thirdBig'>
        <div className='thirdBigcc' onClick={() => updateQuizTopic('Java')}>
          <div className='thirdBig0101'>
            <h1>"Java Quiz Challenge: How Well Do You Know Java?"</h1>
            <h3>Take on our quiz and find out if you're a true Java expert.</h3>
          </div>
          <div className='thirdBig0102'>
            <img src={JICON} alt='Java Quiz Challenge' />
          </div>
          <Ripple />
        </div>

        <div className='thirdBigcc' onClick={() => updateQuizTopic('Python')}>
          <div className='thirdBig0201'>
            <img src={PYTHON} alt='Python Quiz Challenge' />
          </div>
          <div className='thirdBig0202'>
            <h1>"Python Quiz Challenge: How Well Do You Know Python?"</h1>
            <h3>Take on our quiz and find out if you're a true Python expert.</h3>
          </div>
          <Ripple />
        </div>

        <div className='thirdBigcc' onClick={() => updateQuizTopic('React')}>
          <div className='thirdBig0101'>
            <h1>"React Quiz Challenge: How Well Do You Know React?"</h1>
            <h3>Take on our quiz and find out if you're a true React expert.</h3>
          </div>
          <div className='thirdBig0102'>
            <img src={REACT} alt='React Quiz Challenge' />
          </div>
          <Ripple />
        </div>

        <div className='thirdBigcc' onClick={() => updateQuizTopic('Spring')}>
          <div className='thirdBig0401'>
            <img src={SPRING} alt='Spring Quiz Challenge' />
          </div>
          <div className='thirdBig0402'>
            <h1>"Spring Quiz Challenge: How Well Do You Know Spring?"</h1>
            <h3>Take on our quiz and find out if you're a true Spring expert.</h3>
          </div>
          <Ripple />
        </div>

        <div className='thirdBigcc' onClick={() => updateQuizTopic('CPP')}>
          <div className='thirdBig0101'>
            <h1>"CPP Quiz Challenge: How Well Do You Know CPP?"</h1>
            <h3>Take on our quiz and find out if you're a true CPP expert.</h3>
          </div>
          <div className='thirdBig0102'>
            <img src={CPP} alt='CPP Quiz Challenge' />
          </div>
          <Ripple />
        </div>
      </div>
    </div>
    <div className='footer'>
  <div className='footer-content'>
    <div className='footer-section'>
      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, feel free to reach out to us:</p>
      <p>Email: <a href="mailto:support@quizmaster.com">support@quizmaster.com</a></p>
      <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
    </div>
    <div className='footer-section'>
      <h2>Follow Us</h2>
      <p>Stay updated with our latest news and updates:</p>
      <div className='social-links'>
        <a href="https://facebook.com/quizmaster" target="_blank" rel="noopener noreferrer" className='social-icon'>
          <img src={FB}/>
        </a>
        <a href="https://twitter.com/quizmaster" target="_blank" rel="noopener noreferrer" className='social-icon'>
          <img src={X}/>
        </a>
        <a href="https://instagram.com/quizmaster" target="_blank" rel="noopener noreferrer" className='social-icon'>
          <img src={IG}/>
        </a>
      </div>
    </div>
    <div className='footer-section'>
      <h2>About Us</h2>
      <p>QuizMaster is dedicated to bringing you the best quizzes to test and improve your knowledge across various topics. Join our community and challenge yourself today!</p>
    </div>
  </div>
  <div className='footer-bottom'>
    <p>&copy; {new Date().getFullYear()} QuizMaster. All rights reserved.</p>
  </div>
</div>

  
  
      <Modal show={showLoginModal} onClose={handleLoginClose}>
        <LoginComponent onClose={handleLoginClose} />
      </Modal>
    </div>
  );
};

export default HomeComponent;
