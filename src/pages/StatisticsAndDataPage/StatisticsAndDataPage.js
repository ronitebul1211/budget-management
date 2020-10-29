import React from "react";
import { getHistory, getTransactionsData } from "../../utilities/budgetApi";
import { getMonthNameInHebrew, getDebitData, sortTransactionsByDate } from "../../utilities/functions";
import "./StatisticsAndDataPage.css";
//Components
import PieGraph from "../../components/_Graphs/PieGraph";
import SelectField from "../../components/_InputFields/SelectField";
import TransactionListView from "../../components/TransactionListView/TransactionListView";

//TODO: render month options dynamically, category match month

class StatisticsAndDataPage extends React.Component {
   state = {
      currentMonthTransactions: [],
      selectedMonthId: "",
      monthSelection: { id: 0, options: [], transactions: [] },
      graphData: { labels: [], dataset: [] },
   };

   //TODO: update state once, extract functions
   async componentDidMount() {
      //Get transactions record generate options
      const transactionsRecords = await getHistory();
      const monthSelectionOptions = transactionsRecords.map((transactionsRecord) => {
         return { label: getMonthNameInHebrew(transactionsRecord.month), value: transactionsRecord.id };
      });
      //First month - default
      const defaultTransactionsId = monthSelectionOptions[transactionsRecords.length - 1].value;
      const defaultMonthTransactionsData = await getTransactionsData(defaultTransactionsId);
      sortTransactionsByDate(defaultMonthTransactionsData);
      this.setState(
         {
            monthSelection: {
               id: defaultTransactionsId,
               options: monthSelectionOptions,
               transactions: defaultMonthTransactionsData,
            },
         },
         () => console.log(this.state),
      );
      const debitData = getDebitData(defaultMonthTransactionsData);
      this.setState({ graphData: { labels: debitData.labels, dataset: debitData.dataset } });
   }

   onInputChange = async (event) => {
      if (event.target.name === "monthSelection") {
         //set state with month id, to update month selection ui
         const selectedMonthId = event.target.value;
         const monthSelection = { ...this.state.monthSelection };
         monthSelection.id = selectedMonthId;
         this.setState({ monthSelection });

         //set state with transaction data and graph data to update transactions & graph views
         //Transactions data
         const transactionsData = await getTransactionsData(selectedMonthId);
         sortTransactionsByDate(transactionsData);
         monthSelection.transactions = transactionsData;
         //Graph data
         const debitData = getDebitData(transactionsData);
         this.setState(
            { graphData: { labels: debitData.labels, dataset: debitData.dataset }, monthSelection },
            () => {
               console.log(this.state);
            },
         );
      }
   };

   sortTransaction = () => {};

   //TODO: change class name for list view container
   render() {
      return (
         <div className="statis-test-container">
            <h2>תמונת מצב חודשית</h2>
            <div className="graph-section">
               <SelectField
                  value={this.state.monthSelection.id}
                  options={this.state.monthSelection.options}
                  config={{ fieldLabel: "בחר חודש", inputName: "monthSelection", displayMode: "row" }}
                  onChangeCallback={this.onInputChange}
               />
               <PieGraph
                  title={"התפלגות הוצאות לפי קטגוריה"}
                  labels={this.state.graphData.labels}
                  dataset={this.state.graphData.dataset}
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

               <TransactionListView transactions={this.state.monthSelection.transactions} mode="read" />
            </div>
         </div>
      );
   }
}

export default StatisticsAndDataPage;
/** Select Field Component:
# Props:
- value - string - initial value
- options - array of option obj - {label: '', value: ''}
- config - config object - {fieldLabel: "", inputName: "", displayMode: "column" / "row" }
- onChangeCallback - function ref - to get update when option input change         
*/
