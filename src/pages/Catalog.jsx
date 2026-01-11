import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import {CatalogCard, CatalogFilters} from '@/components/ui/index';
import {BreadCrumbs} from '@/features/index'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {useData, useCart} from '@/hooks/index';

export const Catalog = () => {
    const navigate = useNavigate(); 
    const {category: categoryFromURL} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, error, isLoading } = useData();
    const { addItem } = useCart();

    const activeCategory = categoryFromURL || 'all';
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
                <CatalogFilters 
                    maxValue={maxValue} 
                    priceData={{price, uiPrice, setUiPrice, debouncedSetPrice}}
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
                        error.length ? 
                            <div className="text-center py-12 text-red-500">
                                <p>Failed to load catalog</p>
                            </div> : 
                                <>
                                    <div className={`grid grid-cols-2 lg:${gridLayout} gap-4`}>
                                        {displayedProducts.map((p) => (
                                            <CatalogCard 
                                                key={p.id} 
                                                {...p} 
                                                onClick={() => learnProductDetails(p)} 
                                                onAdd={() => addItem(p)}
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
    </section>
    );
}