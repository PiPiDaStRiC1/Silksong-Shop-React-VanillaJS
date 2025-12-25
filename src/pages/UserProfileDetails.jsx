import { Link, useParams } from "react-router-dom";
import { MapPin, Calendar, ShieldCheck, MessageSquare, Share2, BadgeCheck } from "lucide-react";
import { useData } from "@/hooks/useData";
import { useMemo } from "react";


export const UserProfileDetails = () => {
    const { reviews, error, isLoading } = useData();
    const {userId} = useParams();

    const user = useMemo(() => reviews.find(r => String(r.id) === String(userId)), [reviews, userId]);
    
    return (
        <>
        {isLoading ? 
            <div className="text-center py-12 text-gray-400">
                <p>Loading catalog...</p>
            </div> : 
                error.length ? 
                    <div className="text-center py-12 text-red-500">
                        <p>Failed to load catalog</p>
                    </div> : 
                            <section className="w-full text-white">
                                <div className="container w-full px-6 py-8">
                                    <nav className="text-lg text-gray-400 mb-6">
                                        <Link to="/" className="hover:text-gray-200">Home</Link>
                                        <span className="mx-2">/</span>
                                        <Link to="/reviews" className="hover:text-gray-200">Reviews</Link>
                                        <span className="mx-2">/</span>
                                        <span className="text-gray-200">Profile</span>
                                    </nav>

                                    <div className="rounded-3xl border border-neutral-800 bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 p-6 md:p-8 shadow-[0_20px_60px_-32px_rgba(0,0,0,0.6)]">
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                                            <div className="flex gap-4 md:gap-6 items-center">
                                                <div className="relative">
                                                    {user.avatar ? (
                                                        <img src={user.avatar} alt={user.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-neutral-700" />
                                                    ) : (
                                                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-sky-400 flex items-center justify-center text-xl font-semibold border border-neutral-700">User</div>
                                                    )}
                                                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-neutral-900" aria-label="online" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h1 className="text-2xl md:text-3xl font-semibold">{user.name} {user.lastname}</h1>
                                                        {user.verified && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-600/50">
                                                                <BadgeCheck className="w-3 h-3" />
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mt-2">
                                                        <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" />{user.location}</span>
                                                        <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />Joined {user.joined}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <button className="px-4 py-2 rounded-[10px] bg-white text-black font-medium hover:scale-[1.01] transition">Message</button>
                                                <button className="px-4 py-2 rounded-[10px] border border-neutral-700 text-gray-100 hover:border-white transition">Follow</button>
                                                <button className="p-2 rounded-[10px] border border-neutral-800 text-gray-300 hover:text-white hover:border-white transition" aria-label="Share profile">
                                                    <Share2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-col gap-3">
                                                <p className="inline-flex gap-2 items-center text-gray-300"><span className="text-yellow-500 text-lg">★</span>Rating</p>
                                                <div className="text-2xl font-semibold">{user.rating.toFixed(1)}<span className="text-base text-gray-400"> / 5</span></div>
                                                <p className="text-sm text-gray-400">Based on verified shop reviews and helpful votes.</p>
                                            </div>

                                            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-col gap-3">
                                                <div className="flex items-center gap-2 text-gray-300"><MessageSquare className="w-4 h-4" />Contributions</div>
                                                <div className="text-2xl font-semibold">{user.stats.reviews} reviews</div>
                                                <p className="text-sm text-gray-400">{user.stats.helpful} marked helpful • {user.stats.likes} likes</p>
                                            </div>

                                            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-4 flex flex-col gap-3">
                                                <div className="flex items-center gap-2 text-gray-300"><ShieldCheck className="w-4 h-4" />Trust</div>
                                                <div className="text-2xl font-semibold">Verified buyer</div>
                                                <p className="text-sm text-gray-400">Purchased limited drops and completed profile verification.</p>
                                            </div>
                                        </div>

                                        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-2 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
                                                <h3 className="text-lg font-semibold mb-2">About</h3>
                                                <p className="text-gray-300 leading-relaxed">{user.bio}</p>
                                            </div>

                                            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5 flex flex-col gap-3">
                                                <h3 className="text-lg font-semibold">Activity</h3>
                                                <div className="text-sm text-gray-300">Recent highlights</div>
                                                <ul className="text-sm text-gray-400 space-y-2">
                                                    <li>• Rated “Voidsteel Plate” 5 stars</li>
                                                    <li>• Marked 3 reviews as helpful</li>
                                                    <li>• Added “Lifeblood Charm” to wishlist</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>}
        </>
    );
};