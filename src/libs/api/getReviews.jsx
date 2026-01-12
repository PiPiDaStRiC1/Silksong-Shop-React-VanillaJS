import {reviewsData} from '../data/reviewsData'

export const getReviews = async () => {
    try {
        const response = await new Promise((resolve) => {
            setTimeout(() => {
                resolve(reviewsData)
            }, 500)
        });
        const data = await response;
        return data;
    } catch (error) {
        console.log(error.message);
    }
}