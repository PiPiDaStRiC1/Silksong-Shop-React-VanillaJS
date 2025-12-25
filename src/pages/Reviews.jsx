import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import {ReviewsCardFull} from '@/components/ui/index'
import { useData } from '../hooks/useData';

export const Reviews = () => {
  const { reviews, isLoading, error } = useData();

  const [totalQuantity, totalRate] = useMemo(() => {
        const quantity = reviews.reduce((acc, reviewUser) => acc + reviewUser.reviews.length, 0);
        if (!reviews.length) return [0, 0];
        const rate = reviews.reduce((acc, reviewUser) => acc + reviewUser.reviews.reduce((acc, review) => acc + review.starCount, 0), 0) / quantity;
        return [quantity, rate.toFixed(1)];
    }, [reviews])

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
                <button className="w-full text-left hover:text-white flex items-center gap-2">
                  <input type="checkbox" />
                  <span>★★★★★ (5 stars)</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left hover:text-white flex items-center gap-2">
                  <input type="checkbox" />
                  <span>★★★★☆ (4 stars)</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left hover:text-white flex items-center gap-2">
                  <input type="checkbox" />
                  <span>★★★☆☆ (3 stars)</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left hover:text-white flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Below 3 stars</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Verification</h4>
            <ul className="mt-2 flex flex-col gap-2 text-gray-300 text-sm">
              <li>
                <button className="w-full text-left hover:text-white flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span>Verified buyers</span>
                </button>
              </li>
              <li>
                <button className="w-full text-left hover:text-white flex items-center gap-2">
                  <input type="checkbox" />
                  <span>Unverifed buyers</span>
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Time Period</h4>
            <ul className="mt-2 flex flex-col gap-2 text-gray-300 text-sm">
              <li><button className="w-full text-left hover:text-white">All time</button></li>
              <li><button className="w-full text-left hover:text-white">Last 30 days</button></li>
              <li><button className="w-full text-left hover:text-white">Last 90 days</button></li>
            </ul>
          </div>
        </aside>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-400">Showing</span>
              <span className="text-white">{totalQuantity} reviews</span>
            </div>
            <select className="bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm">
              <option>Sort by: Helpful</option>
              <option>Sort by: Most Recent</option>
              <option>Sort by: Highest Rating</option>
              <option>Sort by: Lowest Rating</option>
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
                          {/* TWO CYCLES */}
                          <div className="grid grid-cols-1 gap-4 max-h-[42rem] overflow-y-auto scrollbar-reviews custom-scroll">
                              {reviews.map(reviewUser => reviewUser.reviews.map(review => (
                                <ReviewsCardFull 
                                  key={review.id} 
                                  userInfo={{
                                              id: reviewUser.id, 
                                              name: reviewUser.name, 
                                              avatar: reviewUser.avatar,
                                              verified: reviewUser.verified
                                            }} 
                                  reviewInfo={{...review}} 
                                />
                              )))}
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
