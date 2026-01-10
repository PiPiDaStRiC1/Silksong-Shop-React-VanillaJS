import { UserContext } from "@/contexts/UserContext";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast from 'react-hot-toast';

const initUser = () => {
    try {
        const currentUserId = localStorage.getItem('currentUserId');
        if (currentUserId) {
            return JSON.parse(localStorage.getItem('users'))?.[currentUserId] || null;
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
            const users = JSON.parse(localStorage.getItem('users')) || {};
            const user = Object.values(users).find(u => u.email === email);

            if (user && email === user.email) {
                resolve(user);
                localStorage.setItem('currentUserId', user.id);
            } else {
                reject(new Error('User not found'));
            }
        }, 1000)
    })
}

const loginUser = async (email, fullName) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem('users')) || {};
            const user = Object.values(users).find(u => u.email === email);

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
                localStorage.setItem('users', JSON.stringify({...users, [id]: userData}));
                localStorage.setItem('currentUserId', id);
                resolve(userData);
            }
        }, 1000)
    })
}

export const UserProvider = ({children}) => {
    const [saveUser, setSaveUser] = useState(initUser);
    const [currentUserId, setCurrentUserId] = useState(() => localStorage.getItem('currentUserId'))

    const register = useCallback(async ({email, fullName = ""}) => {
        const user = await toast.promise(
            loginUser(email, fullName),
            {
                loading: 'Verifying your login...',
                success: `Welcome, ${fullName}! Your account has been created successfully.`,
                error: 'You are already registered!'
            }
        );
        
        setCurrentUserId(user.id);
        setSaveUser(user);
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
        
        setCurrentUserId(user.id);
        setSaveUser(user);
        return user;
    }, []);

    const changeUserInfo = useCallback(async ({ changes = [], signal } = {}) => {
        await new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                resolve();
            }, 2000);

            if (signal) {
                if (signal.aborted) {
                    clearTimeout(timeoutId);
                    reject(new DOMException('Aborted', 'AbortError'));
                    return;
                }

                signal.addEventListener('abort', () => {
                    clearTimeout(timeoutId);
                    reject(new DOMException('Aborted', 'AbortError'));
                }, { once: true, });
            }
        });

        if (!changes.length) {
            return;
        }

        const newUser = {
            ...saveUser,
            ...Object.fromEntries(changes.map(({field, value}) => [field, value]))
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};
        localStorage.setItem('users', JSON.stringify({...users, [saveUser.id]: newUser}));
        setSaveUser(newUser);
    }, [saveUser]);

    const logout = useCallback(() => {
        const orderTimers = JSON.parse(localStorage.getItem(`orders_${currentUserId}`))?.deliveryTimers;
        if (orderTimers) {
            Object.values(orderTimers).forEach(timerId => clearTimeout(timerId));
        }

        localStorage.setItem('currentUserId', '');
        setSaveUser(null);
        setCurrentUserId(null);
    }, [currentUserId]);

    const deleteAccount = useCallback(() => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        const newUsers = {...users};
        delete newUsers?.[currentUserId]
        localStorage.setItem('users', JSON.stringify(newUsers));
        setSaveUser(null);
        localStorage.removeItem(`cart_${currentUserId}`);
        localStorage.removeItem(`wishList_${currentUserId}`);
        localStorage.removeItem(`delivery_${currentUserId}`);
        const deliveryTimers = JSON.parse(localStorage.getItem(`orders_${currentUserId}`))?.deliveryTimers;
        if (deliveryTimers) {
            Object.values(deliveryTimers).forEach(timerId => clearTimeout(timerId));
        }
        localStorage.removeItem(`orders_${currentUserId}`);
        localStorage.setItem('currentUserId', '');
        setCurrentUserId(null);
        window.location.href = '/';
    }, [currentUserId]);

    useEffect(() => {
        if (currentUserId) {
            localStorage.setItem('currentUserId', currentUserId);
        } else {
            localStorage.setItem('currentUserId', '');
        }
    }, [currentUserId])

    const value = useMemo(() => ({
        user: saveUser,
        currentUserId,
        register,
        logout,
        verificationLogin,
        changeUserInfo,
        deleteAccount
    }), [saveUser, currentUserId, register, logout, verificationLogin, changeUserInfo, deleteAccount]);

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};