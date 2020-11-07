import React from "react";
import "./MonthManagerPage.css";
import dates from "../../utilities/dates";

import {
   getTransactionsId,
   getTransactionsData,
   addTransaction,
   deleteTransaction,
   updateTransaction,
} from "../../utilities/budgetApi";
import {
   sortTransactionsByDate,
   getMonthStatus,
   getCurrentYear,
   getCurrentMonth,
} from "../../utilities/functions";
//Components
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionListView from "../../components/TransactionListView/TransactionListView";
import MonthStatus from "../../components/MonthStatusView/MonthStatusView";
import Modal from "../../components/Modal/Modal";

class MonthManagerPage extends React.Component {
   state = {
      transactionsDataId: "",
      transactionsData: [],
      monthStatusData: {},
      isFormModalOpen: false,
      formModalMode: "",
      formModalData: {},
   };

   async componentDidMount() {
      await this.setTransactionsDataId();
      await this.setUpdatedData();
   }

   /** When user Click on Add (+) Open modal with add New Transaction Ui */
   handleAddTransactionClick = () => {
      this.setState({
         isFormModalOpen: true,
         formModalMode: "addTransaction",
         formModalData: {
            id: "",
            type: "חובה",
            description: "",
            payment: "",
            date: dates.getDateInIsoFormat("currentDay"),
            paymentMethod: "מזומן",
            category: "חשבונות",
         },
      });
   };

   /** Handle Add Transaction Form Click Events
    # closeForm event: close form modal
    # addTransaction / updateTransaction: close form modal, send transaction data to endpoint, update transactions list
    */
   handleAddTransactionFormEvents = async (action, transaction) => {
      this.setState({ isFormModalOpen: false });
      if (action === "addTransaction") {
         await addTransaction(this.state.transactionsDataId, transaction);
         this.setUpdatedData();
      }
      if (action === "editTransaction") {
         await updateTransaction(this.state.transactionsDataId, transaction);
         this.setUpdatedData();
      }
   };

   /** Handle Transactions List Click Events */
   handleListItemClickEvent = async (action, transaction) => {
      if (action === "editTransaction") {
         this.setState({
            isFormModalOpen: true,
            formModalMode: "editTransaction",
            formModalData: transaction,
         });
      }
      if (action === "deleteTransaction") {
         await deleteTransaction(this.state.transactionsDataId, transaction.id);
         this.setUpdatedData();
      }
   };

   /** Get transactions data id for current month & year and Set transactions id in state */
   setTransactionsDataId = async () => {
      const currentYear = getCurrentYear();
      const currentMonth = getCurrentMonth();
      const transactionsDataId = await getTransactionsId(currentMonth, currentYear);
      this.setState({ transactionsDataId });
   };

   /** Get transactions Data & Month status and set it in state */
   setUpdatedData = async () => {
      await this.setUpdatedTransactionsData();
      this.setUpdatedMonthStatusData();
   };

   /** Set state with updated transactions data Sorted by date */
   setUpdatedTransactionsData = async () => {
      const transactionsData = await getTransactionsData(this.state.transactionsDataId);
      sortTransactionsByDate(transactionsData);
      this.setState({ transactionsData });
   };

   /** Set state with updated month status data: (credit, debit and balance) */
   setUpdatedMonthStatusData = () => {
      const monthStatusData = getMonthStatus(this.state.transactionsData);
      this.setState({ monthStatusData });
   };

   render() {
      return (
         <div className="month-manager-page">
            <MonthStatus
               monthStatusData={this.state.monthStatusData}
               handleAddTransactionClickCallback={this.handleAddTransactionClick}
            />
            <TransactionListView
               transactions={this.state.transactionsData}
               mode="edit"
               handleListItemClickEventCallback={this.handleListItemClickEvent}
            />
            {this.state.isFormModalOpen ? (
               <Modal isOpen={this.state.isFormModalOpen}>
                  <TransactionForm
                     formMode={this.state.formModalMode}
                     transactionData={this.state.formModalData}
                     onButtonClickCallback={this.handleAddTransactionFormEvents}
                  />
               </Modal>
            ) : null}
         </div>
      );
   }
}
export default MonthManagerPage;
