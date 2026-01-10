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
        const currentUserId = localStorage.getItem('currentUserId') || null;
        if (currentUserId) {
            const user = JSON.parse(localStorage.getItem('users'))[currentUserId] || {};
            const loggedUserShippingState = {...initialShippingState, name: user.name || '', lastName: user.lastName || ''};
            return JSON.parse(localStorage.getItem(`delivery_${currentUserId}`))?.shippingData || loggedUserShippingState; 
        }
        return initialShippingState;
    } catch (error) {
        console.log(error.message);
        return initialShippingState;
    }
}

export const SET_FIELD = 'SET_FIELD';
export const RESET_FORM = 'RESET_FORM';
export const GET_INFO_FROM_LS = 'GET_INFO_FROM_LS';
export const INIT_SHIPPING = 'INIT_SHIPPING';

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
            return {
                ...state, 
                ...payload
            }
        case INIT_SHIPPING:
            return payload || initialShippingState;
        default:
            return state;
    }
};
