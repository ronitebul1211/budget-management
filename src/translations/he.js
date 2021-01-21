const text = {
   inputs: {
      selectMonth: {},
      selectSortingMethod: {},
   },
   pages: {
      statistics: {},
   },
   errors: {},
};

/** Inputs */
text.inputs.selectMonth.label = 'בחר חודש';
text.inputs.selectMonth.options = [
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
];
text.inputs.selectSortingMethod.label = 'מיין לפי';
text.inputs.selectSortingMethod.options = [
   { label: 'תאריך', value: 'date' },
   { label: 'אמצעי תשלום', value: 'paymentMethod' },
   { label: 'קטגוריה', value: 'category' },
   { label: 'תיאור', value: 'description' },
   { label: 'סכום', value: 'totalPayment' },
];
/** Pages */
text.pages.statistics.monthlyState = 'תמונת מצב חודשית';
text.pages.statistics.debitDistribution = 'התפלגות הוצאות לפי קטגוריה';

/** Errors */
text.errors.noMonthData = 'אין נתונים עבור חודש זה';

export default text;
