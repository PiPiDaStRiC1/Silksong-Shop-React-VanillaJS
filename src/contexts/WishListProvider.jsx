import {wishListReducer, initWishList, ADD_TO_WISHLIST, CLEAR_WISHLIST, REMOVE_FROM_WISHLIST, INIT_WISHLIST} from '@/reducers/wishListReducer';
import { WishListContext } from './WishListContext';
import { useReducer, useEffect, useMemo, useCallback } from 'react';
import toast from 'react-hot-toast';

export const WishListProvider = ({children}) => {
    const currentUserId = localStorage.getItem('currentUserId') || null;
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

    // SAVED FROM LS IF USER LOGGED IN
    useEffect(() => {
        if (currentUserId) {
            const savedFromLSUser = JSON.parse(localStorage.getItem(`wishList_${currentUserId}`)) || {};
            if (Object.values(savedFromLSUser).length !== 0) {
                dispatchWishList({type: INIT_WISHLIST, payload: savedFromLSUser});
            } else {
                const savedFromLSGuest = JSON.parse(localStorage.getItem('wishList_guest')) || {};
                dispatchWishList({type: INIT_WISHLIST, payload: savedFromLSGuest});
            }
            localStorage.removeItem('wishList_guest')
        } 
    }, [currentUserId])

    useEffect(() => {
        if (currentUserId) {
            localStorage.setItem(`wishList_${currentUserId}`, JSON.stringify(wishList));
        } else {
            localStorage.setItem('wishList_guest', JSON.stringify(wishList))
        }
    }, [wishList, currentUserId])

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