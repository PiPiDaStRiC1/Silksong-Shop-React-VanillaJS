import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import {ProductsCard} from './ProductsCard'
import frame from '@/assets/images/FeaturedProducts/frame.png';
import {FEATURED_PRODUCTS} from '@/libs/constants/featuredProducts';
import 'swiper/css';

export const FeaturedProducts = () => {

  return (
    <section className='w-full container flex flex-col gap-4 mt-8 sm:mt-12'>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Featured Products</h2>
        <Link to="/catalog/dress" className="text-white text-sm sm:text-base hover:text-gray-400 transition-colors">
          View All →
        </Link>
      </div>
      <div className="hidden lg:grid grid-cols-4 gap-5 w-full">
        {FEATURED_PRODUCTS.map(product => (
          <ProductsCard key={product.id} product={product} frame={frame} />
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
          <div className='w-full'>
            {FEATURED_PRODUCTS.map(product => (
              <SwiperSlide key={product.id}>
                <ProductsCard key={product.id} product={product} frame={frame} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  )
}
