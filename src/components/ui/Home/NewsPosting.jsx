import { useState } from "react";
import toast from "react-hot-toast";

export const NewsPosting = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!isEmailValid || isSubmitting) return;
    
        try {
            setIsSubmitting(true);

            await toast.promise(
                new Promise((resolve) => {
                    setTimeout(() => resolve(true), 500);
                }),
                {
                    loading: 'Subscribing...',
                    success: 'You subscribed',
                    error: 'Failed to subscribe'
                }
            )
            setEmail('');
        } catch (error) {
            console.log(error.message);
            toast.error('Something go wrong. Try again')
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <section className="container flex flex-col justify-center items-center gap-3 bg-neutral-900 rounded-2xl p-8 my-10 text-white">
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Join the Hallownest Community</h2>
            <p className="text-lg text-gray-300">Get exclusive drops, fan art, and Silksong updates</p>
            <form className="w-full max-w-[30rem] flex gap-[1rem] justify-center items-center" onSubmit={submitHandler}>
                <div className="flex flex-col flex-grow">
                    <input 
                        type="email"
                        value={email}
                        name="email"
                        placeholder="Enter your email" 
                        className="w-full px-3 border-[1px] border-white p-2 rounded-[1rem] bg-transparent outline-none text-white"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isEmailValid && email && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            Invalid email format (e.g., your@email.com)
                        </p>
                    )}
                </div>
                <button 
                    type='submit' 
                    className="cursor-pointer p-3 inline-flex justify-center items-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors disabled:opacity-50 "
                    disabled={!isEmailValid || isSubmitting}
                >
                    Subscribe
                </button>
            </form>
        </section>
    )
}