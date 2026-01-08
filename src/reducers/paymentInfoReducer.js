export const initialPaymentInfoState = {
  cardNumber: '',
  cardHolder: '',
  expiryDate: '',
  cvv: ''
};

export const SET_VALUE = 'SET_VALUE';
export const RESET_FORM = 'RESET_FORM';
export const GET_INFO_FROM_LS = 'GET_INFO_FROM_LS';
export const INIT_PAYMENT_INFO = 'INIT_PAYMENT_INFO';

export const initPaymentInfo = () => {
    try {
        const currentUserId = localStorage.getItem('currentUserId') || null;
        if (currentUserId) {
            return JSON.parse(localStorage.getItem(`delInfo_${currentUserId}`))?.paymentInfoData || initialPaymentInfoState; 
        }
        return {};
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
    case GET_INFO_FROM_LS:
        return {
            ...state,
            ...payload
        }
    case INIT_PAYMENT_INFO:
        return payload || initialPaymentInfoState;
    default:
        return state;
    }
};