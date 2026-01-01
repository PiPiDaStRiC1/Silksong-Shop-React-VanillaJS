import {cartReducer} from '../reducers/cartReducer';
import { useEffect, useReducer, useMemo, useCallback } from 'react';
import {CartContext} from '../contexts/CartContext';
import actions from '@/libs/constants/cartActionTypes';
import toast from 'react-hot-toast';

const initialState = {
    cart: {},
    selectedDeliveryTariff: 'Eco',
}

const initCart = () => {
    const savedFromLS = JSON.parse(localStorage.getItem('cart')) || {};
    const savedTariffFromLS = JSON.parse(localStorage.getItem('tariff')) || 'Eco';
    return {cart: savedFromLS, selectedDeliveryTariff: savedTariffFromLS};
}


export const CartProvider = ({children}) => {
    const [{cart, selectedDeliveryTariff}, dispatch] = useReducer(cartReducer, initialState, initCart);
    
    const addItem = useCallback((item) => {
        const existingQty = cart[item.id]?.quantity ?? 0;

        if (existingQty + (item.quantity ?? 1) > item.stock) {
            toast.error(`Cannot add more than ${item.stock} items of ${item.name} to the cart.`);
            return;
        }

        toast.success(`${item.name} added to cart`);
        dispatch({type: actions.ADD_TO_CART, payload: item});
    }, [cart]);

    const removeItem = useCallback((item) => {
        dispatch({type: actions.REMOVE_FROM_CART, payload: item});
        toast.error(`${item.name} removed from cart`);
    }, []);

    const incQty = useCallback((item) => {
        if (item.quantity == item.stock) {
            toast.error(`Cannot add more than ${item.stock} items of ${item.name} to the cart.`);
            return;
        }

        dispatch({type: actions.INCREASE_QUANTITY, payload: item});
        toast.success(`${item.name} quantity increased`);
    }, []);

    const decQty = useCallback((item) => {
        dispatch({type: actions.DECREASE_QUANTITY, payload: item});

        if (item.quantity <= 1) {
            toast.error(`${item.name} removed from cart`);
            return;
        }
        toast.error(`${item.name} quantity decreased`);
    }, []);

    const selectDeliveryTariff = useCallback((tariff) => {
        dispatch({type: actions.SELECT_DELIVERY_TARIFF, payload: tariff});
    }, []);

    const resetCart = useCallback(() => {
        dispatch({type: actions.RESET_CART});
    }, []);


    const totalValue = useMemo(() => {
        return Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cart]);


    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('tariff', JSON.stringify(selectedDeliveryTariff));
    }, [cart, selectedDeliveryTariff]);


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
    }), [cart, selectedDeliveryTariff, addItem, removeItem, incQty, decQty, selectDeliveryTariff, resetCart, totalValue]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}