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
const getHebrewMonthName = (month) => {
   const date = new Date();
   date.setMonth(month - 1);
   return date.toLocaleString("he-IL", { month: "long" });
};

/**
 * Get ISO format string as input, return correspond date data or current when no args passed in"
 * @param {string} isoFormatStr - iso date string
 * @returns {object} contain month, year in number type (e.g November 2021 : {month:11, year:2021})
 */
const getDateData = (isoFormatStr) => {
   const date = isoFormatStr ? new Date(isoFormatStr) : new Date();
   return {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
   };
};

/**
 * Get ISO format string as input and return string in abbreviated format dd/mm
 * @param {string} isoFormatStr - iso date string
 */
const getAbbreviatedDate = (isoString) => {
   const date = new Date(isoString);
   return `${date.getDate()}/${date.getMonth() + 1}`;
};

export default {
   getDateInIsoFormat,
   getHebrewMonthName,
   getDateData,
   getAbbreviatedDate,
};
