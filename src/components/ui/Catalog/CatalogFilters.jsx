import { Link } from 'react-router-dom';
import value from '@/assets/images/value.png';
import { useState } from 'react';

export const CatalogFilters = ({maxValue, priceData, handlers, activeCategory}) => {
    const {priceRange, debouncedSetPrice} = priceData;
    const {toggleInStock, handleSaleToggle, handleStockToggle, toggleSale} = handlers;
    const [priceMin, setPriceMin] = useState(priceRange ? Number(priceRange[0]) : 0);
    const [priceMax, setPriceMax] = useState(priceRange ? Number(priceRange[1]) : maxValue);
    
    const handlePriceMinChange = (e) => {
        const value = Number(e.target.value) || 0;
        if (!Number.isFinite(value)) return;

        if (value > maxValue) {
            setPriceMin(maxValue);
            return;
        }

        setPriceMin(value);
        debouncedSetPrice(value, priceMax);
    };

    const handlePriceMaxChange = (e) => {
        const value = Number(e.target.value) || 0;
        if (!Number.isFinite(value)) return;

        const capped = Math.min(maxValue, value);
        setPriceMax(capped);
        debouncedSetPrice(priceMin, capped);
    };


    return (
        <>
            <div>
                <h4 className="text-lg font-semibold">Categories</h4>
                <ul className="mt-2 flex flex-col gap-2 text-gray-300">
                    <li>
                        <Link 
                            to='/catalog'
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'all' ? 'text-white' : 'text-gray-300'}`}
                        >
                            All
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/catalog/dress'
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'dress' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Dress
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/catalog/charms'
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'charms' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Charms
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to='/catalog/collectibles'
                            className={`w-full text-left hover:text-white cursor-pointer ${activeCategory === 'collectibles' ? 'text-white' : 'text-gray-300'}`}
                        >
                            Collectibles
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-semibold mb-2">Price Range</h4>
                <div className='flex flex-col gap-2'>
                    {priceMax < priceMin && (
                        <p className="text-xs text-red-500 text-center">Minimum price cannot be greater than maximum price.</p>
                    )}
                    <div className="flex items-center gap-2">
                        <div className="flex-1">
                            <input 
                                type="text" 
                                max={priceMax - 1}
                                value={priceMin}
                                className="w-full rounded-lg bg-neutral-800/60 border border-white/20 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/20 transition"
                                onChange={handlePriceMinChange}
                            />
                        </div>
                        <span className="text-gray-400">—</span>
                        <div className="flex-1">
                            <input 
                                type="text" 
                                min={priceMin}
                                max={maxValue}
                                value={priceMax}
                                className="w-full rounded-lg bg-neutral-800/60 border border-white/20 text-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/20 transition"
                                onChange={handlePriceMaxChange}
                            />
                        </div>
                    </div>
                </div>
                <p className="inline-flex justify-center items-center gap-1 text-sm text-gray-400 mt-2">
                    <img src={value} alt="Value icon" className='w-4 h-4'/>
                    <span className="text-white font-medium">{priceMin}</span>
                    <span>—</span>
                    <span className="text-white font-medium">{priceMax}</span>
                </p>
            </div>

            <div>
                <h4 className="text-lg font-semibold">Availability</h4>
                <div className="mt-2 flex flex-col gap-2 text-sm text-gray-300">
                <label 
                    className={`inline-flex items-center gap-2 cursor-pointer ${toggleInStock ? 'text-white' : 'text-gray-300'}`}
                    >
                    <input 
                        type="checkbox" 
                        onChange={handleStockToggle}
                        checked={toggleInStock}
                        className='w-[1rem] h-[1rem]'
                    /> In stock
                </label>
                <label 
                    className={`inline-flex items-center gap-2 cursor-pointer ${toggleSale ? 'text-white' : 'text-gray-300'}`}
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
        </>
    )
}