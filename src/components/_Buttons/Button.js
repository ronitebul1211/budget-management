import React from "react";
import "./Button.css";

/**
 Props:
 displayMode {string}: 'normal' / 'danger' / 'success'
 text {string} 
 clickHandler: callback function to invoke on click 
*/
//FIXME: add prop types + refactor by conventions.txt

const Button = ({ text, displayMode, clickHandlerCallback }) => {
   return (
      <button className={`button button--${displayMode}`} onClick={clickHandlerCallback}>
         {text}
      </button>
   );
};

export default Button;
