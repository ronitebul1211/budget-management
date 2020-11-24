//TODO: group function into object, import object instead of different functions

// - - - - - - - - - - - - - - - - - - - - - - - - - - Date Functions - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

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
