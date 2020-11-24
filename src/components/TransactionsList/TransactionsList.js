import React from "react";
import "./TransactionsList.css";
import dates from "../../utils/dates";
import PropTypes from "prop-types";
//Components
import ButtonIcon from "../_Buttons/ButtonIcon";

/** Prop Types at the end of the file */
const TransactionsList = ({ transactionsListData, isEditableList, onEventCallback }) => {
   const renderHeadlines = () => {
      return (
         <tr className="transaction-table__row">
            <th className="transaction-table__headline">תאריך</th>
            <th className="transaction-table__headline">אמצעי תשלום</th>
            <th className="transaction-table__headline">קטגוריה</th>
            <th className="transaction-table__headline">תיאור</th>
            <th className="transaction-table__headline">סכום</th>
            {isEditableList ? (
               <React.Fragment>
                  <th className="transaction-table__headline"></th>
                  <th className="transaction-table__headline"></th>
               </React.Fragment>
            ) : null}
         </tr>
      );
   };

   const renderRows = () => {
      return transactionsListData.map((transaction) => {
         return (
            <tr className="transaction-table__row" key={transaction._id}>
               <td className="transaction-table__item">{dates.getAbbreviatedDate(transaction.date)} </td>
               <td className="transaction-table__item">{transaction.paymentMethod}</td>
               <td className="transaction-table__item">{transaction.category}</td>
               <td className="transaction-table__item">{transaction.description}</td>
               <td className="transaction-table__item">
                  <span className={`transaction-table__payment-item--${transaction.type}`}>
                     {transaction.totalPayment} &#x20aa;
                  </span>
               </td>
               {isEditableList ? (
                  <React.Fragment>
                     <td className="transaction-table__item">
                        <ButtonIcon
                           type="edit"
                           size="small"
                           clickHandlerCallback={() => {
                              onEventCallback("OPEN_FORM_EDIT_MODE", transaction);
                           }}
                        />
                     </td>
                     <td className="transaction-table__item">
                        <ButtonIcon
                           type="delete"
                           size="small"
                           clickHandlerCallback={() => {
                              onEventCallback("DELETE_TRANSACTION_ENDPOINT", transaction);
                           }}
                        />
                     </td>
                  </React.Fragment>
               ) : null}
            </tr>
         );
      });
   };

   return (
      <table className={`transaction-table transaction-table--${isEditableList ? "edit" : "read"}`}>
         <thead className="transaction-table__headlines">{renderHeadlines()}</thead>
         <tbody className="transaction-table__body">{renderRows()}</tbody>
      </table>
   );
};

TransactionsList.propTypes = {
   transactionsListData: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.string.isRequired,
         type: PropTypes.string.isRequired,
         description: PropTypes.string.isRequired,
         totalPayment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
         date: PropTypes.string.isRequired,
         paymentMethod: PropTypes.string.isRequired,
         category: PropTypes.string.isRequired,
      }),
   ).isRequired,
   isEditableList: PropTypes.bool.isRequired,
   onEventCallback: function (props, propName, componentName) {
      if (props.isEditableList) {
         if (!props[propName] || !(props[propName] instanceof Function))
            return new Error(
               `When ${componentName} is rendered in editable mode supply to ${propName} callback function`,
            );
      }
   },
};

export default TransactionsList;
