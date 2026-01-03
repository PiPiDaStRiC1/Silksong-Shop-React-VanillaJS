import valueIcon from '@/assets/images/value.png';
import {Trash2, ExternalLink} from 'lucide-react'

export const WishListCard = ({item, onView, onRemove}) => {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-3 hover:border-white/30 transition-colors">
            <div className="flex gap-3">
                <div className="w-20 h-20 rounded-xl bg-black/40 flex items-center justify-center overflow-hidden">
                    <img src={item.imgSrc} alt={item.name} className="max-h-full max-w-full object-contain" />
                </div>
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="text-white font-semibold leading-tight line-clamp-2">{item.name}</h3>
                        <button
                            onClick={onRemove}
                            className="cursor-pointer p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 text-gray-200 font-semibold">
                        <span>{item.price}</span>
                        <img src={valueIcon} alt="value" className="w-4 h-4" />
                    </div>
                    {item.stock !== undefined && (
                        <p className={`text-xs mt-1 ${item.stock === 0 ? 'text-red-400' : item.stock <= 5 ? 'text-amber-300' : 'text-gray-400'}`}>
                            {item.stock === 0 ? 'Out of stock' : item.stock <= 5 ? `Only ${item.stock} left` : `${item.stock} in stock`}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex gap-2">
                <button 
                    onClick={onView}
                    className='w-full cursor-pointer p-2 inline-flex justify-center items-center gap-2 cursor-pointer rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors'
                >
                    <ExternalLink className="w-4 h-4" />
                    View item
                </button>
            </div>
        </div>
    )
}