import React from "react";
import "./MonthManagerPage.css";
import dates from "../../utilities/dates";
import transactionsApi from "../../utilities/transactionsApi";
//Components
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionList from "../../components/TransactionsList/TransactionsList";
import MonthStatus from "../../components/MonthStatus/MonthStatus";
import Modal from "../../components/Modal/Modal";

//FIXME: add prop types + refactor by conventions.txt

class MonthManagerPage extends React.Component {
   state = {
      monthStatusData: { debit: 0, credit: 0, balance: 0 },
      transactionsListData: [],
      transactionForm: { isOpen: false, mode: "", initialData: {} },
   };

   async componentDidMount() {
      this.loadMonthDataFromEndpoint();
   }

   /** Events Handlers */
   onMonthStatusButtonClick = () => {
      this.showTransactionForm(true, "ADD_NEW");
   };
   onTransactionFormEvent = async (action, transaction) => {
      if (action === "CLOSE" || "SAVE_NEW" || "UPDATE") {
         this.showTransactionForm(false);
      }
      if (action === "SAVE_NEW") {
         await this.postTransactionInEndpoint(transaction);
         await this.loadMonthDataFromEndpoint();
      }
      if (action === "UPDATE") {
         await this.updateTransactionInEndpoint(transaction);
         await this.loadMonthDataFromEndpoint();
      }
   };
   onTransactionsListEvent = async (action, transaction) => {
      if (action === "OPEN_FORM") {
         this.showTransactionForm(true, "EDIT", transaction);
      }
      if (action === "DELETE_TRANSACTION") {
         await this.deleteTransactionFromEndpoint(transaction);
         await this.loadMonthDataFromEndpoint();
      }
   };

   /**
    * Transaction form controller
    * @param {boolean} isOpen: show / hide form
    * @param {string} mode: "ADD_NEW" / "EDIT": pass in when isOpen=true
    * @param {object} initialData: transaction data - pass in when: isOpen=true, mode="EDIT"
    */
   showTransactionForm = (isOpen, mode, initialData) => {
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

   /** Endpoint Request */
   loadMonthDataFromEndpoint = async () => {
      const currentDate = dates.getDateData();
      await transactionsApi
         .getTransactionsList(currentDate.month, currentDate.year, "monthStatus")
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
   postTransactionInEndpoint = async (transaction) => {
      delete transaction._id;
      await transactionsApi.postTransaction(transaction).catch((err) => {
         //TODO handle POST transaction Error
         throw err;
      });
   };
   updateTransactionInEndpoint = async (transaction) => {
      const transactionId = transaction._id;
      delete transaction._id;
      await transactionsApi.updateTransaction(transaction, transactionId).catch((err) => {
         //TODO handle PUT transaction Error
         throw err;
      });
   };
   deleteTransactionFromEndpoint = async (transaction) => {
      const transactionId = transaction._id;
      delete transaction._id;
      await transactionsApi.deleteTransaction(transaction, transactionId).catch((err) => {
         //TODO handle DELETE transaction Error
         throw err;
      });
   };

   render() {
      return (
         <div className="month-manager-page">
            <MonthStatus
               data={this.state.monthStatusData}
               onButtonClickCallback={this.onMonthStatusButtonClick}
            />

            {this.state.transactionsListData.length ? (
               <TransactionList
                  transactionsListData={this.state.transactionsListData}
                  isEditableList={true}
                  onListEventCallback={this.onTransactionsListEvent}
               />
            ) : null}

            {this.state.transactionForm.isOpen ? (
               <Modal isOpen={this.state.transactionForm.isOpen}>
                  <TransactionForm
                     formMode={this.state.transactionForm.mode}
                     transactionData={this.state.transactionForm.initialData}
                     onFormEventCallback={this.onTransactionFormEvent}
                  />
               </Modal>
            ) : null}
         </div>
      );
   }
}
export default MonthManagerPage;
