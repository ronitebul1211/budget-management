import { useEffect, useState } from "react";
import transactionsApi from "../../utils/transactionsApi";

const useTransactionsApi = (initialMonthDataState) => {
   const [monthDataNew, setMonthData] = useState(initialMonthDataState);
   const [isMonthDataUpdatedNew, setIsMonthDataUpdated] = useState(false);
   const [networkRequest, setNetworkRequestNew] = useState({ type: null, payload: null });

   useEffect(() => {
      // console.log("CUSTOM: networkRequest - useEffect");
      const sendRequest = async () => {
         console.log("CUSTOM: send new request " + networkRequest.type);
         try {
            switch (networkRequest.type) {
               case "FETCH_TRANSACTION_CURRENT":
                  await fetchMonthData();
                  break;
               case "FETCH_TRANSACTION_BY_DATE":
                  await fetchMonthData();
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
            if (err.name === "INVALID_NETWORK_ACTION") {
               throw err;
            }
            console.log(err);
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
         // if month data not updated, fetch current -only

         // if network request type is fetch by date -> different case on switch (set from outside statistic page)

         // when its fetch current || fetch by date -> set month data is updated = true (maybe on fetch function?)
         // from different switch case : make an fetch with diff ard

         // all request begin in new request, finish in fetch new data -> isLoading === false
         setNetworkRequestNew({ type: "FETCH_TRANSACTION_CURRENT" });
         setIsMonthDataUpdated(true);
      }
   }, [isMonthDataUpdatedNew]);

   const fetchMonthData = async () => {
      try {
         const res = await transactionsApi.getMonthData("monthStatus");
         if (res.status === 204) {
            return setMonthData({ transactionsList: [], metadata: {} });
         }
         const { metadata, transactionsList } = res.data;
         return setMonthData({ transactionsList: transactionsList.data, metadata });
      } catch (err) {
         console.log(err);
      }
   };

   return [monthDataNew, setNetworkRequestNew];
};

export default useTransactionsApi;
