import { X, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import {CartItem} from './CartItem';
import valueIcon from '@/assets/images/value.png';
import {freeShoppingValue} from '@/libs/constants/freeShoppingValue';

export const CartModal = ({onClose}) => {
  const { cart, removeItem, incQty, decQty, totalValue, cheapCartEl } = useCart();
  const cartElements = Object.values(cart);
  const isShippingFree = freeShoppingValue <= totalValue;

  return (
    <> 
      <div
        className="fixed inset-0 bg-gradient-to-br from-black via-transparent to-black backdrop-blur-md z-40 transition-all duration-300 animate-fadeIn"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 h-full w-full md:w-[27rem] bg-neutral-900 border-l border-neutral-800 z-50 flex flex-col shadow-2xl animate-slideInRight">
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-white" />
            <h2 className="text-xl font-semibold text-white">Cart</h2>
            <span className="text-sm text-gray-400">{cartElements.length} items</span>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-neutral-800 transition text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5 cursor-pointer" />
          </button>
        </div>

        {cartElements.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-neutral-800 flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Your cart is empty</h3>
            <p className="text-gray-400 mb-6">Add some items to get started</p>
            <Link
              to="/catalog"
              className="px-6 py-3 rounded-[10px] bg-white text-black font-medium hover:scale-[1.02] transition"
              onClick={onClose}
            >
              Browse Catalog
            </Link>
          </div>
        ) : (
          <>
            {isShippingFree ? 
                <div className="p-4 min-h-[4.5rem] flex justify-center items-center rounded-2xl border border-neutral-800 bg-neutral-900/60">
                  <p className="text-md text-gray-300">
                    You have qualified for <span className="text-white font-semibold">free shipping!</span>
                  </p>
                </div> :
                  <div className="p-4 min-h-[4.5rem] rounded-2xl border border-neutral-800 bg-neutral-900/60">
                    <p className="text-sm text-gray-300 mb-2">
                      Add <span className="inline-flex items-center gap-1 text-white font-semibold">{freeShoppingValue - totalValue} <img src={valueIcon} alt="value" className="w-3 h-3" /></span> more for free shipping
                    </p>
                    <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300"
                        style={{ width: `${(totalValue / freeShoppingValue) * 100}%` }}
                      />
                    </div>
                  </div>
            }

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scroll">
              {cartElements.map((item) => {
                return (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    removeItem={removeItem} 
                    incQty={incQty} 
                    decQty={decQty} 
                    onClose={onClose}
                  />
                ) 
              })}
            </div>

            <div className="p-6 border-t border-neutral-800 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className='text-white'>Subtotal</span>
                  <span className="inline-flex items-center gap-1 text-white">
                    {totalValue}
                    <img src={valueIcon} alt="value" className="w-3 h-3" />
                  </span>
                </div>
                <div className={`flex items-center justify-between ${isShippingFree ? 'text-white' : 'text-gray-400'}`}>
                  <span>Shipping</span>
                  <span className="inline-flex items-center gap-1">
                    {isShippingFree ? 'Free' : freeShoppingValue - totalValue}
                    {<img src={valueIcon} alt="value" className="w-3 h-3" />}
                  </span>
                </div>
                <div className="h-px bg-neutral-800" />
                <div className="flex items-center justify-between text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="inline-flex items-center gap-1 text-white">
                    {isShippingFree && 
                    (cartElements.length > 1 || cheapCartEl.quantity > 1) ? 
                    totalValue - cheapCartEl.price : totalValue}
                    <img src={valueIcon} alt="value" className="w-4 h-4" />
                  </span>
                </div>
              </div>

              <button className="w-full px-6 py-3 rounded-[10px] bg-white text-black font-semibold hover:scale-[1.02] transition">
                Checkout
              </button>
              <button
                className="w-full px-6 py-3 rounded-[10px] border border-neutral-700 text-gray-300 hover:border-white hover:text-white transition"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};