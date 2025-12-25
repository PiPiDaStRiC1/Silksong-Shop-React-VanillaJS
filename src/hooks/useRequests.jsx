import { useEffect, useState } from 'react';
import {getProducts, getReviews} from '@/libs/api/index'

export const useRequests = () => {
    const [reviews, setReviews] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState([]);


    useEffect(() => {
        let cancelled = false;

        Promise.all([getProducts(), getReviews()])
            .then(([productsData, reviewsData]) => {
                if (!cancelled) {
                    setProducts(productsData);
                    setReviews(reviewsData);
                }
            })
            .catch((error) => {
                setError(prev => [...prev, `Failed to fetch data: ${error.message}`]);
            })
            .finally(() => {
                setIsLoading(false);
            });
        
        return () => {
            cancelled = true;
        };
    }, []);

    return {reviews, products, error, isLoading};
}