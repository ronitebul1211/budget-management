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

function transactionFormReducer(state, action) {
   switch (action.type) {
      case "CLOSE":
         return { isOpen: false, mode: "", initialData: {} };
      case "OPEN_AND_EDIT":
         return { isOpen: true, mode: "EDIT", initialData: action.payload };
      case "OPEN_AND_CREATE":
         return {
            isOpen: true,
            mode: "ADD_NEW",
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
         throw new Error();
   }
}

const MonthManagerPage = () => {
   const [monthData, setMonthData] = useState({
      transactionsList: [],
      status: { credit: 0, debit: 0, balance: 0 },
   });
   const [isUpdatedData, setIsUpdatedData] = useState(false);
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

   const [action, setAction] = useState({ type: undefined, payload: undefined });
   useEffect(() => {
      console.log("ACTION effect + payload");

      const sendRequest = async () => {
         console.log("send api request");
         switch (action.type) {
            case "POST_TRANSACTION":
               await transactionsApi.postTransaction(action.payload);
               setIsUpdatedData(false);
               break;
            case "PUT_TRANSACTION":
               await transactionsApi.updateTransaction(action.payload);
               setIsUpdatedData(false);
               break;
            case "DELETE_TRANSACTION":
               await transactionsApi.deleteTransaction(action.payload);
               setIsUpdatedData(false);
               break;
            default:
               throw new Error("Invalid action type");
         }
      };

      if (action.type && action.payload) {
         sendRequest();
      }
   }, [action]);

   const [transactionForm, dispatchTransactionForm] = useReducer(transactionFormReducer, {
      isOpen: false,
      mode: "",
      initialData: {},
   });

   /** Events Handlers */
   const onMonthStatusButtonClick = () => {
      dispatchTransactionForm({ type: "OPEN_AND_CREATE" });
   };

   const onTransactionFormEvent = async (action, transaction) => {
      if (action === "CLOSE") {
         dispatchTransactionForm({ type: "CLOSE" });
      }
      if (action === "SAVE_NEW") {
         dispatchTransactionForm({ type: "CLOSE" });
         setAction({ type: "POST_TRANSACTION", payload: transaction });
      }
      if (action === "UPDATE") {
         dispatchTransactionForm({ type: "CLOSE" });
         setAction({ type: "PUT_TRANSACTION", payload: transaction });
      }
   };

   const onTransactionsListEvent = async (action, transaction) => {
      if (action === "OPEN_FORM") {
         dispatchTransactionForm({ type: "OPEN_AND_EDIT", payload: transaction });
      }
      if (action === "DELETE_TRANSACTION") {
         setAction({ type: "DELETE_TRANSACTION", payload: transaction });
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
