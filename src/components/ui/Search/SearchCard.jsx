import { Link } from "react-router-dom"

export const SearchCard = ({product, handleResultClick}) => {
    return (
        <Link
            to={`catalog/${product.category}/${product.id}`}
            onClick={handleResultClick}
        >
            <div className='bg-white/5 flex flex-col justify-between h-full border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group'>
                <div className='relative flex justify-center items-center w-full aspect-square bg-black overflow-hidden'>
                    <img 
                        src={product.imgSrc} 
                        alt={product.name}
                        className='w-25 h-25 object-contain group-hover:scale-110 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
                </div>

                <h3 className='flex-grow text-center text-white font-medium text-sm line-clamp-2 mb-2 group-hover:text-gray-200 transition-colors'>
                    {product.name}
                </h3>
                <p className='text-gray-500 text-xs text-center mb-3'>
                    {product.stock > 0 ? 'In stock' : 'Out of stock'}
                </p>
            </div>
        </Link>
    )
}