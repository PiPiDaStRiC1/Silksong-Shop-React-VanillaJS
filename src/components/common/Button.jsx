export const Button = ({message}) => {
    return (
        <button 
            className='cursor-pointer p-2 inline-flex justify-center items-center gap-2 cursor-pointer rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors'
        >
            {message}
        </button>
    )
}