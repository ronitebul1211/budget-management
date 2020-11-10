import React from "react";
import "./MonthStatusView.css";
import dates from "../../utilities/dates";
//Components
import ButtonIcon from "../_Buttons/ButtonIcon";

//FIXME: add prop types + refactor by conventions.txt

const MonthStatus = ({ currentDate, data, onButtonClickCallback }) => {
   return (
      <div className="month-status">
         <h1 className="month-status__title">
            {`${dates.getHebrewMonthName(currentDate.month)}, ${currentDate.year}`}
         </h1>

         <div className="month-status__content">
            <div className="month-status__item">
               <span className="month-status__item-title">תקציב</span>
               <span className="month-status__item-content">{data.credit} &#x20aa;</span>
            </div>
            <div className="month-status__item">
               <span className="month-status__item-title">הוצאות</span>
               <span className="month-status__item-content--debit">{data.debit} &#x20aa;</span>
            </div>

            <div className="month-status__item">
               <span className="month-status__item-title">יתרה</span>
               <span className={`month-status__item-content--${data.balance > 0 ? "credit" : "debit"}`}>
                  {data.balance} &#x20aa;
               </span>
            </div>
            <div className="month-status__btn-container">
               <ButtonIcon type="add" size="big" clickHandlerCallback={onButtonClickCallback} />
            </div>
         </div>
      </div>
   );
};

export default MonthStatus;
