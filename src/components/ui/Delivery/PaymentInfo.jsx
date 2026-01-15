import {SET_VALUE, GET_INFO_FROM_LS} from '@/reducers/paymentInfoReducer'
import { useEffect, memo, useRef } from 'react';
import {useUser} from '@/hooks/index'

export const PaymentInfo = memo(({formData, dispatch, validation}) => {
    const {cardNumber, cardHolder, expiryDate, cvv} = formData;
    const {user} = useUser();
    const isTouched = useRef(false);

    const handleChange = (field, value) => {
        dispatch({type: SET_VALUE, payload: {field, value}});
    }

    const formatCardNumber = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 16);
        let result = '';

        for (let i = 0; i < digits.length; i++) {
            if (i > 0 && i % 4 === 0) {
                result += ' ';
            }
            result += digits[i];
        }

        return result;
    };

    const formatExpiryDate = (value) => {
        const digits = value.replace(/\D/g, '').slice(0, 4);

        if (digits.length === 0) return '';

        if (digits.length <= 2) {
            return digits;
        }

        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    };


    useEffect(() => {
        if (isTouched.current) return;
        if (!user) return;

        dispatch({ type: GET_INFO_FROM_LS, payload: {
            cardHolder: user.fullName 
        }});
        isTouched.current = true;
    }, [dispatch, user]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold mb-2">Payment Information</h2>
                <p className="text-gray-400">Secure payment with end-to-end encryption</p>
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-2">Card Number</label>
                <input 
                    value={cardNumber}
                    type="text" 
                    className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                        ${validation.cardNumber || !cardNumber
                            ? 'border-neutral-700 focus:border-violet-500/50' 
                            : 'border-red-500/50 focus:border-red-500'
                    }`}
                    placeholder="1234 5678 9012 3456"
                    onChange={(e) => handleChange('cardNumber', formatCardNumber(e.target.value))}
                />
                {!validation.cardNumber && cardNumber && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        <span className='inline-flex flex-col'>
                            Only 16 digits required.
                        </span>
                    </p>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm text-gray-300 mb-2">Expiry Date</label>
                    <input 
                        value={expiryDate}
                        type="text" 
                        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                            ${validation.expiryDate || !expiryDate
                                ? 'border-neutral-700 focus:border-violet-500/50' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="MM / YY"
                        onChange={(e) => handleChange('expiryDate', formatExpiryDate(e.target.value))}
                    />
                    {!validation.expiryDate && expiryDate && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            <span className='inline-flex flex-col'>
                                Only digits and '/' allowed. Enter valid data
                            </span>
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-2">CVV</label>
                    <input
                        value={cvv}
                        type="text" 
                        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                            ${validation.cvv || !cvv
                                ? 'border-neutral-700 focus:border-violet-500/50' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="123"
                        onChange={(e) => handleChange('cvv', e.target.value)}
                    />
                    {!validation.cvv && cvv && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            <span className='inline-flex flex-col'>
                                Only 3 digits required.
                            </span>
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-2">Cardholder Name</label>
                <input 
                    value={cardHolder}
                    type="text" 
                    className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                        ${validation.cardHolder || !cardHolder
                            ? 'border-neutral-700 focus:border-violet-500/50' 
                            : 'border-red-500/50 focus:border-red-500'
                    }`}
                    placeholder="John Doe"
                    onChange={(e) => handleChange('cardHolder', e.target.value)}
                />
                {!validation.cardHolder && cardHolder && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        <span className='inline-flex flex-col'>
                            Only letters, spaces, and hyphens allowed.
                            {<span>Words must begin with a capital letter.</span>}
                        </span>
                    </p>
                )}
            </div>
        </div>
    )
});