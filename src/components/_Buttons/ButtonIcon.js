import React from "react";
import "./ButtonIcon.css";

//FIXME: add prop types + refactor by conventions.txt

const ButtonIcon = ({ type, size, clickHandlerCallback }) => {
   const renderButtonType = () => {
      switch (type) {
         case "delete":
            return <i className="far fa-trash-alt"></i>;
         case "edit":
            return <i className="far fa-edit"></i>;
         case "add":
            return <i className="fas fa-plus"></i>;

         default:
            throw Error("passed invalid type");
      }
   };

   return (
      <button className={`button-icon button-icon--${size}`} onClick={clickHandlerCallback}>
         {renderButtonType()}
      </button>
   );
};

export default ButtonIcon;
