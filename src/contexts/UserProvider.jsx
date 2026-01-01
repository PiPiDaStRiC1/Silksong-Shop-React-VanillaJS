import { UserContext } from "@/contexts/UserContext";
import { useState } from "react";

const initUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user')) || null;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

export const UserProvider = ({children}) => {
    const [saveUser, setSaveUser] = useState(initUser);

    const login = ({email, fullName}) => {
        const id = Date.now().toString();
        const [name, lastName] = fullName.split(' ');

        const userData = {
            id,
            email,
            fullName,
            name,
            lastName,
        }

        setSaveUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    const logout = () => {
        setSaveUser(null);
        localStorage.removeItem('user');
    }

    const value = {
        user: saveUser,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};