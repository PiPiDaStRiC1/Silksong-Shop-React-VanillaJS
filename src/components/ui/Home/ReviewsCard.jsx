import { BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import {memo} from 'react'

export const ReviewsCard = memo(({name, avatar, reviews, date, verified}) => {
    const { starCount, content } = reviews[0];
    
    return (
        <Link to="/reviews" className='block'>
            <div className='flex flex-col gap-3 bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-md transition hover:-translate-y-1 hover:border-white/50'>
                <div className='flex items-start gap-3'>
                    <img 
                        src={avatar} 
                        alt={name} 
                        className='w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-neutral-800' 
                    />
                    <div className='flex flex-col gap-1 flex-grow min-w-0'>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <h3 className='text-white font-semibold text-lg'>{name}</h3>
                            {verified && (
                                <BadgeCheck className='w-4 h-4 text-blue-500 flex-shrink-0' />
                            )}
                        </div>
                        <div className='flex items-center gap-2 flex-wrap'>
                            <div className='flex gap-0.5'>
                                {[...Array(starCount)].map((_, index) => (
                                    <span key={index} className="text-white text-lg">★</span>
                                ))}
                                {[...Array(5 - starCount)].map((_, index) => (
                                    <span key={index} className="text-gray-600 text-lg">★</span>
                                ))}
                            </div>
                            {date && (
                                <span className='text-gray-500 text-sm'>{date}</span>
                            )}
                        </div>
                    </div>
                </div>
                <p className='text-gray-300 leading-relaxed'>{content}</p>
            </div>
        </Link>
    )
});