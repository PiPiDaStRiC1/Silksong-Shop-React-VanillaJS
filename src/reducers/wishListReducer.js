export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const CLEAR_WISHLIST = 'CLEAR_WISHLIST';
export const INIT_WISHLIST = 'INIT_WISHLIST';

export const initWishList = () => { 
    try {
        const currentUserId = localStorage.getItem('currentUserId') || null;
        if (currentUserId) {
            return JSON.parse(localStorage.getItem(`wishList_${currentUserId}`)) || {};
        }
        return {};
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
        case INIT_WISHLIST:
            return payload || {};
        default:
            return state
    }
}   