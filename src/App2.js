import React, { useState } from 'react';

// Sample questions for Java and Python with topics and subtopics
const javaQuestions = [
  { question: "What is Java?", options: ["Language", "Framework"], correctAnswer: "Language", topic: "Introduction", subtopic: "Basics" },
  { question: "Which company developed Java?", options: ["Sun Microsystems", "Microsoft"], correctAnswer: "Sun Microsystems", topic: "History", subtopic: "Development" },
  { question: "What is JVM?", options: ["Java Virtual Machine", "Java Variable Model"], correctAnswer: "Java Virtual Machine", topic: "Architecture", subtopic: "JVM" },
  { question: "What is JRE?", options: ["Java Runtime Environment", "Java Runtime Execution"], correctAnswer: "Java Runtime Environment", topic: "Environment", subtopic: "JRE" },
  { question: "What is JDK?", options: ["Java Development Kit", "Java Deployment Kit"], correctAnswer: "Java Development Kit", topic: "Environment", subtopic: "JDK" },
  { question: "Which of the following is not a Java feature?", options: ["Object-oriented", "Use of pointers"], correctAnswer: "Use of pointers", topic: "Features", subtopic: "Basics" },
  { question: "Which is a reserved keyword in Java?", options: ["array", "goto"], correctAnswer: "goto", topic: "Syntax", subtopic: "Keywords" },
  { question: "Which environment variable is used to set the java path?", options: ["JAVA_HOME", "JAVAC"], correctAnswer: "JAVA_HOME", topic: "Environment", subtopic: "Configuration" },
  { question: "Which of these cannot be used for a variable name in Java?", options: ["identifier & keyword", "keyword"], correctAnswer: "keyword", topic: "Syntax", subtopic: "Identifiers" },
  { question: "What is the extension of java code files?", options: [".js", ".java"], correctAnswer: ".java", topic: "Files", subtopic: "Extensions" }
];

const pythonQuestions = [
  { question: "What is Python?", options: ["Language", "Framework"], correctAnswer: "Language", topic: "Introduction", subtopic: "Basics" },
  { question: "Which company developed Python?", options: ["Python Software Foundation", "Microsoft"], correctAnswer: "Python Software Foundation", topic: "History", subtopic: "Development" },
  { question: "What is PEP 8?", options: ["Python Enhancement Proposal", "Python Execution Process"], correctAnswer: "Python Enhancement Proposal", topic: "Standards", subtopic: "PEP" },
  { question: "Which of the following is the correct extension of the Python file?", options: [".py", ".python"], correctAnswer: ".py", topic: "Files", subtopic: "Extensions" },
  { question: "Which keyword is used for function in Python?", options: ["fun", "def"], correctAnswer: "def", topic: "Syntax", subtopic: "Functions" },
  { question: "Which of the following is not a keyword in Python?", options: ["pass", "eval"], correctAnswer: "eval", topic: "Syntax", subtopic: "Keywords" },
  { question: "Which of the following is used to define a block of code in Python?", options: ["Brackets", "Indentation"], correctAnswer: "Indentation", topic: "Syntax", subtopic: "Blocks" },
  { question: "Which function helps to find the version of Python we are currently working on?", options: ["sys.version", "sys.versioninfo"], correctAnswer: "sys.version", topic: "Environment", subtopic: "Version" },
  { question: "Which is not a core data type in Python?", options: ["Lists", "Class"], correctAnswer: "Class", topic: "Data Types", subtopic: "Core" },
  { question: "Which is used to make code readable in Python?", options: ["Indentations", "Spaces"], correctAnswer: "Indentations", topic: "Standards", subtopic: "Readability" }
];

const QuizApp = () => {
  const [currentSection, setCurrentSection] = useState('Java');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = currentSection === 'Java' ? javaQuestions : pythonQuestions;

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [`${currentSection}-${currentQuestionIndex}`]: answer });
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      if (currentSection === 'Java') {
        setCurrentSection('Python');
        setCurrentQuestionIndex(0);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateResults = () => {
    const results = {
      Java: { correct: 0, incorrect: 0, incorrectTopics: [] },
      Python: { correct: 0, incorrect: 0, incorrectTopics: [] },
    };

    javaQuestions.forEach((q, i) => {
      if (answers[`Java-${i}`] === q.correctAnswer) {
        results.Java.correct += 1;
      } else {
        results.Java.incorrect += 1;
        results.Java.incorrectTopics.push({ topic: q.topic, subtopic: q.subtopic });
      }
    });

    pythonQuestions.forEach((q, i) => {
      if (answers[`Python-${i}`] === q.correctAnswer) {
        results.Python.correct += 1;
      } else {
        results.Python.incorrect += 1;
        results.Python.incorrectTopics.push({ topic: q.topic, subtopic: q.subtopic });
      }
    });

    return results;
  };

  return (
    <div>
      {!showResults ? (
        <QuizSection
          section={currentSection}
          question={questions[currentQuestionIndex]}
          handleAnswer={handleAnswer}
        />
      ) : (
        <Results results={calculateResults()} />
      )}
    </div>
  );
};

const QuizSection = ({ section, question, handleAnswer }) => {
  return (
    <div>
      <h2>{section} Quiz</h2>
      <Question question={question} handleAnswer={handleAnswer} />
    </div>
  );
};

const Question = ({ question, handleAnswer }) => {
  return (
    <div>
      <h3>{question.question}</h3>
      {question.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

const Results = ({ results }) => {
  const renderIncorrectTopics = (incorrectTopics) => {
    const topicMap = {};

    incorrectTopics.forEach(({ topic, subtopic }) => {
      if (!topicMap[topic]) {
        topicMap[topic] = new Set();
      }
      topicMap[topic].add(subtopic);
    });

    return Object.keys(topicMap).map(topic => (
      <div key={topic}>
        <strong>{topic}</strong>
        <ul>
          {[...topicMap[topic]].map(subtopic => (
            <li key={subtopic}>{subtopic}</li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <div>
      <h2>Quiz Results</h2>
      <div>
        <h3>Java</h3>
        <p>Correct: {results.Java.correct}</p>
        <p>Incorrect: {results.Java.incorrect}</p>
        {results.Java.incorrect > 0 && (
          <div>
            <p>Focus on these topics and subtopics:</p>
            {renderIncorrectTopics(results.Java.incorrectTopics)}
          </div>
        )}
      </div>
      <div>
        <h3>Python</h3>
        <p>Correct: {results.Python.correct}</p>
        <p>Incorrect: {results.Python.incorrect}</p>
        {results.Python.incorrect > 0 && (
          <div>
            <p>Focus on these topics and subtopics:</p>
            {renderIncorrectTopics(results.Python.incorrectTopics)}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizApp;