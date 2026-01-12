import mainBackground from '@/assets/images/mainBackground.png';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Truck } from 'lucide-react';
import value from '@/assets/images/value.png';
import {freeShippingValue} from '@/libs/constants/freeShippingValue';

export const Hero = () => {
    return (
        <article className="container flex flex-col justify-start relative overflow-hidden">
            <div className="absolute inset-0">
                <img 
                    src={mainBackground} 
                    alt="Main background" 
                    className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            </div>

            <div className='relative z-10 text-white max-w-[29rem] py-16 sm:py-24 lg:py-32 px-4 sm:px-6 flex flex-col items-start gap-4 sm:gap-6 animate-[fadeInUp_1s_ease-out]'>
                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20'>
                    <Sparkles className='w-4 h-4 text-yellow-400' />
                    <span className='text-xs sm:text-sm font-semibold'>Limited Edition Collection</span>
                </div>

                <h1 className='text-3xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
                    Discover Hollow Knight Merch
                </h1>

                <p className='text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed'>
                    Authentic fan-made artifacts inspired by the depths of Hallownest. Curated with care for true wanderers.
                </p>

                <div className='flex flex-col sm:flex-row flex-wrap gap-3 text-xs sm:text-sm text-gray-300'>
                    <div className='flex items-center gap-2'>
                        <Truck className='w-4 h-4 flex-shrink-0' />
                        <div className='flex justify-center items-center gap-1'>
                            <span>Free shipping {freeShippingValue}+</span>
                            <img src={value} alt="Value" className="w-4 h-4" />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Shield className='w-4 h-4 flex-shrink-0' />
                        <span>Secure checkout</span>
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
                    <Link 
                        to="/catalog" 
                        className='flex-1 sm:flex-none text-center px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-semibold shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105 hover:shadow-red-600/50 animate-pulse-subtle text-sm sm:text-base'
                    >
                        Shop Now
                    </Link>
                    <Link 
                        to="/about" 
                        className='flex-1 sm:flex-none text-center px-4 sm:px-6 py-3 sm:py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 text-sm sm:text-base'
                    >
                        Learn More
                    </Link>
                </div>
            </div>
            <div className="hidden sm:block absolute bottom-10 right-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="hidden sm:block absolute top-20 right-1/4 w-24 h-24 bg-purple-600/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        </article>
    )
};
