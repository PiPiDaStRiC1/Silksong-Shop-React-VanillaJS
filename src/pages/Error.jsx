import { Link } from "react-router-dom";

export const Error = () => {
    return (
        <section className="w-full flex-grow flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-xl text-gray-400 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn">Go Back Home</Link>
        </section>
    );
}