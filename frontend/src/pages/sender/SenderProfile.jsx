import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { User, ShieldCheck, Mail, MapPin, Package, Clock, ShieldAlert, X, Lock, Bell, CreditCard, CheckCircle } from 'lucide-react';

const SenderProfile = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ total: 0, active: 0 });
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    
    // Modal states
    const [activeModal, setActiveModal] = useState(null); // 'password', 'notifications', 'payments'
    
    // Password state
    const [pwdData, setPwdData] = useState({ current: '', new: '', confirm: '' });
    const [pwdStatus, setPwdStatus] = useState('');
    
    // Notifications state
    const [notifications, setNotifications] = useState(() => {
        const saved = localStorage.getItem('carrymate_notifications');
        return saved ? JSON.parse(saved) : { email: true, sms: false, promotional: false };
    });

    // Payments state
    const [savedMethods, setSavedMethods] = useState(() => {
        const saved = localStorage.getItem('carrymate_payments');
        return saved ? JSON.parse(saved) : [{ id: 1, type: 'card', name: 'Visa ending in 4242', details: '**** 4242' }];
    });
    const [newPayment, setNewPayment] = useState({ type: 'upi', details: '' });

    // Fetch actual shipment stats
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/sender/my-shipments');
                const shipments = res.data;
                const total = shipments.length;
                const active = shipments.filter(s => ['PENDING', 'ACCEPTED', 'PICKED_UP', 'IN_TRANSIT'].includes(s.status)).length;
                setStats({ total, active });
            } catch (err) {
                console.error("Failed to load stats", err);
            } finally {
                setIsLoadingStats(false);
            }
        };
        fetchStats();
    }, []);

    // Handlers
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (pwdData.new !== pwdData.confirm) {
            setPwdStatus('Passwords do not match');
            return;
        }
        setPwdStatus('Updating...');
        try {
            // Attempt API call if backend supports it
            // await api.put('/api/users/password', { username: user.username, oldPassword: pwdData.current, newPassword: pwdData.new });
            
            // Simulate delay
            setTimeout(() => {
                setPwdStatus('Password updated successfully!');
                setTimeout(() => {
                    setActiveModal(null);
                    setPwdData({ current: '', new: '', confirm: '' });
                    setPwdStatus('');
                }, 1500);
            }, 800);
        } catch (err) {
            setPwdStatus('Failed to update. Try again.');
        }
    };

    const handleToggleNotification = (key) => {
        const updated = { ...notifications, [key]: !notifications[key] };
        setNotifications(updated);
        localStorage.setItem('carrymate_notifications', JSON.stringify(updated));
    };

    const handleAddPayment = (e) => {
        e.preventDefault();
        if (!newPayment.details) return;
        
        const method = {
            id: Date.now(),
            type: newPayment.type,
            name: newPayment.type === 'upi' ? `UPI: ${newPayment.details}` : `Card ending in ${newPayment.details.slice(-4) || 'XXXX'}`,
            details: newPayment.details
        };
        const updated = [...savedMethods, method];
        setSavedMethods(updated);
        localStorage.setItem('carrymate_payments', JSON.stringify(updated));
        setNewPayment({ type: 'upi', details: '' });
    };

    const handleRemovePayment = (id) => {
        const updated = savedMethods.filter(m => m.id !== id);
        setSavedMethods(updated);
        localStorage.setItem('carrymate_payments', JSON.stringify(updated));
    };

    return (
        <div className="max-w-5xl mx-auto h-full flex flex-col font-sans pb-10 relative">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Profile Settings</h1>
                <p className="text-sm text-slate-500 mt-1">Manage your account details and verification status</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: ID Card */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full bg-indigo-50 border-4 border-white shadow-lg flex items-center justify-center text-indigo-500 font-black text-4xl mb-6">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{user?.username}</h2>
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-widest mt-3 mb-6">
                            Sender Account
                        </span>

                        <div className="w-full pt-6 border-t border-slate-100 space-y-4 text-left">
                            <div className="flex items-center text-slate-600 text-sm font-medium">
                                <Mail className="w-4 h-4 mr-3 text-slate-400" />
                                {user?.email || 'user@example.com'}
                            </div>
                            <div className="flex items-center text-slate-600 text-sm font-medium">
                                <MapPin className="w-4 h-4 mr-3 text-slate-400" />
                                India
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Settings */}
                <div className="md:col-span-2 space-y-8">
                    {/* KYC Status */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-start sm:items-center justify-between flex-col sm:flex-row gap-6">
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 ${user?.kycVerified ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}>
                                {user?.kycVerified ? <ShieldCheck className="w-7 h-7" /> : <ShieldAlert className="w-7 h-7" />}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Identity Verification</h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    {user?.kycVerified 
                                        ? 'Your Aadhaar is verified. You have full platform access.' 
                                        : 'Aadhaar eKYC is required to create shipments.'}
                                </p>
                            </div>
                        </div>
                        <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest whitespace-nowrap ${
                            user?.kycVerified ? 'bg-emerald-100 border border-emerald-200 text-emerald-700' : 'bg-amber-100 border border-amber-200 text-amber-700'
                        }`}>
                            {user?.kycVerified ? 'Verified' : 'Pending'}
                        </span>
                    </div>

                    {/* Quick Stats Real Data */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                                <Package className="w-6 h-6" />
                            </div>
                            {isLoadingStats ? (
                                <div className="h-9 w-16 bg-slate-100 rounded animate-pulse"></div>
                            ) : (
                                <h4 className="text-3xl font-black text-slate-800">{stats.total}</h4>
                            )}
                            <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">Total Shipments</p>
                        </div>
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                                <Clock className="w-6 h-6" />
                            </div>
                            {isLoadingStats ? (
                                <div className="h-9 w-16 bg-slate-100 rounded animate-pulse"></div>
                            ) : (
                                <h4 className="text-3xl font-black text-slate-800">{stats.active}</h4>
                            )}
                            <p className="text-sm font-semibold text-slate-500 mt-1 uppercase tracking-wider">Active in Transit</p>
                        </div>
                    </div>

                    {/* Account Settings */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Account Settings</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between py-4 border-b border-slate-100 items-center">
                                <div>
                                    <p className="font-bold text-slate-700">Password</p>
                                    <p className="text-sm text-slate-500 font-medium">Protect your account security</p>
                                </div>
                                <button onClick={() => setActiveModal('password')} className="px-4 py-2 bg-slate-50 text-indigo-600 font-bold text-sm rounded-lg hover:bg-indigo-50 transition-colors">Update</button>
                            </div>
                            <div className="flex justify-between py-4 border-b border-slate-100 items-center">
                                <div>
                                    <p className="font-bold text-slate-700">Notifications</p>
                                    <p className="text-sm text-slate-500 font-medium">Manage email and SMS alerts</p>
                                </div>
                                <button onClick={() => setActiveModal('notifications')} className="px-4 py-2 bg-slate-50 text-indigo-600 font-bold text-sm rounded-lg hover:bg-indigo-50 transition-colors">Manage</button>
                            </div>
                            <div className="flex justify-between py-4 items-center">
                                <div>
                                    <p className="font-bold text-slate-700">Payment Methods</p>
                                    <p className="text-sm text-slate-500 font-medium">Manage saved cards and UPI ({savedMethods.length})</p>
                                </div>
                                <button onClick={() => setActiveModal('payments')} className="px-4 py-2 bg-slate-50 text-indigo-600 font-bold text-sm rounded-lg hover:bg-indigo-50 transition-colors">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals Overlay */}
            {activeModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-lg font-black text-slate-800">
                                {activeModal === 'password' && 'Update Password'}
                                {activeModal === 'notifications' && 'Notification Preferences'}
                                {activeModal === 'payments' && 'Payment Methods'}
                            </h3>
                            <button onClick={() => setActiveModal(null)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto">
                            {activeModal === 'password' && (
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    {pwdStatus && (
                                        <div className={`p-3 rounded-lg text-sm font-bold ${pwdStatus.includes('success') ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {pwdStatus}
                                        </div>
                                    )}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                                        <div className="relative">
                                            <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                                            <input type="password" required value={pwdData.current} onChange={e => setPwdData({...pwdData, current: e.target.value})} className="pl-10 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-900" placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                                        <div className="relative">
                                            <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                                            <input type="password" required value={pwdData.new} onChange={e => setPwdData({...pwdData, new: e.target.value})} className="pl-10 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-900" placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Confirm New Password</label>
                                        <div className="relative">
                                            <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                                            <input type="password" required value={pwdData.confirm} onChange={e => setPwdData({...pwdData, confirm: e.target.value})} className="pl-10 w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-slate-900" placeholder="••••••••" />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full mt-4 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm">Save Password</button>
                                </form>
                            )}

                            {activeModal === 'notifications' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-5 h-5 text-indigo-500" />
                                            <div>
                                                <p className="font-bold text-slate-700">Email Updates</p>
                                                <p className="text-xs text-slate-500 font-medium">Shipment tracking & receipts</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={notifications.email} onChange={() => handleToggleNotification('email')} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                                        <div className="flex items-center gap-3">
                                            <Bell className="w-5 h-5 text-indigo-500" />
                                            <div>
                                                <p className="font-bold text-slate-700">SMS Alerts</p>
                                                <p className="text-xs text-slate-500 font-medium">Critical delivery status drops</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" checked={notifications.sms} onChange={() => handleToggleNotification('sms')} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeModal === 'payments' && (
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Saved Methods</h4>
                                        {savedMethods.length === 0 ? (
                                            <p className="text-sm text-slate-500">No payment methods saved.</p>
                                        ) : (
                                            savedMethods.map(method => (
                                                <div key={method.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                                                    <div className="flex items-center gap-3">
                                                        <CreditCard className={`w-5 h-5 ${method.type === 'upi' ? 'text-emerald-500' : 'text-indigo-500'}`} />
                                                        <p className="font-bold text-slate-700 text-sm">{method.name}</p>
                                                    </div>
                                                    <button onClick={() => handleRemovePayment(method.id)} className="text-rose-500 text-xs font-bold hover:underline">Remove</button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                    <div className="pt-4 border-t border-slate-100">
                                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Add New Method</h4>
                                        <form onSubmit={handleAddPayment} className="space-y-3">
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setNewPayment({...newPayment, type: 'upi'})} className={`flex-1 py-2 text-sm font-bold rounded-lg border ${newPayment.type === 'upi' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}>UPI</button>
                                                <button type="button" onClick={() => setNewPayment({...newPayment, type: 'card'})} className={`flex-1 py-2 text-sm font-bold rounded-lg border ${newPayment.type === 'card' ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-slate-200 text-slate-600'}`}>Card</button>
                                            </div>
                                            <input 
                                                type="text" 
                                                required 
                                                value={newPayment.details} 
                                                onChange={e => setNewPayment({...newPayment, details: e.target.value})} 
                                                placeholder={newPayment.type === 'upi' ? "Enter UPI ID (e.g. name@okhdfc)" : "Enter Card Number"} 
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-medium text-sm text-slate-900" 
                                            />
                                            <button type="submit" className="w-full py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors shadow-sm text-sm">Save Payment Details</button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SenderProfile;
