import React, { useContext, useEffect, useState } from 'react';
import './Quizdisplay.css';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import '../Home/Button.css';
import axios from 'axios';
import QICON from '../../Files/QICON.jpg';
import Sidebar from '../Sidebar/Sidebar';
import { FaBars, FaJava, FaPython, FaReact, FaCode, FaLeaf, FaUserCircle, FaTrophy, FaRobot } from 'react-icons/fa';

const Quizdisplay = () => {
    const { setQuizTopic, username } = useContext(QuizContext);
    const [quizzes, setQuizzes] = useState([]);
    const { quizTopic, setQuizName, setQuizId } = useContext(QuizContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const updateQuizTopic = (topic) => 
    {
        if(topic === 'profile') 
        {
            navigate('/profile');
        } 
        else if(topic === "result") 
        {
            navigate('/result');
        } 
        else if(topic === "leader") 
        {
            navigate('/leaderboard');
        } 
        else if(topic === 'AI')
        {
            navigate('/AI');
        } 
        else if(topic === 'Home')
        {
            navigate("/")
        }
        else 
        {
            setQuizTopic(topic);
            navigate('/QuizPage');
        }
    };

    const toggleSidebar = () => 
    {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const updateQuizName = (title, Id) => 
    {
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
           <Sidebar/>
            <h1 className="quiz-page-title">{quizTopic}</h1>
            <div className="quiz-grid">
                <div className="quiz-grid-container">
                    {quizzes.map((quiz, index) => (
                        <div className="quiz-card" key={index}>
                            <img src={QICON} alt="Quiz Icon" className="quiz-card-image" />
                            <div className="quiz-card-content">
                                <h3 className="quiz-card-title">{quiz.quizTopic}</h3>
                                <h3 className="quiz-card-description">{quiz.quizName}</h3>
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
