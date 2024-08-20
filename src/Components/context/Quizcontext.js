import React, { createContext, useState } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [quizName, setQuizName] = useState('');
  const [quizId, setQuizId] = useState(null);
  const [mark, setMark] = useState(0);
  const [aifoctopic, setAifocTopic] = useState({}); 
  const [aimark, setAimark] = useState(0); 
  return (
    <QuizContext.Provider value={{ username, setUsername, quizTopic, setQuizTopic, quizName, setQuizName, mark, setMark, quizId, setQuizId ,aifoctopic,setAifocTopic,aimark,setAimark}}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;