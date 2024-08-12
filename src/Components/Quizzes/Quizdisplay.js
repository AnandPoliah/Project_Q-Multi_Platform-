import React, { useContext, useEffect, useState } from 'react';
import './Quizdisplay.css';
import { QuizContext } from '../context/QuizContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QICON from '../../Files/QICON.jpg';
import Sidebar from '../.Sub_component/Sidebar/Sidebar';

const Quizdisplay = () => {
    const { setQuizTopic, username } = useContext(QuizContext);
    const [quizzes, setQuizzes] = useState([]);
    const { quizTopic, setQuizName, setQuizId } = useContext(QuizContext);
    const navigate = useNavigate();

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
            <Sidebar className="sidebar" /> {/* Ensure Sidebar receives the correct class */}
            <div className="content">
                <header className="header-for-title">
                    <h1 className="header-title">{quizTopic}</h1>
                </header>
                <main className="quiz-cards-container">
                    {quizzes.map((quiz, index) => (
                        <div className="quiz-card" key={index}>
                            <img src={QICON} alt="Quiz Icon" className="quiz-card-image" />
                            <div className="quiz-card-content">
                                <h3 className="quiz-card-title">{quiz.quizName}</h3>
                                <button onClick={() => updateQuizName(quiz.quizName, quiz.quizId)} className="quiz-card-button">Start Quiz</button>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default Quizdisplay;
