import {DataContext} from '../contexts/DataContext';
import { useContext } from 'react';

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) throw new Error('useData must be within DataProvider');
    return context;
};