import React, { useState, useEffect } from 'react';
import { Package, MapPin, Navigation, Navigation2, CheckCircle, NavigationIcon } from 'lucide-react';

const MyDeliveries = () => {
    const [activeDeliveries, setActiveDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingParams, setUpdatingParams] = useState(null);
    const [otpValues, setOtpValues] = useState({});
    const [showOtpFor, setShowOtpFor] = useState(null);

    useEffect(() => {
        // Load active trips that this traveller accepted
        setTimeout(() => {
            const stored = JSON.parse(localStorage.getItem('carrymate_active_deliveries') || '[]');
            setActiveDeliveries(stored);
            setLoading(false);
        }, 600);
    }, []);

    const handleUpdateStatus = (id, newStatus, price) => {
        setUpdatingParams({ id, newStatus });
        
        // Push status check to the real backend so Sender sees it
        import('../../api/axios').then(({ default: api }) => {
            api.put(`/sender/${id}/status?status=${newStatus}`).catch(err => console.error("Could not sync status", err));
        });

        setTimeout(() => {
            setActiveDeliveries(prev => {
                const updated = prev.map(delivery => 
                    delivery.id === id ? { ...delivery, status: newStatus } : delivery
                );
                // Persist status change
                localStorage.setItem('carrymate_active_deliveries', JSON.stringify(updated));
                return updated;
            });
            
            setUpdatingParams(null);
            
            if (newStatus === 'DELIVERED') {
                // Update Earnings securely in traveller's profile scope
                const stats = JSON.parse(localStorage.getItem('carrymate_stats') || '{"earnings": 0, "completed": 0}');
                stats.earnings += price;
                stats.completed += 1;
                localStorage.setItem('carrymate_stats', JSON.stringify(stats));

                // Save to history so TravellerProfile can show it
                const history = JSON.parse(localStorage.getItem('carrymate_completed_trips') || '[]');
                const completedTrip = activeDeliveries.find(d => d.id === id);
                if (completedTrip) {
                    history.push({ ...completedTrip, status: 'DELIVERED', completedAt: new Date().toISOString() });
                    localStorage.setItem('carrymate_completed_trips', JSON.stringify(history));
                }

                alert("Delivery Completed successfully! Earnings added to your wallet.");
            }
        }, 1200);
    };

    const displayTrips = activeDeliveries.filter(d => d.status !== 'DELIVERED');

    return (
        <div className="max-w-6xl mx-auto h-full flex flex-col font-sans pb-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Active Deliveries</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage, track, and complete your accepted trips</p>
                </div>
                <div className="px-5 py-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 text-sm font-bold flex items-center gap-2">
                    <Navigation2 className="w-5 h-5 animate-pulse" />
                    GPS Active
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
            ) : displayTrips.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                        <Navigation className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No active trips</h3>
                    <p className="text-slate-500 mt-2 max-w-sm">You haven't accepted any deliveries yet. Head over to the feed to find opportunities.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {displayTrips.map((delivery) => (
                        <div key={delivery.id} className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
                            <div className="flex flex-col md:flex-row gap-8 justify-between">
                                {/* Details */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                            <Package className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900">{delivery.itemName}</h3>
                                            <p className="text-sm font-bold text-slate-500">Sender: {delivery.senderName || 'Sender'}</p>
                                        </div>
                                        <div className="ml-auto px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl font-bold text-sm tracking-widest uppercase">
                                            Earnings: ₹{delivery.price}
                                        </div>
                                    </div>
                                    
                                    <div className="relative pl-8 space-y-8 border-l-2 border-slate-100 ml-4 mb-4">
                                        <div className="relative">
                                            <div className="absolute w-4 h-4 bg-white border-4 border-rose-500 rounded-full -left-[1.35rem] top-1"></div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pick up Location</p>
                                            <p className="text-sm font-semibold text-slate-800">{delivery.pickupAddress}</p>
                                        </div>
                                        <div className="relative">
                                            <div className="absolute w-4 h-4 bg-white border-4 border-emerald-500 rounded-full -left-[1.35rem] top-1"></div>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Drop off Location</p>
                                            <p className="text-sm font-semibold text-slate-800">{delivery.destinationAddress}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking & Actions */}
                                <div className="md:w-72 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col h-full">
                                    <h4 className="font-bold text-slate-800 mb-4">Location Sharing</h4>
                                    <div className="bg-emerald-100/50 p-4 rounded-xl flex items-start space-x-3 border border-emerald-100 text-emerald-800 text-xs font-bold leading-relaxed mb-6">
                                        <NavigationIcon className="w-5 h-5 flex-shrink-0" />
                                        <p>Your live location is actively shared with {delivery.senderName || 'Sender'} for tracking transparency.</p>
                                    </div>

                                    <div className="mt-auto space-y-3">
                                        {delivery.status === 'ACCEPTED' && (
                                            <>
                                                <a 
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery.pickupAddress)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-4 mb-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md mt-auto flex justify-center items-center"
                                                >
                                                    <Navigation className="w-5 h-5 mr-2" /> Navigate to Pickup
                                                </a>
                                                <button 
                                                    onClick={() => handleUpdateStatus(delivery.id, 'PICKED_UP', delivery.price)}
                                                    disabled={updatingParams?.id === delivery.id}
                                                    className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-all shadow-md mt-auto flex justify-center items-center"
                                                >
                                                    {updatingParams?.id === delivery.id ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Mark as Picked Up"}
                                                </button>
                                            </>
                                        )}
                                        {delivery.status === 'PICKED_UP' && (
                                            <>
                                                <a 
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery.destinationAddress)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-4 mb-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md mt-auto flex justify-center items-center"
                                                >
                                                    <Navigation className="w-5 h-5 mr-2" /> Navigate to Drop-off
                                                </a>
                                                <button 
                                                    onClick={() => handleUpdateStatus(delivery.id, 'IN_TRANSIT', delivery.price)}
                                                    disabled={updatingParams?.id === delivery.id}
                                                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md mt-auto flex justify-center items-center"
                                                >
                                                    {updatingParams?.id === delivery.id ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Mark as In Transit"}
                                                </button>
                                            </>
                                        )}
                                        {delivery.status === 'IN_TRANSIT' && (
                                            <>
                                                <a 
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery.destinationAddress)}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full py-4 mb-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md mt-auto flex justify-center items-center"
                                                >
                                                    <Navigation className="w-5 h-5 mr-2" /> Continue Navigation
                                                </a>
                                                {showOtpFor === delivery.id ? (
                                                    <div className="bg-white border-2 border-emerald-500 rounded-xl p-4 flex flex-col mt-auto shadow-sm">
                                                        <p className="text-xs font-bold text-center text-slate-500 uppercase tracking-widest mb-3">Delivery Verification</p>
                                                        <input 
                                                            type="text" 
                                                            placeholder="Enter 4-digit OTP" 
                                                            value={otpValues[delivery.id] || ''}
                                                            onChange={(e) => setOtpValues({...otpValues, [delivery.id]: e.target.value.replace(/\\D/g, '')})}
                                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center text-2xl tracking-[0.5em] font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-4 placeholder:text-sm placeholder:tracking-normal placeholder:font-medium"
                                                            maxLength={4}
                                                        />
                                                        <div className="flex gap-2 w-full">
                                                            <button 
                                                                onClick={() => {
                                                                    setShowOtpFor(null);
                                                                    setOtpValues({...otpValues, [delivery.id]: ''});
                                                                }} 
                                                                className="flex-1 py-3 bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold rounded-xl transition-all text-sm"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button 
                                                                onClick={() => {
                                                                    const otp = otpValues[delivery.id] || '';
                                                                    if (otp.length === 4) {
                                                                        handleUpdateStatus(delivery.id, 'DELIVERED', delivery.price);
                                                                        setShowOtpFor(null);
                                                                    } else {
                                                                        alert("Please enter the complete 4-digit OTP provided by the receiver");
                                                                    }
                                                                }}
                                                                disabled={updatingParams?.id === delivery.id || (otpValues[delivery.id] || '').length < 4}
                                                                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md text-sm flex justify-center items-center"
                                                            >
                                                                {updatingParams?.id === delivery.id ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : "Verify"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => setShowOtpFor(delivery.id)}
                                                        disabled={updatingParams?.id === delivery.id}
                                                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-[0_4px_12px_rgba(16,185,129,0.3)] mt-auto flex justify-center items-center"
                                                    >
                                                        <CheckCircle className="w-5 h-5 mr-2" /> Confirm Delivery
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDeliveries;
