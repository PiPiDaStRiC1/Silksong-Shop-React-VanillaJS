import orderActions from '@/libs/constants/orderActionTypes';

export const initialOrderState = {
    orders: {},
    deliveryTimers: {},
};

export const initOrderState = () => {
    try {
        return JSON.parse(localStorage.getItem('orders')) || initialOrderState;
    } catch (error) {
        console.log(error.message);
        return initialOrderState;
    }
}

export const orderReducer = ({orders, deliveryTimers}, {type, payload = null}) => {
    switch (type) {
        case orderActions.CREATE_ORDER:
            return {
                orders: {
                    ...orders,
                    [payload.orderId]: payload.orderData
                },
                deliveryTimers
            }
        case orderActions.UPDATE_ORDER_STATUS:
            return {
                orders: {
                    ...orders,
                    [payload.orderId]: {
                        ...orders[payload.orderId],
                        status: payload.status
                    }
                },
                deliveryTimers
            }
        case orderActions.CANCEL_ORDER: {
            const newOrders = {...orders};
            delete newOrders[payload.orderId];
            return {
                orders: newOrders,
                deliveryTimers
            };
        }
        case orderActions.START_DELIVERY_TIMER:
            return {
                orders,
                deliveryTimers: {
                    ...deliveryTimers,
                    [payload.orderId]: payload.timerId
                }
            }
        default:
            return {orders, deliveryTimers};
    }
}