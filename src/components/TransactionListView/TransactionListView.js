import React from "react";
import "./TransactionListView.css";
import dates from "../../utilities/dates";
//Components
import ButtonIcon from "../_Buttons/ButtonIcon";

//FIXME: add prop types + refactor by conventions.txt

const TransactionListView = ({ transactions, mode, handleListItemClickEventCallback }) => {
   const renderedTableRows = transactions.map((transaction) => {
      return (
         <tr className="transaction-table__row" key={transaction._id}>
            <td className="transaction-table__row-item">{dates.getAbbreviatedDate(transaction.date)} </td>
            <td className="transaction-table__row-item">{transaction.paymentMethod}</td>
            <td className="transaction-table__row-item">{transaction.category}</td>
            <td className="transaction-table__row-item">{transaction.description}</td>
            <td className="transaction-table__row-item">
               <span className={`transaction-table__payment--${transaction.type}`}>
                  {" "}
                  {transaction.totalPayment} &#x20aa;
               </span>
            </td>
            {mode === "edit" && (
               <React.Fragment>
                  <td className="transaction-table__row-item">
                     <ButtonIcon
                        type="edit"
                        size="small"
                        clickHandlerCallback={() => {
                           handleListItemClickEventCallback("editTransaction", transaction);
                        }}
                     />
                  </td>
                  <td className="transaction-table__row-item">
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
         <thead className="transaction-table__header">
            <tr className="transaction-table__row">
               <th className="transaction-table__header-item">תאריך</th>
               <th className="transaction-table__header-item">אמצעי תשלום</th>
               <th className="transaction-table__header-item">קטגוריה</th>
               <th className="transaction-table__header-item">תיאור</th>
               <th className="transaction-table__header-item">סכום</th>
               {mode === "edit" && (
                  <React.Fragment>
                     <th className="transaction-table__header-item"></th>
                     <th className="transaction-table__header-item"></th>
                  </React.Fragment>
               )}
            </tr>
         </thead>
         <tbody className="transaction-table__body">{renderedTableRows}</tbody>
      </table>
   );
};

export default TransactionListView;
