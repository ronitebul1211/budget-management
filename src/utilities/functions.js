//TODO: group function into object, import object instead of different functions

// - - - - - - - - - - - - - - - - - - - - - - - - - - Date Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Return String: yyyy-mm-dd */
export const getCurrentDateISOString = () => {
   const currentDate = new Date();
   //TODO fix bug after midnight date updated to last day, don't use isos function
   return currentDate.toISOString().substring(0, 10);
};

/** Return String: dd/mm */
export const getFormattedDate = (isosString) => {
   const monthStr = isosString.substring(5, 7);
   const dateStr = isosString.substring(8, 10);
   return `${dateStr}/${monthStr}`;
};

/**Return month name in hebrew by month number: january = 1  */
export const getMonthNameInHebrew = (monthNumber) => {
   const date = new Date();
   date.setMonth(monthNumber - 1);
   return date.toLocaleString("he-IL", { month: "long" });
};

/** Return year {number}*/
export const getCurrentYear = () => {
   const date = new Date();
   return date.getFullYear();
};
/** Return month {number} */
export const getCurrentMonth = () => {
   const date = new Date();
   return date.getMonth() + 1;
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
      return new Date(a.date) - new Date(b.date);
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
