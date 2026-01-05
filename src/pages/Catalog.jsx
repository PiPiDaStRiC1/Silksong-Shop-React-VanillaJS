import { useNavigate, useSearchParams } from 'react-router-dom';
import {CatalogCard} from '@/components/ui/index';
import {BreadCrumbs} from '@/features/index'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {useData, useCart} from '@/hooks/index';
import value from '@/assets/images/value.png';

export const Catalog = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, error, isLoading } = useData();
    const { addItem } = useCart();

    const activeCategory = searchParams.get('category') || 'all';
    const toggleSale = searchParams.get('sale') === 'true';
    const toggleInStock = searchParams.get('stock') === 'true';
    const sortBy = searchParams.get('sort') || 'popular';
    const priceFromUrl = searchParams.get('price');
    const price = priceFromUrl ? Number(priceFromUrl.split('-')[1]) : 1500;
    
    const [gridLayout, setGridLayout] = useState('grid-cols-4');
    const [uiPrice, setUiPrice] = useState(price); 

    const learnProductDetails = (p) => {
        navigate(`/catalog/${p.category}/${p.id}`);
    }
    
    const totalQuantity = products.length;

    const maxValue = useMemo(() => {
        return Math.max(...products.map(p => p.price))
    }, [products]);

    const debounceTimerRef = useRef(null);
    
    const debouncedSetPrice = useCallback((value) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
            setSearchParams(prev => {
                const params = new URLSearchParams(prev);
                if (value !== maxValue) {
                    params.set('price', `0-${value}`);
                } else {
                    params.delete('price');
                }
                return params;
            });
        }, 300);
    }, [maxValue, setSearchParams]);

    const displayedProducts = useMemo(() => {
        return products
            .filter(p =>
                (activeCategory === 'all' || p.category === activeCategory) &&
                (!toggleSale || p.sale) &&
                (!toggleInStock || p.stock > 0) &&
                (p.price <= price)
            )
            .sort((a, b) => {
                switch(sortBy) {
                    case 'priceLow': return a.price - b.price;
                    case 'priceHigh': return b.price - a.price;
                    case 'latest': return b.id - a.id;
                    default: return 0;
                }
            });
    }, [products, activeCategory, toggleSale, toggleInStock, price, sortBy]);


    const updateFilter = (key, value, defaultValue) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            if (value !== defaultValue) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            return params;
        })
    };

    const handleCategoryChange = (category) => {
        updateFilter('category', category, 'all');
    };

    const handleSaleToggle = () => {
        updateFilter('sale', (!toggleSale).toString(), 'false');
    };

    const handleStockToggle = () => {
        updateFilter('stock', (!toggleInStock).toString(), 'false');
    };

    const handleSortChange = (sort) => {
        updateFilter('sort', sort, 'popular');
    };

    useEffect(() => {
        setUiPrice(price);
    }, [price]);

    return (
        <section className="container w-full text-white px-6">
        <div className='flex flex-col mt-[2rem]'>
            <BreadCrumbs />
            <div className="container w-full py-8">
                <h1 className="text-4xl font-semibold mb-2">Catalog</h1>
                <p className="text-gray-400">
                    <span>Total {totalQuantity} products</span>
                </p>
            </div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
            <aside className="md:sticky md:top-24 h-fit rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col gap-6">
            <div>
                <h4 className="text-lg font-semibold">Categories</h4>
                <ul className="mt-2 flex flex-col gap-2 text-gray-300">
                    <li>
                        <button 
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'all' ? 'text-white' : 'text-gray-300'}`}
                            onClick={() => handleCategoryChange('all')}
                        >
                            All
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'dress' ? 'text-white' : 'text-gray-300'}`}
                            onClick={() => handleCategoryChange('dress')}
                        >
                            Dress
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'charms' ? 'text-white' : 'text-gray-300'}`}
                            onClick={() => handleCategoryChange('charms')}
                        >
                            Charms
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'collectibles' ? 'text-white' : 'text-gray-300'}`}
                            onClick={() => handleCategoryChange('collectibles')}
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
                    Below {price}
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
                        onChange={handleStockToggle}
                        checked={toggleInStock}
                        className='w-[1rem] h-[1rem]'
                    /> In stock
                </label>
                <label 
                    className={`inline-flex items-center gap-2 ${toggleSale ? 'text-white' : 'text-gray-300'}`}
                    >
                    <input 
                        type="checkbox" 
                        onChange={handleSaleToggle}
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
                        <span className="text-white">{displayedProducts.length} products</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <select 
                            className="bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm"
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
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
                            <option value="latest">
                                Sort by: Latest
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
                                        {displayedProducts.map((p) => (
                                            <CatalogCard 
                                                key={p.id} 
                                                {...p} 
                                                onClick={() => learnProductDetails(p)} 
                                                onAdd={() => addItem(p)}
                                            />
                                        ))}
                                        {!displayedProducts.length && 
                                            <div className="text-center py-12 col-start-2 col-span-2">
                                                <p className='text-lg lg:text-xl text-gray-400'>No suitable products found</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="flex justify-center items-center gap-2 mt-4">
                                        <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">Prev</button>
                                        <button className="px-3 py-2 rounded-lg border border-neutral-700 bg-white text-black">1</button>
                                        <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">2</button>
                                        <button className="px-3 py-2 rounded-lg border border-neutral-700 text-white hover:bg-white hover:text-black transition">Next</button>
                                    </div>
                                </>}
            </div>
        </div>
    </section>
    );
}