import logoImage from '@/assets/images/logo/logoImage.png';
import logoText from '@/assets/images/logo/logoText.png'
import {Search, User, ShoppingBasket} from 'lucide-react';
import {Link, NavLink} from 'react-router-dom';

export const Header = () => {
    return (
        <header className="w-full fixed flex justify-center items-center h-auto bg-black z-50">
            <nav className="w-full px-6 container flex justify-between items-center text-white">
                <Link to="/">
                    <div className='flex justify-center items-center'>
                        <img src={logoImage} alt="logoImage" />
                        <img src={logoText} alt="logoText" className='w-[10rem] h-auto'/>
                    </div>
                </Link>
                <ul className="w-full max-w-[40rem] flex justify-between items-center"> 
                    <li><NavLink to="/" className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}>Home</NavLink></li>
                    <li><NavLink to="/catalog" className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}>Catalog</NavLink></li>
                    <li><NavLink to="/reviews" className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}>Reviews</NavLink></li>
                    <li><NavLink to="/delivery" className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}>Delivery</NavLink></li>
                    <li><NavLink to="/faq" className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}>FAQ</NavLink></li>
                    <li><NavLink to="/about" className={({isActive}) => isActive ? 'text-lg text-gray-400' : 'text-lg hover:text-gray-400'}>About</NavLink></li>
                </ul>
                <ul className='flex items-center gap-4'>
                    <li>
                        <button className='cursor-pointer text-2xl hover:text-gray-400'><Search /></button>
                    </li>
                    <li>
                        <button className='cursor-pointer text-2xl hover:text-gray-400'><User /></button>
                    </li>
                    <li>
                        <button className='cursor-pointer text-2xl hover:text-gray-400'><ShoppingBasket /></button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}