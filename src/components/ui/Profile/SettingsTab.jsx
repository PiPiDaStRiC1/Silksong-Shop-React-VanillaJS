import { User, Mail, Trash2, AlertCircle } from "lucide-react";
import { useUser } from "@/hooks/index";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const SettingTab = () => {
    const controllerRef = useRef(null);
    const { user, changeUserInfo, deleteAccount, currentUserId } = useUser();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
    });

    const validation = {
        fullName: /^[A-ZА-ЯЁ][a-zа-яё]+ [A-ZА-ЯЁ][a-zа-яё]+$/.test(formData.fullName),
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email),
    }

    const isFormValid = validation.fullName && validation.email;

    const handleAbortController = () => {
        controllerRef.current?.abort();
        controllerRef.current = null;
    };

    const handleCancelEdit = () => {
        // CANCEL ABORT CONTROLLER IF EXISTS
        handleAbortController();
        setLoading(false);
        setFormData({
            fullName: user?.fullName || '',
            email: user?.email || '',
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async () => {
        if (!currentUserId) {
            toast.error('User not loaded.');
            return;
        }

        setLoading(true);
        
        if (formData.fullName === user.fullName && formData.email === user.email) {
            setLoading(false);
            setEditMode(false);
            toast.error('No changes made to save.');
            return;
        }
    
        // ABORTCONTROLLER SETUP
        controllerRef.current?.abort();

        const controller = new AbortController();
        controllerRef.current = controller;

        const [name, lastName = ""] = formData.fullName.split(' ');

        try {
            await changeUserInfo({
                changes: [
                    { field: 'fullName', value: formData.fullName },
                    { field: 'email', value: formData.email },
                    { field: 'name', value: name },
                    { field: 'lastName', value: lastName }
                ],
                signal: controller.signal
            });
            setEditMode(false);
            toast.success('Profile updated successfully!');
        } catch (error) {
            if (error.name === 'AbortError') {
                toast('Profile update cancelled.');
            } else {
                toast.error('Failed to update profile.');
            }
        } finally {
            setLoading(false);
            controllerRef.current = null;
        }
    };

    useEffect(() => {
        return () => handleAbortController();
    }, []);

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-purple-900/10 to-zinc-900/80 backdrop-blur p-6 md:p-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-violet-400" />
                    Profile Information
                </h2>
                <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                        <label className="text-gray-300 block text-sm font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            disabled={!editMode || loading}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-violet-500 transition-colors"
                        />
                        {!validation.fullName && formData.fullName && (
                            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                Invalid full name format (e.g., John Doe)
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="text-gray-300 block text-sm font-medium mb-2 flex items-center gap-1">
                            <Mail className="w-4 h-4 text-blue-400" />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            disabled={!editMode || loading}
                            className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:border-blue-500 transition-colors"
                        />
                        {!validation.email && formData.email && (
                            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1 animate-fadeIn">
                                <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
                                Invalid email format (e.g., your@email.com)
                            </p>
                        )}
                    </div>
                    <div className="md:col-span-2 flex gap-3 mt-4">
                        {!editMode ? (
                            <button 
                                className="cursor-pointer p-3 inline-flex justify-center items-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <>
                                <button 
                                    className={`cursor-pointer p-3 inline-flex justify-center items-center gap-2 rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors${!isFormValid ? ' opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={handleSaveProfile}
                                    disabled={loading || !isFormValid}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button 
                                    className="cursor-pointer px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-colors"
                                    onClick={() => handleCancelEdit()}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-red-500/30 bg-gradient-to-br from-red-900/20 to-black p-6 md:p-8">
                <h2 className="text-xl font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Danger Zone
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                    Once you delete your account, all your data will be permanently removed. This action cannot be undone.
                </p>
                {!showDeleteConfirm ? (
                    <button 
                        className="cursor-pointer px-6 py-3 rounded-xl border border-red-500/50 bg-red-900/20 hover:bg-red-900/30 transition text-red-300 font-medium inline-flex items-center gap-2"
                        onClick={() => setShowDeleteConfirm(true)}
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                    </button>
                ) : (
                    <div className="p-4 rounded-xl border border-red-500/50 bg-red-900/10 space-y-3">
                        <p className="text-red-200 font-medium">Are you absolutely sure?</p>
                        <div className="flex gap-3">
                            <button 
                                className="cursor-pointer px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
                                onClick={() => {
                                    deleteAccount();
                                    toast.success('Account deleted successfully!');
                                }}
                            >
                                Yes, Delete My Account
                            </button>
                            <button 
                                className="cursor-pointer px-4 py-2 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-colors"
                                onClick={() => setShowDeleteConfirm(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}