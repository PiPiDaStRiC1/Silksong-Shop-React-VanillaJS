import { Link } from "react-router-dom";
import {ReviewsCard} from './ReviewsCard';
import {FEATURED_REVIEWS} from '@/libs/constants/featuredReviews'

export const CustomerReviews = () => { 

    return (
        <section className="container w-full flex flex-col mt-8 sm:mt-12 text-white gap-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Customer Reviews</h2>
                </div>
                <Link 
                    to="/reviews" 
                    className="text-white hover:text-gray-400 transition-colors flex items-center gap-1 text-sm sm:text-base"
                >
                    Read All Reviews →
                </Link>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
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
