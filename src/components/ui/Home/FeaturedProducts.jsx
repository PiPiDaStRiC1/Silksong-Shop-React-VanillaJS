import { Link } from 'react-router-dom';
import {ProductsCard} from './ProductsCard'
import frame from '@/assets/images/FeaturedProducts/frame.png';
import {FEATURED_PRODUCTS} from '@/libs/constants/featuredProducts'

export const FeaturedProducts = () => {

  return (
    <section className='w-full container flex flex-col gap-4 mt-12'>
      <div className="flex justify-between items-center">
        <h2 className="text-white text-4xl">Featured Products</h2>
        <Link to="/catalog" className="text-white text-lg hover:text-gray-400 transition-colors">
          View All →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {FEATURED_PRODUCTS.map(product => (
          <ProductsCard key={product.id} product={product} frame={frame} />
        ))}
      </div>
    </section>
  )
}