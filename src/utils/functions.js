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
