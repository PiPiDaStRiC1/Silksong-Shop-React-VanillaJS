import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import {CatalogCard, CatalogFilters} from '@/components/ui/index';
import {BreadCrumbs} from '@/features/index'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {useData, useCart} from '@/hooks/index';
import { SlidersHorizontal, X } from 'lucide-react';

export const Catalog = () => {
    const navigate = useNavigate(); 
    const {category: categoryFromURL} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, isLoading } = useData();
    const { addItem } = useCart();
    const maxValue = useMemo(() => {
        if (isLoading || !products.length) return 0;

        return Math.max(...products.map(p => p.price))
    }, [products, isLoading]);

    const activeCategory = categoryFromURL || 'all';
    const toggleSale = searchParams.get('sale') === 'true';
    const toggleInStock = searchParams.get('stock') === 'true';
    const sortBy = searchParams.get('sort') || 'popular';
    const priceFromUrl = searchParams.get('price');
    const priceRange = priceFromUrl ? priceFromUrl.split('-') : ['0', maxValue.toString()];
    
    const [gridLayout, setGridLayout] = useState('grid-cols-4'); 
    const [isFiltersOpen, setIsFiltersOpen] = useState(false); 

    const learnProductDetails = (p) => {
        navigate(`/catalog/${p.category}/${p.id}`);
    }
    
    const totalQuantity = products.length;

    const debounceTimerRef = useRef(null);
    
    const debouncedSetPrice = useCallback((minPrice, maxPrice) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
            setSearchParams(prev => {
                const params = new URLSearchParams(prev);
                if (minPrice !== 0 || maxPrice !== maxValue) {
                    params.set('price', `${minPrice}-${maxPrice}`);
                } else {
                    params.delete('price');
                }
                return params;
            });
        }, 300);
    }, [maxValue, setSearchParams]);

    const displayedProducts = useMemo(() => {
        const priceRange = priceFromUrl ? priceFromUrl.split('-') : null;
        const minPrice = priceRange ? Number(priceRange[0]) : 50;
        const maxPrice = priceRange ? Number(priceRange[1]) : maxValue;
        
        return products
            .filter(p =>
                (activeCategory === 'all' || p.category === activeCategory) &&
                (!toggleSale || p.sale) &&
                (!toggleInStock || p.stock > 0) &&
                (p.price >= minPrice && p.price <= maxPrice)
            )
            .sort((a, b) => {
                switch(sortBy) {
                    case 'priceLow': return a.price - b.price;
                    case 'priceHigh': return b.price - a.price;
                    case 'latest': return b.id - a.id;
                    default: return 0;
                }
            });
    }, [products, activeCategory, toggleSale, toggleInStock, priceFromUrl, sortBy, maxValue]);


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
        if (isFiltersOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isFiltersOpen]);

    return (
        <section className="container w-full text-white sm:px-6">
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
            <aside className="hidden md:block md:sticky md:top-24 h-fit rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex-col gap-6">
                <CatalogFilters 
                    key={maxValue}
                    maxValue={maxValue} 
                    priceData={{priceRange, debouncedSetPrice}}
                    handlers={{toggleInStock, handleSaleToggle, handleStockToggle, toggleSale}}
                    activeCategory={activeCategory}
                />
            </aside>

            <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-gray-400">Showing</span>
                        <span className="text-white">{displayedProducts.length} products</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setIsFiltersOpen(true)}
                            className="md:hidden flex items-center gap-2 bg-black text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm hover:bg-neutral-800 transition"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </button>
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
                            className="bg-black hidden lg:block text-white border border-neutral-700 rounded-lg px-3 py-2 text-sm"
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
                            <>
                                <div className={`grid grid-cols-2 lg:${gridLayout} gap-4`}>
                                    {displayedProducts.map((p, idx) => (
                                        <CatalogCard 
                                            key={p.id} 
                                            product={p}
                                            onClick={() => learnProductDetails(p)} 
                                            onAdd={() => addItem(p)}
                                            loading={idx < 8 ? 'eager' : 'lazy'}
                                        />
                                    ))}
                                    {!displayedProducts.length && 
                                        <div className="text-center py-12 justify-center col-span-full">
                                            <p className='text-lg lg:text-xl text-gray-400'>No suitable products found</p>
                                        </div>
                                    }
                                </div>
                            </>
                }
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
                        <CatalogFilters 
                            key={maxValue}
                            maxValue={maxValue} 
                            priceData={{priceRange, debouncedSetPrice}}
                            handlers={{toggleInStock, handleSaleToggle, handleStockToggle, toggleSale}}
                            activeCategory={activeCategory}
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
}