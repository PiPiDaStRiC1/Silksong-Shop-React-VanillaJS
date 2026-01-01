import value from '@/assets/images/value.png';

export const DeliveryTariffs = ({tariffs, selectedDeliveryTariff, selectDeliveryTariff}) => {

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold mb-2">Delivery Method</h2>
                <p className="text-gray-400">Choose your preferred shipping speed</p>
            </div>

            <div className="space-y-3">
                {Object.values(tariffs).map((tariff) => (
                    <div key={tariff.name}>
                        <label className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-violet-500/50 cursor-pointer transition-colors">
                            <input 
                                type="radio" 
                                name="delivery" 
                                checked={selectedDeliveryTariff === tariff.name}
                                className="h-5 w-5 accent-violet-500"
                                onChange={() => {
                                    selectDeliveryTariff(tariff.name);
                                }} 
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="font-semibold">{tariff.name}</p>
                                    <span className="font-semibold inline-flex text-white justify-center items-center gap-1">
                                        <span className="text-lg">{tariff.price}</span>
                                        <img src={value} alt="Value Icon" className="text-lg w-3.5 h-3.5" />
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400">{tariff.desc}</p>
                                <p className="text-xs text-gray-500 mt-1">{tariff.time}</p>
                            </div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
    
}