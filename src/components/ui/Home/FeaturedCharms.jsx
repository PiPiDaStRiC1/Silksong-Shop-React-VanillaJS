import {CharmsCard} from './CharmsCard'
import {FEATURED_CHARMS} from '@/libs/constants/featuredCharms'
import { Link } from 'react-router-dom';

export const FeaturedCharms = () => {
    return (
        <section className="container flex flex-col mt-12 text-white gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl">Featured Charms</h2>
                <Link to="/catalog?category=charms" className="text-center text-white hover:text-gray-400 transition-colors">
                    <span>View All Charms</span>
                    <span className="text-lg">→</span>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                {FEATURED_CHARMS.map(charm => (
                    <CharmsCard key={charm.id} charm={charm} />
                ))}
            </div>
        </section>
    );
}
