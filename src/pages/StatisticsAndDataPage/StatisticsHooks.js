import React, { useState } from "react";
import "./StatisticsAndDataPage.css";
import dates from "../../utils/dates";
import transactionsApi from "../../utils/transactionsApi";

//Components
import PieGraphHooks from "../../components/_Graphs/PieGraphHooks";
import SelectField from "../../components/_InputFields/SelectField";
import TransactionsList from "../../components/TransactionsList/TransactionsList";

//FIXME: add prop types + refactor by conventions.txt

//TODO: render month options dynamically, category match month

const StatisticsAndDataPage = () => {
   const [datePicker, setDatePicker] = useState(() => {
      const { month, year } = dates.getDateData();
      return { month, year };
   });

   const onInputChange = (e) => {
      const target = e.target;
      if (target.name === "month" || target.name === "year") {
         setDatePicker((prevState) => {
            return {
               ...prevState,
               [target.name]: parseInt(target.value),
            };
         });
      }
   };

   return (
      <div className="statistics-page">
         <div className="section statistics-page__header">
            <h2>תמונת מצב חודשית</h2>
            <div className="statistics-page__month-year-selection">
               <SelectField
                  value={datePicker.month}
                  options={[
                     { label: "ינואר", value: 1 },
                     { label: "פברואר", value: 2 },
                     { label: "מרץ", value: 3 },
                     { label: "אפריל", value: 4 },
                     { label: "מאי", value: 5 },
                     { label: "יוני", value: 6 },
                     { label: "יולי", value: 7 },
                     { label: "אוגוסט", value: 8 },
                     { label: "ספטמבר", value: 9 },
                     { label: "אוקטובר", value: 10 },
                     { label: "נובמבר", value: 11 },
                     { label: "דצמבר", value: 12 },
                  ]}
                  config={{ fieldLabel: "בחר חודש", inputName: "month", displayMode: "row" }}
                  onChangeCallback={onInputChange}
               />
               <SelectField
                  value={datePicker.year}
                  options={[
                     { label: 2020, value: 2020 },
                     { label: 2021, value: 2021 },
                  ]}
                  config={{ fieldLabel: "בחר שנה", inputName: "year", displayMode: "row" }}
                  onChangeCallback={onInputChange}
               />
            </div>
         </div>

         <div className="section">
            <h2>התפלגות הוצאות לפי קטגוריה</h2>

            <PieGraphHooks data={{}} />
         </div>

         <div className="list-container">
            <div className="test-select">
               <SelectField
                  value="חשבונות"
                  options={[
                     { label: "תאריך", value: "חשבונות" },
                     { label: "אמצעי תשלום", value: "קניות" },
                     { label: "קטגוריה", value: "בילויים" },
                     { label: "סכום", value: "בילויים" },
                  ]}
                  config={{ fieldLabel: "מיין לפי", inputName: "test", displayMode: "row" }}
                  onChangeCallback={onInputChange}
               />
            </div>

            <TransactionsList transactionsListData={[]} isEditableList={false} />
         </div>
      </div>
   );
};

export default StatisticsAndDataPage;
