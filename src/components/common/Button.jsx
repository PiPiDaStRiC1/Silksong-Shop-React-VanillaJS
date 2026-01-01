export const Button = ({message}) => {
    return (
        <button 
            className='w-full text-white p-2 rounded-[10px] border-[1px] border-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'
        >
            {message}
        </button>
    )
}