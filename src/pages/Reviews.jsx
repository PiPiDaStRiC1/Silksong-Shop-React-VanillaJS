import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import {ReviewsCardFull} from '@/components/ui/index'
import { useData } from '../hooks/useData';
import {parseAgoToDays} from '@/libs/utils/parseDate';

export const Reviews = () => {
  const { reviews, isLoading, error } = useData();
  const [selectedRating, setSelectedRating] = useState('5');
  const [toggleVerified, setToggleVerified] = useState(true);
  const [toggleUnverified, setToggleUnverified] = useState(false);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('allTime');
  const [selectedSortOption, setSelectedSortOption] = useState('helpful');


  const [totalQuantity, totalRate] = useMemo(() => {
    const quantity = reviews.reduce((acc, reviewUser) => acc + reviewUser.reviews.length, 0);
    if (!reviews.length) return [0, 0];
    const rate = reviews.reduce((acc, reviewUser) => acc + reviewUser.reviews.reduce((acc, review) => acc + review.starCount, 0), 0) / quantity;
    return [quantity, rate.toFixed(1)];
  }, [reviews]);

  const filteredReviewUsers = useMemo(() => {
    let sorted = null;
    if (toggleVerified && toggleUnverified) {
      sorted = [...reviews];
    } else if (toggleVerified) {
      sorted = [...reviews].filter(reviewUser => reviewUser.verified);
    } else if (toggleUnverified) {
      sorted = [...reviews].filter(reviewUser => !reviewUser.verified);
    } else {
      sorted = [];
    }

    return sorted;
  }, [reviews, toggleVerified, toggleUnverified]);


  const sortedReviews = useMemo(() => {
    const sorted = filteredReviewUsers.flatMap(reviewUser => {
      let filteredReviews = reviewUser.reviews;

      if (selectedTimePeriod === '30days') {
        filteredReviews = filteredReviews.filter(
          review => parseAgoToDays(review.date) <= 30 
        );
      } else if (selectedTimePeriod === '90days') {
        filteredReviews = filteredReviews.filter(
          review => parseAgoToDays(review.date) <= 90
        );
      }

      if (selectedRating === 'other') {
        filteredReviews = filteredReviews.filter(review => review.starCount < 3);
      } else {
        filteredReviews = filteredReviews.filter(review => String(review.starCount) === selectedRating);
      }

      return filteredReviews.map(review => (
        {
          review, 
          userId: reviewUser.id, 
          userName: reviewUser.name, 
          userAvatar: reviewUser.avatar, 
          userVerified: reviewUser.verified
        }
      ));

    });

    switch (selectedSortOption) {
      case 'helpful':
        return sorted.sort((a, b) => b.review.helpfulCount - a.review.helpfulCount);                         
      case 'mostRecent':
        return sorted.sort((a, b) => parseAgoToDays(a.review.date) - parseAgoToDays(b.review.date));
      case 'mostOld':
        return sorted.sort((a, b) => parseAgoToDays(b.review.date) - parseAgoToDays(a.review.date));
      default:
        return sorted;
    }

  }, [selectedRating, filteredReviewUsers, selectedTimePeriod, selectedSortOption]);

  return (
    <section className="w-full text-white">
        <div className='flex flex-col mt-[2rem]'>
            <nav className="container w-full px-6 text-lg text-gray-400">
                <Link to="/" className="hover:text-gray-200">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-200">Reviews</span>
            </nav>

            <div className="container w-full px-6 py-8">
                <h1 className="text-4xl font-semibold mb-2">Customer Reviews</h1>
                <p className="text-gray-400">
                  <span className="text-white">★★★★★</span> {totalRate}/5 from {totalQuantity} reviews
                </p>
            </div>
        </div>

      <div className="container w-full px-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <aside className="md:sticky md:top-30 h-fit rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col gap-6">
          <div>
            <h4 className="text-lg font-semibold">Rating</h4>
            <ul className="mt-3 flex flex-col gap-2 text-gray-300 text-sm">
              <li>
                <button 
                  className={`w-full ${selectedRating === '5' ? 'text-white' : ''} cursor-pointer text-left hover:text-white flex items-center gap-2`}
                  onClick={() => setSelectedRating('5')}
                >
                  <span>★★★★★ (5 stars)</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full ${selectedRating === '4' ? 'text-white' : ''} cursor-pointer text-left hover:text-white flex items-center gap-2`}
                  onClick={() => setSelectedRating('4')}
                >
                  <span>★★★★☆ (4 stars)</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full ${selectedRating === '3' ? 'text-white' : ''} cursor-pointer text-left hover:text-white flex items-center gap-2`}
                  onClick={() => setSelectedRating('3')}
                >
                  <span>★★★☆☆ (3 stars)</span>
                </button>
              </li>
              <li>
                <button 
                  className={`w-full ${selectedRating === 'other' ? 'text-white' : ''} cursor-pointer text-left hover:text-white flex items-center gap-2`}
                  onClick={() => setSelectedRating('other')}
                >
                  <span>Below 3 stars</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Verification</h4>
            <ul className="mt-2 flex flex-col gap-2 text-gray-300 text-sm">
              <li>
                <button className="w-full cursor-pointer text-left hover:text-white flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={toggleVerified}
                    onChange={() => setToggleVerified(v => !v)}
                  />
                  <span>Verified buyers</span>
                </button>
              </li>
              <li>
                <button className="w-full cursor-pointer text-left hover:text-white flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={toggleUnverified}
                    onChange={() => setToggleUnverified(v => !v)}
                  />
                  <span>Unverifed buyers</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Time Period</h4>
            <ul className="mt-2 flex flex-col gap-2 text-gray-300 text-sm">
              <li>
                <button 
                  className={`w-full cursor-pointer text-left hover:text-white ${selectedTimePeriod === 'allTime' ? 'text-white' : ''}`}
                  onClick={() => setSelectedTimePeriod('allTime')}
                >
                  All time
                </button>
              </li>
              <li>
                <button 
                  className={`w-full cursor-pointer text-left hover:text-white ${selectedTimePeriod === '30days' ? 'text-white' : ''}`}
                  onClick={() => setSelectedTimePeriod('30days')}
                >
                  Last 30 days
                </button>
              </li>
              <li>
                <button 
                  className={`w-full cursor-pointer text-left hover:text-white ${selectedTimePeriod === '90days' ? 'text-white' : ''}`}
                  onClick={() => setSelectedTimePeriod('90days')}
                >
                  Last 90 days
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-400">Showing</span>
              <span className="text-white">{sortedReviews.length} reviews</span>
            </div>
            <select 
              className="bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm"
              value={selectedSortOption}
              onChange={(e) => setSelectedSortOption(e.target.value)}
            >
              <option value="helpful">Sort by: Helpful</option>
              <option value="mostRecent">Sort by: Most Recent</option>
              <option value="mostOld">Sort by: Most Old</option>
            </select>
          </div>

          {isLoading ? 
            <div className="text-center py-12 text-gray-400">
              <p>Loading reviews...</p>
            </div> : 
                error.length ? 
                    <div className="text-center py-12 text-red-500">
                        <p>Failed to load reviews</p>
                    </div> : (
                        <>
                          <div className="grid grid-cols-1 gap-4 max-h-[42.5rem] overflow-y-auto scrollbar-reviews custom-scroll">
                              {sortedReviews.map(({review, userId, userName, userAvatar, userVerified}) => (
                                <ReviewsCardFull 
                                  key={review.id} 
                                  userInfo={{
                                              id: userId, 
                                              name: userName, 
                                              avatar: userAvatar,
                                              verified: userVerified
                                            }} 
                                  reviewInfo={{...review}} 
                                /> 
                              ))}
                              {filteredReviewUsers.length === 0 && (
                                <div className="text-center py-12">
                                  <p className='text-lg lg:text-xl text-gray-400'>No reviews match the selected filters.</p>
                                </div>
                              )}
                          </div>

                          {/* Buttons on mobile */}
                          {/* <div className="flex justify-center items-center gap-2 mt-6">
                              <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">Prev</button>
                              <button className="px-3 py-2 rounded-lg border border-neutral-700 bg-white text-black">1</button>
                              <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">2</button>
                              <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">Next</button>
                          </div> */}
                        </>
                    )}
            </div>
        </div>
    </section>
  );
};
