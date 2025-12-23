import logoImage from '@/assets/images/logo/logoImage.png';
import logoText from '@/assets/images/logo/logoText.png'
import {Search, User, ShoppingBasket} from 'lucide-react';
import {Link} from 'react-router-dom';

export const Header = () => {
    return (
        <header className="w-full fixed flex justify-center items-center h-auto bg-black z-50">
            <nav className="w-full px-6 container flex justify-between items-center text-white">
                <div className='flex justify-center items-center'>
                    <img src={logoImage} alt="logoImage" />
                    <img src={logoText} alt="logoText" className='w-[10rem] h-auto'/>
                </div>
                <ul className="w-full max-w-[40rem] flex justify-between items-center"> 
                    <li><Link to="/" className='text-lg hover:text-gray-400'>Home</Link></li>
                    <li><Link to="/catalog" className='text-lg hover:text-gray-400'>Catalog</Link></li>
                    <li><Link to="/reviews" className='text-lg hover:text-gray-400'>Reviews</Link></li>
                    <li><Link to="/delivery" className='text-lg hover:text-gray-400'>Delivery</Link></li>
                    <li><Link to="/faq" className='text-lg hover:text-gray-400'>FAQ</Link></li>
                    <li><Link to="/about" className='text-lg hover:text-gray-400'>About</Link></li>
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