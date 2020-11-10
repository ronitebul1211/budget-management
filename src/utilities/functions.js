//TODO: group function into object, import object instead of different functions

// - - - - - - - - - - - - - - - - - - - - - - - - - - Date Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/** Return String: dd/mm */
export const getFormattedDate = (isosString) => {
   const monthStr = isosString.substring(5, 7);
   const dateStr = isosString.substring(8, 10);
   return `${dateStr}/${monthStr}`;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - language Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export const getTransactionType = (typeStr) => {
   if (typeStr === "זכות") {
      return "credit";
   } else if (typeStr === "חובה") {
      return "debit";
   } else {
      throw Error("Invalid Transaction Type");
   }
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - Sorting Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

export const sortTransactionsByDate = (transactions) => {
   transactions.sort((a, b) => {
      return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
   });
   return transactions;
};

// - - - - - - - - - - - - - - - - - - - - - - - - - - Calculation Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/** Get Transactions array Calculate: Credit, Debit and Balance and return that data in Status Object */
export const getMonthStatus = (transactions) => {
   const monthStatus = {
      credit: 0,
      debit: 0,
      balance: 0,
   };
   transactions.forEach((transaction) => {
      if (transaction.type === "זכות") {
         monthStatus.credit += parseInt(transaction.payment);
      } else if (transaction.type === "חובה") {
         monthStatus.debit += parseInt(transaction.payment);
      }
   });
   monthStatus.balance = monthStatus.credit - monthStatus.debit;
   return monthStatus;
};

//TODO CREATE DEBIT DATA - sort category and value in permanent order
export const getDebitData = (transactions) => {
   const categoriesData = {};

   for (let i = 0; i < transactions.length; i++) {
      if (getTransactionType(transactions[i].type) === "debit") {
         categoriesData.hasOwnProperty(transactions[i].category)
            ? (categoriesData[transactions[i].category] += parseInt(transactions[i].payment))
            : (categoriesData[transactions[i].category] = parseInt(transactions[i].payment));
      }
   }

   const debitData = { labels: [], dataset: [] };
   for (const property in categoriesData) {
      console.log(`${property}: ${categoriesData[property]}`);
      debitData.labels.push(property);
      debitData.dataset.push(categoriesData[property]);
   }

   return debitData;
};
