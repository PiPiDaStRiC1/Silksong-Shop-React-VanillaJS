import { X, Heart, ShoppingCart, HeartCrack } from 'lucide-react';
import { useWishList } from '@/hooks/index';
import valueIcon from '@/assets/images/value.png';
import { useNavigate } from 'react-router-dom';

export const WishListModal = ({ onClose }) => {
  const { wishList, removeFromWL, clearWL } = useWishList();
  const navigate = useNavigate();
  const items = Object.values(wishList);

  const navigateToItem = (item) => {
    onClose();
    navigate(`/catalog/${item.category}/${item.id}`);
  };

  const handleGoToCatalog = () => {
    onClose();
    navigate('/catalog');
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-gradient-to-br from-black via-transparent to-black backdrop-blur-md z-40 transition-all duration-300 animate-fadeIn" 
        onClick={onClose} 
      />
      <div className="fixed px-2 right-0 top-0 h-full w-full max-w-md bg-zinc-900 shadow-2xl z-50 flex flex-col animate-slideInRight">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <h2 className="text-xl font-semibold text-white">
              Wishlist ({items.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 max-h-[40rem] overflow-y-auto custom-scroll p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <Heart className="w-16 h-16 text-gray-600 mb-4" />
                <p className="text-gray-400 mb-2">Your wishlist is empty</p>
                <p className="text-sm text-gray-500 mb-4">
                    Add items you love to save them for later
                </p>

                <button 
                    className="px-6 inline-flex justify-center items-center gap-2 cursor-pointer py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                    onClick={handleGoToCatalog} 
                >
                    Browse Catalog
                </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <img
                  src={item.imgSrc}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-lg bg-black/30"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-medium text-sm mb-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-300">
                      <span className="text-sm">{item.price}</span>
                      <img src={valueIcon} alt="value" className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button 
                        className={`${item.stock === 0 ? 'opacity-50' : ''} cursor-pointer p-2 inline-flex justify-center items-center gap-2 cursor-pointer rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors`}
                        onClick={() => navigateToItem(item)}
                    >
                       <ShoppingCart className="w-3 h-3" />
                        Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWL(item)}
                      className="cursor-pointer p-3 rounded-lg border border-white/10 text-gray-200 hover:text-red-400 hover:border-red-400/50 transition-colors"
                    >
                      <HeartCrack className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 space-y-3">
            <button
              onClick={clearWL}
              className="w-full cursor-pointer px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
            >
              Clear Wishlist
            </button>
            <button 
                className="cursor-pointer w-full p-2 inline-flex justify-center items-center gap-2 cursor-pointer rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                onClick={handleGoToCatalog}
            >
                Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};