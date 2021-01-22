import React, { Fragment, useState, useEffect } from 'react';
import './StatisticsAndDataPage.css';
import dates from '../../utils/dates';
import { sortTransactions } from '../../utils/sortHelper';
import useTransactionsApi from '../../utils/custom-hook/useTransactionsApi';
// Constants
import { netReqAction } from '../../utils/constants';
import text from '../../translations/he';
// Components
import PieGraphHooks from '../../components/_Graphs/PieGraphHooks';
import SelectField from '../../components/_InputFields/SelectField';
import TransactionsList from '../../components/TransactionsList/TransactionsList';

//FIXME: add prop types + refactor by conventions.txt
//TODO: use date library
//TODO: display loader
//TODO: render month options dynamically, category match month

const StatisticsAndDataPage = () => {
   /** Manage Inputs name at one place. */
   // const inputsManager = {
   //    month: 'month',
   //    year: 'year',
   //    sortBy: 'sortBy',
   // };

   /** State */
   const [{ monthData /*, isLoading, isError */ }, setNetworkRequest] = useTransactionsApi({
      defaultState: {
         transactionsList: [],
         metadata: {},
      },
      fetchQuery: 'debitDistribution',
   });
   const [sortedTransactionList, setSortedTransactionList] = useState(monthData.transactionsList);
   // const [datePicker, setDatePicker] = useState(() => {
   //    const { month, year } = dates.getDateData();
   //    return { month, year };
   // });
   // const [sortByPicker, setSortByPicker] = useState('date');
   const [inputs, setInputs] = useState(() => {
      const { month, year } = dates.getDateData();
      return {
         month: { name: 'month', value: month },
         year: { name: 'year', value: year },
         sortBy: { name: 'date', value: 'date' },
      };
   });

   /** When month, year inputs change, fetch according transaction data  */
   useEffect(() => {
      setNetworkRequest({
         type: netReqAction.FETCH_TRANSACTIONS_ENDPOINT,
         payload: { month: inputs.month.value, year: inputs.year.value },
      });
   }, [inputs.month.value, inputs.year.value, setNetworkRequest]);

   /** When month data change, render it on the table, set sortBy input value to date  */
   useEffect(() => {
      setSortedTransactionList(monthData.transactionsList);
      setInputs((prevState) => ({
         ...prevState,
         sortBy: { ...prevState.sortBy, value: 'date' },
      }));
   }, [monthData]);

   /** Inputs Event Handlers */
   const onInputChange = ({ target }) => {
      switch (target.name) {
         case inputs.month.name:
         case inputs.year.name:
            return setInputs((prevState) => ({
               ...prevState,
               [target.name]: { ...prevState[target.name], value: parseInt(target.value) },
            }));
         case inputs.sortBy.name:
            setInputs((prevState) => ({
               ...prevState,
               sortBy: { ...prevState.sortBy, value: target.value },
            }));
            return setSortedTransactionList(sortTransactions(sortedTransactionList, target.value));
         default:
            throw new Error('Invalid input name');
      }
   };

   /** Rendering */
   return (
      <div className="statistics-page">
         <div className="section statistics-page__header">
            <h2>{text.pages.statistics.monthlyState}</h2>
            <div className="statistics-page__month-year-selection">
               <SelectField
                  value={inputs.month.value}
                  options={text.inputs.selectMonth.options}
                  config={{
                     fieldLabel: text.inputs.selectMonth.label,
                     inputName: inputs.month.name,
                     displayMode: 'row',
                  }}
                  onChangeCallback={onInputChange}
               />
               <SelectField
                  value={inputs.year.value}
                  options={[
                     { label: 2020, value: 2020 },
                     { label: 2021, value: 2021 },
                  ]}
                  config={{
                     fieldLabel: text.inputs.selectYear.label,
                     inputName: inputs.year.name,
                     displayMode: 'row',
                  }}
                  onChangeCallback={onInputChange}
               />
            </div>
            {monthData.transactionsList.length === 0 && (
               <p className="statistics-page__message">{text.errors.noMonthData}</p>
            )}
         </div>

         {monthData.transactionsList.length === 0 ? null : (
            <Fragment>
               <div className="section">
                  <h2>{text.pages.statistics.debitDistribution}</h2>
                  <PieGraphHooks data={monthData.metadata} />
               </div>
               <div className="list-container">
                  <div className="test-select">
                     <SelectField
                        value={inputs.sortBy.value}
                        options={text.inputs.selectSortingMethod.options}
                        config={{
                           fieldLabel: text.inputs.selectSortingMethod.label,
                           inputName: inputs.sortBy.name,
                           displayMode: 'row',
                        }}
                        onChangeCallback={onInputChange}
                     />
                  </div>

                  <TransactionsList transactionsListData={sortedTransactionList} isEditableList={false} />
               </div>
            </Fragment>
         )}
      </div>
   );
};

export default StatisticsAndDataPage;
