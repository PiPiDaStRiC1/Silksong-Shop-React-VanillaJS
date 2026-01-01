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

            <div className='relative z-10 text-white max-w-[28rem] py-32 px-6 flex flex-col items-start gap-6 animate-[fadeInUp_1s_ease-out]'>
                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20'>
                    <Sparkles className='w-4 h-4 text-yellow-400' />
                    <span className='text-sm font-semibold'>Limited Edition Collection</span>
                </div>

                <h1 className='text-6xl font-bold leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent'>
                    Discover Hollow Knight Merch
                </h1>

                <p className='text-gray-200 text-lg leading-relaxed'>
                    Authentic fan-made artifacts inspired by the depths of Hallownest. Curated with care for true wanderers.
                </p>

                <div className='flex flex-wrap gap-3 text-sm text-gray-300'>
                    <div className='flex items-center gap-2'>
                        <Truck className='w-4 h-4' />
                        <div className='flex justify-center items-center'>
                            <span>Free shipping {freeShippingValue}+</span>
                            <img src={value} alt="Value" className="w-4 h-4" />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Shield className='w-4 h-4' />
                        <span>Secure checkout</span>
                    </div>
                </div>

                <div className='flex gap-4 w-full'>
                    <Link 
                        to="/catalog" 
                        className='flex-1 text-center px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-semibold shadow-lg shadow-red-600/30 transition-all duration-300 hover:scale-105 hover:shadow-red-600/50 animate-pulse-subtle'
                    >
                        Shop Now
                    </Link>
                    <Link 
                        to="/about" 
                        className='flex-1 text-center px-6 py-4 border-2 border-white/30 hover:border-white hover:bg-white/10 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300'
                    >
                        Learn More
                    </Link>
                </div>

                <div className='flex items-center gap-6 text-xs text-gray-400 pt-2'>
                    <div>
                        <span className='text-white text-lg font-bold'>5000+</span>
                        <p>Happy customers</p>
                    </div>
                    <div className='w-px h-8 bg-gray-700'></div>
                    <div>
                        <span className='text-yellow-500 text-lg font-bold'>★ <span className='text-white'>4.9</span></span>
                        <p>Average rating</p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 right-10 w-32 h-32 bg-red-600/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute top-20 right-1/4 w-24 h-24 bg-purple-600/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite_reverse]"></div>
        </article>
    )
}