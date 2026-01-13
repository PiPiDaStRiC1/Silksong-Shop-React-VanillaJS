import { Link } from 'react-router-dom';
import value from '@/assets/images/value.png';

export const CatalogFilters = ({maxValue, priceData, handlers, activeCategory}) => {
    const {price, uiPrice, setUiPrice, debouncedSetPrice} = priceData;
    const {toggleInStock, handleSaleToggle, handleStockToggle, toggleSale} = handlers;
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
                <h4 className="text-lg font-semibold">Price</h4>
                <div className="mt-3 flex items-center gap-2">
                    <input 
                        type="range" 
                        min="50" 
                        max={maxValue} 
                        value={uiPrice}
                        className="w-full price-range"
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
        </>
    )
}