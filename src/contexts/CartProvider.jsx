import {cartReducer} from '../reducers/cartReducer';
import { useEffect, useReducer, useMemo, useCallback } from 'react';
import {CartContext} from '../contexts/CartContext';
import actions from '@/libs/constants/cartActionTypes';
import toast from 'react-hot-toast';

const initCart = () => {
    const savedFromLS = JSON.parse(localStorage.getItem('cart')) || {};
    return savedFromLS;
}

export const CartProvider = ({children}) => {
    const [cart, dispatch] = useReducer(cartReducer, {}, initCart);
    
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
        totalValue,
        cheapCartEl
    }), [cart, addItem, removeItem, incQty, decQty, totalValue, cheapCartEl]);

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}