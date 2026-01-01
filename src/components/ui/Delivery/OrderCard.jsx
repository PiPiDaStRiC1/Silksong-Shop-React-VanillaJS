import value from '@/assets/images/value.png';  
import { Plus, Minus, X } from "lucide-react";

export const OrderCard = ({ item, removeItem, incQty, decQty }) => {
    return (
        <div className="mb-4">
            <div className="relative flex items-start gap-3 p-3 rounded-xl bg-white/5">
                <button
                    onClick={() => removeItem(item)}
                    className="absolute top-2 right-2 h-5 w-5 rounded-md hover:bg-red-500/20 transition-colors flex items-center justify-center group"
                    aria-label="Remove item"
                >
                    <X className="h-3.5 w-3.5 text-gray-400 group-hover:text-red-400" />
                </button>
                <div>
                    <img src={item.imgSrc} alt={item.name} className="w-14 h-14 object-contain"/>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate pr-6">{item.name}</p>
                    <p className="text-xs text-gray-400 mb-2">Qty: {item.quantity}</p>
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={() => decQty(item)}
                            className="h-6 w-6 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                            aria-label="Decrease quantity"
                        >
                            <Minus className="h-3 w-3 text-gray-300" />
                        </button>
                        <button
                            onClick={() => incQty(item)}
                            className="h-6 w-6 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
                            aria-label="Increase quantity"
                        >
                            <Plus className="h-3 w-3 text-gray-300" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-start pt-6">
                    <span className="font-semibold inline-flex text-white justify-center items-center gap-1">
                        <span className="text-sm">{item.price * item.quantity}</span>
                        <img src={value} alt="Value Icon" className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </div>
    )
}