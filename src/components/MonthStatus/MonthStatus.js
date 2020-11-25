import React from "react";
import "./MonthStatus.css";
import PropTypes from "prop-types";
import dates from "../../utils/dates";
//Components
import ButtonIcon from "../_Buttons/ButtonIcon";
import { formControllerAction } from "../../utils/constants";

/** Prop Types at the end of the file */
const MonthStatus = ({ data, onEventCallback }) => {
   const currentDate = dates.getDateData();
   return (
      <div className="month-status">
         <h1 className="month-status__title">
            {`${dates.getHebrewMonthName(currentDate.month)}, ${currentDate.year}`}
         </h1>
         <div className="month-status__content">
            <div className="month-status__item">
               <span className="month-status__item-title">תקציב</span>
               <span className="month-status__item-content--neutral">{data.credit} &#x20aa;</span>
            </div>
            <div className="month-status__item">
               <span className="month-status__item-title">הוצאות</span>
               <span className={`month-status__item-content--${data.debit > 0 ? "debit" : "neutral"}`}>
                  {data.debit} &#x20aa;
               </span>
            </div>
            <div className="month-status__item">
               <span className="month-status__item-title">יתרה</span>
               <span
                  className={`month-status__item-content--${
                     data.balance > 0 ? "credit" : data.balance < 0 ? "debit" : "neutral"
                  }`}>
                  {data.balance} &#x20aa;
               </span>
            </div>

            <div className="month-status__btn-container">
               <ButtonIcon
                  type="add"
                  size="big"
                  clickHandlerCallback={() => {
                     onEventCallback(formControllerAction.OPEN_FROM_CREATE_MODE);
                  }}
               />
            </div>
         </div>
         {!data.credit && !data.debit && !data.balance ? (
            <p className="month-status__message">
               {"אין תנועות עבור חודש " +
                  dates.getHebrewMonthName(currentDate.month) +
                  ", לחץ על כפתור + כדי להתחיל לעקוב אחר התקציב החודשי"}
            </p>
         ) : null}
      </div>
   );
};

MonthStatus.propTypes = {
   data: PropTypes.shape({
      credit: PropTypes.number.isRequired,
      debit: PropTypes.number.isRequired,
      balance: PropTypes.isRequired,
   }).isRequired,
   onEventCallback: PropTypes.func.isRequired,
};

export default MonthStatus;
