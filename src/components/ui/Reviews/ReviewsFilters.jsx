export const ReviewsFilters = ({selectedRating, selectedTimePeriod, selectedUnverified, selectedVerified, setSearchParams}) => {
    const updateFilter = (key, value, defaultValue) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            if (value !== defaultValue) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            return params;
        });
    }

    const handleRating = (value) => {
        updateFilter('rating', value, '5')
    }

    const handleTimePeriod = (value) => {
        updateFilter('time', value, 'allTime')
    }

    const handleVerifiedToggle = () => {
        updateFilter('verified', (!selectedVerified).toString(), 'true')
    }

    const handleUnverifiedToggle = () => {
        updateFilter('unverified', (!selectedUnverified).toString(), 'false')
    }
    
    return (
        <>
            <div>
                <h4 className="text-lg font-semibold">Rating</h4>
                <ul className="mt-3 flex flex-col gap-2 text-gray-300 text-sm">
                <li>
                    <button 
                        className={`w-full ${selectedRating === '5' ? 'text-white' : ''} cursor-pointer text-left hover:text-white flex items-center gap-2`}
                        onClick={() => handleRating('5')}
                    >
                    <span>★★★★★ (5 stars)</span>
                    </button>
                </li>
                <li>
                    <button 
                        className={`w-full ${selectedRating === '4' ? 'text-white' : ''} cursor-pointer text-left hover:text-white flex items-center gap-2`}
                        onClick={() => handleRating('4')}
                    >
                    <span>★★★★☆ (4 stars)</span>
                    </button>
                </li>
                <li>
                    <button 
                        className={`w-full ${selectedRating === '3' ? 'text-white' : ''} cursor-pointer text-left hover:text-white flex items-center gap-2`}
                        onClick={() => handleRating('3')}
                    >
                    <span>★★★☆☆ (3 stars)</span>
                    </button>
                </li>
                <li>
                    <button 
                        className={`w-full ${selectedRating === 'other' ? 'text-white' : ''} cursor-pointer text-left hover:text-white flex items-center gap-2`}
                        onClick={() => handleRating('other')}
                    >
                    <span>Below 3 stars</span>
                    </button>
                </li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-semibold">Verification</h4>
                <ul className="mt-2 flex flex-col gap-2 text-gray-300 text-sm">
                <li>
                    <button className="w-full cursor-pointer text-left hover:text-white flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        checked={selectedVerified}
                        onChange={handleVerifiedToggle}
                    />
                    <span>Verified buyers</span>
                    </button>
                </li>
                <li>
                    <button className="w-full cursor-pointer text-left hover:text-white flex items-center gap-2">
                    <input 
                        type="checkbox" 
                        checked={selectedUnverified}
                        onChange={handleUnverifiedToggle}
                    />
                    <span>Unverifed buyers</span>
                    </button>
                </li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg font-semibold">Time Period</h4>
                <ul className="mt-2 flex flex-col gap-2 text-gray-300 text-sm">
                    <li>
                        <button 
                            className={`w-full cursor-pointer text-left hover:text-white ${selectedTimePeriod === 'allTime' ? 'text-white' : ''}`}
                            onClick={() => handleTimePeriod('allTime')}
                        >
                        All time
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full cursor-pointer text-left hover:text-white ${selectedTimePeriod === '30days' ? 'text-white' : ''}`}
                            onClick={() => handleTimePeriod('30days')}
                        >
                        Last 30 days
                        </button>
                    </li>
                    <li>
                        <button 
                            className={`w-full cursor-pointer text-left hover:text-white ${selectedTimePeriod === '90days' ? 'text-white' : ''}`}
                            onClick={() => handleTimePeriod('90days')}
                        >
                        Last 90 days
                        </button>
                    </li>
                </ul>
            </div>
        </>
    )
}