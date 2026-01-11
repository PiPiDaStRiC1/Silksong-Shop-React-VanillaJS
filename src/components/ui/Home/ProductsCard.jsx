import { Link } from 'react-router-dom';

export const ProductsCard = ({ product, frame }) => {
    const { name, imgSrc } = product;

    return (
        <Link to="/catalog/dress" className="group">
            <div className="relative flex flex-col items-center gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/80 px-5 py-6 shadow-md transition hover:-translate-y-1 hover:border-white/50">
                <span className="absolute right-4 top-3 text-[0.7rem] uppercase tracking-[0.2em] text-gray-400">Dress</span>

                <div className="relative w-full flex items-center justify-center overflow-hidden">
                    {frame && (
                        <img
                            src={frame}
                            alt="frame"
                            className="w-[20rem] h-[20rem] absolute inset-0 z-10 w-full h-full object-contain pointer-events-none opacity-80 transition-transform duration-300 group-hover:scale-105"
                        />
                    )}
                    <div className="w-[20rem] h-[20rem] flex items-center justify-center rounded-full bg-gradient-to-b from-neutral-800 to-black">
                        <img
                            src={imgSrc}
                            alt={name}
                            className="w-[16rem] h-[16rem] object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1 text-white flex-grow">
                    <h2 className="text-center text-base font-semibold">{name}</h2>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <span>View in catalog</span>
                    <span className="text-lg">→</span>
                </div>
            </div>
        </Link>
    );
};