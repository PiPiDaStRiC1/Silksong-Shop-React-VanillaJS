import { Link, useNavigate } from 'react-router-dom';
import {CatalogCard} from '@/components/ui/Catalog/CatalogCard'
import { useMemo } from 'react';
import {useData} from '../hooks/useData'

export const Catalog = () => {
    const { products, error, isLoading } = useData();
    const navigate = useNavigate();

    const learnProductDetails = (p) => {
        navigate(`/catalog/${p.category}/${p.id}`);
    }

    const totalQuantity = useMemo(() => {
        return products.length;
    }, [products])

    return (
        <section className="w-full text-white">
        <div className='flex flex-col mt-[2rem]'>
            <nav className="container w-full px-6 text-lg text-gray-400">
                <Link to="/" className="hover:text-gray-200">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-200">Catalog</span>
            </nav>

            <div className="container w-full px-6 py-8">
                <h1 className="text-4xl font-semibold mb-2">Catalog</h1>
                <p className="text-gray-400">
                    <span>Total {totalQuantity} products</span>
                </p>
            </div>
        </div>

        <div className="container w-full px-6 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
            <aside className="md:sticky md:top-24 h-fit rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col gap-6">
            <div>
                <h4 className="text-lg font-semibold">Categories</h4>
                <ul className="mt-2 flex flex-col gap-2 text-gray-300">
                <li><button className="w-full text-left hover:text-white cursor-pointer">All</button></li>
                <li><button className="w-full text-left hover:text-white cursor-pointer">Dress</button></li>
                <li><button className="w-full text-left hover:text-white cursor-pointer">Charms</button></li>
                <li><button className="w-full text-left hover:text-white cursor-pointer">Collectibles</button></li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-semibold">Price</h4>
                <div className="mt-3 flex items-center gap-2">
                <input type="range" min="0" max="2000" defaultValue="1000" className="w-full" />
                </div>
                <p className="text-sm text-gray-400 mt-1">Up to $1000</p>
            </div>

            <div>
                <h4 className="text-lg font-semibold">Availability</h4>
                <div className="mt-2 flex flex-col gap-2 text-sm text-gray-300">
                <label className="inline-flex items-center gap-2"><input type="checkbox" /> In stock</label>
                <label className="inline-flex items-center gap-2"><input type="checkbox" /> On sale</label>
                </div>
            </div>
            </aside>

            <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-400">Showing</span>
                        <span className="text-white">{products ? products.length : 0} products</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <select className="bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm">
                            <option>Sort by: Popular</option>
                            <option>Sort by: Price (Low)</option>
                            <option>Sort by: Price (High)</option>
                            <option>Sort by: New</option>
                        </select>
                        <select className="bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm">
                            <option>Grid: 4</option>
                            <option>Grid: 3</option>
                            <option>Grid: 2</option>
                        </select>
                    </div>
                </div>

                {isLoading ? 
                    <div className="text-center py-12 text-gray-400">
                        <p>Loading catalog...</p>
                    </div> : 
                        error.length ? 
                            <div className="text-center py-12 text-red-500">
                                <p>Failed to load catalog</p>
                            </div> : 
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {products.map((p) => {
                                        return <CatalogCard key={p.id} {...p} onClick={() => learnProductDetails(p)} />
                                    })}
                                </div>
                }

                <div className="flex justify-center items-center gap-2 mt-4">
                    <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">Prev</button>
                    <button className="px-3 py-2 rounded-lg border border-neutral-700 bg-white text-black">1</button>
                    <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">2</button>
                    <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">Next</button>
                </div>
            </div>
        </div>
    </section>
    );
}