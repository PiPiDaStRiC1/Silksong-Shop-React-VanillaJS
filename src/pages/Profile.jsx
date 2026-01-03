import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Package, Heart, Settings, LogOut, Shield, Eye, ChevronRight } from 'lucide-react';
import { useUser } from '@/hooks/index';
import {CommonInfo, OverviewTab, OrdersTab, WishListTab, SettingTab} from '@/components/ui/index'

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
            <section className="container text-center">
                <div className="max-w-md mx-auto rounded-2xl border border-white/10 bg-black/40 p-12">
                    <User className="w-16 h-16 mx-auto mb-4 text-white/30" />
                    <h2 className="text-2xl font-semibold text-white mb-2">Not logged in</h2>
                    <p className="text-gray-400 mb-6">Please sign in to view your profile</p>
                    <button 
                        className="cursor-pointer p-4 inline-flex justify-center items-center gap-2 cursor-pointer rounded-xl border border-white/40 bg-white/5 text-white hover:bg-white/10 transition-colors"
                        onClick={() => navigate('/')}
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
                            <div className="select-none w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-4xl font-bold text-white">
                                {user.name[0]}
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
                            className="cursor-pointer flex items-center gap-2 px-5 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition text-white"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>

                <CommonInfo />

                <div className="flex gap-2 mb-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`cursor-pointer flex items-center gap-2 px-6 py-3 rounded-xl transition whitespace-nowrap ${
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
                        {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab}/>}

                        {activeTab === 'orders' && <OrdersTab />}

                        {activeTab === 'wishlist' && <WishListTab />}

                        {activeTab === 'settings' && <SettingTab />}
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
                                    <span>Browse Catalog</span>
                                </Link>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition text-white"
                                >
                                    <Settings className="w-5 h-5" />
                                    <span>Settings</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
