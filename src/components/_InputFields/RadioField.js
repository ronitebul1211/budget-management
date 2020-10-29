import React from 'react';
import './RadioField.css'
//Components

/**
 Type 'date' -> content {label:'', value:''}  config{inputName:'', displayMode: 'row' / 'column'} 
 */
const RadioField = ({selectedValue, content, config, onChangeCallback}) => {

  const renderedRadioOptions = content.options.map((option, index) => {
    return(
      <div className="field__radio-option" key={index}>
        
          <input 
            className="field__radio-option__input"
            value={option.value}
            type="radio"  
            name={config.inputName} 
            checked={option.value === selectedValue}
            onChange={onChangeCallback}
          />
        
        <label className="field__radio-option__label">{option.label}</label>
      </div>
    );
  })
    
  return(
   <div className={`field field--${config.displayMode.field}`}>
        <label className="field__label-section">{content.label}</label>
        <div className={`field__input-section field__radio-options field__radio-options--${config.displayMode.options}`}>
          {renderedRadioOptions}
        </div>   
   </div>
  );
}

export default RadioField;