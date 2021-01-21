const text = {
   inputs: {
      selectMonth: {},
   },
   pages: {
      statistics: {},
   },
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

/** Pages */
text.pages.statistics.monthlyState = 'תמונת מצב חודשית';
text.pages.statistics.debitDistribution = 'התפלגות הוצאות לפי קטגוריה';

export default text;
