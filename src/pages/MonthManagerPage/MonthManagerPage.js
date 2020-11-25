import React, { useReducer } from "react";
import "./MonthManagerPage.css";
import dates from "../../utils/dates";
import { netReqAction } from "../../utils/constants";
import useTransactionsApi from "../../utils/custom-hook/useTransactionsApi";
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionsList/TransactionsList";
import MonthStatus from "../../components/MonthStatus/MonthStatus";
import Modal from "../../components/Modal/Modal";

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
   const INITIAL_STATE = {
      transactionsList: [],
      metadata: { credit: 0, debit: 0, balance: 0 },
   };
   const [{ monthData, isLoading, isError }, setNetworkRequest] = useTransactionsApi({
      defaultState: INITIAL_STATE,
      fetchQuery: "monthStatus",
   });

   const [transactionForm, dispatchTransactionForm] = useReducer(transactionFormReducer, {
      isOpen: false,
      mode: "",
      initialData: {},
   });

   const onEventHandler = (action, transaction) => {
      switch (action) {
         case "CLOSE_FORM":
         case "OPEN_FROM_CREATE_MODE":
         case "OPEN_FORM_EDIT_MODE":
            dispatchTransactionForm({ type: action, payload: transaction });
            break;
         case netReqAction.CREATE_TRANSACTION_ENDPOINT:
         case netReqAction.UPDATE_TRANSACTION_ENDPOINT:
            dispatchTransactionForm({ type: "CLOSE_FORM" });
            setNetworkRequest({ type: action, payload: transaction });
            break;
         case netReqAction.DELETE_TRANSACTION_ENDPOINT:
            setNetworkRequest({ type: action, payload: transaction });
            break;
         default:
            throw new Error("Event handler invoked with invalid action");
      }
      // if (netReqAction.CREATE_TRANSACTION_ENDPOINT || netReqAction.UPDATE_TRANSACTION_ENDPOINT) {
      //    setNetworkRequest({ type: action, payload: transaction });
      // } else if (netReqAction.DELETE_TRANSACTION_ENDPOINT) {
      //    dispatchTransactionForm({ type: "CLOSE_FORM" });
      //    setNetworkRequest({ type: action, payload: transaction });
      // } else if ("CLOSE_FORM" || "OPEN_FROM_CREATE_MODE" || "OPEN_FORM_EDIT_MODE") {
      //    dispatchTransactionForm({ type: action, payload: transaction });
      // } else {
      //    throw new Error("Event handler invoked with invalid action");
      // }
   };

   return (
      <div className="month-manager-page">
         {isLoading && <div>טעינה...</div>}
         {isError && <div>משהו השתבש</div>}
         <MonthStatus data={monthData.metadata} onEventCallback={onEventHandler} />
         {monthData.transactionsList.length ? (
            <TransactionList
               transactionsListData={monthData.transactionsList}
               isEditableList={true}
               onEventCallback={onEventHandler}
            />
         ) : null}
         {transactionForm.isOpen ? (
            <Modal>
               <TransactionForm
                  formMode={transactionForm.mode}
                  transactionData={transactionForm.initialData}
                  onEventCallback={onEventHandler}
               />
            </Modal>
         ) : null}
      </div>
   );
};
export default MonthManagerPage;
