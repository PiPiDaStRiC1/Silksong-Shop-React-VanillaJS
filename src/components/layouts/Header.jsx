import logoImage from '@/assets/images/logo/logoImage.png';
import logoText from '@/assets/images/logo/logoText.png'
import {Heart, User, ShoppingBasket, Search} from 'lucide-react';
import { useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
import {CartModal, WishListModal, SearchInput} from '../ui/index';
import { useCart, useWishList, useAuthNavigation } from '@/hooks/index';

export const Header = () => {
    const {cart} = useCart();
    const {wishList} = useWishList();
    const {authNavigate} = useAuthNavigation();
    const [showCart, setShowCart] = useState(false);
    const [showWishListModal, setShowWishListModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const cartItemCount = Object.values(cart).length;
    const wishListItemCount = Object.values(wishList).length;

    return (
        <>
            <header className="w-full fixed flex justify-center items-center h-auto bg-black z-50">
                <nav className="w-full px-6 container flex justify-between items-center text-white">
                    <Link to="/">
                        <div className='flex justify-center items-center'>
                            <img src={logoImage} alt="logoImage"/>
                            <img src={logoText} alt="logoText" className='w-[10rem] h-[6.5rem]'/>
                        </div>
                    </Link>
                    <ul className="w-full max-w-[40rem] flex justify-between items-center"> 
                        <li>
                            <NavLink 
                                to="/" 
                                className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/catalog" 
                                className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}
                            >
                                Catalog
                            </NavLink>
                        </li>
                        <li><NavLink to="/reviews" className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}>Reviews</NavLink></li>
                        <li>
                            <button
                                className='cursor-pointer text-lg hover:text-gray-400'
                                onClick={() => authNavigate('/delivery')}
                            >
                                Delivery
                            </button>
                        </li>
                        <li>
                            <NavLink 
                                to="/faq" 
                                className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}
                            >
                                FAQ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                    <ul className='flex items-center gap-4'>
                        <li className='relative'>
                            <button 
                                className='cursor-pointer hover:text-gray-400'
                                onClick={() => setShowSearch(!showSearch)}
                            >
                                <Search size='27'/>
                            </button>
                        </li>
                        <li className='relative'>
                            <button 
                                className='cursor-pointer hover:text-gray-400'
                                onClick={() => setShowWishListModal(!showWishListModal)}
                            >
                                <Heart size='27'/>
                            </button>
                            {wishListItemCount > 0 && (
                                <div className="absolute top-[-0.7rem] left-[1.2rem] w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[0.7rem] font-bold">
                                    {wishListItemCount}
                                </div>
                            )}
                        </li>
                        <li>
                            <button 
                                className='cursor-pointer hover:text-gray-400'
                                onClick={() => authNavigate('/profile')}
                            >
                                <User size='27'/>
                            </button>
                        </li>
                        <li className='relative'>
                            <button 
                                className='cursor-pointer hover:text-gray-400'
                                onClick={() => setShowCart(true)}
                            >
                                <ShoppingBasket size='27'/>
                            </button>
                            {cartItemCount > 0 && (
                                <div className="absolute top-[-0.7rem] left-[1.2rem] w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[0.7rem] font-bold">
                                    {cartItemCount}
                                </div>
                            )}
                        </li>
                    </ul>
                </nav>
            </header>
            {showCart && <CartModal onClose={() => setShowCart(false)} />}
            {showWishListModal && <WishListModal onClose={() => setShowWishListModal(false)} />}
            {showSearch && <SearchInput onClose={() => setShowSearch(false)} />}
        </>
    )
}