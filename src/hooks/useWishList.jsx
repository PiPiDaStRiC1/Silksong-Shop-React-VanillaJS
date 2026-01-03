import {WishListContext} from '@/contexts/WishListContext';
import { useContext } from 'react';

export const useWishList = () => {
    const context = useContext(WishListContext);
    if (!context) throw new Error('useWishList must be used within a WishListProvider');
    return context;
}