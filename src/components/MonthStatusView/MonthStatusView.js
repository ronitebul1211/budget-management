import React from "react";
import "./MonthStatusView.css";
import { getCurrentMonth, getCurrentYear, getMonthNameInHebrew } from "../../utilities/functions";
//Components

//FIXME: add prop types + refactor by conventions.txt

import ButtonIcon from "../_Buttons/ButtonIcon";

const MonthStatus = ({ monthStatusData, handleAddTransactionClickCallback }) => {
   return (
      <div className="month-status">
         <h1 className="month-status__title">{`${getMonthNameInHebrew(
            getCurrentMonth(),
         )}, ${getCurrentYear()}`}</h1>
         <div className="month-status__status-section">
            <div className="month-status__status-item">
               <span className="month-status__status-item-title">תקציב</span>
               <span className="month-status__status-item-content">{monthStatusData.credit} &#x20aa;</span>
            </div>
            <div className="month-status__status-item">
               <span className="month-status__status-item-title">הוצאות</span>
               <span className="month-status__status-item-content--debit">
                  {monthStatusData.debit} &#x20aa;
               </span>
            </div>

            <div className="month-status__status-item">
               <span className="month-status__status-item-title">יתרה</span>
               <span
                  className={`month-status__status-item-content--${
                     monthStatusData.balance > 0 ? "credit" : "debit"
                  }`}>
                  {monthStatusData.balance} &#x20aa;
               </span>
            </div>
            <div className="month-status__add-btn-container">
               <ButtonIcon type="add" size="big" clickHandlerCallback={handleAddTransactionClickCallback} />
            </div>
         </div>
      </div>
   );
};

export default MonthStatus;
