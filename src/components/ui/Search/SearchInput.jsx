import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useData } from '@/hooks/index';
import {SearchCard} from './SearchCard';

export const SearchInput = ({onClose}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { products } = useData();
    
    useEffect(() => {
        let isCancelled = false;

        const timerId = setTimeout(async () => {
            const query = searchQuery.trim().toLowerCase();
            if (query === '') {
                setSearchResults([]);
                return;
            }
            setIsLoading(true);

            const filteredResult = await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(products.filter((el) => el.name.toLowerCase().includes(query)));
                }, 200)
            });
            
            if (!isCancelled) {
                setSearchResults(filteredResult);
                setIsLoading(false);
            }
        }, 200);

        return () => {
            clearTimeout(timerId);
            isCancelled = true;
        };
    }, [products, searchQuery]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleResultClick = () => {
        setSearchQuery('');
        onClose();
    };

    return (
        <div 
            className='fixed inset-0 bg-black/80 z-50 flex justify-center items-start pt-12 md:pt-20 px-4'
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className='w-full max-w-xl'>
                <div className='relative mb-8'>
                    <div className='flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden hover:border-white/40 transition-colors'>
                        <Search className='w-5 h-5 ml-4 text-gray-400' />
                        <input 
                            type="text"
                            placeholder="Search item..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                            className='flex-1 bg-transparent text-white placeholder-gray-500 px-4 py-4 outline-none text-lg'
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className='mr-4 p-1 hover:bg-white/10 rounded-lg transition-colors'
                            >
                                <X className='w-5 h-5 text-gray-400 hover:text-white' />
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className='cursor-pointer mr-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors'
                        >
                            ESC
                        </button>
                    </div>
                </div>

                <div className='max-h-[70vh] overflow-y-auto custom-scroll'>
                    {searchQuery.trim() === '' ? (
                        <div className='text-center py-16'>
                            <Search className='w-12 h-12 mx-auto text-gray-600 mb-4' />
                            <p className='text-gray-400 text-lg'>Start input item's name...</p>
                        </div>
                    ) : isLoading ? (
                        <div className='text-center py-16'>
                            <div className='inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-white'></div>
                            <p className='text-gray-400 text-lg mt-4'>Searching...</p>
                        </div>
                    ) : searchResults.length === 0 && !isLoading ? (
                        <div className='text-center py-16'>
                            <X className='w-12 h-12 mx-auto text-gray-600 mb-4' />
                            <p className='text-gray-400 text-lg'>No products found</p>
                            <p className='text-gray-600 text-sm mt-2'>Try a different search</p>
                        </div>
                    ) : (
                        <div className='grid grid-cols-4 gap-4'>
                            {searchResults.map((product) => (
                                <SearchCard 
                                    key={product.id}
                                    product={product}
                                    handleResultClick={handleResultClick}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {searchResults.length > 0 && (
                    <div className='text-center mt-6 text-gray-500 text-xs'>
                        {searchResults.length === 1 ? 'Total 1 item' : `Total ${searchResults.length} items`}
                    </div>
                )}
            </div>
        </div>
    )
}