import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Mail, Package, Star, Car, CreditCard, X, Building } from 'lucide-react';

const TravellerProfile = () => {
    const { user } = useAuth();
    
    const [stats, setStats] = useState({ earnings: 0, completed: 0 });
    const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [newPayment, setNewPayment] = useState({ type: 'upi', details: '' });
    const [withdrawStatus, setWithdrawStatus] = useState('');
    const [history, setHistory] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);

    useEffect(() => {
        // Load dynamically accumulated stats
        const loadedStats = JSON.parse(localStorage.getItem('carrymate_stats') || '{"earnings": 0, "completed": 0}');
        setStats(loadedStats);

        // Load histories
        setHistory(JSON.parse(localStorage.getItem('carrymate_completed_trips') || '[]'));
        setWithdrawals(JSON.parse(localStorage.getItem('carrymate_withdrawals') || '[]'));

        // Load saved payment methods
        const loadedPayments = JSON.parse(localStorage.getItem('carrymate_traveller_payments') || '[]');
        if (loadedPayments.length === 0) {
            // Default mock method
            const def = [{ id: 1, type: 'upi', name: 'UPI: traveller@upi', details: 'traveller@upi' }];
            localStorage.setItem('carrymate_traveller_payments', JSON.stringify(def));
            setPaymentMethods(def);
        } else {
            setPaymentMethods(loadedPayments);
        }
    }, []);

    const handleAddPayment = (e) => {
        e.preventDefault();
        const method = {
            id: Date.now(),
            type: newPayment.type,
            name: newPayment.type === 'upi' ? `UPI: ${newPayment.details}` : `Bank: ${newPayment.details.slice(-4) || 'XXXX'}`,
            details: newPayment.details
        };
        const updated = [...paymentMethods, method];
        setPaymentMethods(updated);
        localStorage.setItem('carrymate_traveller_payments', JSON.stringify(updated));
        setNewPayment({ type: 'upi', details: '' });
    };

    const handleWithdraw = () => {
        if (stats.earnings <= 0) {
            setWithdrawStatus('Insufficient balance to withdraw.');
            return;
        }
        setWithdrawStatus('Processing withdrawal...');
        setTimeout(() => {
            const amount = stats.earnings;
            setStats({ ...stats, earnings: 0 });
            localStorage.setItem('carrymate_stats', JSON.stringify({ ...stats, earnings: 0 }));
            
            // Record withdrawal
            const newWithdrawal = { id: Date.now(), amount, date: new Date().toISOString() };
            const updatedWithdrawals = [newWithdrawal, ...withdrawals];
            setWithdrawals(updatedWithdrawals);
            localStorage.setItem('carrymate_withdrawals', JSON.stringify(updatedWithdrawals));

            setWithdrawStatus(`Withdrawal of ₹${amount} successful! Funds transferred.`);
            setTimeout(() => {
                setWithdrawModalOpen(false);
                setWithdrawStatus('');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="max-w-5xl mx-auto h-full flex flex-col font-sans mb-10 pb-10 relative">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-slate-800 tracking-tight">Traveller Profile</h1>
                <p className="text-sm text-slate-500 mt-1">Manage driver credentials, track performance, and earnings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: ID Card */}
                <div className="lg:col-span-1 border border-slate-100">
                    <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center text-center">
                        <div className="w-32 h-32 rounded-full bg-emerald-50 border-4 border-white shadow-xl flex items-center justify-center text-emerald-500 font-black text-4xl mb-6 relative">
                            {user?.username?.charAt(0).toUpperCase() || 'VT'}
                            {user?.kycVerified && (
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                                    <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">{user?.username || 'Traveller'}</h2>
                        <span className={`px-4 py-1.5 border rounded-full text-xs font-bold uppercase tracking-widest mt-4 mb-8 ${user?.kycVerified ? 'bg-slate-900 border-slate-800 text-white' : 'bg-amber-100 border-amber-200 text-amber-700'}`}>
                            {user?.kycVerified ? 'Delivery Partner' : 'Verification Required'}
                        </span>

                        <div className="w-full pt-6 border-t border-slate-100 space-y-4 text-left">
                            <div className="flex items-center text-slate-600 text-sm font-bold">
                                <Mail className="w-5 h-5 mr-4 text-slate-400" />
                                {user?.email || 'traveller@carrymate.com'}
                            </div>
                            {user?.vehicleDetails && (
                                <div className="flex items-center text-slate-600 text-sm font-bold">
                                    <Car className="w-5 h-5 mr-4 text-slate-400" />
                                    Vehicle: {user.vehicleDetails}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Key Stats & Wallet */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Performance Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Rating */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 mb-4 transition-transform group-hover:scale-110">
                                <Star className="w-6 h-6 fill-amber-500" />
                            </div>
                            <h4 className="text-4xl font-black text-slate-800">4.9</h4>
                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Global Rating</p>
                        </div>

                        {/* Deliveries */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 mb-4 transition-transform group-hover:scale-110">
                                <Package className="w-6 h-6" />
                            </div>
                            <h4 className="text-4xl font-black text-slate-800">{stats.completed}</h4>
                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Completed</p>
                        </div>

                        {/* Earnings */}
                        <div className="bg-white rounded-3xl p-6 border border-emerald-50 shadow-[0_8px_30px_rgba(16,185,129,0.1)] relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/20 transition-all"></div>
                            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 transition-transform group-hover:scale-110">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <h4 className="text-3xl font-black text-emerald-600">₹{stats.earnings}</h4>
                            <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">Total Earnings</p>
                        </div>
                    </div>

                    {/* Withdrawal Section */}
                    <div className="bg-slate-900 rounded-[32px] p-8 shadow-xl text-white overflow-hidden relative border border-slate-800">
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center relative z-10 gap-6">
                            <div>
                                <h3 className="text-xl font-black text-slate-50 mb-1">CarryMate Wallet</h3>
                                <p className="text-slate-400 font-medium text-sm">Available balance for instant withdrawal to your registered account.</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <h2 className="text-4xl font-black text-emerald-400 mb-4 tracking-tight">₹{stats.earnings}.00</h2>
                                <button onClick={() => setWithdrawModalOpen(true)} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black rounded-xl text-sm transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] hover:-translate-y-0.5">
                                    Withdraw Funds
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Deliveries History */}
                    {history.length > 0 && (
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <h3 className="font-bold text-slate-800 mb-4 px-2">Completed Deliveries</h3>
                            <div className="space-y-3">
                                {history.map(trip => (
                                    <div key={trip.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                                                <Package className="w-5 h-5 text-indigo-500" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-700 text-sm">{trip.itemName}</div>
                                                <div className="text-xs font-semibold text-slate-400">{new Date(trip.completedAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className="font-black text-emerald-600">+₹{trip.price}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Withdrawal History */}
                    {withdrawals.length > 0 && (
                        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <h3 className="font-bold text-slate-800 mb-4 px-2">Withdrawal History</h3>
                            <div className="space-y-3">
                                {withdrawals.map(w => (
                                    <div key={w.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl">
                                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            Funds Transferred
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-slate-800">₹{w.amount}</div>
                                            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{new Date(w.date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Withdrawal & Payment Modal */}
            {isWithdrawModalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h3 className="text-lg font-black text-slate-800">Withdraw to Bank</h3>
                            <button onClick={() => setWithdrawModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-8 overflow-y-auto">
                            {withdrawStatus ? (
                                <div className={`p-6 rounded-2xl text-center font-bold ${withdrawStatus.includes('successful') ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                                    {withdrawStatus}
                                </div>
                            ) : (
                                <>
                                    <div className="text-center mb-8">
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Available to Withdraw</p>
                                        <div className="text-4xl font-black text-slate-900">₹{stats.earnings}</div>
                                    </div>
                                    
                                    <h4 className="font-bold text-slate-800 mb-4">Select Payment Method</h4>
                                    <div className="space-y-3 mb-8">
                                        {paymentMethods.length === 0 ? (
                                            <p className="text-sm text-slate-500 italic">No payment methods added.</p>
                                        ) : (
                                            paymentMethods.map((method, idx) => (
                                                <label key={method.id} className="flex items-center p-4 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-emerald-500 transition-colors">
                                                    <input type="radio" name="payment_method" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" defaultChecked={idx===0} />
                                                    <div className="ml-4 flex items-center gap-2">
                                                        {method.type === 'upi' ? <CreditCard className="w-5 h-5 text-emerald-500" /> : <Building className="w-5 h-5 text-indigo-500" />}
                                                        <span className="font-bold text-slate-700 text-sm">{method.name}</span>
                                                    </div>
                                                </label>
                                            ))
                                        )}
                                    </div>

                                    <div className="border-t border-slate-100 pt-6">
                                        <h4 className="font-bold text-slate-800 mb-3 text-sm">Add New Transfer Method</h4>
                                        <form onSubmit={handleAddPayment} className="space-y-3">
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setNewPayment({...newPayment, type: 'upi'})} className={`flex-1 py-2 text-xs font-bold rounded-lg border uppercase tracking-wider ${newPayment.type === 'upi' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-600'}`}>UPI ID</button>
                                                <button type="button" onClick={() => setNewPayment({...newPayment, type: 'bank'})} className={`flex-1 py-2 text-xs font-bold rounded-lg border uppercase tracking-wider ${newPayment.type === 'bank' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-600'}`}>Bank Acc</button>
                                            </div>
                                            <div className="flex gap-2">
                                                <input type="text" required value={newPayment.details} onChange={e => setNewPayment({...newPayment, details: e.target.value})} placeholder={newPayment.type === 'upi' ? "name@bank" : "Account Number"} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 font-medium text-sm" />
                                                <button type="submit" className="px-5 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 text-sm">Add</button>
                                            </div>
                                        </form>
                                    </div>

                                    <button onClick={handleWithdraw} disabled={stats.earnings === 0} className="w-full mt-8 py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:shadow-none transition-all">
                                        Confirm Withdrawal
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TravellerProfile;
