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
   const inputsManager = {
      month: 'month',
      year: 'year',
      sortBy: 'sortBy',
   };

   /** State */
   const [{ monthData /*, isLoading, isError */ }, setNetworkRequest] = useTransactionsApi({
      defaultState: {
         transactionsList: [],
         metadata: {},
      },
      fetchQuery: 'debitDistribution',
   });
   const [datePicker, setDatePicker] = useState(() => {
      const { month, year } = dates.getDateData();
      return { month, year };
   });
   const [sortedTransactionList, setSortedTransactionList] = useState(monthData.transactionsList);
   const [sortByPicker, setSortByPicker] = useState('date');

   /** Effects */
   useEffect(() => {
      setNetworkRequest({ type: netReqAction.FETCH_TRANSACTIONS_ENDPOINT, payload: datePicker });
   }, [datePicker, setNetworkRequest]);

   useEffect(() => {
      setSortedTransactionList(monthData.transactionsList);
      setSortByPicker('date');
   }, [monthData]);

   /** Event Handlers */
   const onInputChange = (e) => {
      const target = e.target;
      switch (target.name) {
         case inputsManager.month:
         case inputsManager.year:
            return setDatePicker((prevState) => {
               return {
                  ...prevState,
                  [target.name]: parseInt(target.value),
               };
            });
         case inputsManager.sortBy:
            setSortByPicker(target.value);
            return setSortedTransactionList(sortTransactions(sortedTransactionList, target.value));
         default:
            throw new Error('Invalid target name');
      }
   };

   /** Rendering */
   return (
      <div className="statistics-page">
         <div className="section statistics-page__header">
            <h2>{text.pages.statistics.monthlyState}</h2>
            <div className="statistics-page__month-year-selection">
               <SelectField
                  value={datePicker.month}
                  options={text.inputs.selectMonth.options}
                  config={{
                     fieldLabel: text.inputs.selectMonth.label,
                     inputName: inputsManager.month,
                     displayMode: 'row',
                  }}
                  onChangeCallback={onInputChange}
               />
               <SelectField
                  value={datePicker.year}
                  options={[{ label: 2020, value: 2020 }]}
                  config={{ fieldLabel: 'בחר שנה', inputName: inputsManager.year, displayMode: 'row' }}
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
                  <h2>{text.pages.statistics.monthlyState}</h2>
                  <PieGraphHooks data={monthData.metadata} />
               </div>
               <div className="list-container">
                  <div className="test-select">
                     <SelectField
                        value={sortByPicker}
                        options={text.inputs.selectSortingMethod.options}
                        config={{
                           fieldLabel: text.inputs.selectSortingMethod.label,
                           inputName: inputsManager.sortBy,
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
