export const ReviewConfirm = ({allDeliveryInfo}) => {
    const {shippingData, paymentInfoData, tariff} = allDeliveryInfo;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold mb-2">Review & Confirm</h2>
                <p className="text-gray-400">Double-check your order details before placing</p>
            </div>

            <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-gray-400 mb-2">Shipping Address</p>
                    <p className="text-white">{`${shippingData.name} ${shippingData.lastName}`}</p>
                    <p className="text-gray-300 text-sm">{shippingData.address}</p>
                    <p className="text-gray-300 text-sm">{shippingData.city}, {shippingData.zip}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-gray-400 mb-2">Delivery Method</p>
                    <p className="text-white">{tariff.name}</p>
                    <p className="text-gray-300 text-sm">{tariff.time}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-gray-400 mb-2">Payment Method</p>
                    <p className="text-white">•••• •••• •••• {paymentInfoData.cardNumber.slice(-4)}</p>
                    <p className="text-gray-300 text-sm">Expires {paymentInfoData.expiryDate}</p>
                </div>
            </div>
        </div>
    )
}