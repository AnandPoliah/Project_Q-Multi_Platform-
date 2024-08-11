import React, { useState, useEffect } from 'react';
import Navigationbar from '../.Sub_component/NavBar/Navigationbar';
import QB1 from '../../Files/QB-1.jpg'
import QB2 from '../../Files/QB-2.jpg'
import QB3 from '../../Files/QB-3.jpg'
import QB4 from '../../Files/QB-4.png'
import QB5 from '../../Files/QB-5.png'
import QB6 from '../../Files/QB-6.jpg'
import QB7 from '../../Files/QB-7.jpg'

const quizQuestions = [
  // First 10 Questions (Introduction)
  {
    id: 1,
    question: "What is the capital of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"],
    correctOption: "Tokyo",
    genres: ["Geography", "Asia", "Capitals"],
    tag: "Introduction"
  },
  {
    id: 2,
    question: "Which element has the atomic number 1?",
    options: ["Hydrogen", "Helium", "Oxygen", "Carbon"],
    correctOption: "Hydrogen",
    genres: ["Chemistry", "Periodic Table", "Basics"],
    tag: "Introduction"
  },
  {
    id: 3,
    question: "In which year did World War II end?",
    options: ["1945", "1940", "1939", "1950"],
    correctOption: "1945",
    genres: ["History", "World War II", "20th Century"],
    tag: "Introduction"
  },
  {
    id: 4,
    question: "What is the chemical formula for carbon dioxide?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctOption: "CO2",
    genres: ["Chemistry", "Molecules", "Formulas"],
    tag: "Introduction"
  },
  {
    id: 5,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctOption: "Mars",
    genres: ["Astronomy", "Solar System", "Planets"],
    tag: "Introduction"
  },
  {
    id: 6,
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "George Orwell", "Mark Twain"],
    correctOption: "Harper Lee",
    genres: ["Literature", "Novels", "American Authors"],
    tag: "Introduction"
  },
  {
    id: 7,
    question: "What is the powerhouse of the cell?",
    options: ["Mitochondria", "Nucleus", "Ribosome", "Golgi Apparatus"],
    correctOption: "Mitochondria",
    genres: ["Biology", "Cell Structure", "Basics"],
    tag: "Introduction"
  },
  {
    id: 8,
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["Brazil", "China", "Japan", "Germany"],
    correctOption: "Brazil",
    genres: ["Sports", "Olympics", "World Events"],
    tag: "Introduction"
  },
  {
    id: 9,
    question: "What is the freezing point of water in Celsius?",
    options: ["0°C", "100°C", "-32°C", "32°F"],
    correctOption: "0°C",
    genres: ["Physics", "Temperature", "Basics"],
    tag: "Introduction"
  },
  {
    id: 10,
    question: "Who painted the Mona Lisa?",
    options: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    correctOption: "Leonardo da Vinci",
    genres: ["Art", "Renaissance", "Masterpieces"],
    tag: "Introduction"
  },
  // Next 20 Questions
  {
    id: 11,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Go"],
    correctOption: "Au",
    genres: ["Chemistry", "Elements", "Precious Metals"],
  },
  {
    id: 12,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["Japan", "China", "Thailand", "South Korea"],
    correctOption: "Japan",
    genres: ["Geography", "Asia", "Countries"],
  },
  {
    id: 13,
    question: "What is the square root of 144?",
    options: ["12", "14", "16", "18"],
    correctOption: "12",
    genres: ["Mathematics", "Algebra", "Basics"],
  },
  {
    id: 14,
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctOption: "Jupiter",
    genres: ["Astronomy", "Solar System", "Planets"],
  },
  {
    id: 15,
    question: "Who developed the theory of relativity?",
    options: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    correctOption: "Albert Einstein",
    genres: ["Physics", "Relativity", "Famous Scientists"],
  },
  {
    id: 16,
    question: "What is the largest mammal in the world?",
    options: ["Blue Whale", "Elephant", "Giraffe", "Rhino"],
    correctOption: "Blue Whale",
    genres: ["Biology", "Animals", "Marine Life"],
  },
  {
    id: 17,
    question: "What is the longest river in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    correctOption: "Nile",
    genres: ["Geography", "Rivers", "World"],
  },
  {
    id: 18,
    question: "Who was the first person to walk on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"],
    correctOption: "Neil Armstrong",
    genres: ["Space Exploration", "Astronauts", "1960s"],
  },
  {
    id: 19,
    question: "What is the most abundant gas in Earth's atmosphere?",
    options: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Hydrogen"],
    correctOption: "Nitrogen",
    genres: ["Earth Science", "Atmosphere", "Gases"],
  },
  {
    id: 20,
    question: "Which Shakespeare play features the characters Romeo and Juliet?",
    options: ["Romeo and Juliet", "Macbeth", "Hamlet", "Othello"],
    correctOption: "Romeo and Juliet",
    genres: ["Literature", "Plays", "Shakespeare"],
  },
  {
    id: 21,
    question: "Which organ is responsible for pumping blood throughout the body?",
    options: ["Heart", "Lungs", "Kidneys", "Liver"],
    correctOption: "Heart",
    genres: ["Biology", "Human Body", "Circulatory System"],
  },
  {
    id: 22,
    question: "What is the largest desert in the world?",
    options: ["Sahara", "Arctic", "Gobi", "Kalahari"],
    correctOption: "Sahara",
    genres: ["Geography", "Deserts", "Africa"],
  },
  {
    id: 23,
    question: "Which composer is known for his 'Fifth Symphony'?",
    options: ["Beethoven", "Mozart", "Bach", "Chopin"],
    correctOption: "Beethoven",
    genres: ["Music", "Classical", "Composers"],
  },
  {
    id: 24,
    question: "What is the primary language spoken in Brazil?",
    options: ["Portuguese", "Spanish", "English", "French"],
    correctOption: "Portuguese",
    genres: ["Languages", "South America", "Culture"],
  },
  {
    id: 25,
    question: "What is the capital of Australia?",
    options: ["Canberra", "Sydney", "Melbourne", "Perth"],
    correctOption: "Canberra",
    genres: ["Geography", "Oceania", "Capitals"],
  },
  {
    id: 26,
    question: "What is the boiling point of water at sea level in Celsius?",
    options: ["100°C", "0°C", "50°C", "75°C"],
    correctOption: "100°C",
    genres: ["Physics", "Temperature", "Basics"],
  },
  {
    id: 27,
    question: "Who was the first president of the United States?",
    options: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"],
    correctOption: "George Washington",
    genres: ["History", "United States", "Presidents"],
  },
  {
    id: 28,
    question: "What is the currency of Japan?",
    options: ["Yen", "Dollar", "Euro", "Won"],
    correctOption: "Yen",
    genres: ["Economics", "Asia", "Currencies"],
  },
  {
    id: 29,
    question: "Which artist painted the ceiling of the Sistine Chapel?",
    options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
    correctOption: "Michelangelo",
    genres: ["Art", "Renaissance", "Masterpieces"],
  },
  {
    id: 30,
    question: "What is the most populous country in the world?",
    options: ["China", "India", "United States", "Indonesia"],
    correctOption: "China",
    genres: ["Geography", "Population", "Countries"],
  },
];

const Adaptive = () => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [wrongTopicGenres, setWrongTopicGenres] = useState({});
  const [marks, setMarks] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to manage submission
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');



  useEffect(() => {
    const initializeQuiz = () => {
      const introQuestions = quizQuestions.filter(q => q.tag === 'Introduction');
      const randomIntroQuestions = introQuestions.sort(() => 0.5 - Math.random()).slice(0, 3);
      setSelectedQuestions(randomIntroQuestions);
    };

    initializeQuiz();
  }, []);

  useEffect(() => {
    if (selectedQuestions.length >= 10 && currentQuestionIndex >= selectedQuestions.length) {
      setQuizFinished(true);
    }
  }, [selectedQuestions, currentQuestionIndex]);

  const handleAnswerSelect = (option) => {
    setUserAnswer(option);
  };

  const handleSubmit = () => {
    if (userAnswer === null) return;

    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const isCorrect = userAnswer === currentQuestion.correctOption;

    if (isCorrect) {
      setMarks(marks + 1);
    } else {
      const updatedGenres = { ...wrongTopicGenres };
      currentQuestion.genres.forEach(genre => {
        updatedGenres[genre] = (updatedGenres[genre] || 0) + 1;
      });
      setWrongTopicGenres(updatedGenres);
    }

    setIsSubmitted(true); // Mark as submitted
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < selectedQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer(null);
      setIsSubmitted(false); // Reset submission state for next question
    } else if (selectedQuestions.length >= 10) {
      setShowResults(true);
    } else {
      generateAdditionalQuestions();
    }
  };

  const generateAdditionalQuestions = () => {
    const questionsNeeded = 10 - selectedQuestions.length;

    if (questionsNeeded > 0) {
      if (Object.keys(wrongTopicGenres).length > 0) {
        generateQuestionsBasedOnGenres(questionsNeeded);
      } else {
        generateRandomQuestions(questionsNeeded);
      }
    }
  };

  const generateQuestionsBasedOnGenres = (questionsNeeded) => {
    const sortedGenres = Object.entries(wrongTopicGenres)
      .sort((a, b) => b[1] - a[1])
      .map(entry => entry[0]);

    const remainingQuestions = quizQuestions.filter(q => !q.tag || !q.tag.includes('Introduction'));
    let filteredQuestions = remainingQuestions.filter(q => sortedGenres.some(genre => q.genres.includes(genre)));

    if (filteredQuestions.length === 0) {
      generateRandomQuestions(questionsNeeded);
      return;
    }

    filteredQuestions = filteredQuestions.filter(q => !selectedQuestions.some(selected => selected.id === q.id));
    const randomNextQuestions = filteredQuestions.sort(() => 0.5 - Math.random()).slice(0, questionsNeeded);
    setSelectedQuestions(prev => [...prev, ...randomNextQuestions]);

    if (currentQuestionIndex < selectedQuestions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
    setUserAnswer(null);
  };

  const generateRandomQuestions = (questionsNeeded) => {
    const remainingQuestions = quizQuestions.filter(q => !q.tag || !q.tag.includes('Introduction'));
    let randomNextQuestions = remainingQuestions.filter(q => !selectedQuestions.some(selected => selected.id === q.id));
    randomNextQuestions = randomNextQuestions.sort(() => 0.5 - Math.random()).slice(0, questionsNeeded);
    setSelectedQuestions(prev => [...prev, ...randomNextQuestions]);

    if (currentQuestionIndex < selectedQuestions.length) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
    setUserAnswer(null);
  };

  const getOptionStyle = (option) => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];

    if (isSubmitted) {
      if (option === currentQuestion.correctOption) {
        return { backgroundColor: '#28a745', color: '#fff' }; // Correct answer
      } else if (option === userAnswer) {
        return { backgroundColor: '#dc3545', color: '#fff' }; // Wrong answer
      }
    } else if (option === userAnswer) {
      return { backgroundColor: '#360bab', color: '#fff' }; // Selected answer
    }

    return { backgroundColor: '#f0f1f0', color: '#000' }; // Default color
  };

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  if (showResults) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '30px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        margin: '60px auto',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#2c3e50',
          marginBottom: '30px',
          fontWeight: 'bold'
        }}>Quiz Analytics</h1>
    
        <p style={{
          fontSize: '2rem',
          color: '#27ae60',
          fontWeight: '600',
          marginBottom: '40px'
        }}>Total Marks: {marks}</p>
    
        <h2 style={{
          fontSize: '2.2rem',
          color: '#e74c3c',
          marginBottom: '20px',
          fontWeight: '500'
        }}>Wrong Topic Genres</h2>
    
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          marginBottom: '40px',
          fontSize: '1.2rem',
          color: '#34495e'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#ecf0f1',
              borderBottom: '2px solid #bdc3c7'
            }}>
              <th style={{
                padding: '12px 15px',
                textAlign: 'left',
                fontWeight: '600'
              }}>Genre</th>
              <th style={{
                padding: '12px 15px',
                textAlign: 'left',
                fontWeight: '600'
              }}>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(wrongTopicGenres).map(([genre, count]) => (
              <tr key={genre} style={{
                borderBottom: '1px solid #bdc3c7'
              }}>
                <td style={{
                  padding: '12px 15px',
                  textAlign: 'left'
                }}>{genre}</td>
                <td style={{
                  padding: '12px 15px',
                  textAlign: 'left'
                }}>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
    
        <p style={{
          fontSize: '1rem',
          color: '#7f8c8d',
          marginTop: '20px'
        }}>This analysis helps you understand which topics need more focus in future quizzes.</p>
      </div>
    );
    
  }


  const handleChange1 = (image) => {
    setBackgroundImage(image);
};
const handleChange2 = (color) => {
  setBackgroundColor(color);
};

  return (
    <div className='total'  style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none'}} >
    <div>
          <label><input type="radio" value="" checked={backgroundImage === ''} onChange={() => handleChange1('')} /> </label>
          <label><input type="radio" value="QB1" checked={backgroundImage === QB1} onChange={() => handleChange1(QB1)} /> </label>
          <label><input type="radio" value="QB2" checked={backgroundImage === QB2} onChange={() => handleChange1(QB2)} /> </label>
          <label><input type="radio" value="QB3" checked={backgroundImage === QB3} onChange={() => handleChange1(QB3)} /> </label>
          <label><input type="radio" value="QB4" checked={backgroundImage === QB4} onChange={() => handleChange1(QB4)} /> </label>
          <label><input type="radio" value="QB5" checked={backgroundImage === QB5} onChange={() => handleChange1(QB5)} /> </label>
          <label><input type="radio" value="QB6" checked={backgroundImage === QB6} onChange={() => handleChange1(QB6)} /> </label>
          <label><input type="radio" value="QB7" checked={backgroundImage === QB7} onChange={() => handleChange1(QB7)} /> </label>
        </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Navigationbar />
      </div>

      <h1 style={{ fontSize: '2.5rem',color: 'white'}}>Quiz</h1>
      {currentQuestion ? (
        <div className='BigDiv' style={{  backgroundColor: backgroundColor}}>
            <div>
                <label><input type="radio" value="" checked={backgroundColor === ''} onChange={() => handleChange2('')} /> </label>
                <label><input type="radio" value="peachpuff" checked={backgroundColor === 'peachpuff'} onChange={() => handleChange2('peachpuff')} /> </label>
                <label><input type="radio" value="lightgreen" checked={backgroundColor === 'lightgreen'} onChange={() => handleChange2('lightgreen')} /> </label>
                <label><input type="radio" value="lightcyan" checked={backgroundColor === 'lightcyan'} onChange={() => handleChange2('lightcyan')} /> </label>
            </div>

          <div className='BigDiv01'>
            <div className='BigDiv0101'>{currentQuestion.question}</div>
          </div>
          <div className='BigDiv02'>
            {currentQuestion.options.map(option => (
              <div
                className='BigDiv0201'
                key={option}
                onClick={() => handleAnswerSelect(option)}
                style={getOptionStyle(option)}
              >
                {option}
              </div>
            ))}
          </div>
          <button
            onClick={isSubmitted ? handleNext : handleSubmit}
            disabled={userAnswer === null && !isSubmitted}
            style={{ marginTop: '10px' }}
            className='button-next'
          >
            {isSubmitted ? 'Next' : 'Submit'}
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Adaptive;
