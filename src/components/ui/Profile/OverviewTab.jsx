import value from '@/assets/images/value.png';
import {CheckCircle2, Package, Clock} from 'lucide-react';
import {useOrder} from '@/hooks/index'

export const OverviewTab = ({setActiveTab}) => {
    const {orders} = useOrder(); 
    const recentOrders = Object.entries(orders);

    return (
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
                <button
                    onClick={() => setActiveTab('orders')}
                    className="cursor-pointer text-sm text-violet-400 hover:text-violet-300 transition"
                >
                    View all →
                </button>
            </div>
            <div className="space-y-4">
                {recentOrders.length > 0 ? recentOrders.slice(0, 3).map(([key, order]) => (
                    <div
                        key={key}
                        className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                order.status === 'delivered' ? 'bg-emerald-500/20' :
                                order.status === 'shipped' ? 'bg-violet-500/20' : 'bg-orange-500/20'
                            }`}>
                                {order.status === 'delivered' ? (
                                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                ) : order.status === 'shipped' ? (
                                    <Package className="w-6 h-6 text-violet-400" />
                                ) : (
                                    <Clock className="w-6 h-6 text-orange-400" />
                                )}
                            </div>
                            <div>
                                <p className="text-white font-medium">{key}</p>
                                <p className="text-sm text-gray-400">{order.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center gap-1 text-white font-semibold mb-1">
                                <span>{order.totalValue}</span>
                                <img src={value} alt="Value" className="w-4 h-4" />
                            </div>
                            <span className={`text-xs px-2 py-1 rounded ${
                                order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                                order.status === 'shipped' ? 'bg-violet-500/20 text-violet-400' :
                                'bg-orange-500/20 text-orange-400'
                            }`}>
                                {order.status}
                            </span>
                        </div>
                    </div>
                )) : (
                    <p className="text-gray-400 text-center">No recent orders found.</p>
                )}
            </div>
        </div>
    );
}