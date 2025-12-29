import { Link } from "react-router-dom";
import {ReviewsCard} from './ReviewsCard';
import {FEATURED_REVIEWS} from '@/libs/constants/featuredReviews'

export const CustomerReviews = () => { 

    return (
        <section className="container w-full flex flex-col mt-12 text-white gap-6 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-semibold">Customer Reviews</h2>
                </div>
                <Link 
                    to="/reviews" 
                    className="text-white hover:text-gray-400 transition-colors flex items-center gap-1 text-sm md:text-base"
                >
                    Read All Reviews →
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {FEATURED_REVIEWS.map(review => (
                    <ReviewsCard 
                        key={review.id} 
                        {...review}
                    />
                ))}
            </div>
        </section>
    )
}