import { UserContext } from "@/contexts/UserContext";
import { useCallback, useMemo, useState } from "react";
import toast from 'react-hot-toast';

const initUser = () => {
    try {
        const isLoggedIn = sessionStorage.getItem('isLoggedIn');
        
        if (isLoggedIn === 'true') {
            return JSON.parse(localStorage.getItem('user')) || null;
        }
        
        return null;
    } catch (error) {
        console.log(error.message);
        return null;
    }
}

const verifyUser = async (email) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && email === user.email) {
                resolve(user);
            } else {
                reject(new Error('User not found'));
            }
        }, 1000)
    })
}

const loginUser = async (email, fullName) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = JSON.parse(localStorage.getItem('user'));

            if (user && email === user.email) {
                reject(new Error('User already logged!'));
            } else {
                const id = Date.now().toString();
                const [name, lastName] = fullName.split(' ');
        
                const userData = {
                    id,
                    email,
                    fullName,
                    name,
                    lastName,
                } 
                localStorage.setItem('user', JSON.stringify(userData));
                resolve(userData);
            }
        })
    })
}

export const UserProvider = ({children}) => {
    const [saveUser, setSaveUser] = useState(initUser);

    const register = useCallback(async ({email, fullName = ""}) => {
        const user = await toast.promise(
            loginUser(email, fullName),
            {
                loading: 'Verifying your login...',
                success: `Welcome, ${fullName}! Your account has been created successfully.`,
                error: 'You are already logged in!'
            }
        );
        
        setSaveUser(user);
        sessionStorage.setItem('isLoggedIn', 'true');
        return user;
    }, []);

    const verificationLogin = useCallback(async (email) => {
        const user = await toast.promise(
            verifyUser(email),
            {
                loading: 'Verifying your login...',
                success: 'Login verified successfully!',
                error: 'Failed to verify login. Please try again.'
            }
        );
        
        setSaveUser(user);
        sessionStorage.setItem('isLoggedIn', 'true'); 
        return user;
    }, []);

    const logout = useCallback(() => {
        setSaveUser(null);
        sessionStorage.removeItem('isLoggedIn'); 
        toast.success('Logged out successfully!');
    }, []);

    const value = useMemo(() => ({
        user: saveUser,
        register,
        logout,
        verificationLogin
    }), [saveUser, register, logout, verificationLogin]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};