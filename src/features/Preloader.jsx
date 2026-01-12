export const Preloader = () => {
    return (
        <div className="min-h-screen w-full mt-[2rem] bg-black flex items-center justify-center text-white">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <p className="text-lg">Loading...</p>
            </div>
        </div>
    )
}