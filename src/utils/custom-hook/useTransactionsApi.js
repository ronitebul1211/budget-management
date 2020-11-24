import { useEffect, useState } from "react";

const useTransactionsApi = () => {
   const [monthDataNew, setMonthData] = useState();
   const [isMonthDataUpdatedNew, setIsMonthDataUpdated] = useState(false);
   const [networkRequest, setNetworkRequestNew] = useState({ type: undefined, payload: undefined });

   useEffect(() => {
      console.log("custom: new network request");
   }, [networkRequest]);

   useEffect(() => {
      console.log("custom: month data request");
   }, [isMonthDataUpdatedNew]);

   return [monthDataNew, setNetworkRequestNew];
};

export default useTransactionsApi;
