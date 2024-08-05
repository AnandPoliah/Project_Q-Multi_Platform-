import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { QuizContext } from '../context/Quizcontext';
import { Link } from 'react-router-dom';

function ResultPage() {
    const {mark,wrongtopic,quizTopic,quizName,username}=useContext(QuizContext);
    
    useEffect(() => {
    const resDet={
      participant: username,
      mark:mark,
      qname: quizName,
      qtopic: quizTopic
    }
    axios.post('http://localhost:8080/result/insertResult',resDet)
      .then(response => {
          
      })
      .catch(error => {
        alert('Result error:', error);
      });
    }, []);


  return (
    <div>
      <h2>Result Page</h2>
      <p>QuizTopic: {quizTopic} - QuizName: {quizName} - You Scored : {mark}</p>
      <ul>
                {wrongtopic.map((quiz, index) => (
                    <li key={index}>
                        {quiz.topic} - {quiz.count} quizzes
                    </li>
                ))}
            </ul>
      <Link to='/'>home</Link>
      <Link to='/leaderboard'>LeaderBoard</Link>
    </div>
  );
}

export default ResultPage;
