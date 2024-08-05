import React, { useEffect, useState } from 'react';
import './CreateQuiz.css';

const CreateQuiz = ({ sentence1, option1, option2, option3, option4, onCheckboxChange, resetCheckbox, headerText, onNextClick }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);

  const handleCheckboxChange = (id) => {
    // Toggle the selected checkbox
    const newSelection = selectedCheckbox === id ? null : id;
    setSelectedCheckbox(newSelection);
    onCheckboxChange(newSelection);
  };

  useEffect(() => {
    setSelectedCheckbox(null);
  }, [resetCheckbox]);

  return (
    <div className='total'>
      <h1 className='quiz-header'>{headerText}</h1>
      <div className='BigDiv'>
        <div className='BigDiv01'>
          <div className='BigDiv0101'>{sentence1}</div>
        </div>
        <div className='BigDiv02'>
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`BigDiv0201 ${selectedCheckbox === num ? 'selected' : ''}`}
              onClick={() => handleCheckboxChange(num)}
            >
              <div className='BigDiv020101'>{[option1, option2, option3, option4][num - 1]}</div>
            </div>
          ))}
        </div>
        <button className='button-next' onClick={onNextClick}>Next</button>
      </div>
    </div>
  );
};

export default CreateQuiz;
