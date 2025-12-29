import { X, Mail, Lock, User, Eye, EyeClosed } from 'lucide-react';
import { useReducer, useState, useMemo } from 'react';
import formActions from '@/libs/constants/formActionTypes'
import { formReducer } from '@/reducers/formReducer';
import {debounce} from '@/libs/utils/debounce';

const initialFormState = {
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
    validateForm: {
        email: false,
        password: false,
        fullName: false,
        confirmPassword: false
    },
}

export const AuthModal = ({onClose}) => {
    const [{
            email, 
            password, 
            fullName, 
            confirmPassword, 
            validateForm
        }, dispatch] = useReducer(formReducer, initialFormState)
    const [activeTab, setActiveTab] = useState('login');
    const [isAgreedPrivacy, setIsAgreedPrivacy] = useState(true);
    const [isRememberMe, setIsRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState({
        login: false,
        register: false,
        confirm: false,
    });
    const loginFormSuccessConditions = validateForm.email && validateForm.password;
    const registerFormSuccessConditions = validateForm.email && validateForm.password && validateForm.fullName && validateForm.confirmPassword && isAgreedPrivacy;

    const debouncedValidate = useMemo(() => (
        debounce((form) => {
            dispatch({ type: formActions.VALIDATE_FORM, payload: form });
        }, 300)
    ), []);

    return (
        <div 
            className="fixed inset-0 bg-gradient-to-br from-black via-transparent to-black backdrop-blur-md z-50 flex justify-center items-center animate-fadeIn"
            onClick={onClose}
        >
            <div 
                className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl w-full max-w-md relative shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >   
                <button
                    className="absolute cursor-pointer top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-neutral-800 transition"
                    onClick={onClose}
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

                {activeTab === 'login' && (
                    <form 
                        className="space-y-4" 
                        onSubmit={(e) => e.preventDefault()}
                        autoComplete="off"
                    >
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    name="email-login"
                                    autoComplete="off"
                                    placeholder="your@email.com"
                                    className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                                        validateForm.email || !email
                                            ? 'border-neutral-700 focus:border-white' 
                                            : 'border-red-500/50 focus:border-red-500'
                                    }`}
                                    value={email}
                                    onChange={(e) => {
                                        dispatch({ type: formActions.SET_EMAIL, payload: e.target.value });
                                        debouncedValidate({ email: e.target.value, password, fullName, confirmPassword });
                                    }}
                                />
                            </div>
                            {!validateForm.email && email && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                    Invalid email format (e.g., your@email.com)
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword.login ? "text" : "password"}
                                    name="password-login"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                                        validateForm.password || !password
                                            ? 'border-neutral-700 focus:border-white' 
                                            : 'border-red-500/50 focus:border-red-500'
                                    }`}
                                    value={password}
                                    onChange={(e) => {
                                        dispatch({ type: formActions.SET_PASSWORD, payload: e.target.value });
                                        debouncedValidate({ email, password: e.target.value, fullName, confirmPassword });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(prev => ({ ...prev, login: !prev.login }))}
                                >
                                    {showPassword.login ? <EyeClosed /> : <Eye />}
                                </button>
                            </div>
                            {!validateForm.password && password && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                    Min. 8 characters with at least 3 numbers
                                </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition">
                                <input 
                                    type="checkbox" 
                                    className="cursor-pointer w-4 h-4 rounded bg-neutral-800 border-neutral-700" 
                                    checked={isRememberMe}
                                    onChange={() => setIsRememberMe(!isRememberMe)}
                                />
                                Remember me
                            </label>
                            <button className="text-gray-400 hover:text-white transition cursor-pointer">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={!loginFormSuccessConditions}
                            className={`${loginFormSuccessConditions ? '' : 'opacity-50 cursor-not-allowed'} w-full py-3 bg-white text-black rounded-lg font-semibold hover:scale-[1.02] transition cursor-pointer`}
                            onClick={() => dispatch({ type: formActions.VALIDATE_FORM, payload: { email, password, fullName, confirmPassword } })}
                        >
                            Sign In
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-neutral-800"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-neutral-900 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="py-3 px-4 border border-neutral-700 rounded-lg text-white hover:border-white transition cursor-pointer flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                            </button>
                            <button
                                type="button"
                                className="py-3 px-4 border border-neutral-700 rounded-lg text-white hover:border-white transition cursor-pointer flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                                </svg>
                                GitHub
                            </button>
                        </div>
                    </form>
                )}

                {activeTab === 'register' && (
                    <form 
                        className="space-y-4"
                        onSubmit={(e) => e.preventDefault()}
                        autoComplete="off"
                    >
                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    name="fullname-register"
                                    autoComplete="off"
                                    placeholder="John Doe"
                                    className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                                        validateForm.fullName || !fullName
                                            ? 'border-neutral-700 focus:border-white' 
                                            : 'border-red-500/50 focus:border-red-500 animate-shake'
                                    }`}
                                    value={fullName}
                                    onChange={(e) => {
                                        dispatch({ type: formActions.SET_FULL_NAME, payload: e.target.value });
                                        debouncedValidate({ email, password, fullName: e.target.value, confirmPassword });
                                    }}
                                />
                            </div>
                            {!validateForm.fullName && fullName && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                    Only letters and spaces allowed
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    name="email-register"
                                    autoComplete="off"
                                    placeholder="your@email.com"
                                    className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                                        validateForm.email || !email 
                                            ? 'border-neutral-700 focus:border-white' 
                                            : 'border-red-500/50 focus:border-red-500 animate-shake'
                                    }`}
                                    value={email}
                                    onChange={(e) => {
                                        dispatch({ type: formActions.SET_EMAIL, payload: e.target.value });
                                        debouncedValidate({ email: e.target.value, password, fullName, confirmPassword });
                                    }}
                                />
                            </div>
                            {!validateForm.email && email && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                    Invalid email format (e.g., your@email.com)
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword.register ? "text" : "password"}
                                    name="password-register"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                                        validateForm.password || !password
                                            ? 'border-neutral-700 focus:border-white' 
                                            : 'border-red-500/50 focus:border-red-500 animate-shake'
                                    }`}
                                    value={password}
                                    onChange={(e) => {
                                        dispatch({ type: formActions.SET_PASSWORD, payload: e.target.value });
                                        debouncedValidate({ email, password: e.target.value, fullName, confirmPassword });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(prev => ({ ...prev, register: !prev.register }))}
                                >
                                    {showPassword.register ? <EyeClosed /> : <Eye />}
                                </button>
                            </div>
                            {!validateForm.password && password && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                    Min. 8 characters with at least 3 numbers
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm text-gray-300 mb-2">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type={showPassword.confirm ? "text" : "password"}
                                    name="password-confirm"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                                        validateForm.confirmPassword || !confirmPassword
                                            ? 'border-neutral-700 focus:border-white' 
                                            : 'border-red-500/50 focus:border-red-500 animate-shake'
                                    }`}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        dispatch({ type: formActions.SET_CONFIRM_PASSWORD, payload: e.target.value });
                                        debouncedValidate({ email, password, fullName, confirmPassword: e.target.value });
                                    }}
                                />
                                <button
                                    type="button"
                                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    onClick={() => setShowPassword(prev => ({...prev, confirm: !prev.confirm}))}
                                >
                                    {showPassword.confirm ? <EyeClosed /> : <Eye />}
                                </button>
                            </div>
                            {!validateForm.confirmPassword && confirmPassword && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                    <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-400">
                            <input 
                                type="checkbox" 
                                className="cursor-pointer mt-1 w-4 h-4 rounded bg-neutral-800 border-neutral-700" 
                                checked={isAgreedPrivacy}
                                onChange={() => setIsAgreedPrivacy(!isAgreedPrivacy)}
                            />
                            <div>
                                <span>
                                    I agree to the <button type="button" className="text-white hover:underline cursor-pointer">Terms of Service</button> and <button type="button" className="text-white hover:underline cursor-pointer">Privacy Policy</button>
                                </span>
                                {!isAgreedPrivacy && (
                                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                        You must agree to the terms to continue
                                    </p>
                                )}
                            </div>
                        </label>

                        <button
                            type="submit"
                            disabled={!registerFormSuccessConditions}
                            className={`${registerFormSuccessConditions ? '' : 'opacity-50 cursor-not-allowed'} w-full py-3 bg-white text-black rounded-lg font-semibold hover:scale-[1.02] transition cursor-pointer`}
                            onClick={() => dispatch({type: formActions.VALIDATE_FORM, payload: {email, password, fullName, confirmPassword}})}
                        >
                            Create Account
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}