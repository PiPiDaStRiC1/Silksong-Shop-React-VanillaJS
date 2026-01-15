import valueIcon from '@/assets/images/value.png';
import {Heart} from 'lucide-react';
import { useWishList } from '@/hooks/index'
import {ImgLoadingPlaceholder} from '@/features/index';

export const CatalogCard = ({ product, onClick, onAdd, loading }) => {
  const {id, name, price, category, imgSrc, sale, stock} = product;
  // Since there are few cards, we can ignore the optimization related to wishlist. 
  // Currently, ~20 cards will change every time you click on a like
  const {wishList, addToWL, removeFromWL} = useWishList();
  const isFavorite = wishList[id] !== undefined;

  return (
    <div 
      className="group animate-fadeIn rounded-2xl border border-neutral-800 bg-neutral-900 p-4 hover:border-neutral-600 transition-colors cursor-pointer"
      onClick={onClick} 
    >
      <div className="w-full aspect-square bg-black/30 rounded-xl flex items-center justify-center overflow-hidden relative">
      <ImgLoadingPlaceholder src={imgSrc} loading={loading} alt={name} className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"/>
        {sale && (
          <span className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-red-600 text-white text-xs font-semibold">
            -{sale}%
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();

            if (isFavorite) {
              removeFromWL({ id, name });
            } else {
              addToWL({ id, name, price, imgSrc, stock, category });
            }
          }}
          className={`cursor-pointer absolute top-2 left-2 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur transition-colors hover:border-white/40 ${isFavorite ? 'text-rose-400' : 'text-gray-300'}`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-rose-400' : 'fill-transparent'}`} />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between text-white">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm md:text-base font-semibold">{name}</h3>
          <span className="inline-flex items-center gap-1 text-gray-300 text-sm">
            {price}
            <img src={valueIcon} alt="value" className='w-[1rem] h-[1rem]'/>
          </span>
          {stock !== undefined && (
            <span className={`text-xs ${
              stock === 0 ? 'text-red-400' : 
              stock <= 5 ? 'text-amber-400' : 
              'text-gray-500'
            }`}>
              {stock === 0 ? 'Out of stock' : stock <= 5 ? `Only ${stock} left!` : `${stock} in stock`}
            </span>
          )}
        </div>
        <button 
          className="px-3 py-2 rounded-lg cursor-pointer border border-white text-white hover:bg-white hover:text-black transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          disabled={stock === 0}
        >
          Add
        </button>
      </div>
    </div>
  )
}