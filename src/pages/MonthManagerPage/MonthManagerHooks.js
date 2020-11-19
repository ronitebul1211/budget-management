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
   //  state = {
   //     monthStatusData: { debit: 0, credit: 0, balance: 0 },
   //     transactionsListData: [],
   //     transactionForm: { isOpen: false, mode: "", initialData: {} },
   //  };

   const [monthData, setMonthData] = useState({ transactionsList: [], metadata: {} });
   const [isUpdatedData, setIsUpdatedData] = useState(false);

   useEffect(() => {
      const fetchMonthData = async () => {
         //SET ERROR FALSE + LOADING TRUE
         //TODO: default for current in transactions api

         try {
            const response = await transactionsApi.getMonthData("monthStatus");
            const object = response.data;
            console.log(object);
         } catch (err) {
            console.log(err);
         }
      };

      if (!isUpdatedData) {
         console.log("fetch data ...");
         //  setMonthData((pervState) => {
         //     const updated = [...pervState.transactionsList, 1];
         //     return { ...pervState, transactionsList: updated };
         //  });
         fetchMonthData();
         setIsUpdatedData(true);
      }
   }, [isUpdatedData]);

   /** Events Handlers */
   const onMonthStatusButtonClick = () => {
      // this.showTransactionForm(true, "ADD_NEW");
      console.log("TEST -> update request");
      setIsUpdatedData(false);
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

   /** Load updated data from endpoint */
   const loadMonthDataFromEndpoint = async () => {
      await transactionsApi
         .getMonthData("monthStatus")
         .then((res) => {
            if (res.status === 200) {
               const { monthStatus, transactionsList } = res.data;
               this.setState({
                  monthStatusData: monthStatus,
                  transactionsListData: transactionsList.data,
               });
            }
            if (res.status === 204) {
               this.setState({
                  monthStatusData: { debit: 0, credit: 0, balance: 0 },
                  transactionsListData: [],
               });
            }
         })
         .catch((err) => {
            //TODO handle GET transactions list Error
            throw err;
         });
   };

   return (
      <div className="month-manager-page">
         <MonthStatus
            data={{ debit: 0, credit: 0, balance: 0 }}
            onButtonClickCallback={onMonthStatusButtonClick}
         />

         {"NO DATA" ? (
            <TransactionList
               transactionsListData={[]}
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
