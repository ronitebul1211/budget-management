import React from "react";
import "./InputField.css";
import PropTypes from "prop-types";

/**
 For Valid Types, check Prop Types
 
 # value -> initial input value (required)
 # config.label -> field label (required)
   config.displayMode -> display mode of the label relative to the input field (required)
   config.name -> input name (event.target.name) (required)
   config.type -> input type (required)
   config.limitMin -> limit input type html attribute (optional)
   config.limitMax -> limit input type html attribute (optional)
 # error.message -> string message to display when input error (optional)
   error.isDisplayed -> boolean set display / hide (optional)
 # onChangeCallback -> reference to callback function that handle on change event (required)

 */

const InputField = ({ value, config, error, onChangeCallback }) => {
   console.log(config.name + error);

   return (
      <div className={`field field--${config.displayMode} ${error && error.isDisplayed && "field--error"}`}>
         <label className="field__label-section">{config.label}</label>
         <input
            className="field__input-section field__input-area"
            value={value}
            type={config.type}
            name={config.name}
            onChange={onChangeCallback}
            {...(config.limitMin ? { min: config.limitMin } : {})}
            {...(config.limitMax ? { max: config.limitMax } : {})}
         />
         {error && error.isDisplayed && <div className="field__error-message">{error.message}</div>}
      </div>
   );
};

InputField.propTypes = {
   value: PropTypes.string.isRequired,
   config: PropTypes.shape({
      label: PropTypes.string.isRequired,
      displayMode: PropTypes.oneOf(["row", "column"]).isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["text", "number", "date"]).isRequired,
      limitMin: PropTypes.string,
      limitMax: PropTypes.string,
   }).isRequired,
   error: PropTypes.shape({
      message: PropTypes.string.isRequired,
      isDisplayed: PropTypes.bool.isRequired,
   }),
   onChangeCallback: PropTypes.func.isRequired,
};

export default InputField;
