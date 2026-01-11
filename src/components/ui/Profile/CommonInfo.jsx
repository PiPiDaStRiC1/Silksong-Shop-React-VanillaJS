import {useOrder, useWishList} from '@/hooks/index';
import {Package, Heart, CheckCircle2} from 'lucide-react';
import value from '@/assets/images/value.png';

export const CommonInfo = () => {
    const {orders = {}} = useOrder();
    const {wishList = {}} = useWishList();
    const [totalOrders, totalSpent] = Object.values(orders).reduce((acc, el) => [acc[0] + 1, el.status !== 'processing' ? acc[1] + el.totalValue : acc[1]], [0, 0]);
    const totalCompleted = Object.values(orders).filter(order => order.status === 'delivered').length;
    const wishListCount = Object.values(wishList).length;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-900/20 to-black p-6">
                <Package className="w-8 h-8 text-violet-400 mb-3" />
                <p className="text-3xl font-bold text-white mb-1">{totalOrders}</p>
                <p className="text-sm text-gray-400">Total Orders</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-900/20 to-black p-6">
                <Heart className="w-8 h-8 text-fuchsia-400 mb-3" />
                <p className="text-3xl font-bold text-white mb-1">{wishListCount}</p>
                <p className="text-sm text-gray-400">Wishlist Items</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-black p-6">
                <div className="flex items-center gap-2 mb-3">
                    <img src={value} alt="Value" className="w-8 h-8" />
                </div>
                <p className="text-3xl font-bold text-white mb-1">{totalSpent}</p>
                <p className="text-sm text-gray-400">Total Spent</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-900/20 to-black p-6">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-3" />
                <p className="text-3xl font-bold text-white mb-1">{totalCompleted}</p>
                <p className="text-sm text-gray-400">Delivered</p>
            </div>
        </div>
    )
}