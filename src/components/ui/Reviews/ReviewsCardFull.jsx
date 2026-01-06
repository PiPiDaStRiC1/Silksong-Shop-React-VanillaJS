import { BadgeCheck, ThumbsUp, ThumbsDown, Share2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const ReviewsCardFull = ({ userInfo, reviewInfo }) => {
  const { id, name, avatar, verified } = userInfo;
  const { starCount, helpfulCount, content: review, date } = reviewInfo;
  const [helpful, setHelpful] = useState(null); 
  const [localHelpfulCount, setLocalHelpfulCount] = useState(helpfulCount);

  const handleHelpful = (type) => {
    if (helpful === type) {
      setHelpful(null);
      setLocalHelpfulCount(type === 'up' ? localHelpfulCount - 1 : localHelpfulCount);
    } else {
      if (helpful === 'up') setLocalHelpfulCount(localHelpfulCount - 1);
      if (type === 'up') setLocalHelpfulCount(localHelpfulCount + 1);
      setHelpful(type);
    }
  };

  return (
    <div className='flex flex-col gap-4 bg-neutral-900 border border-neutral-800 p-6 rounded-2xl hover:border-neutral-600 transition-colors'>
      <div className='flex items-start gap-4'>
        <Link to={`/reviews/${id}`} className="flex-shrink-0 group">
          <img 
            src={avatar} 
            alt={name} 
            className='w-16 h-16 rounded-full object-cover ring-2 ring-neutral-800 transition-all group-hover:ring-white/50' 
          />
        </Link>
        <div className='flex-grow'>
          <div className='flex items-center gap-2 flex-wrap mb-1'>
            <Link 
              to={`/reviews/${id}`} 
              className='text-white font-semibold text-lg hover:text-gray-300 transition-colors'
            >
              {name}
            </Link>
            {verified && (
              <div className='flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30'>
                <BadgeCheck className='w-4 h-4 text-blue-500 flex-shrink-0' />
                <span className='text-xs text-blue-400'>Verified</span>
              </div>
            )}
            <div className='flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30'>
              <ShoppingBag className='w-3 h-3 text-green-500' />
              <span className='text-xs text-green-400'>Verified Purchase</span>
            </div>
          </div>
          <div className='flex items-center gap-3 flex-wrap'>
            <div className='flex gap-0.5'>
              {[...Array(starCount)].map((_, index) => (
                <span key={index} className="text-yellow-500 text-lg">★</span>
              ))}
              {[...Array(5 - starCount)].map((_, index) => (
                <span key={index} className="text-gray-600 text-lg">★</span>
              ))}
            </div>
            <span className='text-gray-500 text-sm'>{date}</span>
          </div>
        </div>
      </div>

      <p className='text-gray-300 leading-relaxed'>{review}</p>

      <div className='flex items-center justify-between pt-2 border-t border-neutral-800'>
        <div className='flex items-center gap-1 text-sm text-gray-400'>
          <span>{localHelpfulCount} people found this helpful</span>
        </div>
        <div className='flex items-center gap-2'>
          <button 
            onClick={() => handleHelpful('up')}
            className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all text-sm ${
              helpful === 'up' 
                ? 'border-green-500 bg-green-500/10 text-green-400' 
                : 'border-neutral-700 text-gray-400 hover:border-white hover:text-white'
            }`}
          >
            <ThumbsUp className='w-4 h-4' />
            <span>Helpful</span>
          </button>
          <button 
            onClick={() => handleHelpful('down')}
            className={`cursor-pointer p-1.5 rounded-lg border transition-all ${
              helpful === 'down' 
                ? 'border-red-500 bg-red-500/10 text-red-400' 
                : 'border-neutral-700 text-gray-400 hover:border-white hover:text-white'
            }`}
          >
            <ThumbsDown className='w-4 h-4' />
          </button>
          <button className='cursor-pointer p-1.5 rounded-lg border border-neutral-700 text-gray-400 hover:border-white hover:text-white transition-all'>
            <Share2 className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};