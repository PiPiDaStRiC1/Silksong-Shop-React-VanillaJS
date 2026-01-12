import { X } from 'lucide-react';
import { useState, useMemo, useReducer, useEffect } from 'react';
import {authFormReducer} from '@/reducers/authFormReducer';
import { LoginTab, RegisterTab } from '@/components/ui/index';
import { useNavigate, useLocation } from 'react-router-dom';

const initialFormState = {
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
}

export default function AuthModal() {
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.redirectTo; 
    
    const [{email, fullName, password, confirmPassword}, authDispatch] = useReducer(authFormReducer, initialFormState);

    const [activeTab, setActiveTab] = useState('login');
    const [isAgreedPrivacy, setIsAgreedPrivacy] = useState(true);
    const [isRememberMe, setIsRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState({
        login: false,
        register: false,
        confirm: false,
    });

    const validation = useMemo(() => ({
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
        fullName: /^[A-ZА-ЯЁ][a-zа-яё]+ [A-ZА-ЯЁ][a-zа-яё]+$/.test(fullName),
        password: /^(?=(?:.*\d){3,})(?=.*[A-Za-zА-Яа-яЁё])[A-Za-zА-Яа-яЁё\d]{8,}$/.test(password),
        confirmPassword: password === confirmPassword && confirmPassword.length > 0,
    }), [email, fullName, password, confirmPassword]);

    const loginFormSuccessConditions = validation.email && validation.password;
    const registerFormSuccessConditions = validation.email && validation.password && validation.fullName && validation.confirmPassword && isAgreedPrivacy;

    const onSuccess = () => {
        if (redirectTo) {
            navigate(redirectTo, { replace: true });
        } else {
            navigate('/profile', { replace: true });
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [])

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') navigate(-1);
        }
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    })

    return (
        <div 
            className="fixed inset-0 bg-gradient-to-br from-black via-transparent to-black backdrop-blur-md z-50 flex justify-center items-center animate-fadeIn"
        >
            <div 
                className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-md relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >   
                <button
                    className="absolute cursor-pointer top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 transition"
                    onClick={() => navigate(-1)}
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-white mb-2">
                        {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-gray-400 text-sm">
                        {activeTab === 'login' ? 'Sign in to your account' : 'Join our community'}
                    </p>
                </div>

                <div className="flex gap-2 mb-6 p-1 bg-neutral-800/50 rounded-lg">
                    <button
                        className={`flex-1 py-2 px-4 rounded-md cursor-pointer transition ${
                            activeTab === 'login' 
                                ? 'bg-white text-black font-medium' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('login')}   
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-2 px-4 rounded-md cursor-pointer transition ${
                            activeTab === 'register' 
                                ? 'bg-white text-black font-medium' 
                                : 'text-gray-400 hover:text-white'
                        }`}
                        onClick={() => setActiveTab('register')}
                    >
                        Register
                    </button>
                </div>

                {activeTab === 'login' && 
                    <LoginTab 
                        validation={validation}
                        email={email}
                        password={password}
                        authDispatch={authDispatch}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        isRememberMe={isRememberMe}
                        setIsRememberMe={setIsRememberMe}
                        loginFormSuccessConditions={loginFormSuccessConditions}
                        onSuccess={onSuccess}
                    />
                }

                {activeTab === 'register' && 
                    <RegisterTab 
                        validation={validation} 
                        fullName={fullName} 
                        email={email} 
                        password={password} 
                        confirmPassword={confirmPassword} 
                        authDispatch={authDispatch} 
                        showPassword={showPassword} 
                        setShowPassword={setShowPassword} 
                        isAgreedPrivacy={isAgreedPrivacy} 
                        setIsAgreedPrivacy={setIsAgreedPrivacy} 
                        registerFormSuccessConditions={registerFormSuccessConditions} 
                        onSuccess={onSuccess}
                    />
                }
            </div>
        </div>
    )
}