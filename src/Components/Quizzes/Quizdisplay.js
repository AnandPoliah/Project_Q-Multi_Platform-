import React, { useContext, useEffect, useState } from 'react';
import './Quizdisplay.css';
import { QuizContext } from '../context/Quizcontext';
import { useNavigate } from 'react-router-dom';
import '../Home/Button.css';
import axios from 'axios';
import QICON from '../../Files/QICON.jpg';
import { FaBars, FaHome, FaUsers, FaFolder, FaCalendar, FaFileAlt, FaClock, FaRegUserCircle } from 'react-icons/fa';

const Quizdisplay = () => {
    const { setQuizTopic, username } = useContext(QuizContext);
    const [quizzes, setQuizzes] = useState([]);
    const { quizTopic, setQuizName, setQuizId } = useContext(QuizContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const updateQuizTopic = (topic) => {
        if(topic === 'profile') {
            navigate('/profile');
        } else if(topic === "result") {
            navigate('/result');
        } else if(topic === "leader") {
            navigate('/leaderboard');
        } else if(topic === 'AI') {
            navigate('/AI');
        } else {
            setQuizTopic(topic);
            navigate('/QuizPage');
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const updateQuizName = (title, Id) => {
        setQuizName(title);
        setQuizId(Id);
        navigate('/Quiz');
    };

    useEffect(() => {
        axios.get('http://localhost:8080/quiz/getQuiz')
            .then(response => setQuizzes(response.data.filter(quiz => quiz.quizTopic === quizTopic)))
            .catch(error => console.error('Error:', error));
    }, [quizTopic]);

    return (
        <div className="quiz-display-container">
            <FaBars className="sidebar-toggle-icon" onClick={toggleSidebar} />
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <h2>Brand</h2>
                </div>
                <ul className="sidebar-menu">
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaHome className="sidebar-icon" />
                            <span className="sidebar-text">Dashboard</span>
                            <span className="sidebar-badge">5</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaUsers className="sidebar-icon" />
                            <span className="sidebar-text">Team</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaFolder className="sidebar-icon" />
                            <span className="sidebar-text">Projects</span>
                            <span className="sidebar-badge">12</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaCalendar className="sidebar-icon" />
                            <span className="sidebar-text">Calendar</span>
                            <span className="sidebar-badge">20+</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaFileAlt className="sidebar-icon" />
                            <span className="sidebar-text">Documents</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="sidebar-link">
                            <FaClock className="sidebar-icon" />
                            <span className="sidebar-text">Reports</span>
                        </a>
                    </li>
                </ul>
                <div className="sidebar-teams">
                    <h3>Your teams</h3>
                    <ul>
                        <li><a href="#">Heroicons</a></li>
                        <li><a href="#">Tailwind Labs</a></li>
                        <li><a href="#">Workcation</a></li>
                    </ul>
                </div>
                <div className="sidebar-profile">
                    <FaRegUserCircle className="sidebar-profile-icon" />
                    <span className="sidebar-profile-name">Tom Cook</span>
                </div>
            </div>
            <h1 className="quiz-page-title">{quizTopic}</h1>
            <div className="quiz-grid">
                <div className="quiz-grid-container">
                    {quizzes.map((quiz, index) => (
                        <div className="quiz-card" key={index}>
                            <img src={QICON} alt="Quiz Icon" className="quiz-card-image" />
                            <div className="quiz-card-content">
                                <h3 className="quiz-card-title">{quiz.quizName}</h3>
                                <p className="quiz-card-description">{quiz.quizTopic}</p>
                                <div className="quiz-card-footer">
                                    <button onClick={() => updateQuizName(quiz.quizName, quiz.quizId)} className="quiz-card-button">Start Quiz</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quizdisplay;
