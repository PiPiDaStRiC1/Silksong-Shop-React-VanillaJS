import {BreadCrumbs} from '@/features/index'
import { useState, useReducer, useEffect, useRef, useCallback } from "react";
import toast from 'react-hot-toast';
import { MapPin, CreditCard, Package, CheckCircle2, ChevronRight, X } from "lucide-react";
import {useCart, useOrder} from '@/hooks/index';
import value from '@/assets/images/value.png';
import {freeShippingValue} from '@/libs/constants/freeShippingValue';
import {deliveryTariffs} from '@/libs/constants/deliveryTariffs';
import {ShippingAddress, DeliveryTariffs, PaymentInfo, ReviewConfirm, OrderCard, StepCircle} from '@/components/ui/index'
import { shippingAddressReducer, initialShippingState, initShipping, RESET_FORM as RESET_SHIPPING } from '@/reducers/shippingAddressReducer';
import { paymentInfoReducer, initialPaymentInfoState, initPaymentInfo, RESET_FORM as RESET_PAYMENT } from '@/reducers/paymentInfoReducer'

const steps = [
    { id: 1, title: "Shipping", icon: MapPin },
    { id: 2, title: "Delivery", icon: Package },
    { id: 3, title: "Payment", icon: CreditCard },
    { id: 4, title: "Confirm", icon: CheckCircle2 }
];

const initStep = () => {
    try {
        return JSON.parse(sessionStorage.getItem('lastStep')) || 1;
    } catch (error) {
        console.log(error.message);
        return 1;
    }
}

export const Delivery = () => {
    const controllerRef = useRef(null);
    const orderIdRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(initStep);
    const [loading, setLoading] = useState(false);
    const [shippingData, shippingDispatch] = useReducer(shippingAddressReducer, initialShippingState, initShipping);
    const [paymentInfoData, paymentInfoDispatch] = useReducer(paymentInfoReducer, initialPaymentInfoState, initPaymentInfo);
    const {cart, totalValue, totalCount, selectedDeliveryTariff, removeItem, incQty, decQty, selectDeliveryTariff, resetCart} = useCart();
    const {orders, createOrder, updateOrderStatus, startDeliveryTimer, cancelOrder} = useOrder();
    const taxCost = parseFloat((totalValue * 0.05).toFixed(2));
    const isShippingFree = freeShippingValue <= totalValue;
    const deliveryCost = isShippingFree ? 0 : deliveryTariffs[selectedDeliveryTariff ?? 'Eco'].price;
    const PENDING_ORDER_ID = 'pendingOrderId';
    
    const shippingValidation = {
        name: /^[A-ZА-ЯЁ][a-zа-яё]+$/.test(shippingData.name),
        lastName: /^[A-ZА-ЯЁ][a-zа-яё]+$/.test(shippingData.lastName),
        address: shippingData.address.length >= 10,
        city: /^[A-ZА-ЯЁ][a-zа-яё]+(?:[\s-][A-ZА-ЯЁ][a-zа-яё]+)*$/.test(shippingData.city),
        state: /^[A-ZА-ЯЁ][a-zа-яё]+(?:[\s-][A-ZА-ЯЁ][a-zа-яё]+)*$/.test(shippingData.state),
        zip: /^\d{5}(-\d{4})?$/.test(shippingData.zip),
        phone: /^\+[1-9]\d{10}$/.test(shippingData.phone),
    }
    const isShippingValid = Object.values(shippingValidation).every(value => value === true);   
    
    const paymentValidation = {
        cardNumber: /^\d{16}$/.test(paymentInfoData.cardNumber),
        expiryDate: /^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfoData.expiryDate),
        cvv: /^\d{3}$/.test(paymentInfoData.cvv),
        cardHolder: /^[A-ZА-ЯЁ][a-zа-яё]+ [A-ZА-ЯЁ][a-zа-яё]+$/.test(paymentInfoData.cardHolder),
    }
    const isPaymentValid = Object.values(paymentValidation).every(value => value === true);
    
    
    const handleContinueButton = (newStep) => {
        if (newStep <= currentStep) {
            setCurrentStep(newStep);
            return;
        }
        
        if (Object.values(cart).length === 0) {
            toast.error('Your cart is empty. Please add items to proceed.');
            return;
        }
        
        if (currentStep === 1 && !isShippingValid) {
            const wrongFieldsCount = Object.values(shippingValidation).filter(value => value === false).length;
            toast.error(`Please fill ${wrongFieldsCount > 1 ? `${wrongFieldsCount} shipping fields` : '1 shipping field'} correctly.`);
            return;
        }
        
        if (currentStep === 3 && !isPaymentValid) {
            const wrongFieldsCount = Object.values(paymentValidation).filter(value => value === false).length;
            toast.error(`Please fill ${wrongFieldsCount > 1 ? `${wrongFieldsCount} payment fields` : '1 payment field'} correctly.`);
            return;
        }
        
        toast.success('Success!');
        setCurrentStep(newStep);
    }
    
    const clearDelDataFromStorage = () => {
        sessionStorage.removeItem('shippingAddress');
        sessionStorage.removeItem('paymentInfo');
        sessionStorage.removeItem('lastStep');
        sessionStorage.removeItem('isAutoFilledRef');
        
        shippingDispatch({type: RESET_SHIPPING});
        paymentInfoDispatch({type: RESET_PAYMENT});
        resetCart();
    }
    
    const orderCompleteHandler = async () => {
        setLoading(true);
        controllerRef.current?.abort();

        controllerRef.current = new AbortController();

        try {
            await toast.promise(
                new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(() => {
                        resolve(true);
                    }, 2000);
                
                    const signal = controllerRef.current.signal;

                    if (signal) {
                        if (signal.aborted) {
                            clearTimeout(timeoutId);
                            reject(new DOMException('Aborted', 'AbortError'));
                            return;
                        }

                        signal.addEventListener('abort', () => {
                            clearTimeout(timeoutId);
                            reject(new DOMException('Aborted', 'AbortError'));
                        }, {once: true})
                    }
                }),
                {
                    loading: 'Placing your order...',
                    success: 'Order placed successfully!',
                    error: 'Failed to place order. Please try again.'
                }
            )
            
            updateOrderStatus(orderIdRef.current, 'shipped');
            startDeliveryTimer(orderIdRef.current);
            sessionStorage.removeItem(PENDING_ORDER_ID);
            clearDelDataFromStorage();
            setCurrentStep(1);
            orderIdRef.current = null;
        } catch (error) {
            if (error.name === 'AbortError') {
                toast.success('Order cancelled')
            } else {
                console.log(error.message);
            }
        } finally {
            setLoading(false);
            controllerRef.current = null;
        }
    }

    const abortOrder = useCallback(() => {
        controllerRef.current?.abort();
        controllerRef.current = null;
    }, []);


    // Effect to order restoration on page reloads
    useEffect(() => {
        const savedOrderId = sessionStorage.getItem(PENDING_ORDER_ID);
        if (savedOrderId && orders?.[savedOrderId]?.status === 'processing') {
            orderIdRef.current = savedOrderId
        } else {
            sessionStorage.removeItem(PENDING_ORDER_ID);
        }
    }, [orders]);

    useEffect(() => {
        if (currentStep !== 3 || orderIdRef.current) return;

        const newOrderId = createOrder({ 
            date: new Date().toString().split(' GMT')[0],
            cartItems: cart,
            totalValue: totalValue + taxCost + deliveryCost, 
            taxValue: taxCost,
            deliveryValue: deliveryCost,
            totalCount, 
            status: 'processing' 
        });

        orderIdRef.current = newOrderId;
        sessionStorage.setItem(PENDING_ORDER_ID, newOrderId);
    }, [totalValue, taxCost, deliveryCost, totalCount, cart, createOrder, currentStep]);
    
    useEffect(() => {
        sessionStorage.setItem('lastStep', JSON.stringify(currentStep));
    }, [currentStep]);
    
    useEffect(() => {
        // case of aborting order (AbortController) when user goes back to previous steps
        if (currentStep <= 2 && orderIdRef.current) {
            abortOrder();
            cancelOrder(orderIdRef.current);
            sessionStorage.removeItem(PENDING_ORDER_ID);
            orderIdRef.current = null;
        }
    }, [currentStep, abortOrder, cancelOrder]);

    useEffect(() => {
        return () => abortOrder();
    }, [abortOrder]);

    return (
        <section className="container w-full text-white px-6">
            <div className="flex flex-col mt-[2rem]">
                <BreadCrumbs />

                <div className="container w-full py-8">
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex items-center justify-between relative">
                            <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-white/10 via-white/10 to-white/10" />
                            
                            <div 
                                className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 transition-all duration-500"
                                style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                            />

                            {steps.map((step) => (
                                <StepCircle 
                                    key={step.id}
                                    step={step} 
                                    currentStep={currentStep}
                                    setCurrentStep={handleContinueButton} 
                                />
                            ))}
                        </div>
                    </div>

                    <div className="max-w-5xl mx-auto">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-purple-900/10 to-zinc-900/80 p-8 backdrop-blur">
                                {currentStep === 1 && 
                                    <ShippingAddress 
                                        formData={shippingData}
                                        dispatch={shippingDispatch}
                                        validation={shippingValidation}
                                    />
                                }
                                {currentStep === 2 && 
                                    <DeliveryTariffs 
                                        tariffs={deliveryTariffs}
                                        selectedDeliveryTariff={selectedDeliveryTariff}
                                        selectDeliveryTariff={selectDeliveryTariff}
                                    />
                                }
                                {currentStep === 3 && 
                                    <PaymentInfo 
                                        formData={paymentInfoData}
                                        dispatch={paymentInfoDispatch}
                                        validation={paymentValidation}
                                    />
                                }
                                {currentStep === 4 && 
                                    <ReviewConfirm 
                                        allDeliveryInfo={{shippingData, paymentInfoData, tariff: deliveryTariffs[selectedDeliveryTariff]}}
                                    />
                                }
                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                                    <button 
                                        onClick={() => handleContinueButton(Math.max(1, currentStep - 1))}
                                        disabled={currentStep === 1}
                                        className="px-6 cursor-pointer py-3 rounded-xl border border-white/10 bg-white/5 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                                    >
                                        Back
                                    </button>
                                    {currentStep !== steps.length ? 
                                        <button 
                                            className={`px-6 inline-flex justify-center items-center gap-2 cursor-pointer py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed
                                                ${(currentStep === 1 && !isShippingValid) || 
                                                    (currentStep === 3 && !isPaymentValid) ? 'opacity-50 not-allowed' : ''}
                                            `}
                                            onClick={() => handleContinueButton(Math.min(steps.length, currentStep + 1))}
                                        >
                                            Continue
                                            <ChevronRight className="h-4 w-4" />
                                        </button> :
                                        loading ? 
                                            <>
                                                <div className='flex gap-2'>
                                                    <span
                                                        className='px-6 inline-flex justify-center items-center gap-2 cursor-pointer py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors'
                                                    >
                                                        <div className="opacity-50 w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                        Placing...
                                                    </span> 
                                                    <button
                                                        className='px-6 inline-flex justify-center items-center gap-2 cursor-pointer py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors'
                                                        onClick={abortOrder}
                                                    >
                                                        <X />
                                                    </button>
                                                </div>
                                            </> :
                                            <button 
                                                className="px-6 inline-flex justify-center items-center gap-2 cursor-pointer py-3 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                                                onClick={orderCompleteHandler}
                                            >
                                                Place Order
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                    }
                                </div>
                            </div>

                            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/60 via-purple-900/20 to-zinc-900/60 p-6 backdrop-blur h-fit sticky top-24">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                                
                                <div className="max-h-[25rem] overflow-y-auto scrollbar-reviews custom-scroll">
                                    {Object.values(cart).map((item) => (
                                        <OrderCard 
                                            key={item.id}
                                            item={item} 
                                            removeItem={removeItem} 
                                            incQty={incQty} 
                                            decQty={decQty} 
                                            currentStep={currentStep}
                                        />
                                    ))}
                                    {Object.values(cart).length === 0 && (
                                        <p className="text-gray-400 text-center py-8">Your cart is empty.</p>
                                    )}
                                </div>
                                

                                <div className="space-y-2 py-4 border-t border-b border-white/10">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span className="inline-flex text-white justify-center items-center gap-1">
                                            {totalValue}
                                            {<img src={value} alt="Value Icon" className="w-4 h-4" />}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Shipping</span>
                                        <span className="inline-flex text-white justify-center items-center gap-1">
                                            {!deliveryCost ? 'Free' : `at least ${deliveryCost}`}
                                            {<img src={value} alt="Value Icon" className="w-4 h-4" />}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Tax</span>
                                        <span className="inline-flex justify-center items-center gap-1 text-white">
                                            {taxCost}
                                            {<img src={value} alt="Value Icon" className="w-4 h-4" />}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4">
                                    <span className="text-2xl font-semibold">Total</span>
                                    <span className="text-2xl font-semibold inline-flex text-white justify-center items-center gap-1">
                                        {Object.values(cart).length === 0 ? 0 : totalValue + taxCost + (isShippingFree ? 0 : deliveryCost)}
                                        {<img src={value} alt="Value Icon" className="w-6 h-6" />}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};