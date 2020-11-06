import React from "react";
import "./TransactionFormView.css";
import dates from "../../utilities/dates";
//Components
import InputField from "../_InputFields/InputField";
import RadioField from "../_InputFields/RadioField";
import SelectField from "../_InputFields/SelectField";
import Button from "../_Buttons/Button";

//TODO: Auto focus when open on first input

/** Transaction Form Component:
# Props:
- mode - 'addTransaction' / 'editTransaction'
- transactionData - transaction object to set form initial values 
                     {id: "", type: "", description: "", payment: "", date: "", paymentMethod: "", category: ""}
- handleFormClickCallback - ref to callback function that handles form event
 */

class TransactionForm extends React.Component {
   state = {
      id: "",
      type: "",
      description: "",
      payment: "",
      date: "",
      paymentMethod: "",
      category: "",
      errors: {
         descriptionInputError: false,
         paymentInputError: false,
      },
   };

   /** Set Form initial values by its mode */
   componentDidMount() {
      const initialState = this.props.transactionData;
      this.setState({ ...initialState });
   }

   /** Handle input change on the transaction form */
   onChange = (event) => {
      const target = event.target;
      //Hide error from the input field when input changed
      if (
         (target.name === "description" && this.state.errors.descriptionInputError) ||
         (target.name === "payment" && this.state.errors.paymentInputError)
      ) {
         return this.setState((prevState) => ({
            [target.name]: target.value,
            errors: {
               ...prevState.errors,
               [`${target.name}InputError`]: false,
            },
         }));
      }

      this.setState({ [target.name]: target.value });
   };

   /** Handler for form click event:
    # closeForm event: notify MonthManagerPage
    # addTransaction / updateTransaction events: notify MonthManagerPage and sent transaction data
     */
   handleFormClick = (action) => {
      if (action === "closeForm") {
         this.props.handleFormClickCallback(action, null);
      } else if (action === "addTransaction" || action === "editTransaction") {
         if (this.validateForm()) {
            const transaction = { ...this.state };
            this.props.handleFormClickCallback(action, transaction);
         }
      } else {
         throw Error("handleFormClick: invoked with invalid action");
      }
   };

   /** Validate form input fields, in case of errors set specific error in the component state
    * @returns {boolean} represents the status of the whole form validation
    */
   validateForm = () => {
      //Payment Valid Input: positive integer
      const paymentInput = parseInt(this.state.payment);
      const paymentInputError = isNaN(paymentInput) || paymentInput < 1;
      //Description Valid Input: string contain min 1 character
      const descriptionInput = this.state.description.trim();
      const descriptionInputError = descriptionInput < 1;
      this.setState({ errors: { paymentInputError, descriptionInputError } });
      return !paymentInputError && !descriptionInputError;
   };

   /** Generate form title text by form mode */
   getFormTitleTextByMode = () => {
      switch (this.props.mode) {
         case "addTransaction":
            return "הוסף פעילות";
         case "editTransaction":
            return "ערוך פעילות";
         default:
            throw Error("Invalid value pass to mode prop");
      }
   };

   /** Generate form success button text by form mode */
   getFormSuccessBtnTextByMode = () => {
      switch (this.props.mode) {
         case "addTransaction":
            return "הוסף";
         case "editTransaction":
            return "שמור";
         default:
            throw Error("Invalid value pass to mode prop");
      }
   };

   render() {
      // TODO: limit paymentMethod field -> number > 0
      return (
         <div className="form">
            <div className="form__content-container">
               <span className="form__title">{this.getFormTitleTextByMode()}</span>
               <RadioField
                  selectedValue={this.state.type}
                  content={{
                     label: "סוג",
                     options: [
                        { label: "חובה", value: "חובה" },
                        { label: "זכות", value: "זכות" },
                     ],
                  }}
                  config={{
                     inputName: "type",
                     defaultValue: "חובה",
                     displayMode: { field: "column", options: "row" },
                  }}
                  onChangeCallback={this.onChange}
               />
               <InputField
                  value={this.state.description}
                  config={{ label: "תיאור", name: "description", type: "text", displayMode: "column" }}
                  error={{ message: "הכנס תיאור", isDisplayed: this.state.errors.descriptionInputError }}
                  onChangeCallback={this.onChange}
               />
               <InputField
                  value={this.state.payment}
                  config={{
                     label: "סכום",
                     name: "payment",
                     displayMode: "column",
                     type: "number",
                  }}
                  error={{ message: "הכנס מספר חיובי שלם", isDisplayed: this.state.errors.paymentInputError }}
                  onChangeCallback={this.onChange}
               />
               <InputField
                  value={this.state.date}
                  config={{
                     label: "תאריך",
                     name: "date",
                     type: "date",
                     displayMode: "column",
                     limitMin: dates.getDateInIsoFormat("firstDayOfCurrentMonth"),
                     limitMax: dates.getDateInIsoFormat("lastDayOfCurrentMonth"),
                  }}
                  onChangeCallback={this.onChange}
               />
               <SelectField
                  value={this.state.paymentMethod}
                  options={[
                     { label: "מזומן", value: "מזומן" },
                     { label: "אשראי", value: "אשראי" },
                     { label: 'עו"ש', value: 'עו"ש' },
                  ]}
                  config={{ fieldLabel: "אמצעי תשלום", inputName: "paymentMethod", displayMode: "column" }}
                  onChangeCallback={this.onChange}
               />
               <SelectField
                  value={this.state.category}
                  options={[
                     { label: "חשבונות", value: "חשבונות" },
                     { label: "קניות", value: "קניות" },
                     { label: "בילויים", value: "בילויים" },
                  ]}
                  config={{ fieldLabel: "קטגוריה", inputName: "category", displayMode: "column" }}
                  onChangeCallback={this.onChange}
               />
            </div>
            <div className="form__btn-container">
               <Button
                  text="חזור"
                  displayMode="danger"
                  clickHandlerCallback={() => {
                     this.handleFormClick("closeForm");
                  }}
               />
               <Button
                  text={this.getFormSuccessBtnTextByMode()}
                  displayMode="success"
                  clickHandlerCallback={() => {
                     this.handleFormClick(this.props.mode);
                  }}
               />
            </div>
         </div>
      );
   }
}
export default TransactionForm;
