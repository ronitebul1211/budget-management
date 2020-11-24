import { useEffect, useState } from "react";
import transactionsApi from "../../utils/transactionsApi";

const useTransactionsApi = () => {
   const [monthDataNew, setMonthData] = useState();
   const [isMonthDataUpdatedNew, setIsMonthDataUpdated] = useState(false);
   const [networkRequest, setNetworkRequestNew] = useState({ type: null, payload: null });

   useEffect(() => {
      console.log("CUSTOM: networkRequest - useEffect");
      const sendRequest = async () => {
         console.log("CUSTOM: send new request");
         try {
            switch (networkRequest.type) {
               case "CREATE_TRANSACTION_ENDPOINT":
                  await transactionsApi.postTransaction(networkRequest.payload);
                  break;
               case "UPDATE_TRANSACTION_ENDPOINT":
                  await transactionsApi.updateTransaction(networkRequest.payload);
                  break;
               case "DELETE_TRANSACTION_ENDPOINT":
                  await transactionsApi.deleteTransaction(networkRequest.payload);
                  break;
               default:
                  const invalidNetworkAction = new Error("Network request set with invalid action type");
                  invalidNetworkAction.name = "INVALID_NETWORK_ACTION";
                  throw invalidNetworkAction;
            }
            setIsMonthDataUpdated(false);
         } catch (err) {
            if (err.name === "INVALID_NETWORK_ACTION") {
               throw err;
            }
            console.log(err);
         }
      };

      if (networkRequest.type && networkRequest.payload) {
         sendRequest();
         setNetworkRequestNew({ type: null, payload: null });
      }
   }, [networkRequest]);

   useEffect(() => {
      console.log("CUSTOM: isMonthDataUpdated - useEffect ");
      const fetchMonthData = async () => {
         console.log("CUSTOM: fetch monthData");
         try {
            const res = await transactionsApi.getMonthData("monthStatus");
            if (res.status === 204) {
               return setMonthData({ transactionsList: [], status: { credit: 0, debit: 0, balance: 0 } });
            }
            const { monthStatus, transactionsList } = res.data;
            return setMonthData({ transactionsList: transactionsList.data, status: monthStatus });
         } catch (err) {
            console.log(err);
         }
      };

      if (!isMonthDataUpdatedNew) {
         fetchMonthData();
         setIsMonthDataUpdated(true);
      }
   }, [isMonthDataUpdatedNew]);

   return [monthDataNew, setNetworkRequestNew];
};

export default useTransactionsApi;
