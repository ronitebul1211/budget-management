// Network Request Actions
export const netReqAction = {
   FETCH_TRANSACTIONS_ENDPOINT: 'FETCH_TRANSACTIONS_ENDPOINT',
   CREATE_TRANSACTION_ENDPOINT: 'CREATE_TRANSACTION_ENDPOINT',
   UPDATE_TRANSACTION_ENDPOINT: 'UPDATE_TRANSACTION_ENDPOINT',
   DELETE_TRANSACTION_ENDPOINT: 'DELETE_TRANSACTION_ENDPOINT',
};

// Transaction Form Modes
export const formMode = {
   CREATE_TRANSACTION: 'CREATE_TRANSACTION',
   EDIT_TRANSACTION: 'EDIT_TRANSACTION',
};

//Month Manager Page Actions
export const formControllerAction = {
   CLOSE_FORM: 'CLOSE_FORM',
   OPEN_FROM_CREATE_MODE: 'OPEN_FROM_CREATE_MODE',
   OPEN_FORM_EDIT_MODE: 'OPEN_FORM_EDIT_MODE',
};

/** Text / Language Constants */
export const selectMonthField = {
   label: 'בחר חודש',
   options: [
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
   ],
};
