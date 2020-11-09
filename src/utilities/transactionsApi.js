import axios from "axios";

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

export default {
   getTransactionsList,
};
