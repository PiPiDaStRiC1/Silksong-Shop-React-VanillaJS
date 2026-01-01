import actions from '@/libs/constants/cartActionTypes';

export const cartReducer = ({cart, selectedDeliveryTariff}, {type, payload = null}) => {
    switch (type) {
        case actions.ADD_TO_CART: {
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
        case actions.REMOVE_FROM_CART: {
            const newState = {...cart};
            delete newState[payload.id];
            return {
                cart: newState,
                selectedDeliveryTariff: selectedDeliveryTariff
            };
        }
        case actions.INCREASE_QUANTITY: {
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
        case actions.DECREASE_QUANTITY: {
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
        case actions.SELECT_DELIVERY_TARIFF: {
            return {
                cart: cart,
                selectedDeliveryTariff: payload
            }
        }
        case actions.RESET_CART: {
            return {
                cart: {},
                selectedDeliveryTariff: null
            }
        }
        default: {
            return {cart, selectedDeliveryTariff};
        }
    }
}