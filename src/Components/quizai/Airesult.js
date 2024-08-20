import React, { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import './ResultOfAIQuiz.css';
import Navigationbar from '../Sub_component/NavBar/Navigationbar';

function Airesult() {
  const { username, aimark, aifoctopic } = useContext(QuizContext);

  return (
    <div>
      <div className='navbar-container'>
        <Navigationbar />
      </div>
      <div className="result-container">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        </div>
        <h2 className="result-header">Result Page</h2>
        <div className="result-info">
          <ul>
            <li>UserName: {username}</li>
            <li>You Scored: {aimark}</li>
          </ul>
        </div>
        {aifoctopic.length > 0 ? (  // Check if aifoctopic has data before rendering the table
          <table className="result-table">
            <thead>
              <tr>
                <th>Focus Topic</th>
                <th>Total Questions</th>
                <th>No of Correct</th>
                <th>No of Wrong</th>
              </tr>
            </thead>
            <tbody>
              {aifoctopic.map((quiz, index) => (
                <tr key={index}>
                  <td>{quiz.topic}</td>
                  <td>{quiz.totalQuestions}</td>
                  <td>{quiz.correct}</td>
                  <td>{quiz.totalQuestions - quiz.correct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No quiz data available</p>  // Fallback if there's no data
        )}
      </div>
    </div>
  );
}

export default Airesult;
