import formActions from '@/libs/constants/formActionTypes';
import { Mail, Lock, Eye, EyeClosed } from 'lucide-react';
import { useUser } from '@/hooks/index';
import toast from 'react-hot-toast';

export const LoginTab = ({validation, email, password, authDispatch, showPassword, setShowPassword, isRememberMe, setIsRememberMe, loginFormSuccessConditions, onSuccess}) => {
    const {verificationLogin} = useUser();

    return (
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
                            validation.email || !email
                                ? 'border-neutral-700 focus:border-white' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        value={email}
                        onChange={(e) => {
                            authDispatch({type: formActions.SET_EMAIL, payload: e.target.value});
                        }}
                    />
                </div>
                {!validation.email && email && (
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
                            validation.password || !password
                                ? 'border-neutral-700 focus:border-white' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        value={password}
                        onChange={(e) => {
                            authDispatch({type: formActions.SET_PASSWORD, payload: e.target.value});
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
                {!validation.password && password && (
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
                disabled={!loginFormSuccessConditions}
                className={`${loginFormSuccessConditions ? '' : 'opacity-50 cursor-not-allowed'} w-full py-3 bg-white text-black rounded-lg font-semibold hover:scale-[1.02] transition cursor-pointer`}
                onClick={async () => {
                    if (loginFormSuccessConditions) {
                        try {
                            await verificationLogin(email);
                            
                            onSuccess();
                        } catch (error) {
                            if (error.message !== 'User not found') {
                                console.log(error.message);  
                                toast.error('Something went wrong. Please try again.');
                            }
                        }
                    }
                }}
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

            <a
                href='https://github.com/PiPiDaStRiC1/'
                target='_blank'
                className="w-full py-3 px-4 border border-neutral-700 rounded-lg text-white hover:border-white transition cursor-pointer flex items-center justify-center gap-2"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                GitHub
            </a>
        </form>
    )
}