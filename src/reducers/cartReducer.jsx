import actions from '@/libs/constants/cartActionTypes';

export const cartReducer = (state, {type, payload = null}) => {
    switch (type) {
        case actions.ADD_TO_CART: {
            return {
                ...state,
                [payload.id]: {
                    ...payload,
                    quantity: Math.min((state[payload.id]?.quantity ?? 0) + (payload?.quantity ?? 1), payload.stock),
                }
            }
        }
        case actions.REMOVE_FROM_CART: {
            const newState = {...state};
            delete newState[payload.id];
            return newState;
        }
        case actions.INCREASE_QUANTITY: {
            const item = state[payload.id];
            const nextQty = (item?.quantity ?? 0) + 1;
            if (nextQty > item.stock) return state;
            return {
                ...state,
                [payload.id]: {
                    ...payload,
                    quantity: nextQty,
                }
            }
        }
        case actions.DECREASE_QUANTITY: {
            const item = state[payload.id];
            const nextQty = (item?.quantity ?? 0) - 1;
            if (nextQty <= 0) {
                const newState = {...state};
                delete newState[payload.id];
                return newState;
            };
            return {
                ...state,
                [payload.id]: {
                    ...payload,
                    quantity: nextQty,
                }
            }
        }
        case actions.CLEAR_CART: {
            return {};
        }
    }
}