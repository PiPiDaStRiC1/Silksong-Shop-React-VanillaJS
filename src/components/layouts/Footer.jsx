import { Link } from 'react-router-dom';
import logoImage from '@/assets/images/logo/logoImage.png';

export const Footer = () => {
    return (
        <footer className="w-full p-7 h-auto bg-black text-white flex items-center justify-center">
            <article className="container flex flex-col items-center gap-5">
                <div className='flex flex-col gap-2 jusfity-center items-center'>
                    <img src={logoImage} alt="logoImage"/>
                    <h2 className='text-2xl'>Dive to Hollownest</h2>
                    <p className="max-w-[50rem] text-center">
                        “Born from the silence beneath the earth, our collection honors the forgotten voices of Hallownest. Every item tells a tale of loss and triumph, of fragile hope shining through endless dark. It’s more than style — it’s a remembrance of the journey, and the grace found in stillness.”
                    </p>
                </div>
                <div className='w-full max-w-[50rem] flex justify-between items-center'>
                    <ul className='flex flex-col gap-2 text-gray-200 list-disc list-inside'>
                        <li><Link to="/about" className='hover:underline'>About company</Link></li>
                        <li><Link to="/contacts" className='hover:underline'>Contacts</Link></li>
                        <li><Link to="/delivery" className='hover:underline'>Delivery</Link></li>
                        <li><Link to="/faq" className='hover:underline'>FAQ</Link></li>
                    </ul>
                    <ul className='flex flex-col gap-2 text-gray-200 list-disc list-inside'>
                        <li><Link to="/catalog" className='hover:underline'>Catalog</Link></li>
                        <li><Link to="/discounts" className='hover:underline'>Discounts</Link></li>
                        <li><Link to="/latest" className='hover:underline'>Latest</Link></li>
                        <li><Link to="/sale" className='hover:underline'>Sale</Link></li>
                    </ul>
                    <ul className='flex flex-col gap-2 text-gray-200 list-disc list-inside'>
                        <li><Link to="/social-media" className='hover:underline'>Social media</Link></li>
                        <li><Link to="/subscribe" className='hover:underline'>Subscribe</Link></li>
                        <li><Link to="/payments" className='hover:underline'>Payments</Link></li>
                    </ul>
                </div>
                <p>Fan project. No commercial use. All rights belongs to Team Cherry.</p>
            </article>
        </footer>
    );
}