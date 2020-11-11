import React from "react";
import "./MonthManagerPage.css";
import dates from "../../utilities/dates";
import transactionsApi from "../../utilities/transactionsApi";
//Components
import TransactionForm from "../../components/TransactionForm/TransactionForm";
import TransactionListView from "../../components/TransactionListView/TransactionListView";
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

   onMonthStatusButtonClick = () => {
      this.setState({
         transactionForm: {
            isOpen: true,
            mode: "ADD_NEW",
            initialData: {
               _id: "",
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
      if (action === "CLOSE" || "ADD_NEW" || "EDIT") {
         this.setState({ transactionForm: { isOpen: false, mode: "", initialData: {} } });
      }
      if (action === "ADD_NEW") {
         await this.postTransactionInEndpoint(transaction);
         await this.loadMonthDataFromEndpoint();
      }
      if (action === "EDIT") {
         await this.updateTransactionInEndpoint(transaction);
         await this.loadMonthDataFromEndpoint();
      }
   };

   /** Handle Transactions List Click Events */
   handleListItemClickEvent = async (action, transaction) => {
      if (action === "editTransaction") {
         this.setState({
            transactionForm: {
               isOpen: true,
               mode: "EDIT",
               initialData: transaction,
            },
         });
      }
      if (action === "deleteTransaction") {
         await this.deleteTransactionFromEndpoint(transaction);
         await this.loadMonthDataFromEndpoint();
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
