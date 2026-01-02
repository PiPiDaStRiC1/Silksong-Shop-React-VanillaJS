import {useOrder} from '@/hooks/index'
import {OrderCardSm} from './OrderCardSm';

export const OrdersTab = () => {
    const {orders} = useOrder(); 
    const allOrders = Object.entries(orders);

    return (
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
            <h2 className="text-xl font-semibold text-white mb-6">All Orders</h2>
            <div className="space-y-4">
                {allOrders.map(([key, order]) => (
                    <OrderCardSm key={key} order={{id: key, ...order}} />
                ))}
            </div>
        </div>
    )
}