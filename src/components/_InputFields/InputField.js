import React from 'react';
import './InputField.css'


const InputField = ({value, config, onChangeCallback}) => {

  return(
    <div className={`field field--${config.displayMode}`}>
      <label className="field__label-section">{config.label}</label>
      <input 
        className="field__input-section field__input-area" 
        value={value} 
        type={config.type} 
        name={config.name}
        onChange={onChangeCallback}  
      />
    </div>
  );
}

export default InputField;