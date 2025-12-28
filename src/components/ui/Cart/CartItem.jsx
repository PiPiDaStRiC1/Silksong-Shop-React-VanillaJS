import { Trash2, Plus, Minus } from 'lucide-react';
import valueIcon from '@/assets/images/value.png';
import { Link } from 'react-router-dom';

export const CartItem = ({ item, removeItem, incQty, decQty, onClose }) => {
    return (
        <div
            key={item.id}
            className="flex gap-4 p-4 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition"
        >
            <Link 
                to={`/catalog/${item.category}/${item.id}`}
                onClick={onClose}
            >
                <div className="w-16 h-16 rounded-lg bg-black/30 border border-neutral-800 flex-shrink-0 overflow-hidden hover:border-neutral-500 transition">
                    <img src={item.imgSrc} alt={item.name} className="w-full h-full object-contain object-top" />
                </div>
            </Link>

            <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium truncate">{item.name}</h4>
            <p className="text-xs text-gray-500">{item.category}</p>
            <div className="flex items-center gap-1 mt-1">
                <span className="text-white font-semibold">{item.price}</span>
                <img src={valueIcon} alt="value" className="w-3 h-3" />
            </div>

            <div className="flex items-center gap-2 mt-2">
                <button
                    className="w-6 cursor-pointer h-6 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition"
                    onClick={() => decQty(item)}
                >
                    <Minus className="w-3 h-3" />
                </button>
                <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                <button
                    className="w-6 cursor-pointer h-6 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white transition"
                    onClick={() => incQty(item)}
                >
                    <Plus className="w-3 h-3" />
                </button>
            </div>
            </div>

            <button
                className="p-2 cursor-pointer h-fit rounded-lg hover:bg-red-900/20 text-gray-400 hover:text-red-400 transition"
                onClick={() => removeItem(item)}
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    )
}