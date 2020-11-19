import { useState, useEffect } from "react";
import transactionsApi from "../../utilities/transactionsApi";

const useMonthData = (month, year, metadata) => {
   const [monthData, setMonthData] = useState({ transactionsList: [], metadata: {} });

   useEffect(() => {
      fetchVideos(searchTerm);
   }, [searchTerm]);

   const fetchVideos = async (term) => {
      const response = await youtube.get("search", {
         params: {
            q: term,
         },
      });
      setVideos(response.data.items);
   };

   return [videos, fetchVideos];
};

export default useMonthData;
