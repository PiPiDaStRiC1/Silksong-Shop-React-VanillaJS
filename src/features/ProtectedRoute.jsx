import { useUser } from "@/hooks/index";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const {user} = useUser();
    const isLoggedIn = !!user;

    if (!isLoggedIn) {
        return <Navigate to="/profile" replace />;
    }

    return children;
}