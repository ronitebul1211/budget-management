import axios from "axios";
import dates from "./dates";

/**
 * Transaction Data Structure = {
 *    _id: {string},
 *    description: {string},
 *    type: {string},
 *    totalPayment: {string},
 *    paymentMethod: {string},
 *    date: {string - ISO format},
 *    category: {string},
 * }
 */

const BASE_URL = "https://roni-budget-managment.herokuapp.com";

/**
 * GET - month data: transactions list, optional metadata contain monthStatus / debitDistribution
 * @param date {object} - requested month {month: {number}, year: {number}}, by default current month
 * @param metadata {string} - "monthStatus" -> response with extra data (credit, debit, balance)
 */
const getMonthData = async (metadata, date = dates.getDateData()) => {
   return axios.get(`${BASE_URL}/api/transactions-lists/${date.year}/${date.month}`, {
      params: { metadata },
   });
};

/**
 * POST - transaction in the corresponding list by transaction date
 * @param {object} transaction
 */
const postTransaction = async (transaction) => {
   const { month, year } = dates.getDateData(transaction.date);
   delete transaction._id;
   return axios.post(`${BASE_URL}/api/transactions-lists/${year}/${month}`, transaction);
};

/**
 * PUT - update transaction in the corresponding list by transaction date, id
 * @param {object} transaction
 */
const updateTransaction = async (transaction) => {
   const { month, year } = dates.getDateData(transaction.date);
   await axios.put(`${BASE_URL}/api/transactions-lists/${year}/${month}/${transaction._id}`, transaction);
};

/**
 * DELETE - delete transaction in the corresponding list by transaction date, id
 * @param {object} transaction
 */
const deleteTransaction = async (transaction) => {
   const { month, year } = dates.getDateData(transaction.date);
   await axios.delete(`${BASE_URL}/api/transactions-lists/${year}/${month}/${transaction._id}`, transaction);
};

export default {
   getMonthData,
   postTransaction,
   updateTransaction,
   deleteTransaction,
};
