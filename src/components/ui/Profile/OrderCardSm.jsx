import value from '@/assets/images/value.png';
import { useState } from 'react';
import { OrderDetailsModal } from './OrderDetailsModal';

export const OrderCardSm = ({order}) => {
    const [openDetails, setOpenDetails] = useState(false);
    const items = Object.values(order.cartItems);

    return (
        <>
            <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="text-white font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-400">{order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                        order.status === 'shipped' ? 'bg-violet-500/20 text-violet-400' :
                        'bg-orange-500/20 text-orange-400'
                    }`}>
                        {order.status}
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                        {items.map(item => (
                            <span 
                                key={item.id} 
                                className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300"
                            >
                                {item.name} x{item.quantity}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 text-white font-semibold">
                        <span>{order.totalValue}</span>
                        <img src={value} alt="Value" className="w-4 h-4" />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <button
                        onClick={() => setOpenDetails(true)}
                        className="px-3 py-2 rounded-md bg-white/5 text-sm text-white hover:bg-white/10"
                    >
                        Details
                    </button>
                    <div className="text-xs text-gray-400">{Object.values(order.cartItems).length} items</div>
                </div>
            </div>
            {openDetails && 
                <OrderDetailsModal 
                    onClose={() => setOpenDetails(false)} 
                    order={order}
                    items={items}
                />
            }
        </>
    )
}