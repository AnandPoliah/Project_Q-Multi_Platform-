import React, { useState, useEffect } from 'react';
import './LeaderBoard.css';
import axios from 'axios';
import QICON from '../../Files/QICON.jpg';
import { useNavigate } from 'react-router-dom';
import Navigationbar from '../NavBar/Navigationbar';

const LeaderBoard = () => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [leaderboardData, setLeaderBoardData] = useState([]);
  const [selectedQuizName, setSelectedQuizName] = useState('All');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  useEffect(() => {
    axios.get('http://localhost:8080/result/getResult')
      .then(response => setLeaderBoardData(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const topics = [...new Set(leaderboardData.map(entry => entry.qtopic)), 'All'];
  const quizNames = [...new Set(leaderboardData.map(entry => entry.qname)), 'All'];

  const filteredData = leaderboardData.filter(entry =>
    (selectedTopic === 'All' || entry.qtopic === selectedTopic) &&
    (selectedQuizName === 'All' || entry.qname === selectedQuizName)
  );

  const sortedData = filteredData.sort((a, b) => b.mark - a.mark);

  return (
    <div className="leaderboard-container">
    <div className='navbar-container'>
      <Navigationbar />
    </div>
      <div className="leaderboard-content">
        <h1 className="leaderboard-header">Leaderboard</h1>
        <div className="filters">
          <div className="filter">
            <label htmlFor="topic-select">Filter by Quiz Topic:</label>
            <select id="topic-select" value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>
          </div>
          <div className="filter">
            <label htmlFor="quiz-select">Filter by Quiz Name:</label>
            <select id="quiz-select" value={selectedQuizName} onChange={e => setSelectedQuizName(e.target.value)}>
              {quizNames.map(name => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Quiz Topic</th>
              <th>Quiz Name</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.participant}</td>
                <td>{entry.qtopic}</td>
                <td>{entry.qname}</td>
                <td>{entry.mark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaderBoard;
