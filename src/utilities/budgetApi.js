import axios from "axios";

//mock-omer
//TODO: send payment as number instead of string
//TODO: Naming database + functions: history -> transactions_records_list, transactions_list -> transactions_data_list
//TODO: Error Handling
//TODO: connect with firebase and change var name from hebrew to english

const BASE_URL = "https://5f81be0a0695720016432da8.mockapi.io/budget/";

/** CREATE - create in endpoint, new transaction in a specific transactions list */
export const addTransaction = async (transactionsListId, transaction) => {
   await axios.post(`${BASE_URL}/transactions_list/${transactionsListId}/transactions`, transaction);
};

/** GET - get from endpoint specific transactions list */
export const getTransactionsData = async (transactionsListId) => {
   const response = await axios.get(`${BASE_URL}/transactions_list/${transactionsListId}/transactions`);
   return response.data;
};

/** DELETE - delete from endpoint transaction in specific transactions list */
export const deleteTransaction = async (transactionsListId, transactionId) => {
   await axios.delete(`${BASE_URL}/transactions_list/${transactionsListId}/transactions/${transactionId}`);
};

/** UPDATE - update in endpoint transaction in specific transactions list */
export const updateTransaction = async (transactionsListId, transaction) => {
   await axios.put(
      `${BASE_URL}/transactions_list/${transactionsListId}/transactions/${transaction.id}`,
      transaction,
   );
};

/** GET - get from endpoint history list - each object has an month, year and id.
          the id point on transactions array on transactions list for particular month in the year */
export const getHistory = async () => {
   const response = await axios.get(`${BASE_URL}/history`);
   const history = response.data;
   return history;
};

/** CREATE - create in endpoint, new transactions in history, return transactions object */
const addTransactionsToHistory = async (month, year) => {
   const response = await axios.post(`${BASE_URL}/history`, { month, year });
   const transactionsRecord = response.data;
   return transactionsRecord;
};

const addTransactionsToTransactionsList = async () => {
   const response = await axios.post(`${BASE_URL}/transactions_list`);
   const transactionsData = response.data;
   return transactionsData;
};

/** Get - transactions id (in transactions list & history) by month and year, 
          if transactions not exist, create new transactions record in history 
          and new transactions data in transactions list (shared id) and return its id. */
export const getTransactionsId = async (month, year) => {
   let transactionsRecord;
   const history = await getHistory();
   transactionsRecord = history.find((transactionsRecord) => {
      return month === transactionsRecord.month && year === transactionsRecord.year;
   });
   if (transactionsRecord === undefined) {
      transactionsRecord = await addTransactionsToHistory(month, year);
      const transactionsData = await addTransactionsToTransactionsList();
      if (transactionsRecord.id === transactionsData.id) {
         return transactionsRecord.id;
      } else {
         throw Error("Create in database transactions record and transactions data with different id's");
      }
   }
   return transactionsRecord.id;
};
