import React, { Fragment, useState, useEffect } from 'react';
import './StatisticsAndDataPage.css';
import dates from '../../utils/dates';
import { sortTransactions } from '../../utils/sortHelper';
import useTransactionsApi from '../../utils/custom-hook/useTransactionsApi';
import { netReqAction } from '../../utils/constants';
//Components
import PieGraphHooks from '../../components/_Graphs/PieGraphHooks';
import SelectField from '../../components/_InputFields/SelectField';
import TransactionsList from '../../components/TransactionsList/TransactionsList';

//FIXME: add prop types + refactor by conventions.txt

//TODO: render month options dynamically, category match month

const StatisticsAndDataPage = () => {
   const INITIAL_STATE = {
      transactionsList: [],
      metadata: {},
   };
   const [{ monthData /*, isLoading, isError */ }, setNetworkRequest] = useTransactionsApi({
      defaultState: INITIAL_STATE,
      fetchQuery: 'debitDistribution',
   });
   const [datePicker, setDatePicker] = useState(() => {
      const { month, year } = dates.getDateData();
      return { month, year };
   });
   const [sortedTransactionList, setSortedTransactionList] = useState(monthData.transactionsList);
   const [sortByPicker, setSortByPicker] = useState('date');

   useEffect(() => {
      setNetworkRequest({ type: netReqAction.FETCH_TRANSACTIONS_ENDPOINT, payload: datePicker });
   }, [datePicker, setNetworkRequest]);

   useEffect(() => {
      setSortedTransactionList(monthData.transactionsList);
      setSortByPicker('date');
   }, [monthData]);

   const onInputChange = (e) => {
      const target = e.target;
      switch (target.name) {
         case 'month':
         case 'year':
            return setDatePicker((prevState) => {
               return {
                  ...prevState,
                  [target.name]: parseInt(target.value),
               };
            });
         case 'sortBy':
            setSortByPicker(target.value);
            return setSortedTransactionList(sortTransactions(sortedTransactionList, target.value));
         default:
            throw new Error('Invalid target name');
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
                     { label: 'ינואר', value: 1 },
                     { label: 'פברואר', value: 2 },
                     { label: 'מרץ', value: 3 },
                     { label: 'אפריל', value: 4 },
                     { label: 'מאי', value: 5 },
                     { label: 'יוני', value: 6 },
                     { label: 'יולי', value: 7 },
                     { label: 'אוגוסט', value: 8 },
                     { label: 'ספטמבר', value: 9 },
                     { label: 'אוקטובר', value: 10 },
                     { label: 'נובמבר', value: 11 },
                     { label: 'דצמבר', value: 12 },
                  ]}
                  config={{ fieldLabel: 'בחר חודש', inputName: 'month', displayMode: 'row' }}
                  onChangeCallback={onInputChange}
               />
               <SelectField
                  value={datePicker.year}
                  options={[{ label: 2020, value: 2020 }]}
                  config={{ fieldLabel: 'בחר שנה', inputName: 'year', displayMode: 'row' }}
                  onChangeCallback={onInputChange}
               />
            </div>
            {monthData.transactionsList.length === 0 ? (
               <p className="statistics-page__message">{' אין נתונים עבור חודש זה'}</p>
            ) : null}
         </div>

         {monthData.transactionsList.length === 0 ? null : (
            <Fragment>
               {' '}
               <div className="section">
                  <h2>התפלגות הוצאות לפי קטגוריה</h2>

                  <PieGraphHooks data={monthData.metadata} />
               </div>
               <div className="list-container">
                  <div className="test-select">
                     <SelectField
                        value={sortByPicker}
                        options={[
                           { label: 'תאריך', value: 'date' },
                           { label: 'אמצעי תשלום', value: 'paymentMethod' },
                           { label: 'קטגוריה', value: 'category' },
                           { label: 'תיאור', value: 'description' },
                           { label: 'סכום', value: 'totalPayment' },
                        ]}
                        config={{ fieldLabel: 'מיין לפי', inputName: 'sortBy', displayMode: 'row' }}
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
