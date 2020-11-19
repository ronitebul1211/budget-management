import React, { useState, useEffect } from "react";
import "./MonthManagerPage.css";
import dates from "../../utilities/dates";
import transactionsApi from "../../utilities/transactionsApi";
//Components
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionsList/TransactionsList";
import MonthStatus from "../../components/MonthStatus/MonthStatus";
import Modal from "../../components/Modal/Modal";

//FIXME: add prop types + refactor by conventions.txt

const MonthManagerPage = () => {
   const [monthData, setMonthData] = useState({ transactionsList: [], status: {} });
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
               return setMonthData({ transactionsList: undefined, status: undefined });
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
               break;
            case "PUT_TRANSACTION":
               break;
            case "DELETE_TRANSACTION":
               await transactionsApi.deleteTransaction(action.payload);
               setIsUpdatedData(false);
               break;
         }
      };

      if (action.type && action.payload) {
         sendRequest();
      }
   }, [action]);

   /** Events Handlers */
   const onMonthStatusButtonClick = () => {
      // this.showTransactionForm(true, "ADD_NEW");

      setAction({
         type: "DELETE_TRANSACTION",
         payload: {
            _id: "5fb441a20c08ad0017c48712",
            description: "סופר פארם",
            type: "debit",
            totalPayment: 250,
            paymentMethod: "אשראי",
            date: "2020-11-10",
            category: "קניות",
         },
      });
   };

   const onTransactionFormEvent = async (action, transaction) => {
      if (action === "CLOSE" || "SAVE_NEW" || "UPDATE") {
         this.showTransactionForm(false);
      }
      if (action === "SAVE_NEW") {
         try {
            await transactionsApi.postTransaction(transaction);
            await this.loadMonthDataFromEndpoint();
         } catch (err) {
            //TODO handle POST transaction Error
            throw err;
         }
      }
      if (action === "UPDATE") {
         try {
            await transactionsApi.updateTransaction(transaction);
            await this.loadMonthDataFromEndpoint();
         } catch (err) {
            //TODO handle PUT transaction Error
            throw err;
         }
      }
   };
   const onTransactionsListEvent = async (action, transaction) => {
      if (action === "OPEN_FORM") {
         this.showTransactionForm(true, "EDIT", transaction);
      }
      if (action === "DELETE_TRANSACTION") {
         try {
            await transactionsApi.deleteTransaction(transaction);
            await this.loadMonthDataFromEndpoint();
         } catch (err) {
            //TODO handle DELETE transaction Error
            throw err;
         }
      }
   };

   /**
    * Transaction form controller
    * @param {boolean} isOpen: show / hide form
    * @param {string} mode: "ADD_NEW" / "EDIT": pass in when isOpen=true
    * @param {object} initialData: transaction data - pass in when: isOpen=true, mode="EDIT"
    */
   const showTransactionForm = (isOpen, mode, initialData) => {
      if (isOpen) {
         if (mode === "ADD_NEW") {
            return this.setState({
               transactionForm: {
                  isOpen,
                  mode,
                  initialData: {
                     _id: "",
                     description: "",
                     type: "debit",
                     totalPayment: "",
                     paymentMethod: "מזומן",
                     date: dates.getDateInIsoFormat("currentDay"),
                     category: "חשבונות",
                  },
               },
            });
         }
         if (mode === "EDIT") {
            return this.setState({
               transactionForm: {
                  isOpen,
                  mode,
                  initialData,
               },
            });
         }
      } else {
         this.setState({ transactionForm: { isOpen: false, mode: "", initialData: {} } });
      }
   };

   return (
      <div className="month-manager-page">
         <MonthStatus
            data={monthData.status}
            test={undefined}
            onButtonClickCallback={onMonthStatusButtonClick}
         />

         {monthData.transactionsList ? (
            <TransactionList
               transactionsListData={monthData.transactionsList}
               isEditableList={true}
               onListEventCallback={onTransactionsListEvent}
            />
         ) : null}

         {false ? (
            <Modal>
               <TransactionForm
                  formMode={"ADD_NEW"}
                  transactionData={{
                     _id: "",
                     description: "",
                     type: "debit",
                     totalPayment: "",
                     paymentMethod: "מזומן",
                     date: dates.getDateInIsoFormat("currentDay"),
                     category: "חשבונות",
                  }}
                  onFormEventCallback={onTransactionFormEvent}
               />
            </Modal>
         ) : null}
      </div>
   );
};
export default MonthManagerPage;
