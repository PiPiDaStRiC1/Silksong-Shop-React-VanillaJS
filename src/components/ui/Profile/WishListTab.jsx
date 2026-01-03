import { useNavigate } from "react-router-dom";
import {useWishList} from '@/hooks/index'
import { WishListCard } from "./WishListCard";
import {Heart} from 'lucide-react'

export const WishListTab = () => {
    const navigate = useNavigate();
    const {wishList, removeFromWL} = useWishList();
    const wishListItems = Object.values(wishList);

    if (wishListItems.length === 0) {
        return (
            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Wishlist</h2>
                <div className="flex flex-col gap-4 text-center py-12 justify-center items-center">
                    <div>
                        <Heart className="w-16 h-16 mx-auto mb-2 text-white/20" />
                        <p className="text-gray-400">Your wishlist is empty</p>
                    </div>
                    <button 
                        onClick={() => navigate('/catalog')}
                        className='cursor-pointer p-3 inline-flex justify-center items-center gap-2 cursor-pointer rounded-xl border border-white/40 bg-white/5 text-white hover:bg-white/10 transition-colors'
                    >
                        Browse Catalog
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            {wishListItems.map(item => (
                <WishListCard 
                    key={item.id} 
                    item={item}
                    onView={() => navigate(`/catalog/${item.category}/${item.id}`)}
                    onRemove={() => removeFromWL({id: item.id})}
                />
            ))}
        </div>
    )
}
