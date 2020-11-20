import React, { useState, useEffect, useReducer } from "react";
import "./MonthManagerPage.css";
import dates from "../../utilities/dates";
import transactionsApi from "../../utilities/transactionsApi";
//Components
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionsList/TransactionsList";
import MonthStatus from "../../components/MonthStatus/MonthStatus";
import Modal from "../../components/Modal/Modal";

//FIXME: add prop types + refactor by conventions.txt

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
   const [isUpdatedData, setIsUpdatedData] = useState(false);
   const [transactionForm, dispatchTransactionForm] = useReducer(transactionFormReducer, {
      isOpen: false,
      mode: "",
      initialData: {},
   });
   const [action, setAction] = useState({ type: undefined, payload: undefined });

   useEffect(() => {
      console.log("GET effect");
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
            //SET LOADING FALSE
         } catch (err) {
            console.log(err);
            //SET ERROR TRUE + LOADING FALSE
         }
      };

      if (!isUpdatedData) {
         console.log("fetch data ...");
         fetchMonthData();
         setIsUpdatedData(true);
      }
   }, [isUpdatedData]);

   useEffect(() => {
      console.log("ACTION effect + payload");

      const sendRequest = async () => {
         console.log("send api request");
         switch (action.type) {
            case "CREATE_TRANSACTION_ENDPOINT":
               await transactionsApi.postTransaction(action.payload);
               break;
            case "UPDATE_TRANSACTION_ENDPOINT":
               await transactionsApi.updateTransaction(action.payload);
               break;
            case "DELETE_TRANSACTION_ENDPOINT":
               await transactionsApi.deleteTransaction(action.payload);
               break;
            default:
               throw new Error("Invalid action type");
         }
         setIsUpdatedData(false);
      };

      if (action.type && action.payload) {
         sendRequest();
      }
   }, [action]);

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
            return setAction({ type: action, payload: transaction });
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
            return setAction({ type: action, payload: transaction });
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
