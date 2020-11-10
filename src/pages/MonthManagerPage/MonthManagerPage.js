import React from "react";
import "./MonthManagerPage.css";
import dates from "../../utilities/dates";
import transactionsApi from "../../utilities/transactionsApi";

import { addTransaction, deleteTransaction, updateTransaction } from "../../utilities/budgetApi";

//Components
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionListView from "../../components/TransactionListView/TransactionListView";
import MonthStatus from "../../components/MonthStatus/MonthStatus";
import Modal from "../../components/Modal/Modal";

//FIXME: add prop types + refactor by conventions.txt

class MonthManagerPage extends React.Component {
   //TODO Save in state year: num, month: num. pass it in api call and to month status view
   /**
    * state:

    transactionsListData: [],
    monthStatusData: {credit: , debit:, balance}
    * transactionFormModal: {
    *    isModalOpen: bool,
    *    formMode: "add/edit"
    *    transactionData: {}
    * }
    */
   state = {
      isFormModalOpen: false,
      formModalMode: "",
      formModalData: {},

      monthStatusData: { debit: 0, credit: 0, balance: 0 },
      transactionsListData: [],
      transactionForm: { isOpen: false, mode: "", initialData: {} },
   };

   async componentDidMount() {
      this.loadMonthData();
   }

   onMonthStatusButtonClick = () => {
      this.setState({
         transactionForm: {
            isOpen: true,
            mode: "ADD_NEW",
            initialData: {
               id: "",
               description: "",
               type: "חובה",
               totalPayment: "",
               paymentMethod: "מזומן",
               date: dates.getDateInIsoFormat("currentDay"),
               category: "חשבונות",
            },
         },
      });
   };

   onTransactionFormEvent = async (action, transaction) => {
      console.log(transaction);
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

   /**
    * Get from endpoint current month data and update UI
    */
   loadMonthData = async () => {
      const currentDate = dates.getCurrentDate();
      await transactionsApi
         .getTransactionsList(currentDate.month, currentDate.year, "monthStatus")
         .then((response) => {
            console.log(response);
            if (response.status === 200) {
               const { monthStatus, transactionsList } = response.data;
               this.setState({
                  monthStatus,
                  transactionsListData: transactionsList.data,
               });
            }
            if (response.status === 204) {
               this.setState({
                  monthStatusData: { debit: 0, credit: 0, balance: 0 },
                  transactionsListData: [],
               });
            }
         })
         .catch((error) => {
            //TODO: Redirect to other page
            throw error;
         });
   };

   render() {
      return (
         <div className="month-manager-page">
            <MonthStatus
               data={this.state.monthStatusData}
               onButtonClickCallback={this.onMonthStatusButtonClick}
            />
            <TransactionListView
               transactions={this.state.transactionsListData}
               mode="edit"
               handleListItemClickEventCallback={this.handleListItemClickEvent}
            />
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
