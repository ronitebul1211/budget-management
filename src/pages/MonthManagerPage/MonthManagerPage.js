import React from "react";
import "./MonthManagerPage.css";
import dates from "../../utils/dates";
import transactionsApi from "../../utils/transactionsApi";
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
      this.showTransactionForm(true, "CREATE_TRANSACTION");
   };

   onTransactionFormEvent = async (action, transaction) => {
      if (action === "CLOSE_FORM" || "CREATE_TRANSACTION_ENDPOINT" || "UPDATE_TRANSACTION_ENDPOINT") {
         this.showTransactionForm(false);
      }
      if (action === "CREATE_TRANSACTION_ENDPOINT") {
         try {
            await transactionsApi.postTransaction(transaction);
            await this.loadMonthDataFromEndpoint();
         } catch (err) {
            //TODO handle POST transaction Error
            throw err;
         }
      }
      if (action === "UPDATE_TRANSACTION_ENDPOINT") {
         try {
            await transactionsApi.updateTransaction(transaction);
            await this.loadMonthDataFromEndpoint();
         } catch (err) {
            //TODO handle PUT transaction Error
            throw err;
         }
      }
   };
   onTransactionsListEvent = async (action, transaction) => {
      if (action === "OPEN_FORM_EDIT_MODE") {
         this.showTransactionForm(true, "EDIT_TRANSACTION", transaction);
      }
      if (action === "DELETE_TRANSACTION_ENDPOINT") {
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
    * @param {string} mode: "CREATE_TRANSACTION" / "EDIT_TRANSACTION": pass in when isOpen=true
    * @param {object} initialData: transaction data - pass in when: isOpen=true, mode="EDIT_TRANSACTION"
    */
   showTransactionForm = (isOpen, mode, initialData) => {
      if (isOpen) {
         if (mode === "CREATE_TRANSACTION") {
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
         if (mode === "EDIT_TRANSACTION") {
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
   loadMonthDataFromEndpoint = async () => {
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

   render() {
      const { monthStatusData, transactionsListData, transactionForm } = this.state;
      return (
         <div className="month-manager-page">
            <MonthStatus data={monthStatusData} onButtonClickCallback={this.onMonthStatusButtonClick} />

            {this.state.transactionsListData.length ? (
               <TransactionList
                  transactionsListData={transactionsListData}
                  isEditableList={true}
                  onListEventCallback={this.onTransactionsListEvent}
               />
            ) : null}

            {transactionForm.isOpen ? (
               <Modal>
                  <TransactionForm
                     formMode={transactionForm.mode}
                     transactionData={transactionForm.initialData}
                     onFormEventCallback={this.onTransactionFormEvent}
                  />
               </Modal>
            ) : null}
         </div>
      );
   }
}
export default MonthManagerPage;
