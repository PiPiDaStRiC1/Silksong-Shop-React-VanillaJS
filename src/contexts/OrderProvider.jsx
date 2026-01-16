import {OrderContext} from './OrderContext';
import {useCallback, useEffect, useMemo, useReducer, useRef} from 'react';
import orderActions from '@/libs/constants/orderActionTypes';
import {orderReducer, initOrderState, initialOrderState} from '@/reducers/orderReducer'
import {getRandomInt} from '@/libs/utils/randomNumber'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

export const OrderProvider = ({children}) => {
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('currentUserId') || null;
    const [{orders, deliveryTimers}, dispatch] = useReducer(orderReducer, initialOrderState, initOrderState);
    const delTimersRef = useRef({});

    const createOrder = useCallback((orderData) => {
        const orderId = crypto.randomUUID();
        dispatch({type: orderActions.CREATE_ORDER, payload: {orderId, orderData}});
        return orderId;
    }, []);

    const updateOrderStatus = useCallback((orderId, status) => {
        dispatch({type: orderActions.UPDATE_ORDER_STATUS, payload: {orderId, status}});
    }, []);

    const cancelOrder = useCallback((orderId) => {
        dispatch({type: orderActions.CANCEL_ORDER, payload: {orderId}});
    }, []);

    const initOrders = useCallback((ordersData) => {
        dispatch({type: orderActions.INIT_ORDERS, payload: ordersData});
    }, []);

    const startDeliveryTimer = useCallback((orderId) => {
        const deliveryTime = getRandomInt(5000, 15000);
        const timerId = setTimeout(() => {
            updateOrderStatus(orderId, 'delivered');
            navigate('/profile');
            toast.success('Your order has been delivered!');
        }, deliveryTime);

        dispatch({type: orderActions.START_DELIVERY_TIMER, payload: {orderId, timerId}});
        
        toast.loading(<span>Please wait {Math.floor(deliveryTime / 1000)} seconds... You can track your order status in your {<Link to="/profile" className='text-gray-200 hover:underline italic'>Profile</Link>} page</span>, {duration: deliveryTime - 1000});
    }, [navigate, updateOrderStatus]);

    // SAVED FROM LS IF USER LOGGED IN
    useEffect(() => {
        if (currentUserId) {
            const saved = JSON.parse(localStorage.getItem(`orders_${currentUserId}`)) || { orders: {}, deliveryTimers: {} };
            dispatch({type: orderActions.INIT_ORDERS, payload: saved.orders});
        } else {
            dispatch({type: orderActions.INIT_ORDERS, payload: {}});
        }
    }, [currentUserId])

    useEffect(() => {
        if (currentUserId) {
            localStorage.setItem(`orders_${currentUserId}`, JSON.stringify({ orders: orders ?? {}, deliveryTimers: deliveryTimers ?? {} }));
        }
    }, [orders, deliveryTimers, currentUserId])

    useEffect(() => {
        delTimersRef.current = deliveryTimers;
    }, [deliveryTimers]);

    useEffect(() => {
        return () => {
            Object.values(delTimersRef.current).forEach(timerId => clearTimeout(timerId));
        }
    }, []);
    
    const value = useMemo(() => ({
        orders,
        deliveryTimers,
        createOrder,
        updateOrderStatus,
        cancelOrder,
        startDeliveryTimer,
        initOrders
    }), [orders, deliveryTimers, createOrder, updateOrderStatus, cancelOrder, startDeliveryTimer, initOrders]);

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    )
}