import React, { useState } from 'react';
import './QuizIntro.css';
import { useNavigate } from 'react-router-dom';

const QuizIntro = () => {
  const [quizTopic, setQuizTopic] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quiz Topic:', quizTopic);
    console.log('Difficulty:', difficulty);
    navigate('/AI', { state: { AIQuizTopic: quizTopic, Difficulty: difficulty } });
  };

  return (
    <div className='AI-Quiz-Intro'>
      <div className="AI-container">
        <form onSubmit={handleSubmit} className="AI-form">
          <div className="AI-form-group">
            <label htmlFor="quizTopic" className="AI-label">Quiz Topic:</label>
            <input
              type="text"
              id="quizTopic"
              className="AI-input"
              value={quizTopic}
              onChange={(e) => setQuizTopic(e.target.value)}
            />
          </div>
          <div className="AI-form-group">
            <label htmlFor="difficulty" className="AI-label">Difficulty:</label>
            <select
              id="difficulty"
              className="AI-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button type="submit" className="AI-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuizIntro;
