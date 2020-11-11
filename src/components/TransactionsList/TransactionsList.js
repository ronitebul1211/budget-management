import React from "react";
import "./TransactionsList.css";
import dates from "../../utilities/dates";
//Components
import ButtonIcon from "../_Buttons/ButtonIcon";

//FIXME: add prop types + refactor by conventions.txt

const TransactionsList = ({ transactions, mode, handleListItemClickEventCallback }) => {
   const renderedTableRows = transactions.map((transaction) => {
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
            {mode === "edit" && (
               <React.Fragment>
                  <td className="transaction-table__item">
                     <ButtonIcon
                        type="edit"
                        size="small"
                        clickHandlerCallback={() => {
                           handleListItemClickEventCallback("editTransaction", transaction);
                        }}
                     />
                  </td>
                  <td className="transaction-table__item">
                     <ButtonIcon
                        type="delete"
                        size="small"
                        clickHandlerCallback={() => {
                           handleListItemClickEventCallback("deleteTransaction", transaction);
                        }}
                     />
                  </td>
               </React.Fragment>
            )}
         </tr>
      );
   });

   return (
      <table className={`transaction-table transaction-table--${mode}`}>
         <thead className="transaction-table__headlines">
            <tr className="transaction-table__row">
               <th className="transaction-table__headline">תאריך</th>
               <th className="transaction-table__headline">אמצעי תשלום</th>
               <th className="transaction-table__headline">קטגוריה</th>
               <th className="transaction-table__headline">תיאור</th>
               <th className="transaction-table__headline">סכום</th>
               {mode === "edit" && (
                  <React.Fragment>
                     <th className="transaction-table__headline"></th>
                     <th className="transaction-table__headline"></th>
                  </React.Fragment>
               )}
            </tr>
         </thead>
         <tbody className="transaction-table__body">{renderedTableRows}</tbody>
      </table>
   );
};

export default TransactionsList;
