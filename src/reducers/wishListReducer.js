export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const CLEAR_WISHLIST = 'CLEAR_WISHLIST';

export const initWishList = () => {
    try {
        return JSON.parse(localStorage.getItem('wishList')) || {};
    } catch (error) {
        console.log(error.message);
        return {};
    }
}

export const wishListReducer = (state, {type, payload = null}) => {
    switch(type) {
        case ADD_TO_WISHLIST:
            return {
                ...state,
                [payload.id]: payload.data
            }
        case REMOVE_FROM_WISHLIST: {
            const newState = {...state};
            delete newState[payload.id];
            return newState;
        }
        case CLEAR_WISHLIST:
            return {};
    }
}   