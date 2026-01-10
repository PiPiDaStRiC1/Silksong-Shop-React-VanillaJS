import { SET_FIELD, GET_INFO_FROM_LS } from '@/reducers/shippingAddressReducer';
import { useEffect, memo, useRef } from 'react';
import { useUser } from '@/hooks/useUser';

export const ShippingAddress = memo(({ formData, dispatch, validation }) => {
    const { name, lastName, address, city, state, zip, phone } = formData;
    const {user} = useUser();
    const isTouched = useRef(false); 
    
    const handleChange = (field, value) => {
        dispatch({ type: SET_FIELD, payload: { field, value } });
    };

    useEffect(() => {
        if (isTouched.current) return;
        if (!user) return;

        dispatch({ type: GET_INFO_FROM_LS, payload: {
            name: user.name,
            lastName:  user.lastName
        }});
        isTouched.current = true;
    }, [dispatch, user]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold mb-2">Shipping Address</h2>
                <p className="text-gray-400">Where should we deliver your order?</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-sm text-gray-300 mb-2">First Name</label>
                    <input 
                        value={name}
                        type="text" 
                        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20
                            ${validation.name || !name
                                ? 'border-neutral-700 focus:border-violet-500/50' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="John"
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                    {!validation.name && name && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            <span className='inline-flex flex-col'>
                                Only letters and spaces allowed. 
                                {<span>Word must begin with a capital letter.</span>}
                            </span>
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                    <input 
                        value={lastName}
                        type="text" 
                        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                            ${validation.lastName || !lastName
                                ? 'border-neutral-700 focus:border-violet-500/50' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="Doe"
                        onChange={(e) => handleChange('lastName', e.target.value)}
                    />
                    {!validation.lastName && lastName && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            <span className='inline-flex flex-col'>
                                Only letters and spaces allowed. 
                                {<span>Word must begin with a capital letter.</span>}
                            </span>
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-2">Address</label>
                <input 
                    value={address}
                    type="text" 
                    className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                        ${validation.address || !address
                            ? 'border-neutral-700 focus:border-violet-500/50' 
                            : 'border-red-500/50 focus:border-red-500'
                    }`}
                    placeholder="Street address"
                    onChange={(e) => handleChange('address', e.target.value)}
                />
                {!validation.address && address && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        <span className='inline-flex flex-col'>
                            At least 10 characters.
                        </span>
                    </p>
                )}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div>
                    <label className="block text-sm text-gray-300 mb-2">City</label>
                    <input 
                        value={city}
                        type="text" 
                        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                            ${validation.city || !city
                                ? 'border-neutral-700 focus:border-violet-500/50' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="City"
                        onChange={(e) => handleChange('city', e.target.value)}
                    />
                    {!validation.city && city && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            <span className='inline-flex flex-col'>
                                Word must begin with a capital letter
                            </span>
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-2">State / Region</label>
                    <input 
                        value={state}
                        type="text" 
                        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                            ${validation.state || !state
                                ? 'border-neutral-700 focus:border-violet-500/50' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="State"
                        onChange={(e) => handleChange('state', e.target.value)}
                    />
                    {!validation.state && state && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            <span className='inline-flex flex-col'>
                                Word must begin with a capital letter
                            </span>
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-300 mb-2">ZIP / Postal</label>
                    <input 
                        value={zip}
                        type="text" 
                        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                            ${validation.zip || !zip
                                ? 'border-neutral-700 focus:border-violet-500/50' 
                                : 'border-red-500/50 focus:border-red-500'
                        }`}
                        placeholder="12345"
                        onChange={(e) => handleChange('zip', e.target.value)}
                    />
                    {!validation.zip && zip && (
                        <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                            <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                            <span className='inline-flex flex-col'>
                                Max. 5 digits.
                            </span>
                        </p>
                    )}
                </div>
            </div>

            <div>
                <label className="block text-sm text-gray-300 mb-2">Phone Number</label>
                <input 
                    value={phone}
                    type="tel" 
                    className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20  
                        ${validation.phone || !phone
                            ? 'border-neutral-700 focus:border-violet-500/50' 
                            : 'border-red-500/50 focus:border-red-500'
                    }`}
                    placeholder="+7 (920) 000-00-00"
                    onChange={(e) => handleChange('phone', e.target.value)}
                />
                {!validation.phone && phone && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                        <span className='inline-flex flex-col'>
                            Only digits and + sign allowed. Total 12 characters.
                        </span>
                    </p>
                )}
            </div>
        </div>
    )
});