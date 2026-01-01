export const initialShippingState = {
    name: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
};

export const initShipping = () => {
    try {
        return JSON.parse(sessionStorage.getItem('shippingAddress')) || initialShippingState; 
    } catch (error) {
        console.log(error.message);
        return initialShippingState;
    }
}

export const SET_FIELD = 'SET_FIELD';
export const RESET_FORM = 'RESET_FORM';
export const GET_INFO_FROM_LS = 'GET_INFO_FROM_LS';

export const shippingAddressReducer = (state, { type, payload }) => {
    switch (type) {
        case SET_FIELD:
            return { 
                ...state, 
                [payload.field]: payload.value 
            };
        case RESET_FORM:
            return initialShippingState;
        case GET_INFO_FROM_LS:
            return {...state, ...payload}
        default:
            return state;
    }
};
