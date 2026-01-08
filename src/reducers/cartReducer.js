import cartActions from '@/libs/constants/cartActionTypes';

export const cartReducer = ({cart, selectedDeliveryTariff}, {type, payload = null}) => {
    switch (type) {
        case cartActions.ADD_TO_CART: {
            return {
                cart: {
                    ...cart,
                    [payload.id]: {
                        ...payload,
                        quantity: Math.min((cart[payload.id]?.quantity ?? 0) + (payload?.quantity ?? 1), payload.stock),
                    }
                },
                selectedDeliveryTariff: selectedDeliveryTariff
            }
        }
        case cartActions.REMOVE_FROM_CART: {
            const newState = {...cart};
            delete newState[payload.id];
            return {
                cart: newState,
                selectedDeliveryTariff: selectedDeliveryTariff
            };
        }
        case cartActions.INCREASE_QUANTITY: {
            const item = cart[payload.id];
            const nextQty = (item?.quantity ?? 0) + 1;
            if (nextQty > item.stock) return {cart, selectedDeliveryTariff};
            return {
                cart: {
                    ...cart,
                    [payload.id]: {
                        ...payload,
                        quantity: nextQty,
                    }
                },
                selectedDeliveryTariff: selectedDeliveryTariff
            }
        }
        case cartActions.DECREASE_QUANTITY: {
            const item = cart[payload.id];
            const nextQty = (item?.quantity ?? 0) - 1;
            if (nextQty <= 0) {
                const newState = {...cart};
                delete newState[payload.id];
                return {
                    cart: newState,
                    selectedDeliveryTariff: selectedDeliveryTariff
                };
            };
            return {
                cart: {
                    ...cart,
                    [payload.id]: {
                        ...payload,
                        quantity: nextQty,
                    }
                },
                selectedDeliveryTariff: selectedDeliveryTariff
            }
        }
        case cartActions.SELECT_DELIVERY_TARIFF: 
            return {
                cart: cart,
                selectedDeliveryTariff: payload
            }
        case cartActions.RESET_CART: 
            return {
                cart: {},
                selectedDeliveryTariff: 'Eco'
            }
        case cartActions.INIT_CART:
            return {
                cart: payload,
                selectedDeliveryTariff: selectedDeliveryTariff
            }
        default: 
            return {cart, selectedDeliveryTariff};
    }
}