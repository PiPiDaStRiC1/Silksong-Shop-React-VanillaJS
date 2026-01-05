import {wishListReducer, initWishList, ADD_TO_WISHLIST, CLEAR_WISHLIST, REMOVE_FROM_WISHLIST} from '@/reducers/wishListReducer';
import { WishListContext } from './WishListContext';
import { useReducer, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';

export const WishListProvider = ({children}) => {
    const [wishList, dispatchWishList] = useReducer(wishListReducer, {}, initWishList);

    const addToWL = useCallback((item) => {
        dispatchWishList({type: ADD_TO_WISHLIST, payload: {id: item.id, data: item}});
        toast.success(`${item.name} Added to Wish List`);
    }, []);

    const removeFromWL = useCallback((item) => {
        dispatchWishList({type: REMOVE_FROM_WISHLIST, payload: {id: item.id}});
        toast.error(`${item.name} Removed from Wish List`);
    }, []);

    const resetWL = useCallback(() => {
        dispatchWishList({type: CLEAR_WISHLIST});
    }, []);

    useEffect(() => {
        localStorage.setItem('wishList', JSON.stringify(wishList));
    }, [wishList])

    const value = useMemo(() => ({
        wishList,
        dispatchWishList,
        addToWL,
        removeFromWL,
        resetWL
    }), [wishList, dispatchWishList, addToWL, removeFromWL, resetWL]);

    return (
        <WishListContext.Provider value={value}>
            {children}
        </WishListContext.Provider>
    )
}