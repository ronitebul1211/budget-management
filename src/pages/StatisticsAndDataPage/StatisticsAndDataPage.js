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
    State = {
       transactionListData: []
       distributionOfDebitByCategory: {קניות: 0, אוכל בחוץ:500}

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

               <TransactionsList transactionsListData={[]} isEditableList={false} />
            </div>
         </div>
      );
   }
}

export default StatisticsAndDataPage;
