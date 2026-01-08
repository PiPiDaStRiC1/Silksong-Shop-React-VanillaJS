import { Navigate } from "react-router-dom";

export const GuestOnlyRoute = ({ children, redirectTo = '/profile' }) => {
    const isLoggedIn = localStorage.getItem('currentUserId') || null;

    if (isLoggedIn) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
};
