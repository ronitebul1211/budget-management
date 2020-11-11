import React from "react";
import "./TransactionsList.css";
import dates from "../../utilities/dates";
//Components
import ButtonIcon from "../_Buttons/ButtonIcon";

//FIXME: add prop types + refactor by conventions.txt

const TransactionsList = ({ transactionsListData, isEditableList, onListEventCallback }) => {
   const renderedTableRows = transactionsListData.map((transaction) => {
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
                           onListEventCallback("editTransaction", transaction);
                        }}
                     />
                  </td>
                  <td className="transaction-table__item">
                     <ButtonIcon
                        type="delete"
                        size="small"
                        clickHandlerCallback={() => {
                           onListEventCallback("deleteTransaction", transaction);
                        }}
                     />
                  </td>
               </React.Fragment>
            ) : null}
         </tr>
      );
   });

   return (
      <table className={`transaction-table transaction-table--${isEditableList ? "edit" : "read"}`}>
         <thead className="transaction-table__headlines">
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
         </thead>
         <tbody className="transaction-table__body">{renderedTableRows}</tbody>
      </table>
   );
};

export default TransactionsList;
