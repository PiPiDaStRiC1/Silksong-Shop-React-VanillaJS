import logoImage from '@/assets/images/logo/logoImage.png';
import logoText from '@/assets/images/logo/logoText.png'
import {Heart, User, ShoppingBasket, Search, Menu, X} from 'lucide-react';
import { useEffect, useState } from 'react';
import {Link, NavLink} from 'react-router-dom';
import {CartModal, WishListModal, SearchInput} from '../ui/index';
import { useCart, useWishList, useAuthNavigation } from '@/hooks/index';

const paths = [
    { to: '/', label: 'Home' },
    { to: '/catalog', label: 'Catalog' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/faq', label: 'FAQ' },
    { to: '/about', label: 'About' }
]

export const Header = () => {
    const {cart} = useCart();
    const {wishList} = useWishList();
    const {authNavigate} = useAuthNavigation();
    const [showCart, setShowCart] = useState(false);
    const [showWishListModal, setShowWishListModal] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const cartItemCount = Object.values(cart).length;
    const wishListItemCount = Object.values(wishList).length;

    useEffect(() => {
        const isAnyModal = showCart || showWishListModal || showSearch || showMobileMenu;

        if (!isAnyModal) return;

        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setShowCart(false);
                setShowSearch(false);
                setShowWishListModal(false);
                setShowMobileMenu(false);
            }
        }

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc)
    }, [showCart, showWishListModal, showSearch, showMobileMenu]);

    return (
        <>
            <header className="w-full fixed flex justify-center items-center h-auto bg-black z-50 border-b border-neutral-800">
                <nav className="w-full px-3 sm:px-6 container flex gap-5 justify-between items-center text-white py-3 sm:py-2">
                    <Link to="/" className='flex-shrink-0'>
                        <div className='flex items-center'>
                            <img src={logoImage} alt="logoImage" className='w-15 h-12 sm:w-auto sm:h-auto'/>
                            <img src={logoText} alt="logoText" className='hidden sm:block w-[8rem] sm:w-[10rem] h-[5rem] sm:h-[6.5rem]'/>
                        </div>
                    </Link>
                    
                    <ul className="hidden lg:flex w-full max-w-[40rem] justify-between items-center"> 
                        <li>
                            <NavLink 
                                to="/" 
                                end
                                className={({isActive}) => 
                                    isActive 
                                        ? 'text-sm lg:text-lg text-gray-400' 
                                        : 'text-sm lg:text-lg hover:text-gray-400 transition'
                                }
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/catalog" 
                                className={({isActive}) => 
                                    isActive 
                                        ? 'text-sm lg:text-lg text-gray-400' 
                                        : 'text-sm lg:text-lg hover:text-gray-400 transition'
                                }
                            >
                                Catalog
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/reviews" 
                                className={({isActive}) => 
                                    isActive 
                                        ? 'text-sm lg:text-lg text-gray-400' 
                                        : 'text-sm lg:text-lg hover:text-gray-400 transition'
                                }
                            >
                                Reviews
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/delivery"
                                className={({isActive}) => 
                                    isActive 
                                        ? 'text-sm lg:text-lg text-gray-400' 
                                        : 'text-sm lg:text-lg hover:text-gray-400 transition'
                                }
                                onClick={(e) => {
                                    e.preventDefault();
                                    authNavigate('/delivery');
                                }}
                            >
                                Delivery
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/faq" 
                                className={({isActive}) => 
                                    isActive 
                                        ? 'text-sm lg:text-lg text-gray-400' 
                                        : 'text-sm lg:text-lg hover:text-gray-400 transition'
                                }
                            >
                                FAQ
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/about" 
                                className={({isActive}) => 
                                    isActive 
                                        ? 'text-sm lg:text-lg text-gray-400' 
                                        : 'text-sm lg:text-lg hover:text-gray-400 transition'
                                }
                            >
                                About
                            </NavLink>
                        </li>
                    </ul>
                    
                    <ul className='flex items-center gap-2 sm:gap-4'>
                        <li className='relative'>
                            <button 
                                className='cursor-pointer hover:text-gray-400 transition'
                                onClick={() => setShowSearch(!showSearch)}
                            >
                                <Search size='24' className='sm:w-[27px] sm:h-[27px]'/>
                            </button>
                        </li>
                        <li className='relative hidden sm:block'>
                            <button 
                                className='cursor-pointer hover:text-gray-400 transition'
                                onClick={() => setShowWishListModal(!showWishListModal)}
                            >
                                <Heart size='24'/>
                            </button>
                            {wishListItemCount > 0 && (
                                <div className="absolute top-[-0.7rem] left-[1.2rem] w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[0.7rem] font-bold">
                                    {wishListItemCount}
                                </div>
                            )}
                        </li>
                        <li>
                            <button 
                                className='cursor-pointer hover:text-gray-400 transition'
                                onClick={() => authNavigate('/profile')}
                            >
                                <User size='24' className='sm:w-[27px] sm:h-[27px]'/>
                            </button>
                        </li>
                        <li className='relative'>
                            <button 
                                className='cursor-pointer hover:text-gray-400 transition'
                                onClick={() => setShowCart(true)}
                            >
                                <ShoppingBasket size='24' className='sm:w-[27px] sm:h-[27px]'/>
                            </button>
                            {cartItemCount > 0 && (
                                <div className="absolute top-[-0.7rem] left-[1.2rem] w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[0.7rem] font-bold">
                                    {cartItemCount}
                                </div>
                            )}
                        </li>
                        
                        <li className='lg:hidden'>
                            <button
                                className='cursor-pointer hover:text-gray-400 transition p-1'
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                            >
                                {showMobileMenu ? <X size={24}/> : <Menu size={24}/>}
                            </button>
                        </li>
                    </ul>
                </nav>

                <div 
                    className={`lg:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-neutral-900 to-black border-t border-neutral-800 transition-all duration-300 ease-out overflow-hidden ${
                        showMobileMenu ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className='py-6 px-4'>
                        <div className='flex flex-col gap-1 mb-6'>
                            <h3 className='text-xs text-gray-500 uppercase tracking-wider mb-2 px-4'>Navigation</h3>
                            {paths.map((link, index) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({isActive}) => 
                                        `px-4 py-3 rounded-lg transition-all duration-200 ${
                                            isActive 
                                                ? 'bg-neutral-800 text-white' 
                                                : 'text-gray-300 hover:bg-neutral-800/50 hover:text-white'
                                        }`
                                    }
                                    onClick={() => setShowMobileMenu(false)}
                                    style={{
                                        animation: showMobileMenu ? `slideIn 0.3s ease-out ${index * 0.05}s both` : 'none'
                                    }}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <button
                                className='px-4 py-3 rounded-lg text-gray-300 hover:bg-neutral-800/50 hover:text-white transition-all duration-200 text-left'
                                onClick={() => { authNavigate('/delivery'); setShowMobileMenu(false); }}
                                style={{
                                    animation: showMobileMenu ? 'slideIn 0.3s ease-out 0.25s both' : 'none'
                                }}
                            >
                                Delivery
                            </button>
                        </div>

                        <div className='border-t border-neutral-700 pt-6'>
                            <h3 className='text-xs text-gray-500 uppercase tracking-wider mb-2 px-4'>Quick Actions</h3>
                            <button 
                                className='w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-neutral-800/50 hover:text-white transition-all duration-200 flex items-center justify-between'
                                onClick={() => { setShowWishListModal(true); setShowMobileMenu(false); }}
                                style={{
                                    animation: showMobileMenu ? 'slideIn 0.3s ease-out 0.3s both' : 'none'
                                }}
                            >
                                <span className='flex items-center gap-2'>
                                    <Heart size='18'/>
                                    Wishlist
                                </span>
                                {wishListItemCount > 0 && (
                                    <span className='bg-red-600 text-white text-xs px-2 py-0.5 rounded-full'>
                                        {wishListItemCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            {showCart && <CartModal onClose={() => setShowCart(false)} />}
            {showWishListModal && <WishListModal onClose={() => setShowWishListModal(false)} />}
            {showSearch && <SearchInput onClose={() => setShowSearch(false)} />}
        </>
    )
}