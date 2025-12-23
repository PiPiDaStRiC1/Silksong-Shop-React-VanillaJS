export const NewsPosting = () => {
    return (
        <section className="container flex flex-col justify-center items-center gap-3 bg-neutral-900 rounded-2xl p-8 my-10 text-white">
            <h2 className="text-3xl">Join the Hallownest Community</h2>
            <p className="text-lg">Get exclusive drops, fan art, and Silksong updates</p>
            <div className="w-full max-w-[30rem] flex gap-[1rem] justify-center items-center">
                <input 
                    type="email"
                    placeholder="Enter your email" 
                    className="w-full px-3 border-[1px] border-white p-2 rounded-[1rem] bg-transparent outline-none text-white"
                />
                <button className="border-[1px] border-white p-2 rounded-[1rem] cursor-pointer">Subscribe</button>
            </div>
        </section>
    )
}