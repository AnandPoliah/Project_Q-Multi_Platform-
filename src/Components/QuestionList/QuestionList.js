import React, { useEffect, useContext, useState } from 'react';
import CreateQuiz from '../Create/CreateQuiz';
import { QuizContext } from '../context/Quizcontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionList = () => {
  const [mark, setMark] = useState(0);
  const [index, setIndex] = useState(0);
  const [wtopics, setWtopics] = useState({});
  const [questionList, setQuestionList] = useState([]);
  const [choosed, setChoosed] = useState(null);
  const [resetCheckbox, setResetCheckbox] = useState(false);
  const [final, setFinal] = useState(false);
  const [buttonName, setButtonName] = useState("Next");
  const { quizName, setMark: setContextMark, setWrongTopic, quizId } = useContext(QuizContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/quiz/getQuiz')
      .then(response => {
        const filteredQuiz = response.data.find(quiz => quiz.quizId === quizId);
        if (filteredQuiz) {
          setQuestionList(filteredQuiz.questions);
        }
      })
      .catch(error => console.error('Error:', error));
  }, [quizId]);

  const qno = questionList.length;

  const handleSelectedCheck = (id) => {
    setChoosed(id);
  };

  const handleNext = () => {
    if (!final && choosed === null) {
      alert("Choose an option");
      return;
    }

    setResetCheckbox((prev) => !prev);

    if (!final) {
      if (choosed === questionList[index].correctOption) {
        setMark((prev) => prev + 1);
      } else {
        const topic = questionList[index].focusTopic;
        setWtopics((prev) => ({
          ...prev,
          [topic]: (prev[topic] || 0) + 1
        }));
      }
    }

    const newIndex = index + 1;
    setIndex(newIndex);

    if (index === qno - 2) {
      setButtonName("Submit");
    }
    else if (index === qno - 1) {
      setButtonName("See Result");
      setFinal(true);
    }
    else if (index === qno) {
      setTimeout(() => {
        const wrongTopicsArray = Object.keys(wtopics).map((topic) => ({
          topic,
          count: wtopics[topic]
        }));
        setContextMark(mark);
        setWrongTopic(wrongTopicsArray);
        navigate('/result');
      }, 0);
    }
    setChoosed(null);
  };

  return (
    <div>
      <CreateQuiz
        headerText={quizName}
        sentence1={index + 1 + "." + questionList[index]?.question}
        option1={questionList[index]?.option1}
        option2={questionList[index]?.option2}
        option3={questionList[index]?.option3}
        option4={questionList[index]?.option4}
        onCheckboxChange={handleSelectedCheck}
        resetCheckbox={resetCheckbox}
        onNextClick={handleNext}
      />
    </div>
  );
};

export default QuestionList;
