import React, { useState, useEffect, useReducer } from "react";
import "./MonthManagerPage.css";
import dates from "../../utils/dates";
import transactionsApi from "../../utils/transactionsApi";
//Components
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionsList/TransactionsList";
import MonthStatus from "../../components/MonthStatus/MonthStatus";
import Modal from "../../components/Modal/Modal";
import useTransactionsApi from "../../utils/custom-hook/useTransactionsApi";

const transactionFormReducer = (state, action) => {
   switch (action.type) {
      case "CLOSE_FORM":
         return { isOpen: false, mode: "", initialData: {} };
      case "OPEN_FORM_EDIT_MODE":
         return { isOpen: true, mode: "EDIT_TRANSACTION", initialData: action.payload };
      case "OPEN_FROM_CREATE_MODE":
         return {
            isOpen: true,
            mode: "CREATE_TRANSACTION",
            initialData: {
               _id: "",
               description: "",
               type: "debit",
               totalPayment: "",
               paymentMethod: "מזומן",
               date: dates.getDateInIsoFormat("currentDay"),
               category: "חשבונות",
            },
         };
      default:
         throw new Error("Transaction form state updated with invalid action");
   }
};

const MonthManagerPage = () => {
   const [transactionForm, dispatchTransactionForm] = useReducer(transactionFormReducer, {
      isOpen: false,
      mode: "",
      initialData: {},
   });

   const INITIAL_STATE = {
      transactionsList: [],
      status: { credit: 0, debit: 0, balance: 0 },
   };
   const [monthDataNew, setNetworkRequestNew] = useTransactionsApi(INITIAL_STATE);

   /** Events Handlers - Month status */
   const onMonthStatusButtonClick = () => {
      dispatchTransactionForm({ type: "OPEN_FROM_CREATE_MODE" });
   };

   /** Event Handler - Transaction Form */
   const onTransactionFormEvent = async (action, transaction) => {
      dispatchTransactionForm({ type: "CLOSE_FORM" });
      switch (action) {
         case "CLOSE_FORM":
            return;
         case "CREATE_TRANSACTION_ENDPOINT":
         case "UPDATE_TRANSACTION_ENDPOINT":
            return setNetworkRequestNew({ type: action, payload: transaction });
         default:
            throw new Error("Transaction form event handler invoked with invalid action");
      }
   };

   /** Event Handler - Transactions List */
   const onTransactionsListEvent = async (action, transaction) => {
      switch (action) {
         case "OPEN_FORM_EDIT_MODE":
            return dispatchTransactionForm({ type: action, payload: transaction });
         case "DELETE_TRANSACTION_ENDPOINT":
            return setNetworkRequestNew({ type: action, payload: transaction });
         default:
            throw new Error("Transactions list event handler invoked with invalid action");
      }
   };

   const uiActionHandler = (action) => {
      switch (action) {
         case "CLOSE_FORM":
            return dispatchTransactionForm({ type: "CLOSE_FORM" });
         case "OPEN_FROM_CREATE_MODE":
            return dispatchTransactionForm({ type: "OPEN_FROM_CREATE_MODE" });
         default:
            throw new Error("UI actions handler invoked with invalid action");
      }
   };
   const networkActionHandler = (action, transaction) => {
      switch (action) {
         case "CREATE_TRANSACTION_ENDPOINT":
         case "UPDATE_TRANSACTION_ENDPOINT":
            uiActionHandler("CLOSE_FORM");
            return setNetworkRequestNew({ type: action, payload: transaction });
         default:
            throw new Error("Network actions handler invoked with invalid action");
      }
   };

   return (
      <div className="month-manager-page">
         <MonthStatus
            data={monthDataNew.status}
            onButtonClickCallback={onMonthStatusButtonClick}
            onUiActionCallback={uiActionHandler}
         />
         {monthDataNew.transactionsList.length ? (
            <TransactionList
               transactionsListData={monthDataNew.transactionsList}
               isEditableList={true}
               onListEventCallback={onTransactionsListEvent}
            />
         ) : null}
         {transactionForm.isOpen ? (
            <Modal>
               <TransactionForm
                  formMode={transactionForm.mode}
                  transactionData={transactionForm.initialData}
                  onFormEventCallback={onTransactionFormEvent}
                  onUiActionCallback={uiActionHandler}
                  onNetworkActionCallback={networkActionHandler}
               />
            </Modal>
         ) : null}
      </div>
   );
};
export default MonthManagerPage;
