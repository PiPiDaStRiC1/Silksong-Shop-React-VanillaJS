import { Link, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import valueIcon from '@/assets/images/value.png';
import { ReviewsCardFull } from '@/components/ui/Reviews/ReviewsCardFull';
import { useData } from '@/hooks/useData';

export const CatalogItemDetails = () => {
    const { category, id } = useParams();
    const { products, reviews, isLoading, error } = useData();
    const product = useMemo(() => products.find(p => String(p.id) === String(id)), [products, id]);
    const related = useMemo(() => products.filter(p => p.category === category && String(p.id) !== String(id)).slice(0, 4), [products, category, id]);

    const [qty, setQty] = useState(1);
    const [tab, setTab] = useState('description'); 

    if (!product) {
        return (
            <section className="container w-full text-white">
                <nav className="container mt-[1rem] w-full px-6 py-4 text-lg text-gray-400">
                    <Link to="/" className="hover:text-gray-200">Home</Link>
                    <span className="mx-2">/</span>
                    <Link to="/catalog" className="hover:text-gray-200">Catalog</Link>
                </nav>
                <div className='px-6'>
                    <h1 className="text-3xl ">Item not found</h1>
                    <p className="text-gray-400 mt-2">The requested item does not exist.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full text-white">
            <nav className="container mt-[1rem] w-full px-6 py-4 text-lg text-gray-400">
                <Link to="/" className="hover:text-gray-200">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/catalog" className="hover:text-gray-200">Catalog</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-200">{product.name}</span>
            </nav>

            <div className="container w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 flex items-center justify-center">
                    <img src={product.imgSrc} alt={product.name} className="max-h-[28rem] object-contain" />
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-semibold">{product.name}</h1>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-lg">
                            {product.sale && (
                                <span className="text-gray-500 line-through text-base">
                                    {Math.round(product.price / (1 - product.sale / 100))}
                                </span>
                            )}
                            <span className="text-white">{product.price}</span>
                            <img src={valueIcon} alt="value" className="w-5 h-5" />
                        </div>
                        {product.sale && (
                            <span className="px-2 py-1 rounded-lg bg-red-600 text-white text-sm font-semibold">
                                -{product.sale}%
                            </span>
                        )}
                    </div>

                    {product.quantity !== undefined && (
                        <div className={`flex items-center gap-2 text-sm ${
                            product.quantity === 0 ? 'text-red-400' : 
                            product.quantity <= 5 ? 'text-amber-400' : 
                            'text-gray-400'
                        }`}>
                            <span className="inline-flex items-center gap-1">
                                {product.quantity === 0 ? '⚠️ Out of stock' : 
                                 product.quantity <= 5 ? `⚠️ Low stock: only ${product.quantity} left` : 
                                 `✓ Available: ${product.quantity} units`}
                            </span>
                        </div>
                    )}

                    <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-1 rounded-full bg-neutral-800 border border-neutral-700">Limited</span>
                        {product.quantity > 0 && <span className="px-2 py-1 rounded-full bg-emerald-900/30 border border-emerald-700 text-emerald-300">In stock</span>}
                        {product.quantity === 0 && <span className="px-2 py-1 rounded-full bg-red-900/30 border border-red-700 text-red-300">Out of stock</span>}
                        <span className="px-2 py-1 rounded-full bg-neutral-800 border border-neutral-700">Category: {product.category}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg border border-neutral-700 overflow-hidden">
                            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 cursor-pointer hover:bg-neutral-800">-</button>
                                <span className="px-4 py-2">{qty}</span>
                            <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 cursor-pointer hover:bg-neutral-800">+</button>
                        </div>
                        <button 
                            className="px-5 py-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-[10px] border border-white text-white hover:bg-white hover:text-black transition-all cursor-pointer"
                            disabled={product.quantity === 0}
                        >
                            Add to Cart
                        </button>
                        <button className="px-5 py-2 rounded-[10px] border border-neutral-700 text-gray-300 hover:border-white hover:text-white transition-all cursor-pointer">Wishlist</button>
                    </div>

                    <div className="mt-4">
                        <div className="flex gap-2 border-b border-neutral-800">
                            <button onClick={() => setTab('description')} className={`px-4 cursor-pointer py-2 ${tab==='description' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}>Description</button>
                            <button 
                                onClick={() => { setTab('reviews') }} 
                                className={`px-4 cursor-pointer py-2 ${tab==='reviews' ? 'text-white border-b-2 border-white' : 'text-gray-400'}`}
                            >
                                Reviews
                            </button>
                        </div>
                        {tab === 'description' && (
                            <div className="text-gray-300 py-4">
                                <p>{product.description}</p>
                            </div>
                        )}
                        {tab === 'reviews' && (
                            <div className="py-4 flex flex-col gap-4 max-h-[32rem] overflow-y-auto scrollbar-reviews custom-scroll">
                                {isLoading && <p className="text-gray-400">Loading reviews...</p>}
                                {error.length !== 0 && <p className="text-red-500">Failed to load reviews</p>}
                                {!isLoading && reviews.length === 0 && <p className="text-gray-400">No reviews yet.</p>}
                                {/* TWO CYCLES */}
                                {!isLoading && reviews.map(reviewUser => reviewUser.reviews.map(r => (
                                    String(r.productId) === String(product.id) ?
                                        <ReviewsCardFull 
                                            key={r.id} 
                                            userInfo={{
                                                id: reviewUser.id, 
                                                name: reviewUser.name, 
                                                avatar: reviewUser.avatar,
                                                verified: reviewUser.verified
                                            }} 
                                            reviewInfo={{...r}} /> : null
                                )))}
                                <div>
                                    <Link to="/reviews" className="text-white hover:text-gray-400">Read all reviews →</Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container w-full px-6 mt-10">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl">Related Items</h2>
                    <Link to="/catalog" className="text-white hover:text-gray-400">View All →</Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {related.map(item => (
                        <Link key={item.id} to={`/catalog/${item.category}/${item.id}`} className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col items-center gap-2 hover:border-white/50 transition">
                            <img src={item.imgSrc} alt={item.name} className="h-24 object-contain group-hover:scale-105 transition" />
                            <span className="text-white text-sm text-center">{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}