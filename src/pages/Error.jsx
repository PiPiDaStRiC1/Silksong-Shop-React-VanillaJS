import { Link } from "react-router-dom";

export const Error = ({type}) => {
    let path = '';
    let redirectLabel = '';
    
    switch (type) {
        case 'product': {
            path = '/catalog';
            redirectLabel = 'Catalog';
            break;
        }
        case 'review': {
            path = '/reviews';
            redirectLabel = 'Reviews';
            break;
        }
        default:
            path = '/';
            redirectLabel = 'Home';
    }

    return (
        <section className="w-full flex-grow flex flex-col justify-center items-center text-center sm:px-6">
            <h1 className="text-6xl font-bold text-white mb-4">404</h1>
            <p className="text-xl text-gray-400 mb-8">Oops! The page you're looking for doesn't exist.</p>
            <Link to={path} className="btn">Go Back {redirectLabel}</Link>
        </section>
    );
}