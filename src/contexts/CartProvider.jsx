import {cartReducer} from '../reducers/cartReducer';
import { useEffect, useReducer, useMemo, useCallback } from 'react';
import {CartContext} from '../contexts/CartContext';
import actions from '@/libs/constants/cartActionTypes';

const initCart = () => {
    const savedFromLS = JSON.parse(localStorage.getItem('cart')) || {};
    return savedFromLS;
}

export const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(cartReducer, {}, initCart);
    
    const addItem = useCallback((item) => {
        dispatch({type: actions.ADD_TO_CART, payload: item});
    }, []);

    const removeItem = useCallback((item) => {
        dispatch({type: actions.REMOVE_FROM_CART, payload: item});
    }, []);

    const incQty = useCallback((item) => {
        dispatch({type: actions.INCREASE_QUANTITY, payload: item});
    }, []);

    const decQty = useCallback((item) => {
        dispatch({type: actions.DECREASE_QUANTITY, payload: item});
    }, []);

    const clearCart = useCallback(() => {
        dispatch({type: actions.CLEAR_CART});
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const totalValue = useMemo(() => {
        return Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cart]);

    const cheapCartEl = useMemo(() => {
        const cartElements = Object.values(cart);
        cartElements.sort((a, b) => a.price - b.price);
        return cartElements[0];
    }, [cart]);

    const value = useMemo(() => ({
        cart,
        addItem,
        removeItem,
        incQty,
        decQty,
        clearCart,
        totalValue,
        cheapCartEl
    }), [cart, addItem, removeItem, incQty, decQty, clearCart, totalValue, cheapCartEl]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}