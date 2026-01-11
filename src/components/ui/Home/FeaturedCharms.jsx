import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import {CharmsCard} from './CharmsCard'
import {FEATURED_CHARMS} from '@/libs/constants/featuredCharms'
import { Link } from 'react-router-dom';
import 'swiper/css';

export const FeaturedCharms = () => {
    return (
        <section className="container flex flex-col mt-8 sm:mt-12 text-white gap-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Featured Charms</h2>
                <Link to="/catalog/charms" className="text-center text-white hover:text-gray-400 transition-colors text-sm sm:text-base">
                    <span>View All Charms</span>
                    <span className="text-lg">→</span>
                </Link>
            </div>
            <div className='hidden lg:grid grid-cols-4 gap-5 w-full'>
                {FEATURED_CHARMS.map(item => (
                    <CharmsCard key={item.id} {...item} />
                ))}
            </div>
            <div className='lg:hidden'>
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 12 },
                        1024: { slidesPerView: 4, spaceBetween: 16 }
                    }}
                    className="w-full"
                    draggable={true}
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    loop={true}
                >
                    {FEATURED_CHARMS.map(item => (
                        <SwiperSlide key={item.id}>
                            <CharmsCard key={item.id} {...item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
