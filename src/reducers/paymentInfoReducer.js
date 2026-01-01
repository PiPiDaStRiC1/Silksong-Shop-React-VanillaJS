export const initialPaymentInfoState = {
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: ''
};

export const SET_VALUE = 'SET_VALUE';
export const RESET_FORM = 'RESET_FORM';

export const initPaymentInfo = () => {
    try {
        return JSON.parse(sessionStorage.getItem('paymentInfo')) || initialPaymentInfoState; 
    } catch (error) {
        console.log(error.message);
        return initialPaymentInfoState;
    }
}

export const paymentInfoReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_VALUE:
        return {
            ...state,
            [payload.field] : payload.value
        }
    case RESET_FORM:
        return initialPaymentInfoState;
    default:
        return state;
    }
};