import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { FaBars, FaJava, FaHome,FaPython, FaReact, FaCode, FaLeaf, FaUserCircle, FaTrophy, FaRobot } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { setQuizTopic } = useContext(QuizContext); // Accessing setQuizTopic from context
    const navigate = useNavigate();

    const updateQuizTopic = (topic) => {
        if(topic === 'profile') {
            navigate('/profile');
        } else if(topic === "result") {
            navigate('/result');
        } else if(topic === "leader") {
            navigate('/leaderboard');
        } else if(topic === 'AI') {
            navigate('/AI');
        } else if(topic === 'Home') {
            navigate("/");
        } else {
            setQuizTopic(topic);
            navigate('/QuizPage');
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <h2>QUIZ</h2>
                </div>
                <ul className="sidebar-menu">
                    <div className='side-top'>
                        <li>
                            <button onClick={() => updateQuizTopic('Java')} className="sidebar-link">
                                <FaJava className="sidebar-icon" />
                                <span className="sidebar-text">Java</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => updateQuizTopic('Python')} className="sidebar-link">
                                <FaPython className="sidebar-icon" />
                                <span className="sidebar-text">Python</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => updateQuizTopic('React')} className="sidebar-link">
                                <FaReact className="sidebar-icon" />
                                <span className="sidebar-text">React</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => updateQuizTopic('CPP')} className="sidebar-link">
                                <FaCode className="sidebar-icon" />
                                <span className="sidebar-text">CPP</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => updateQuizTopic('Spring')} className="sidebar-link">
                                <FaLeaf className="sidebar-icon" />
                                <span className="sidebar-text">Spring</span>
                            </button>
                        </li>
                    </div>
                    <div className='side-bottom'>
                        <li>
                            <button onClick={() => updateQuizTopic('profile')} className="sidebar-link">
                                <FaUserCircle className="sidebar-icon" />
                                <span className="sidebar-text">Profile</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => updateQuizTopic('leader')} className="sidebar-link">
                                <FaTrophy className="sidebar-icon" />
                                <span className="sidebar-text">Leaderboard</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => updateQuizTopic('AI')} className="sidebar-link">
                                <FaRobot className="sidebar-icon" />
                                <span className="sidebar-text">AI</span>
                            </button>
                        </li>
                        <li>
                            <button onClick={() => updateQuizTopic('Home')} className="sidebar-link">
                                <FaHome className="sidebar-icon" />
                                <span className="sidebar-text">Home</span>
                            </button>
                        </li>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
