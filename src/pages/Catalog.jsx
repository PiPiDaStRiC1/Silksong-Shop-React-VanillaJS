import { Link, useNavigate } from 'react-router-dom';
import {CatalogCard} from '@/components/ui/Catalog/CatalogCard';
import { useMemo, useState } from 'react';
import {useData} from '@/hooks/useData';
import value from '@/assets/images/value.png';
import {debounce} from '@/libs/utils/debounce';

export const Catalog = () => {
    const { products, error, isLoading } = useData();
    const [activeCategory, setActiveCategory] = useState('all');
    const [toggleSale, setToggleSale] = useState(false);
    const [toggleInStock, setToggleInStock] = useState(false);
    const [sortBy, setSortBy] = useState('popular');
    const [gridLayout, setGridLayout] = useState('grid-cols-4');
    const [price, setPrice] = useState(1500);
    const [uiPrice, setUiPrice] = useState(1500);
    const navigate = useNavigate();

    const learnProductDetails = (p) => {
        navigate(`/catalog/${p.category}/${p.id}`);
    }
    
    const totalQuantity = products.length;

    const maxValue = useMemo(() => {
        return Math.max(...products.map(p => p.price))
    }, [products]);

    const debouncedSetPrice = useMemo(() => {
        return debounce((value) => setPrice(value), 500)
    }, []);

    const filteredProducts = useMemo(() => {
        // Initial case
        if (activeCategory === 'all' && 
            !toggleSale && 
            !toggleInStock &&
            price === 1500
        ) return products;
        
        if (activeCategory === 'all') {
            return products.filter(p => 
                (toggleSale ? p.sale : true) &&
                (toggleInStock ? p.quantity > 0 : true) &&
                (p.price <= price) 
            );
        }

        return products.filter(p => 
            p.category === activeCategory &&
            (toggleSale ? p.sale : true) &&
            (toggleInStock ? p.quantity > 0 : true) &&
            (p.price <= price)
        );
    }, [products, activeCategory, toggleSale, toggleInStock, price]);

    const sortedProducts = useMemo(() => {
        const sorted = [...filteredProducts];

        switch (sortBy) { 
            case 'priceLow':
                return sorted.sort((a, b) => a.price - b.price);
            case 'priceHigh':
                return sorted.sort((a, b) => b.price - a.price);
            case 'popular':
            default:
                return sorted;
        }
    }, [filteredProducts, sortBy]);

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
                    <li>
                        <button 
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'all' ? 'text-white' : 'text-gray-300'}`}
                            onClick={() => {
                                setActiveCategory('all');
                            }}
                        >
                            All
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'dress' ? 'text-white' : 'text-gray-300'}`}
                            onClick={() => {
                                setActiveCategory('dress');
                            }}
                        >
                            Dress
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'charms' ? 'text-white' : 'text-gray-300'}`}
                            onClick={() => {
                                setActiveCategory('charms');
                            }}
                        >
                            Charms
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'collectibles' ? 'text-white' : 'text-gray-300'}`}
                            onClick={() => {
                                setActiveCategory('collectibles');
                            }}
                        >
                            Collectibles
                        </button>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-semibold">Price</h4>
                <div className="mt-3 flex items-center gap-2">
                    <input 
                        type="range" 
                        min="50" 
                        max={maxValue} 
                        value={uiPrice}
                        className="w-full"
                        onChange={(e) => {
                            const value = Number(e.target.value);
                            setUiPrice(value);
                            debouncedSetPrice(value);
                        }} 
                    />
                </div>
                <p className="inline-flex justify-center items-center gap-2 text-sm text-gray-400 mt-1">
                    Up to {price}
                    <img src={value} alt="Value icon" className='w-[1rem] h-[1rem]'/>
                </p>
            </div>

            <div>
                <h4 className="text-lg font-semibold">Availability</h4>
                <div className="mt-2 flex flex-col gap-2 text-sm text-gray-300">
                <label 
                    className={`inline-flex items-center gap-2 ${toggleInStock ? 'text-white' : 'text-gray-300'}`}
                    >
                    <input 
                        type="checkbox" 
                        onChange={() => setToggleInStock(!toggleInStock)}
                        checked={toggleInStock}
                        className='w-[1rem] h-[1rem]'
                    /> In stock
                </label>
                <label 
                    className={`inline-flex items-center gap-2 ${toggleSale ? 'text-white' : 'text-gray-300'}`}
                    >
                    <input 
                        type="checkbox" 
                        onChange={() => setToggleSale(!toggleSale)}
                        checked={toggleSale}
                        className='w-[1rem] h-[1rem]'
                    /> On sale
                </label>
                </div>
            </div>
            </aside>

            <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-400">Showing</span>
                        <span className="text-white">{filteredProducts.length} products</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <select 
                            className="bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="popular">
                                Sort by: Popular
                            </option>
                            <option value="priceLow">
                                Sort by: Price (Low)
                            </option>
                            <option value="priceHigh">
                                Sort by: Price (High)
                            </option>
                        </select>
                        <select 
                            className="bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                            value={gridLayout}
                            onChange={(e) => setGridLayout(e.target.value)}
                        >
                            <option 
                                value="grid-cols-4"
                            >
                                Grid: 4
                            </option>
                            <option 
                                value="grid-cols-3"
                            >
                                Grid: 3
                            </option>
                            <option 
                                value="grid-cols-2"
                            >
                                Grid: 2
                            </option>
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
                                <>
                                    <div className={`grid ${gridLayout} gap-4`}>
                                        {sortedProducts.length ? 
                                            sortedProducts.map((p) => (
                                                <CatalogCard key={p.id} {...p} onClick={() => learnProductDetails(p)} />
                                            )) : 
                                                <div className="text-center py-12 col-span-2 md:col-start-2 md:col-span-1 lg:col-span-2 lg:col-start-2">
                                                    <p className='text-lg lg:text-xl text-gray-400'>No suitable products found</p>
                                                </div>}
                                    </div>
                                    <div className="flex justify-center items-center gap-2 mt-4">
                                        <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">Prev</button>
                                        <button className="px-3 py-2 rounded-lg border border-neutral-700 bg-white text-black">1</button>
                                        <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">2</button>
                                        <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">Next</button>
                                    </div>
                                </>
                }
            </div>
        </div>
    </section>
    );
}