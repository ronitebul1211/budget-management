import { useEffect, useState, useRef } from "react";
import transactionsApi from "../../utils/transactionsApi";

const useTransactionsApi = (config) => {
   const configRef = useRef(config);

   const [monthDataNew, setMonthData] = useState(configRef.current.defaultState);
   const [isMonthDataUpdatedNew, setIsMonthDataUpdated] = useState(false);
   const [networkRequest, setNetworkRequestNew] = useState({ type: null, payload: null });
   const [isLoading, setIsLoading] = useState(false);
   const [isError, setIsError] = useState(false);

   useEffect(() => {
      // console.log("CUSTOM: networkRequest - useEffect");
      const sendRequest = async () => {
         console.log("CUSTOM: send new request " + networkRequest.type);
         setIsLoading(true);
         setIsError(false);
         try {
            switch (networkRequest.type) {
               case "FETCH_TRANSACTION_CURRENT":
                  await fetchMonthData();
                  setIsLoading(false);
                  setIsError(false);
                  setIsMonthDataUpdated(true);
                  break;
               case "FETCH_TRANSACTION_BY_DATE":
                  await fetchMonthData(networkRequest.payload);
                  setIsLoading(false);
                  setIsError(false);
                  setIsMonthDataUpdated(true);
                  break;
               case "CREATE_TRANSACTION_ENDPOINT":
                  await transactionsApi.postTransaction(networkRequest.payload);
                  setIsMonthDataUpdated(false);
                  break;
               case "UPDATE_TRANSACTION_ENDPOINT":
                  await transactionsApi.updateTransaction(networkRequest.payload);
                  setIsMonthDataUpdated(false);
                  break;
               case "DELETE_TRANSACTION_ENDPOINT":
                  await transactionsApi.deleteTransaction(networkRequest.payload);
                  setIsMonthDataUpdated(false);
                  break;
               default:
                  const invalidNetworkAction = new Error("Network request set with invalid action type");
                  invalidNetworkAction.name = "INVALID_NETWORK_ACTION";
                  throw invalidNetworkAction;
            }
         } catch (err) {
            if (err.isAxiosError) {
               setIsLoading(false);
               setIsError(true);
            } else {
               throw err;
            }
         }
      };

      if (networkRequest.type) {
         sendRequest();
         setNetworkRequestNew({ type: null, payload: null });
      }
   }, [networkRequest]);

   useEffect(() => {
      // console.log("CUSTOM: isMonthDataUpdated ? " + isMonthDataUpdatedNew);
      if (!isMonthDataUpdatedNew) {
         setNetworkRequestNew({ type: "FETCH_TRANSACTION_CURRENT" });
      }
   }, [isMonthDataUpdatedNew]);

   /**
    * Fetch month data: transactions list, metadata ("monthStatus" / "debitDistribution" / "")
    * @param {object} date -requested month {month: {number}, year: {number}}
    * when date is not supplied, fetch current month transactions
    */
   const fetchMonthData = async (date) => {
      const { fetchQuery, defaultState } = configRef.current;

      const res = await transactionsApi.getMonthData(fetchQuery, date);
      if (res.status === 204) {
         return setMonthData(defaultState);
      }
      const { metadata, transactionsList } = res.data;
      return setMonthData({ transactionsList: transactionsList.data, metadata });
   };

   return [{ monthDataNew, isLoading, isError }, setNetworkRequestNew];
};

export default useTransactionsApi;
