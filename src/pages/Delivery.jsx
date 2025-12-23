import { Link } from "react-router-dom";
import { Truck, Clock, Globe, Shield, MapPin, PackageCheck } from "lucide-react";

export const Delivery = () => {
    return (
        <section className="w-full text-white">
            {/* Breadcrumbs */}
            <div className='flex flex-col mt-[2rem]'>
                <nav className="container w-full px-6 text-lg text-gray-400">
                    <Link to="/" className="hover:text-gray-200">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-200">Delivery</span>
                </nav>

                <div className="container w-full px-6 py-8">
                    <h1 className="text-4xl font-semibold mb-3">Delivery & Shipping</h1>
                    <p className="text-gray-400 max-w-3xl">We ship worldwide with tracked parcels and secure packaging. Below you’ll find delivery options, timeframes and costs.</p>
                </div>
            </div>

            {/* USP Bar */}
            <section className="container w-full px-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex items-center gap-3">
                        <Truck className="w-5 h-5 text-gray-300" />
                        <span className="text-sm text-gray-300">Free shipping on orders $50+</span>
                    </div>
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex items-center gap-3">
                        <Shield className="w-5 h-5 text-gray-300" />
                        <span className="text-sm text-gray-300">Secure, protective packaging</span>
                    </div>
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex items-center gap-3">
                        <PackageCheck className="w-5 h-5 text-gray-300" />
                        <span className="text-sm text-gray-300">Tracked parcels worldwide</span>
                    </div>
                </div>
            </section>

            {/* Options Cards */}
            <section className="container w-full px-6 mb-10">
                <h2 className="text-2xl mb-4">Delivery Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Truck className="w-5 h-5 text-white" />
                            <h3 className="text-lg font-semibold">Standard</h3>
                        </div>
                        <p className="text-gray-300 text-sm">5–7 business days • Tracked • Free over $50</p>
                        <p className="text-gray-400 text-sm">Best value for most orders. Reliable carriers with delivery confirmation.</p>
                    </article>

                    <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-white" />
                            <h3 className="text-lg font-semibold">Express</h3>
                        </div>
                        <p className="text-gray-300 text-sm">2–3 business days • Tracked • Rate at checkout</p>
                        <p className="text-gray-400 text-sm">Faster delivery with priority handling and detailed tracking updates.</p>
                    </article>

                    <article className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <Globe className="w-5 h-5 text-white" />
                            <h3 className="text-lg font-semibold">International</h3>
                        </div>
                        <p className="text-gray-300 text-sm">7–14 business days • Tracked • Duties may apply</p>
                        <p className="text-gray-400 text-sm">Shipping to most regions worldwide. Customs fees are buyer’s responsibility.</p>
                    </article>
                </div>
            </section>

            {/* Timeline */}
            <section className="container w-full px-6 mb-10">
                <h2 className="text-2xl mb-4">Order Journey</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { icon: <PackageCheck className="w-5 h-5" />, title: 'Order Confirmed', text: 'You receive a confirmation email.' },
                        { icon: <Shield className="w-5 h-5" />, title: 'Processing', text: 'We prepare items and protective packaging.' },
                        { icon: <Truck className="w-5 h-5" />, title: 'Dispatched', text: 'Parcel leaves our warehouse with tracking.' },
                        { icon: <MapPin className="w-5 h-5" />, title: 'Delivered', text: 'Courier hands off at your address.' },
                    ].map((step, idx) => (
                        <div key={idx} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 flex flex-col gap-2">
                            <div className="text-white">{step.icon}</div>
                            <h4 className="text-lg font-semibold">{step.title}</h4>
                            <p className="text-gray-300 text-sm">{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Zones & Costs */}
            <section className="container w-full px-6 mb-10">
                <h2 className="text-2xl mb-4">Zones & Costs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                        <h3 className="font-semibold mb-1">US & Canada</h3>
                        <p className="text-gray-300 text-sm">Standard: $8 • Express: from $18</p>
                    </div>
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                        <h3 className="font-semibold mb-1">EU</h3>
                        <p className="text-gray-300 text-sm">Standard: €9 • Express: from €20</p>
                    </div>
                    <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                        <h3 className="font-semibold mb-1">Worldwide</h3>
                        <p className="text-gray-300 text-sm">Calculated at checkout • Duties may apply</p>
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-3">Note: Costs are indicative and may vary by weight and destination.</p>
            </section>

            {/* Returns & Exchanges */}
            <section className="container w-full px-6 mb-10">
                <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
                    <h2 className="text-2xl mb-2">Returns & Exchanges</h2>
                    <p className="text-gray-300">30-day returns for unused items in original packaging. Exchanges available subject to stock.</p>
                    <div className="mt-4 flex gap-3">
                        <Link to="/faq" className="px-5 py-2 rounded-[10px] border border-white text-white hover:bg-white hover:text-black transition-all">Read FAQ</Link>
                        <Link to="/contacts" className="px-5 py-2 rounded-[10px] border border-neutral-700 text-gray-300 hover:border-white hover:text-white transition-all">Contact Support</Link>
                    </div>
                </div>
            </section>
        </section>
    );
}