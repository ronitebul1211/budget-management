import { useEffect, useState } from "react";
import transactionsApi from "../../utils/transactionsApi";

const useTransactionsApi = () => {
   const [monthDataNew, setMonthData] = useState();
   const [isMonthDataUpdatedNew, setIsMonthDataUpdated] = useState(false);
   const [networkRequest, setNetworkRequestNew] = useState({ type: null, payload: null });

   useEffect(() => {
      console.log("custom: new network request");
   }, [networkRequest]);

   useEffect(() => {
      const fetchMonthData = async () => {
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
