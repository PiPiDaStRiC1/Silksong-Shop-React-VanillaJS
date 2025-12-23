import {catalogData} from '../data/catalogData';

export const getProducts = async () => {
    try {
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(catalogData)
            }, 1000)
        });
        const data = await response;
        return data;
    } catch(error) {
        console.log(error.message)
    }
}