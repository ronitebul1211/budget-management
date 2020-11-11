import axios from "axios";
import dates from "./dates";

const BASE_URL = "https://roni-budget-managment.herokuapp.com";

/**
 * GET - transactions list for month, year
 * @param month {number} - requested month
 * @param year {number} - requested year
 * @param metadata {string} - "monthStatus" -> response with extra data (credit, debit, balance)
 */
const getTransactionsList = async (month, year, metadata) => {
   return axios.get(`${BASE_URL}/api/transactions-lists/${year}/${month}`, {
      params: { metadata },
   });
};

/**
 * POST - transaction in the corresponding list by transaction date
 * @param {object} transaction: {
      description: {string},
      type: {string},
      totalPayment: {string},
      paymentMethod: {string},
      date: {string - ISO format},
      category: {string},
   }
 */
const postTransaction = async (transaction) => {
   const transactionDate = dates.getDateData(transaction.date);
   return axios.post(
      `${BASE_URL}/api/transactions-lists/${transactionDate.year}/${transactionDate.month}`,
      transaction,
   );
};

/**
 * PUT - update transaction in the corresponding list by transaction date, id
 * @param {object} transaction: {
      description: {string},
      type: {string},
      totalPayment: {string},
      paymentMethod: {string},
      date: {string - ISO format},
      category: {string},
   }
 * @param {string}: transaction id 
 */
const updateTransaction = async (transaction, transactionId) => {
   const transactionDate = dates.getDateData(transaction.date);
   await axios.put(
      `${BASE_URL}/api/transactions-lists/${transactionDate.year}/${transactionDate.month}/${transactionId}`,
      transaction,
   );
};

/**
 * DELETE - delete transaction in the corresponding list by transaction date, id
 * @param {object} transaction: {
      description: {string},
      type: {string},
      totalPayment: {string},
      paymentMethod: {string},
      date: {string - ISO format},
      category: {string},
   }
 * @param {string}: transaction id 
 */
const deleteTransaction = async (transaction, transactionId) => {
   const transactionDate = dates.getDateData(transaction.date);
   await axios.delete(
      `${BASE_URL}/api/transactions-lists/${transactionDate.year}/${transactionDate.month}/${transactionId}`,
      transaction,
   );
};

export default {
   getTransactionsList,
   postTransaction,
   updateTransaction,
   deleteTransaction,
};
