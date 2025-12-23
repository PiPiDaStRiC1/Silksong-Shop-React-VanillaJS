import {DataContext} from '../contexts/DataContext';
import { useContext } from 'react';

export const useData = () => useContext(DataContext);