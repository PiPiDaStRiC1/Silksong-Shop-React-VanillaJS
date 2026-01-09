import {SET_VALUE, GET_INFO_FROM_LS} from '@/reducers/paymentInfoReducer'
import { useEffect, memo } from 'react';
import {useUser} from '@/hooks/index'

export const PaymentInfo = memo(({formData, dispatch, validation}) => {
    const {cardNumber, cardHolder, expiryDate, cvv} = formData;
    const {user} = useUser();

    const handleChange = (field, value) => {
        dispatch({type: SET_VALUE, payload: {field, value}});
    }
    
    useEffect(() => {
        const isAutoFilledRef = JSON.parse(sessionStorage.getItem('isAutoFilledCardHolderRef')) ?? false;
        if (user && !cardHolder && !isAutoFilledRef) {
            dispatch({ type: GET_INFO_FROM_LS, payload: {
                cardHolder: user.fullName 
            } });
            sessionStorage.setItem('isAutoFilledCardHolderRef', 'true');
        }
    }, [user, cardHolder, dispatch]);

    useEffect(() => {
        return () => sessionStorage.setItem('isAutoFilledCardHolderRef', 'false');
    }, [])

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
                    onChange={(e) => handleChange('cardNumber', e.target.value)}
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
                        onChange={(e) => handleChange('expiryDate', e.target.value)}
                    />
                    {!validation.expiryDate && expiryDate && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            <span className='inline-flex flex-col'>
                                Only digits and '/' allowed.
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