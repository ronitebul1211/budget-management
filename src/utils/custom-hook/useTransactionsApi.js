import { useEffect, useState, useRef, useReducer } from "react";
import transactionsApi from "../../utils/transactionsApi";

const networkReducer = (state, action) => {
   switch (action.type) {
      case "NETWORK_TRANSACTION_INIT":
         return {
            ...state,
            isLoading: true,
            isError: false,
         };
      case "NETWORK_TRANSACTION_SUCCESS":
         return {
            monthData: action.payload,
            isLoading: false,
            isError: false,
         };
      case "NETWORK_TRANSACTION_FAILURE":
         return {
            ...state,
            isLoading: false,
            isError: true,
         };
      default:
         throw new Error("Invalid action in network reducer");
   }
};

const useTransactionsApi = (config) => {
   const configRef = useRef(config);

   const [state, dispatch] = useReducer(networkReducer, {
      monthData: configRef.current.defaultState,
      isLoading: false,
      isError: false,
   });
   // const [monthDataNew, setMonthData] = useState(configRef.current.defaultState);
   const [isMonthDataUpdatedNew, setIsMonthDataUpdated] = useState(false);
   const [networkRequest, setNetworkRequest] = useState({ type: null, payload: null });
   // const [isLoading, setIsLoading] = useState(false);
   // const [isError, setIsError] = useState(false);

   useEffect(() => {
      // console.log("CUSTOM: networkRequest - useEffect");
      const sendRequest = async () => {
         console.log("CUSTOM: send new request " + networkRequest.type);
         dispatch({ type: "NETWORK_TRANSACTION_INIT" });
         let monthData = {};
         try {
            switch (networkRequest.type) {
               case "FETCH_TRANSACTION_CURRENT":
                  monthData = await fetchMonthData();
                  dispatch({ type: "NETWORK_TRANSACTION_SUCCESS", payload: monthData });
                  setIsMonthDataUpdated(true);
                  break;
               case "FETCH_TRANSACTION_BY_DATE":
                  monthData = await fetchMonthData(networkRequest.payload);
                  dispatch({ type: "NETWORK_TRANSACTION_SUCCESS", payload: monthData });
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
               dispatch({ type: "NETWORK_TRANSACTION_FAILURE" });
            } else {
               throw err;
            }
         }
      };

      if (networkRequest.type) {
         sendRequest();
         setNetworkRequest({ type: null, payload: null });
      }
   }, [networkRequest]);

   useEffect(() => {
      // console.log("CUSTOM: isMonthDataUpdated ? " + isMonthDataUpdatedNew);
      if (!isMonthDataUpdatedNew) {
         setNetworkRequest({ type: "FETCH_TRANSACTION_CURRENT" });
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
         return defaultState;
      }
      const { metadata, transactionsList } = res.data;
      return { transactionsList: transactionsList.data, metadata };
   };

   return [state, setNetworkRequest];
};

export default useTransactionsApi;
