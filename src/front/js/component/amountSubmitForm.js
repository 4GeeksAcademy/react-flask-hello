import React from "react";
import { useState } from "react";

export const AmountSubmit = ({ setParentAmount }) => {
 const [amount, setAmount] = useState('');

 const handleButtonClick = () => {
  setParentAmount(amount);
}

return (
  <>
    <input
    
      type="text"
      onChange={event => setAmount(event.target.value)}
      
    />
    <button 
      onClick={handleButtonClick} 
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleButtonClick();
        }
      }}
    >
      Donate
    </button>
  </>
);
}