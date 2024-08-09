import React, { useEffect, useState, useContext } from 'react';
import { FunctionDeclarationSchemaType } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigate, useLocation } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import './QuizAI.css';

const QuizAI = () => {
  const { state } = useLocation();
  const { AIQuizTopic, Difficulty } = state;
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [quesTop, setquesTop] = useState('');
  const [queslevel, setQuesLevel] = useState(Difficulty);
  const [error, setError] = useState('');
  const [mark, setMark] = useState(0);
  const [btnName, setBtnName] = useState("Submit");
  const [answerStatus, setAnswerStatus] = useState(null);
  const [notification, setNotification] = useState('');
  const [focusTopics, setFocusTopics] = useState({});
  const topicarr = ['CPP', 'JAVA', 'APTITUDE', 'PYTHON'];
  const levelarr = ['easy', 'moderate', 'hard'];
  const { setAimark, setAifocTopic } = useContext(QuizContext);
  let navigate = useNavigate();

  const fetchData = async () => {
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCRFwjjqhajzpFQBjFjFr72ih-_2eEwXAg");
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: FunctionDeclarationSchemaType.OBJECT,
            properties: {
              question: { type: FunctionDeclarationSchemaType.STRING },
              option1: { type: FunctionDeclarationSchemaType.STRING },
              option2: { type: FunctionDeclarationSchemaType.STRING },
              option3: { type: FunctionDeclarationSchemaType.STRING },
              option4: { type: FunctionDeclarationSchemaType.STRING },
              correctOption: { type: FunctionDeclarationSchemaType.INTEGER },
              focustopic: { type: FunctionDeclarationSchemaType.STRING }
            }
          }
        }
      });
      let topic = topicarr[Math.floor(Math.random() * 4)];
      setquesTop(topic);
      const prompt = `Create a multiple-choice question with four options. The question should belong to the main topic of ${topic}, with a toughness level of ${queslevel}. The focus topic should be automatically generated based on the content of the question. Include the correct answer as an integer (1-4).`;
      const result = await model.generateContent(prompt);

      const responseText = await result.response.text();
      const parsedResponse = JSON.parse(responseText);
      setQuestionData(parsedResponse);
      setCorrectAnswer(parsedResponse.correctOption);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDivClick = (id) => {
    if (btnName === "Submit") {
      setSelectedOption(id);
    }
  };

  const handleResult = () => {
    let cust;
    if (btnName === "Submit") {
      if (selectedOption === correctAnswer) {
        setAnswerStatus('correct');
        setNotification('Hooray! You are correct!');
        cust = 'correct';
        setMark(mark + 1);
      } else {
        setAnswerStatus('wrong');
        setNotification('Let\'s try again.');
        cust = 'wrong';
      }
      setFocusTopics(prev => {
        const currentTopic = quesTop + " - " + questionData.focustopic;
        const newStats = { ...prev };

        if (!newStats[currentTopic]) {
          newStats[currentTopic] = { totalQuestions: 0, correct: 0, wrong: 0 };
        }

        newStats[currentTopic].totalQuestions += 1;
        if (cust === 'correct') {
          newStats[currentTopic].correct += 1;
        } else {
          newStats[currentTopic].wrong += 1;
        }

        return newStats;
      });
      setBtnName("Next");
    } else if (btnName === "Next") {
      setQuestionData(null);
      setSelectedOption(null);
      setCorrectAnswer(null);
      setAnswerStatus(null);
      setNotification('');
      setBtnName("Submit");
      if (cust === 'wrong') {
        setQuesLevel(queslevel === 'easy' ? 'easy' : levelarr[levelarr.indexOf(queslevel) - 1]);
      } else {
        setQuesLevel(queslevel === 'hard' ? 'hard' : levelarr[levelarr.indexOf(queslevel) + 1]);
      }
      fetchData();
    }
  };

  const convertFocusTopicsToArray = (topics) => {
    return Object.keys(topics).map(topic => ({
      topic,
      totalQuestions: topics[topic].totalQuestions,
      correct: topics[topic].correct,
      wrong: topics[topic].wrong
    }));
  };

  const handleRes = () => {
    const focusTopicsArray = convertFocusTopicsToArray(focusTopics);
    setAimark(mark);
    setAifocTopic(focusTopicsArray);
    navigate('/AiResult');
  };

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => fetchData()}>reload</button>
      </div>
    );
  }

  if (!questionData) {
    return <p>Loading...</p>;
  }

  const getDivStyle = (id) => {
    if (btnName === "Submit") {
      return {
        backgroundColor: selectedOption === id ? '#360bab' : '#f0f1f0',
        color: selectedOption === id ? '#fff' : '#000',
      };
    } else if (answerStatus) {
      if (id === correctAnswer) {
        return {
          backgroundColor: '#28a745',
          color: '#fff',
        };
      } else if (id === selectedOption && answerStatus === 'wrong') {
        return {
          backgroundColor: '#dc3545',
          color: '#fff',
        };
      } else {
        return {
          backgroundColor: '#f0f1f0',
          color: '#000',
        };
      }
    }
    return {};
  };

  return (
    <div className='AI_total'>
      {notification && (
        <div className='notification'>
          {notification}
        </div>
      )}
      <div className='Topic'>{quesTop}</div>
      <div className='Heading'>{questionData.focustopic}</div>
      <div className='diff'>{queslevel}</div>
      console.log(AIQuizTopic);
      console.log(Difficulty);
      <div className='Questions'>
        <div className='Ques'>{questionData.question}</div>
        <div
          className='Option'
          style={getDivStyle(1)}
          onClick={() => handleDivClick(1)}
        >
          {questionData.option1}
        </div>
        <div
          className='Option'
          style={getDivStyle(2)}
          onClick={() => handleDivClick(2)}
        >
          {questionData.option2}
        </div>
        <div
          className='Option'
          style={getDivStyle(3)}
          onClick={() => handleDivClick(3)}
        >
          {questionData.option3}
        </div>
        <div
          className='Option'
          style={getDivStyle(4)}
          onClick={() => handleDivClick(4)}
        >
          {questionData.option4}
        </div>
      </div>
      <div>
        <button onClick={handleResult} className="result">
          {btnName}
        </button>
      </div>
      <div>
        <button onClick={handleRes} className="result">Show Result</button>
      </div>
    </div>
  );
};

export default QuizAI;
