import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, MapPin, Package, Heart, Settings, LogOut, Clock, CheckCircle2, Bell, Shield, Eye, Palette, ChevronRight } from 'lucide-react';
import { useUser } from '@/hooks/useUser';
import value from '@/assets/images/value.png';
import { Button } from '@/components/common/index';

const recentOrders = [
    { id: '#HSK-2847', date: '15 Dec 2023', status: 'Delivered', amount: 245, items: ['Wayward Compass', 'Gathering Swarm'] },
    { id: '#HSK-2822', date: '03 Dec 2023', status: 'Shipped', amount: 189, items: ['Dashmaster', 'Sprint Master'] },
    { id: '#HSK-2801', date: '28 Nov 2023', status: 'Processing', amount: 412, items: ['Quick Slash', 'Mark of Pride', 'Strength'] },
];

export const Profile = () => {
    const navigate = useNavigate();
    const { user, logout } = useUser();
    const [activeTab, setActiveTab] = useState('overview');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <section className="container mx-auto px-6 py-20 text-center">
                <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-black/40 p-12">
                    <User className="w-16 h-16 mx-auto mb-4 text-white/30" />
                    <h2 className="text-2xl font-semibold text-white mb-2">Not logged in</h2>
                    <p className="text-gray-400 mb-6">Please sign in to view your profile</p>
                    <button
                        type='button'
                        onClick={() => navigate('/')}
                        className="cursor-pointer px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition text-white font-medium"
                    >
                        Back to Home
                    </button>
                </div>
            </section>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: User },
        { id: 'orders', label: 'Orders', icon: Package },
        { id: 'wishlist', label: 'Wishlist', icon: Heart },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <section className="container mx-auto px-6 py-12 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-violet-900/30 via-purple-900/30 to-fuchsia-900/30 p-8 mb-8">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
                    
                    <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-4xl font-bold text-white">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">{user.fullName}</h1>
                                <div className="flex items-center gap-2 text-gray-300 mb-2">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-medium border border-emerald-500/30">
                                        Verified Member
                                    </span>
                                    <span className="px-3 py-1 rounded-full bg-violet-500/20 text-violet-400 text-xs font-medium border border-violet-500/30">
                                        Since {new Date().getFullYear()}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition text-white"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-900/20 to-black p-6">
                        <Package className="w-8 h-8 text-violet-400 mb-3" />
                        <p className="text-3xl font-bold text-white mb-1">12</p>
                        <p className="text-sm text-gray-400">Total Orders</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-900/20 to-black p-6">
                        <Heart className="w-8 h-8 text-fuchsia-400 mb-3" />
                        <p className="text-3xl font-bold text-white mb-1">8</p>
                        <p className="text-sm text-gray-400">Wishlist Items</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/20 to-black p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <img src={value} alt="Value" className="w-8 h-8" />
                        </div>
                        <p className="text-3xl font-bold text-white mb-1">846</p>
                        <p className="text-sm text-gray-400">Total Spent</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-900/20 to-black p-6">
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-3" />
                        <p className="text-3xl font-bold text-white mb-1">9</p>
                        <p className="text-sm text-gray-400">Completed</p>
                    </div>
                </div>

                <div className="flex gap-2 mb-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'bg-white text-black font-medium'
                                    : 'border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20'
                            }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {activeTab === 'overview' && (
                            <>
                                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
                                        <button
                                            onClick={() => setActiveTab('orders')}
                                            className="text-sm text-violet-400 hover:text-violet-300 transition"
                                        >
                                            View all →
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        {recentOrders.map((order) => (
                                            <div
                                                key={order.id}
                                                className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                                        order.status === 'Delivered' ? 'bg-emerald-500/20' :
                                                        order.status === 'Shipped' ? 'bg-violet-500/20' : 'bg-orange-500/20'
                                                    }`}>
                                                        {order.status === 'Delivered' ? (
                                                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                                                        ) : order.status === 'Shipped' ? (
                                                            <Package className="w-6 h-6 text-violet-400" />
                                                        ) : (
                                                            <Clock className="w-6 h-6 text-orange-400" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-medium">{order.id}</p>
                                                        <p className="text-sm text-gray-400">{order.date}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center gap-1 text-white font-semibold mb-1">
                                                        <span>{order.amount}</span>
                                                        <img src={value} alt="Value" className="w-4 h-4" />
                                                    </div>
                                                    <span className={`text-xs px-2 py-1 rounded ${
                                                        order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                                                        order.status === 'Shipped' ? 'bg-violet-500/20 text-violet-400' :
                                                        'bg-orange-500/20 text-orange-400'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
                                    <h2 className="text-xl font-semibold text-white mb-4">Account Activity</h2>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-violet-500 mt-2"></div>
                                            <div>
                                                <p className="text-white">Order #HSK-2847 delivered</p>
                                                <p className="text-xs text-gray-400">2 hours ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-fuchsia-500 mt-2"></div>
                                            <div>
                                                <p className="text-white">Added 3 items to wishlist</p>
                                                <p className="text-xs text-gray-400">1 day ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                                            <div>
                                                <p className="text-white">Profile verified</p>
                                                <p className="text-xs text-gray-400">3 days ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === 'orders' && (
                            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
                                <h2 className="text-xl font-semibold text-white mb-6">All Orders</h2>
                                <div className="space-y-4">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="p-5 rounded-xl border border-white/10 bg-white/5">
                                            <div className="flex items-center justify-between mb-3">
                                                <div>
                                                    <p className="text-white font-semibold">{order.id}</p>
                                                    <p className="text-sm text-gray-400">{order.date}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    order.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                                                    order.status === 'Shipped' ? 'bg-violet-500/20 text-violet-400' :
                                                    'bg-orange-500/20 text-orange-400'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex flex-wrap gap-2">
                                                    {order.items.map((item, idx) => (
                                                        <span key={idx} className="text-xs px-2 py-1 rounded bg-white/10 text-gray-300">
                                                            {item}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1 text-white font-semibold">
                                                    <span>{order.amount}</span>
                                                    <img src={value} alt="Value" className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'wishlist' && (
                            <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
                                <h2 className="text-xl font-semibold text-white mb-4">Wishlist</h2>
                                <div className="text-center py-12">
                                    <Heart className="w-16 h-16 mx-auto mb-4 text-white/20" />
                                    <p className="text-gray-400">Your wishlist is empty</p>
                                    <button
                                        onClick={() => navigate('/catalog')}
                                        className="mt-4 px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-600 transition text-white"
                                    >
                                        Browse Catalog
                                    </button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-purple-900/10 to-zinc-900/80 backdrop-blur p-6">
                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                        <User className="w-5 h-5 text-violet-400" />
                                        Profile Information
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={user.fullName}
                                                disabled
                                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                disabled
                                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white disabled:opacity-60 disabled:cursor-not-allowed"
                                            />
                                        </div>
                                        <Button message={"Update Profile"}/>
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-purple-900/10 to-zinc-900/80 backdrop-blur p-6">
                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-violet-400" />
                                        Preferences
                                    </h2>
                                    <div className="space-y-5">
                                        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
                                            <div className="flex items-center gap-3">
                                                <Bell className="w-5 h-5 text-violet-400" />
                                                <div>
                                                    <p className="text-white font-medium">Push Notifications</p>
                                                    <p className="text-xs text-gray-400">Get updates about orders</p>
                                                </div>
                                            </div>
                                            <button
                                                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                                                    'bg-gray-600'
                                                }`}
                                            >
                                                <span
                                                    className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                                                        'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
                                            <div className="flex items-center gap-3">
                                                <Shield className="w-5 h-5 text-emerald-400" />
                                                <div>
                                                    <p className="text-white font-medium">Two-Factor Authentication</p>
                                                    <p className="text-xs text-gray-400">Add extra security layer</p>
                                                </div>
                                            </div>
                                            <button
                                                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                                                    'bg-gray-600'
                                                }`}
                                            >
                                                <span
                                                    className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                                                        'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5">
                                            <div className="flex items-center gap-3">
                                                <Palette className="w-5 h-5 text-fuchsia-400" />
                                                <div>
                                                    <p className="text-white font-medium">Dark Mode</p>
                                                    <p className="text-xs text-gray-400">Use dark theme</p>
                                                </div>
                                            </div>
                                            <button
                                                className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                                                    'bg-gray-600'
                                                }`}
                                            >
                                                <span
                                                    className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${
                                                        'translate-x-1'
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Privacy & Security */}
                                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-purple-900/10 to-zinc-900/80 backdrop-blur p-6">
                                    <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-violet-400" />
                                        Privacy & Security
                                    </h2>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white">
                                            <span>Change Password</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white">
                                            <span>Connected Devices</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white">
                                            <span>Privacy Settings</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-900/20 to-black p-6">
                                    <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Danger Zone
                                    </h2>
                                    <p className="text-sm text-gray-400 mb-4">
                                        Once you delete your account, there is no going back. Please be certain.
                                    </p>
                                    <button className="px-6 py-3 rounded-xl border border-red-500/50 bg-red-900/20 hover:bg-red-900/30 transition text-red-300 font-medium">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <Link
                                    to="/delivery"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
                                >
                                    <Package className="w-5 h-5" />
                                    <span>New Order</span>
                                </Link>
                                <Link
                                    to="/catalog"
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
                                >
                                    <Heart className="w-5 h-5" />
                                    <span>Browse Charms</span>
                                </Link>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
                                >
                                    <Settings className="w-5 h-5" />
                                    <span>Settings</span>
                                </button>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet-900/20 to-black p-6">
                            <MapPin className="w-8 h-8 text-violet-400 mb-3" />
                            <h3 className="text-lg font-semibold text-white mb-2">Delivery Address</h3>
                            <p className="text-sm text-gray-400 mb-4">
                                {user.address || 'No address saved'}
                            </p>
                            <button
                                onClick={() => navigate('/delivery')}
                                className="text-sm text-violet-400 hover:text-violet-300 transition"
                            >
                                Update address →
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
