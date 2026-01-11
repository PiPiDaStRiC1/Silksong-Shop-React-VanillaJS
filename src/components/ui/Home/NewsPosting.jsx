export const NewsPosting = () => {
    return (
        <section className="container flex flex-col justify-center items-center gap-3 bg-neutral-900 rounded-2xl p-8 my-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Join the Hallownest Community</h2>
            <p className="text-lg text-gray-300">Get exclusive drops, fan art, and Silksong updates</p>
            <div className="w-full max-w-[30rem] flex gap-[1rem] justify-center items-center">
                <input 
                    type="email"
                    name="email"
                    placeholder="Enter your email" 
                    className="w-full px-3 border-[1px] border-white p-2 rounded-[1rem] bg-transparent outline-none text-white"
                />
                <button type='submit' className="cursor-pointer p-3 inline-flex justify-center items-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors">Subscribe</button>
            </div>
        </section>
    )
}