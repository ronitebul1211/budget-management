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
      totalPayment: {number},
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

export default {
   getTransactionsList,
   postTransaction,
};
