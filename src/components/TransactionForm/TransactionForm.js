import React from "react";
import "./TransactionForm.css";
import dates from "../../utilities/dates";
import PropTypes from "prop-types";
//Components
import InputField from "../_InputFields/InputField";
import RadioField from "../_InputFields/RadioField";
import SelectField from "../_InputFields/SelectField";
import Button from "../_Buttons/Button";

//TODO: Auto focus when open on first input
//TODO: Delete from prop type and check its don't sent from new server

/** Prop Types at the end of the file */
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

   componentDidMount() {
      const initialFormState = this.props.transactionData;
      this.setState({ ...initialFormState });
   }

   onInputChange = (event) => {
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

   onButtonClick = (clickAction) => {
      switch (clickAction) {
         case "closeForm":
            this.props.onButtonClickCallback(clickAction, null);
            break;
         case "addTransaction":
         case "editTransaction":
            if (this.validateForm()) {
               const transactionData = { ...this.state };
               delete transactionData.errors;
               this.props.onButtonClickCallback(clickAction, transactionData);
            }
            break;
         default:
            throw Error("Invalid click action");
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

   renderTitleText = (formMode) => {
      switch (formMode) {
         case "addTransaction":
            return "הוסף פעילות";
         case "editTransaction":
            return "ערוך פעילות";
         default:
            throw Error("Invalid form mode");
      }
   };

   renderSuccessBtnText = (formMode) => {
      switch (formMode) {
         case "addTransaction":
            return "הוסף";
         case "editTransaction":
            return "שמור";
         default:
            throw new Error("Invalid form mode");
      }
   };

   render() {
      const { formMode } = this.props;
      return (
         <div className="form">
            <div className="form__content-container">
               <span className="form__title">{this.renderTitleText(formMode)}</span>
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
                  onChangeCallback={this.onInputChange}
               />
               <InputField
                  value={this.state.description}
                  config={{ label: "תיאור", name: "description", type: "text", displayMode: "column" }}
                  error={{ message: "הכנס תיאור", isDisplayed: this.state.errors.descriptionInputError }}
                  onChangeCallback={this.onInputChange}
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
                  onChangeCallback={this.onInputChange}
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
                  onChangeCallback={this.onInputChange}
               />
               <SelectField
                  value={this.state.paymentMethod}
                  options={[
                     { label: "מזומן", value: "מזומן" },
                     { label: "אשראי", value: "אשראי" },
                     { label: 'עו"ש', value: 'עו"ש' },
                  ]}
                  config={{ fieldLabel: "אמצעי תשלום", inputName: "paymentMethod", displayMode: "column" }}
                  onChangeCallback={this.onInputChange}
               />
               <SelectField
                  value={this.state.category}
                  options={[
                     { label: "חשבונות", value: "חשבונות" },
                     { label: "קניות", value: "קניות" },
                     { label: "בילויים", value: "בילויים" },
                  ]}
                  config={{ fieldLabel: "קטגוריה", inputName: "category", displayMode: "column" }}
                  onChangeCallback={this.onInputChange}
               />
            </div>
            <div className="form__btn-container">
               <Button
                  text="חזור"
                  displayMode="danger"
                  clickHandlerCallback={() => {
                     this.onButtonClick("closeForm");
                  }}
               />
               <Button
                  text={this.renderSuccessBtnText(formMode)}
                  displayMode="success"
                  clickHandlerCallback={() => {
                     this.onButtonClick(formMode);
                  }}
               />
            </div>
         </div>
      );
   }
}

TransactionForm.propTypes = {
   formMode: PropTypes.oneOf(["addTransaction", "editTransaction"]).isRequired,
   transactionData: PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      payment: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      paymentMethod: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      transactions_listId: PropTypes.string,
   }).isRequired,
   onButtonClickCallback: PropTypes.func.isRequired,
};
export default TransactionForm;
