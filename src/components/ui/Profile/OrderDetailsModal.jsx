import { X } from 'lucide-react';
import value from '@/assets/images/value.png';
import frameBottom from '@/assets/images/frameBottom.png';
import frameTop from '@/assets/images/frameTop.png';

export const OrderDetailsModal = ({onClose, order, items}) => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-black via-transparent to-black backdrop-blur-md z-50 flex justify-center items-center animate-fadeIn">
            <div 
                className="absolute inset-0 bg-black/60" 
                onClick={onClose} 
            />
            <div className="relative max-w-md w-full bg-zinc-900 rounded-xl border border-white/10 p-6 z-10">
                <div className='relative w-full'>
                    <img 
                        src={frameTop} 
                        alt="frameTop" 
                        className='top-[-3rem] w-[25rem] absolute left-[50%] translate-x-[-50%]' 
                    />
                </div>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">{order.id}</h3>
                        <X onClick={onClose} className="cursor-pointer text-gray-300 hover:text-white"></X>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm text-gray-300 mb-1">
                            <strong>Date:</strong> {order.date}
                        </p>
                        <p className="text-sm text-gray-300 mb-1">
                            <strong>Status:</strong> {order.status}
                            </p>
                        <p className="text-sm text-gray-300 mb-1">
                            <strong>Tax:</strong> {order.taxValue} 
                            <img src={value} alt="Value" className="inline w-4 h-4" />
                        </p>
                        <p className="text-sm text-gray-300 mb-1">
                            <strong>Delivery:</strong> {order.deliveryValue} 
                            <img src={value} alt="Value" className="inline w-4 h-4" />
                        </p>
                        <p className="text-sm text-gray-300 mb-1">
                            <strong>Total:</strong> {order.totalValue} 
                            <img src={value} alt="Value" className="inline w-4 h-4" />
                        </p>
                    </div>
                    <h4 className="text-white font-semibold mb-2">Items</h4>
                    <ul className="mb-4 text-sm text-gray-300 space-y-2 max-h-[8rem] overflow-y-auto custom-scroll">
                        {items.map(item => (
                            <li key={item.id} className="flex items-start justify-between">
                                <div>
                                    <div className="font-medium text-white">{item.name}</div>
                                    <div className="text-xs text-gray-400">
                                        Qty: {item.quantity} 
                                        <p>
                                            Price: {item.price}
                                            <img src={value} alt="Value" className="inline w-4 h-4" />
                                        </p> 
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-white">
                                    {item.price * item.quantity}
                                    <img src={value} alt="Value" className="inline w-4 h-4" />
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="pt-4 border-t border-white/10">
                        <button 
                            className="px-6 inline-flex justify-center items-center gap-2 cursor-pointer py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                            onClick={onClose} 
                        >
                            Close
                        </button>
                    </div> 
                </section>

                <div className='relative w-full'>
                    <img 
                        src={frameBottom} 
                        alt="frameBottom" 
                        className='top-[1rem] w-[25rem] absolute left-[50%] translate-x-[-50%]' 
                    />
                </div>
            </div>
        </div>
    )
}