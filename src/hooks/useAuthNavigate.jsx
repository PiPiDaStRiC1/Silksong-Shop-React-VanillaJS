import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useAuthNavigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const authNavigate = (path, {redirectTo} = {}) => {
        if (isLoggedIn) navigate(path);
        else {
            if (path === '/delivery') {
                toast.error('You need to be logged in to access Delivery page!', {
                    duration: 1500,
                    style: {
                        position: 'relative',
                        top: '0rem',
                    }
                });
            }
            navigate('/auth', {state: {background: location, redirectTo: redirectTo || path}});
        }
    }

    return {authNavigate}
}