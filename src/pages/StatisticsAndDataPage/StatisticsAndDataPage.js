import React from "react";
import "./StatisticsAndDataPage.css";
//Components
import PieGraph from "../../components/_Graphs/PieGraph";
import SelectField from "../../components/_InputFields/SelectField";
import TransactionsList from "../../components/TransactionsList/TransactionsList";

//FIXME: add prop types + refactor by conventions.txt

//TODO: render month options dynamically, category match month

class StatisticsAndDataPage extends React.Component {
   /**
    State Plan = {
       transactionListData: []
       distributionOfDebitByCategory: {קניות: 0, אוכל בחוץ:500}
       inputControllers: {month: 11, year: 2020, sortBy: date}
    }
 */
   state = {
      currentMonthTransactions: [],
      monthSelection: { id: 0, options: [], transactions: [] },
      graphData: { labels: [], dataset: [] },
   };

   //TODO: update state once, extract functions
   async componentDidMount() {}

   onInputChange = async (event) => {
      if (event.target.name === "monthSelection") {
         //set state with month id, to update month selection ui
         //set state with transaction data and graph data to update transactions & graph views
         //Transactions data
         //Graph data
      }
   };

   sortTransaction = () => {};

   //TODO: change class name for list view container
   render() {
      return (
         <div className="statistics-page">
            <div className="section statistics-page__header">
               <h2>תמונת מצב חודשית</h2>
               <div className="statistics-page__month-year-selection">
                  <SelectField
                     value=""
                     options={[]}
                     config={{ fieldLabel: "בחר חודש", inputName: "month", displayMode: "row" }}
                     onChangeCallback={this.onInputChange}
                  />
                  <SelectField
                     value=""
                     options={[]}
                     config={{ fieldLabel: "בחר שנה", inputName: "year", displayMode: "row" }}
                     onChangeCallback={this.onInputChange}
                  />
               </div>
            </div>

            <div className="section">
               <h2>התפלגות הוצאות לפי קטגוריה</h2>
               <PieGraph
                  labels={["קניות", "חשונות", "בילויים"]}
                  dataset={[1500, 500, 5000]}
                  backgroundColors={["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"]}
               />
            </div>

            <div className="list-container">
               <div className="test-select">
                  <SelectField
                     value=""
                     options={[
                        { label: "תאריך", value: "חשבונות" },
                        { label: "אמצעי תשלום", value: "קניות" },
                        { label: "קטגוריה", value: "בילויים" },
                        { label: "סכום", value: "בילויים" },
                     ]}
                     config={{ fieldLabel: "מיין לפי", inputName: "test", displayMode: "row" }}
                     onChangeCallback={this.sortTransaction}
                  />
               </div>

               <TransactionsList transactionsListData={[]} isEditableList={false} />
            </div>
         </div>
      );
   }
}

export default StatisticsAndDataPage;
