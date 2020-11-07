import React from "react";
import "./InputField.css";
import PropTypes from "prop-types";

/** Prop Types at the end of the file */
const InputField = ({ value, config, error, onChangeCallback }) => {
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
