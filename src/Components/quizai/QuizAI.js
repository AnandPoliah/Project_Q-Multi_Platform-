import React, { useEffect, useState, useContext } from 'react';
import { FunctionDeclarationSchemaType } from '@google/generative-ai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import './QuizAI.css';
import QuizAssistant from './QuizAssistent';
import { Button } from '@material-tailwind/react';
import QB1 from '../../Files/QB-1.jpg'
import QB2 from '../../Files/QB-2.jpg'
import QB3 from '../../Files/QB-3.jpg'
import QB4 from '../../Files/QB-4.png'
import QB5 from '../../Files/QB-5.png'
import QB6 from '../../Files/QB-6.jpg'
import QB7 from '../../Files/QB-7.jpg'







const QuizAI = () => {
    const [questionData, setQuestionData] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [quesTop, setquesTop] = useState('');
    const [queslevel, setQuesLevel] = useState('easy');
    const [error, setError] = useState('');
    const [mark, setMark] = useState(0);
    const [btnName, setBtnName] = useState("Submit");
    const [answerStatus, setAnswerStatus] = useState(null);
    const [notification, setNotification] = useState('');
    const [focusTopics, setFocusTopics] = useState({});
    const [assistantVisible, setAssistantVisible] = useState(false); // State for QuizAssistant visibility
    const topicarr = ['CPP', 'JAVA', 'APTITUDE', 'PYTHON'];
    const levelarr = ['easy', 'moderate', 'hard'];
    const { setAimark, setAifocTopic } = useContext(QuizContext);
    let navigate = useNavigate();

    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundImage, setBackgroundImage] = useState('');


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
        }
        catch (error) 
        {
            console.error('Error fetching data:', error);
            <div>
                setError('Failed to fetch data. Please try again later.');
                <Button className="Result-Button" onClick={handleError()}>retry</Button>
            </div>

        }
    };


    const handleError = () =>
    {
      setQuestionData(null);
      setSelectedOption(null);
      setCorrectAnswer(null);
      setAnswerStatus(null);
      setNotification('');
    }


    useEffect(() => 
    {
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
            }
            else {
                setAnswerStatus('wrong');
                setNotification('Let\'s try again.');
                cust = 'wrong';
            }
            setFocusTopics(prev => 
            {
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
        }
        else if (btnName === "Next") 
        {
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
        navigate('/ResultOfAIQuiz');
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
        }
        else if (answerStatus) {
            if (id === correctAnswer) {
                return {
                    backgroundColor: '#28a745', // Green 
                    color: '#fff',
                };
            }
            else if (id === selectedOption && answerStatus === 'wrong') {
                return {
                    backgroundColor: '#dc3545', // Red 
                    color: '#fff',
                };
            }
            else {
                return {
                    backgroundColor: '#f0f1f0',
                    color: '#000',
                };
            }
        }
        return {};
    };

    const getCorrectAnswerText = () => {
        switch (correctAnswer) {
            case 1:
                return questionData.option1;
            case 2:
                return questionData.option2;
            case 3:
                return questionData.option3;
            case 4:
                return questionData.option4;
            default:
                return '';
        }
    };


    const handleChange2 = (color) => {
        setBackgroundColor(color);
      };

      const handleChange1 = (image) => {
        setBackgroundImage(image);
    };


    return (
        <div className='AI-container' style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',backgroundSize: 'cover', transition: 'background-image 0.3s'}}>
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
        <div className='Topic'>{quesTop}</div>
        <div className='diff'>{queslevel}</div>
            <div className='AI-main' style={{  backgroundColor: backgroundColor}}>
                {notification && (
                    <div className='notification'>
                        {notification}
                    </div>
                )}
                
                <div className='AI_BigDiv_Button'>
                    <div>
                        <label><input type="radio" value="" checked={backgroundColor === ''} onChange={() => handleChange2('')} /> </label>
                        <label><input type="radio" value="peachpuff" checked={backgroundColor === 'peachpuff'} onChange={() => handleChange2('peachpuff')} /> </label>
                        <label><input type="radio" value="lightgreen" checked={backgroundColor === 'lightgreen'} onChange={() => handleChange2('lightgreen')} /> </label>
                        <label><input type="radio" value="lightcyan" checked={backgroundColor === 'lightcyan'} onChange={() => handleChange2('lightcyan')} /> </label>
                    </div>
                
                    <div>
                        <button className='toggle-assistant-button' onClick={() => setAssistantVisible(!assistantVisible)}>
                            {assistantVisible ? "Hide Assistant" : "Show Assistant"}
                        </button>
                    </div>
                </div>

               
                <div className='AI_BigDiv'>
                    <div className='AI_BigDiv01'>
                        <div className='AI_BigDiv0101'>{questionData.question}</div>
                    </div>

                    <div className='AI_BigDiv02'>
                        <div 
                            className='AI_BigDiv0201' 
                            style={getDivStyle(1)} 
                            onClick={() => handleDivClick(1)}
                        >
                            {questionData.option1}
                        </div>

                        <div 
                            className='AI_BigDiv0201' 
                            style={getDivStyle(2)} 
                            onClick={() => handleDivClick(2)}
                        >
                            {questionData.option2}
                        </div>

                        <div 
                            className='AI_BigDiv0201' 
                            style={getDivStyle(3)} 
                            onClick={() => handleDivClick(3)}
                        >
                            {questionData.option3}
                        </div>

                        <div 
                            className='AI_BigDiv0201' 
                            style={getDivStyle(4)} 
                            onClick={() => handleDivClick(4)}
                        >
                            {questionData.option4}
                        </div>
                    </div>
                    <div className='AI_BigDiv03'>
                        <button className='AI-submit-button' onClick={handleResult}>{btnName}</button>
            
                        <button className='Result-Button' onClick={() => handleRes()}>Result</button>
                      
                    </div>
                </div>
            </div>
            <div className={`AI-assistant ${assistantVisible ? 'active' : ''}`}>
                <QuizAssistant
                    question={questionData.question}
                    solution={getCorrectAnswerText()}
                />
            </div>
        </div>
    );
};

export default QuizAI;
