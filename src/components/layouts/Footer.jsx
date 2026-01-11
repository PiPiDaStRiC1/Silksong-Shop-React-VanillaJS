import { Link } from 'react-router-dom';
import logoImage from '@/assets/images/logo/logoImage.png';
import React from 'react';

export const Footer = React.memo(() => {
    return (
        <footer className="flex justify-center items-center w-full bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-hidden">
            <div className="relative flex flex-col items-center container px-4 sm:px-6 py-8 sm:py-12">
                <div className='flex flex-col items-center gap-4 sm:gap-6 pb-8 sm:pb-12'>
                    <div className="flex items-center gap-3">
                        <img src={logoImage} alt="logoImage" className='w-12 sm:w-16'/>
                        <h2 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                            Dive to Hollownest
                        </h2>
                    </div>
                    <p className="max-w-2xl text-center text-sm sm:text-base text-gray-300 leading-relaxed px-4">
                        "Born from the silence beneath the earth, our collection honors the forgotten voices of Hallownest. 
                        Every item tells a tale of loss and triumph, of fragile hope shining through endless dark."
                    </p>
                </div>

                <div className='grid grid-cols-3 gap-8'>
                    <div className='flex flex-col items-center gap-3 sm:gap-4'>
                        <h3 className='text-base sm:text-lg font-semibold text-white flex items-center gap-2'>
                            Company
                        </h3>
                        <ul className='flex flex-col gap-2 items-center text-sm text-gray-300'>
                            <li>
                                <Link to="/about" className='hover:text-white hover:translate-x-1 inline-block transition-all duration-200'>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/delivery" className='hover:text-white text-center hover:translate-x-1 inline-block transition-all duration-200'>
                                    Delivery & Returns
                                </Link>
                            </li>
                            <li>
                                <Link to="/faq" className='hover:text-white hover:translate-x-1 inline-block transition-all duration-200'>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col items-center gap-3 sm:gap-4'>
                        <h3 className='text-base sm:text-lg font-semibold text-white flex items-center gap-2'>
                            Shop
                        </h3>
                        <ul className='flex flex-col items-center gap-2 text-sm text-gray-300'>
                            <li>
                                <Link to="/catalog" className='hover:text-white hover:translate-x-1 inline-block transition-all duration-200'>
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/catalog/charms" className='hover:text-white hover:translate-x-1 inline-block transition-all duration-200'>
                                    Charms
                                </Link>
                            </li>
                            <li>
                                <Link to="/reviews" className='hover:text-white hover:translate-x-1 inline-block transition-all duration-200'>
                                    Reviews
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='flex flex-col gap-3 items-center sm:gap-4'>
                        <h3 className='text-base sm:text-lg font-semibold text-white flex items-center gap-2'>
                            Account
                        </h3>
                        <ul className='flex flex-col gap-2 items-center text-sm text-gray-300'>
                            <li>
                                <Link to="/profile" className='hover:text-white hover:translate-x-1 inline-block transition-all duration-200'>
                                    My Profile
                                </Link>
                            </li>
                            <li>
                                <Link to="/auth" className='hover:text-white hover:translate-x-1 text-center inline-block transition-all duration-200'>
                                    Sign In / Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='flex flex-col justify-between items-center gap-4 pt-8'>
                    <p className='text-xs sm:text-sm text-gray-400 text-center sm:text-left'>
                        Fan project. No commercial use. All rights belong to{' '}
                        <a 
                            href="https://www.teamcherry.com.au/" 
                            className='text-white hover:underline font-semibold transition-colors inline-flex items-center gap-1' 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Team Cherry
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
});
