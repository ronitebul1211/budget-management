import React from "react";
import "./SelectField.css";

//FIXME: add prop types + refactor by conventions.txt

/** Select Field Component:
# Props:
- value - string - initial value
- options - array of option obj - {label: '', value: ''}
- config - config object - {fieldLabel: "", inputName: "", displayMode: "column" / "row" }
- onChangeCallback - function ref - to get update when option input change         
*/

const SelectField = ({ value, options, config, onChangeCallback }) => {
   const renderedOptionsList = options.map((option, index) => {
      return (
         <option key={index} value={option.value}>
            {option.label}
         </option>
      );
   });

   return (
      <div className={`field field--${config.displayMode}`}>
         <label className="field__label-section">{config.fieldLabel}</label>
         <select
            className="field__input-section"
            value={value}
            name={config.inputName}
            onChange={onChangeCallback}>
            {renderedOptionsList}
         </select>
      </div>
   );
};

export default SelectField;
