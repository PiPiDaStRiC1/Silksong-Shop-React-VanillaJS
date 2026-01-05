import { UserContext } from "@/contexts/UserContext";
import { useCallback, useMemo, useState } from "react";
import {useCart, useWishList} from '@/hooks/index'
import toast from 'react-hot-toast';

const initUser = () => {
    try {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
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
        }, 1000)
    })
}

export const UserProvider = ({children}) => {
    const {resetCart} = useCart();
    const {resetWL} = useWishList();
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
        localStorage.setItem('isLoggedIn', 'true');
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
        localStorage.setItem('isLoggedIn', 'true'); 
        return user;
    }, []);

    const changeUserInfo = useCallback(async (...changeFields) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000)
        });

        const newUser = {
            ...saveUser,
            ...Object.fromEntries(changeFields.map(({field, value}) => [field, value]))
        }

        localStorage.setItem('user', JSON.stringify(newUser));
        setSaveUser(newUser);
    }, [saveUser]);

    const logout = useCallback(() => {
        setSaveUser(null);
        resetCart();
        resetWL();
        localStorage.removeItem('isLoggedIn'); 
        toast.success('Logged out successfully!');
    }, [resetCart, resetWL]);

    const deleteAccount = useCallback(() => {
        setSaveUser(null);
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = '/';
        
        toast.success('Account deleted successfully!');
    }, []);

    const value = useMemo(() => ({
        user: saveUser,
        register,
        logout,
        verificationLogin,
        changeUserInfo,
        deleteAccount
    }), [saveUser, register, logout, verificationLogin, changeUserInfo, deleteAccount]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};