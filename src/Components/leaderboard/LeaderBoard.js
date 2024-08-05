import React, { useState ,useEffect} from 'react';
import './LeaderBoard.css'; 
import axios from 'axios';

const LeaderBoard = () => {
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [leaderboardData, setleaderBoardData] = useState([]);
  const [selectedQuizName, setSelectedQuizName] = useState('All');

  useEffect(() => {
    axios.get('http://localhost:8080/result/getResult') 
     .then(response => setleaderBoardData(response.data))
     .catch(error => console.error('Error:', error));
     console.log(leaderboardData);
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
      <h1 className="leaderboard-header">Leaderboard</h1>

      <div className="filters">
        <label>Filter by Quiz Topic:</label>
        <select value={selectedTopic} onChange={e => setSelectedTopic(e.target.value)}>
          {topics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>

        <label>Filter by Quiz Name:</label>
        <select value={selectedQuizName} onChange={e => setSelectedQuizName(e.target.value)}>
          {quizNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>

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
          {sortedData.map((entry,index) => (
            <tr key={index}>
              <td>{index+1}</td>
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
