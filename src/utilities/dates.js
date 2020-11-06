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

export default {
   getDateInIsoFormat,
};
