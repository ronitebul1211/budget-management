/**
 * @param {array} transactions - array of transactions object
 * @param {string} sortBy - value: date, paymentMethod, category, description, totalPayment
 * @returns {array} transactions - copy of sorted transactions array
 */
export const sortTransactions = (transactions, sortBy) => {
   const transactionsCopy = [...transactions];

   transactionsCopy.sort((a, b) => {
      return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
   });
   return transactionsCopy;
};
