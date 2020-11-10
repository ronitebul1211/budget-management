/**
 * Get date in ISO format by local time
 * @param {string} dateType: accepted values => currentDay | firstDayOfCurrentMonth | lastDayOfCurrentMonth
 * @returns {string} date string in ISO format yyyy-mm-dd
 */
const getDateInIsoFormat = (dateType) => {
   let date = new Date();
   switch (dateType) {
      case "currentDay":
         break;
      case "firstDayOfCurrentMonth":
         date = new Date(date.getFullYear(), date.getMonth(), 1);
         break;
      case "lastDayOfCurrentMonth":
         date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
         break;
      default:
         throw new Error("Invalid date type");
   }

   let month = date.getMonth() + 1;
   let day = date.getDate();
   let year = date.getFullYear();

   if (month < 10) month = "0" + month;
   if (day < 10) day = "0" + day;

   return [year, month, day].join("-");
};

/**
 * @param {number} month: the requested month number e.g 5 for May
 * @returns {string} the name of the foreign month in Hebrew
 */
export const getHebrewMonthName = (month) => {
   const date = new Date();
   date.setMonth(month - 1);
   return date.toLocaleString("he-IL", { month: "long" });
};

export default {
   getDateInIsoFormat,
   getHebrewMonthName,
};
