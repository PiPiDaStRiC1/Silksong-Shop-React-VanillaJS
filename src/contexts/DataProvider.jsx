import {DataContext} from '../contexts/DataContext';
import {useRequests} from '../hooks/useRequests';
import { useMemo } from 'react';

export const DataProvider = ({children}) => {
    const {reviews, products, error, isLoading} = useRequests();

    const value = useMemo(() => {
        return {reviews, products, error, isLoading};
    }, [reviews, products, error, isLoading])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}