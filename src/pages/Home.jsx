import {Hero, Trailer, FeaturedProducts, FeaturedCharms, CustomerReviews, NewsPosting} from '@/components/ui/index';

export const Home = () => {
    return (
        <section className="w-full flex-grow flex flex-col justify-start items-center">
            <Hero />
            <div className="w-full px-6 flex flex-col items-center">
                <FeaturedProducts />
                <Trailer />
                <FeaturedCharms />
                <CustomerReviews />
                <NewsPosting />
            </div>
        </section>
    );
}