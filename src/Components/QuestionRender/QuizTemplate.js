import React, { useEffect, useState } from 'react';
import './QuizTemplate.css';
import QB1 from '../../Files/QB-1.jpg'
import QB2 from '../../Files/QB-2.jpg'
import QB3 from '../../Files/QB-3.jpg'
import QB4 from '../../Files/QB-4.png'
import QB5 from '../../Files/QB-5.png'
import QB6 from '../../Files/QB-6.jpg'
import QB7 from '../../Files/QB-7.jpg'


const QuizTemplate = ({ sentence1, option1, option2, option3, option4, onCheckboxChange, resetCheckbox, quizTopic, quizName, onNextClick, buttonName, correctOption, isSubmitMode }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  
  const [backgroundImage, setBackgroundImage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');



  const [rollno,setroll]=useState(Math.floor(Math.random() * 62))
  const handleCheckboxChange = (id) => {
    const newSelection = selectedCheckbox === id ? null : id;
    setSelectedCheckbox(newSelection);
    onCheckboxChange(newSelection);
  };

  useEffect(() => {
    setSelectedCheckbox(null);
    setroll(Math.floor(Math.random() * 62)+1)
  }, [resetCheckbox]);

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
      <h1 className='quiz-header'>{quizTopic}</h1>
      <h1 className='quiz-subheader'>{quizName}</h1>
      <div className='BigDiv' style={{  backgroundColor: backgroundColor}}>
      <div>
                <label><input type="radio" value="" checked={backgroundColor === ''} onChange={() => handleChange2('')} /> </label>
                <label><input type="radio" value="peachpuff" checked={backgroundColor === 'peachpuff'} onChange={() => handleChange2('peachpuff')} /> </label>
                <label><input type="radio" value="lightgreen" checked={backgroundColor === 'lightgreen'} onChange={() => handleChange2('lightgreen')} /> </label>
                <label><input type="radio" value="lightcyan" checked={backgroundColor === 'lightcyan'} onChange={() => handleChange2('lightcyan')} /> </label>
            </div>
        <div className='BigDiv01'>
          <div>{rollno}</div>
          <div className='BigDiv0101'>{sentence1}</div>
        </div>
        <div className='BigDiv02'>
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`BigDiv0201 ${selectedCheckbox === num ? 'selected' : ''} 
                ${!isSubmitMode && num === correctOption ? 'correct' : ''} 
                ${!isSubmitMode && selectedCheckbox === num && num !== correctOption ? 'incorrect' : ''}`}
              onClick={() => isSubmitMode && handleCheckboxChange(num)}
            >
              <div className='BigDiv020101'>{[option1, option2, option3, option4][num - 1]}</div>
            </div>
          ))}
        </div>
        <button className='button-next' onClick={onNextClick}>{buttonName}</button>
      </div>
    </div>
  );
};

export default QuizTemplate;
