import { Link } from 'react-router-dom';

export const CharmsCard = ({ charm }) => {
    const { name, imgSrc } = charm;

    return (
        <Link to="/catalog?category=charms" className="group w-full">
            <div className="relative flex flex-col items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/80 px-5 py-6 shadow-md transition hover:-translate-y-1 hover:border-white/50">
                <span className="absolute right-4 top-3 text-[0.7rem] uppercase tracking-[0.2em] text-gray-400">Charm</span>
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-black">
                    <img src={imgSrc} alt={name} className="h-16 object-contain transition-transform duration-300 group-hover:scale-105" />
                </div>
                <h3 className="text-center text-lg font-semibold text-white">{name}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>View in catalog</span>
                    <span className="text-lg">→</span>
                </div>
            </div>
        </Link>
    );
};