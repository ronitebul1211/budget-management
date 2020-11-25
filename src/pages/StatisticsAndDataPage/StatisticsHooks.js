import React from "react";
import "./StatisticsAndDataPage.css";
import dates from "../../utils/dates";
import transactionsApi from "../../utils/transactionsApi";
//Components
import PieGraphHooks from "../../components/_Graphs/PieGraphHooks";
import SelectField from "../../components/_InputFields/SelectField";
import TransactionsList from "../../components/TransactionsList/TransactionsList";

//FIXME: add prop types + refactor by conventions.txt

//TODO: render month options dynamically, category match month

class StatisticsAndDataPage extends React.Component {
   state = {
      datePicker: { month: undefined, year: undefined },
      transactionsList: [],
      debitDistribution: {},
   };

   componentDidMount = () => {
      const currentDate = dates.getDateData();
      this.setState({ datePicker: { month: currentDate.month, year: currentDate.year } });
   };

   componentDidUpdate = async (prevProps, prevState) => {
      if (
         prevState.datePicker.month !== this.state.datePicker.month ||
         prevState.datePicker.year !== this.state.datePicker.year
      ) {
         const { month, year } = this.state.datePicker;
         await this.loadMonthDataFromEndpoint(month, year);
      }
   };

   onInputChange = async (e) => {
      const target = e.target;
      if (target.name === "month" || target.name === "year") {
         this.setState((prevState) => ({
            datePicker: {
               ...prevState.datePicker,
               [target.name]: parseInt(target.value),
            },
         }));
      }
   };

   /** Load updated data from endpoint base on date picker values */
   loadMonthDataFromEndpoint = async (month, year) => {
      await transactionsApi
         .getMonthData("debitDistribution", { month, year })
         .then((res) => {
            if (res.status === 200) {
               const { transactionsList, metadata } = res.data;
               this.setState({ transactionsList: transactionsList.data, debitDistribution: metadata });
            }
            if (res.status === 204) {
               this.setState({ transactionsList: [], debitDistribution: {} });
            }
         })
         .catch((err) => {
            //TODO handle GET transactions list Error
            throw err;
         });
   };

   //TODO: change class name for list view container
   render() {
      return (
         <div className="statistics-page">
            <div className="section statistics-page__header">
               <h2>תמונת מצב חודשית</h2>
               <div className="statistics-page__month-year-selection">
                  <SelectField
                     value={this.state.datePicker.month}
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
                     onChangeCallback={this.onInputChange}
                  />
                  <SelectField
                     value={this.state.datePicker.year}
                     options={[
                        { label: 2020, value: 2020 },
                        { label: 2021, value: 2021 },
                     ]}
                     config={{ fieldLabel: "בחר שנה", inputName: "year", displayMode: "row" }}
                     onChangeCallback={this.onInputChange}
                  />
               </div>
            </div>

            <div className="section">
               <h2>התפלגות הוצאות לפי קטגוריה</h2>

               <PieGraphHooks data={this.state.debitDistribution} />
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
                     onChangeCallback={this.onInputChange}
                  />
               </div>

               <TransactionsList transactionsListData={this.state.transactionsList} isEditableList={false} />
            </div>
         </div>
      );
   }
}

export default StatisticsAndDataPage;
