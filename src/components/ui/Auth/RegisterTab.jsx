import formActions from '@/libs/constants/formActionTypes';
import { Mail, Lock, User, Eye, EyeClosed } from 'lucide-react';
import { useUser } from '@/hooks/index';
import { useNavigate } from 'react-router-dom';

export const RegisterTab = ({validation, fullName, email, password, confirmPassword, authDispatch, showPassword, setShowPassword, isAgreedPrivacy, setIsAgreedPrivacy, registerFormSuccessConditions, onClose}) => {
    const {register} = useUser();
    const navigate = useNavigate();

    return (
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
                            validation.fullName || !fullName
                                ? 'border-neutral-700 focus:border-white' 
                                : 'border-red-500/50 focus:border-red-500 animate-shake'
                        }`}
                        value={fullName}
                        onChange={(e) => {
                            authDispatch({type: formActions.SET_FULL_NAME, payload: e.target.value});
                        }}
                    />
                </div>
                {!validation.fullName && fullName && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        Only letters and spaces allowed. Words must begin with a capital letter.
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
                            validation.email || !email 
                                ? 'border-neutral-700 focus:border-white' 
                                : 'border-red-500/50 focus:border-red-500 animate-shake'
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
                        type={showPassword.register ? "text" : "password"}
                        name="password-register"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-4 py-3 bg-neutral-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none transition ${
                            validation.password || !password
                                ? 'border-neutral-700 focus:border-white' 
                                : 'border-red-500/50 focus:border-red-500 animate-shake'
                        }`}
                        value={password}
                        onChange={(e) => {
                            authDispatch({type: formActions.SET_PASSWORD, payload: e.target.value});
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
                {!validation.password && password && (
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
                            validation.confirmPassword || !confirmPassword
                                ? 'border-neutral-700 focus:border-white' 
                                : 'border-red-500/50 focus:border-red-500 animate-shake'
                        }`}
                        value={confirmPassword}
                        onChange={(e) => {
                            authDispatch({type: formActions.SET_CONFIRM_PASSWORD, payload: e.target.value});
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
                {!validation.confirmPassword && confirmPassword && (
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
                onClick={async () => {
                    if (registerFormSuccessConditions) {
                        try {
                            await register({email, fullName});
                            
                            navigate('/profile');
                            onClose();
                        } catch (error) {
                            console.log(error.message);
                        }
                    }
                }}
            >
                Create Account
            </button>
        </form>
    )
}