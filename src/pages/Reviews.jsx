import {BreadCrumbs} from '@/features/index'
import { useMemo, useState } from 'react';
import {ReviewsCardFull, ReviewsFilters} from '@/components/ui/index'
import { useData } from '../hooks/useData';
import {parseAgoToDays} from '@/libs/utils/parseDate';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';

export const Reviews = () => {
  const { reviews, isLoading, error } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedRating = searchParams.get('rating') || '5';
  const selectedTimePeriod = searchParams.get('time') || 'allTime';
  const selectedVerified = searchParams.get('verified') !== 'false';
  const selectedUnverified = searchParams.get('unverified') === 'true';
  const selectedSortOption = searchParams.get('sortBy') || 'helpful';

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const [totalQuantity, totalRate] = useMemo(() => {
    const quantity = reviews.reduce((acc, reviewUser) => acc + reviewUser.reviews.length, 0);
    if (!reviews.length) return [0, 0];
    const rate = reviews.reduce((acc, reviewUser) => acc + reviewUser.reviews.reduce((acc, review) => acc + review.starCount, 0), 0) / quantity;
    return [quantity, rate.toFixed(1)];
  }, [reviews]);

  const filteredReviewUsers = useMemo(() => {
    let sorted = null;
    if (selectedVerified && selectedUnverified) {
      sorted = [...reviews];
    } else if (selectedVerified) {
      sorted = [...reviews].filter(reviewUser => reviewUser.verified);
    } else if (selectedUnverified) {
      sorted = [...reviews].filter(reviewUser => !reviewUser.verified);
    } else {
      sorted = [];
    }

    return sorted;
  }, [reviews, selectedVerified, selectedUnverified]);


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
    <section className="container w-full text-white sm:px-6">
        <div className='flex flex-col mt-[2rem]'>
            <BreadCrumbs />

            <div className="container w-full py-8">
                <h1 className="text-4xl font-semibold mb-2">Customer Reviews</h1>
                <p className="text-gray-400">
                  <span className="text-white">★★★★★</span> {totalRate}/5 from {totalQuantity} reviews
                </p>
            </div>
        </div>

      <div className="container w-full grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <aside className="hidden sm:flex md:sticky md:top-30 h-fit rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex-col gap-6">
          <ReviewsFilters 
            selectedRating={selectedRating}
            selectedVerified={selectedVerified}
            selectedTimePeriod={selectedTimePeriod}
            selectedUnverified={selectedUnverified}
            setSearchParams={setSearchParams}
          />
        </aside>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-400">Showing</span>
              <span className="text-white">{sortedReviews.length} reviews</span>
            </div>
              <div className='flex items-center gap-3'>
                <button 
                    onClick={() => setIsFiltersOpen(true)}
                    className="md:hidden flex items-center gap-2 bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm hover:bg-neutral-800 transition"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </button>
                <select 
                  className="bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                  value={selectedSortOption}
                  onChange={(e) => setSearchParams(prev => {
                    const params = new URLSearchParams(prev);
                    params.set('sortBy', e.target.value);
                    return params;
                  })}
                >
                  <option value="helpful">Sort by: Helpful</option>
                  <option value="mostRecent">Sort by: Most Recent</option>
                  <option value="mostOld">Sort by: Most Old</option>
                </select>
              </div>
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
                              {sortedReviews.map(({review, userId, userName, userAvatar, userVerified}, idx) => (
                                <ReviewsCardFull 
                                  key={review.id} 
                                  userInfo={{
                                              id: userId, 
                                              name: userName, 
                                              avatar: userAvatar,
                                              verified: userVerified
                                            }} 
                                  reviewInfo={{...review}} 
                                  loading={idx < 6 ? 'eager' : 'lazy'}
                                /> 
                              ))}
                              {filteredReviewUsers.length === 0 && (
                                <div className="text-center py-12">
                                  <p className='text-lg lg:text-xl text-gray-400'>No reviews match the selected filters.</p>
                                </div>
                              )}
                          </div>
                        </>
                    )}
            </div>
        </div>
        {isFiltersOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
                onClick={() => setIsFiltersOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-neutral-900 rounded-t-3xl border-t border-neutral-800 p-6 max-h-[85vh] overflow-y-auto animate-slideUp">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Filters</h3>
                    <button 
                        onClick={() => setIsFiltersOpen(false)}
                        className="p-2 hover:bg-neutral-800 rounded-lg transition"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
                
                <div className="flex flex-col gap-6">
                    <ReviewsFilters 
                      selectedRating={selectedRating}
                      selectedVerified={selectedVerified}
                      selectedTimePeriod={selectedTimePeriod}
                      selectedUnverified={selectedUnverified}
                      setSearchParams={setSearchParams}
                    />
                    
                    <div className="flex gap-3 pt-4 border-t border-neutral-800">
                        <button
                            onClick={() => {
                                setSearchParams({});
                                setIsFiltersOpen(false);
                            }}
                            className="flex-1 py-3 rounded-lg border border-neutral-700 bg-black text-white hover:bg-neutral-800 transition"
                        >
                            Reset
                        </button>
                        <button
                            onClick={() => setIsFiltersOpen(false)}
                            className="flex-1 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )}
    </section>
  );
};
