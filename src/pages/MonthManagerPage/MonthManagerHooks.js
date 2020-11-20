import React, { useState, useEffect, useReducer } from "react";
import "./MonthManagerPage.css";
import dates from "../../utilities/dates";
import transactionsApi from "../../utilities/transactionsApi";
//Components
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
   const [monthData, setMonthData] = useState({
      transactionsList: [],
      status: { credit: 0, debit: 0, balance: 0 },
   });
   const [isMonthDataUpdated, setIsMonthDataUpdated] = useState(false);
   const [networkRequest, setNetworkRequest] = useState({ type: undefined, payload: undefined });
   const [transactionForm, dispatchTransactionForm] = useReducer(transactionFormReducer, {
      isOpen: false,
      mode: "",
      initialData: {},
   });

   const [isLoading, setIsLoading] = useState(false);
   useEffect(() => {
      console.log("Month data effect");
      const fetchMonthData = async () => {
         //SET ERROR FALSE + LOADING TRUE

         try {
            const res = await transactionsApi.getMonthData("monthStatus");
            if (res.status === 200) {
               const { monthStatus, transactionsList } = res.data;
               return setMonthData({ transactionsList: transactionsList.data, status: monthStatus });
            }
            if (res.status === 204) {
               return setMonthData({ transactionsList: [], status: { credit: 0, debit: 0, balance: 0 } });
            }
         } catch (err) {
            console.log(err);
            //SET ERROR TRUE + LOADING FALSE
         }
      };

      if (!isMonthDataUpdated) {
         fetchMonthData();
         setIsMonthDataUpdated(true);
      }
   }, [isMonthDataUpdated]);

   useEffect(() => {
      console.log("Network request effect");

      const sendRequest = async () => {
         try {
            switch (networkRequest.type) {
               case "CREATE_TRANSACTION_ENDPOINT":
                  await transactionsApi.postTransaction(networkRequest.payload);
                  break;
               case "UPDATE_TRANSACTION_ENDPOINT":
                  await transactionsApi.updateTransaction(networkRequest.payload);
                  break;
               case "DELETE_TRANSACTION_ENDPOINT":
                  await transactionsApi.deleteTransaction(networkRequest.payload);
                  break;
               default:
                  const invalidNetworkAction = new Error("Network request set with invalid action type");
                  invalidNetworkAction.name = "INVALID_NETWORK_ACTION";
                  throw invalidNetworkAction;
            }
            setIsMonthDataUpdated(false);
         } catch (err) {
            if (err.name === "INVALID_NETWORK_ACTION") {
               throw err;
            }
            console.log(err);
         }
      };

      if (networkRequest.type && networkRequest.payload) {
         sendRequest();
         setNetworkRequest({ type: undefined, payload: undefined });
      }
   }, [networkRequest]);

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
            return setNetworkRequest({ type: action, payload: transaction });
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
            return setNetworkRequest({ type: action, payload: transaction });
         default:
            throw new Error("Transactions list event handler invoked with invalid action");
      }
   };

   return (
      <div className="month-manager-page">
         <MonthStatus data={monthData.status} onButtonClickCallback={onMonthStatusButtonClick} />
         {monthData.transactionsList.length ? (
            <TransactionList
               transactionsListData={monthData.transactionsList}
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
               />
            </Modal>
         ) : null}
      </div>
   );
};
export default MonthManagerPage;
