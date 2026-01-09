import {cartReducer} from '../reducers/cartReducer';
import { useEffect, useReducer, useMemo, useCallback } from 'react';
import {CartContext} from '../contexts/CartContext';
import cartActions from '@/libs/constants/cartActionTypes';
import toast from 'react-hot-toast';

const initialState = {
    cart: {},
    selectedDeliveryTariff: 'Eco',
}

const initCart = () => {
    const currentUserId = localStorage.getItem('currentUserId') || null;
    const savedFromLS = JSON.parse(localStorage.getItem(`cart_${currentUserId}`)) || {cart: {}, tariff: 'Eco'};
    const savedCart = savedFromLS?.cart || {};
    const savedTariffFromLS = savedFromLS?.tariff || 'Eco';
    return {cart: savedCart, selectedDeliveryTariff: savedTariffFromLS};
}


export const CartProvider = ({children}) => {
    const currentUserId = localStorage.getItem('currentUserId') || null;
    const [{cart, selectedDeliveryTariff}, dispatch] = useReducer(cartReducer, initialState, initCart);
    
    const addItem = useCallback((item) => {
        const existingQty = cart[item.id]?.quantity ?? 0;

        if (existingQty + (item.quantity ?? 1) > item.stock) {
            toast.error(`Cannot add more than ${item.stock} items of ${item.name} to the cart.`);
            return;
        }

        toast.success(`${item.name} added to cart`);
        dispatch({type: cartActions.ADD_TO_CART, payload: item});
    }, [cart]);

    const removeItem = useCallback((item) => {
        dispatch({type: cartActions.REMOVE_FROM_CART, payload: item});
        toast.error(`${item.name} removed from cart`);
    }, []);

    const incQty = useCallback((item) => {
        if (item.quantity == item.stock) {
            toast.error(`Cannot add more than ${item.stock} items of ${item.name} to the cart.`);
            return;
        }

        dispatch({type: cartActions.INCREASE_QUANTITY, payload: item});
        toast.success(`${item.name} quantity increased`);
    }, []);

    const decQty = useCallback((item) => {
        dispatch({type: cartActions.DECREASE_QUANTITY, payload: item});

        if (item.quantity <= 1) {
            toast.error(`${item.name} removed from cart`);
            return;
        }
        toast.error(`${item.name} quantity decreased`);
    }, []);

    const selectDeliveryTariff = useCallback((tariff) => {
        dispatch({type: cartActions.SELECT_DELIVERY_TARIFF, payload: tariff});
    }, []);

    const resetCart = useCallback(() => {
        dispatch({type: cartActions.RESET_CART});
    }, []);

    const totalValue = useMemo(() => {
        return Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cart]);

    const totalCount = useMemo(() => {
        return Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
    }, [cart]);

    // SAVED FROM LS IF USER LOGGED IN
    useEffect(() => {
        if (currentUserId) {
            const saved = JSON.parse(localStorage.getItem(`cart_${currentUserId}`)) || {};
            dispatch({type: cartActions.INIT_CART, payload: {cart: saved?.cart || {}, tariff: saved?.tariff || 'Eco'}});
        } else {
            dispatch({type: cartActions.INIT_CART, payload: {cart: {}, tariff: 'Eco'}});
        }
    }, [currentUserId]);

    useEffect(() => {
        if (currentUserId) {
            localStorage.setItem(`cart_${currentUserId}`, JSON.stringify({cart, tariff: selectedDeliveryTariff}));
        }
    }, [cart, selectedDeliveryTariff, currentUserId]);


    const value = useMemo(() => ({
        cart,
        selectedDeliveryTariff,
        addItem,
        removeItem,
        incQty,
        decQty,
        selectDeliveryTariff,
        resetCart,
        totalValue,
        totalCount
    }), [cart, selectedDeliveryTariff, addItem, removeItem, incQty, decQty, selectDeliveryTariff, resetCart, totalValue, totalCount]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}