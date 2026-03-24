import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, MapPin, Package, ShieldCheck } from 'lucide-react';
import { getDistanceKm } from '../utils/apDistricts';
import api from '../api/axios';

const AcceptDeliveryModal = ({ isOpen, onClose, delivery, onSuccess }) => {
    const [loading, setLoading] = useState(false);

    if (!isOpen || !delivery) return null;

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await api.put(`/deliveries/${delivery.id}/match`);
            if (onSuccess) onSuccess();
            onClose();
        } catch (err) {
            alert('Failed to accept: ' + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    const dist = getDistanceKm(delivery.pickupLocation, delivery.dropLocation);

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white max-w-xl w-full rounded-[32px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] -z-0" />
                    <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-100 p-2 rounded-full z-10 transition-colors">
                        <X size={20} />
                    </button>

                    <div className="p-8 relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Accept Request</h2>
                                <p className="text-sm font-medium text-emerald-600">Review route details before committing</p>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-6 space-y-4">
                            <h3 className="text-lg font-bold text-slate-900">Item: {delivery.itemDescription}</h3>
                            <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
                                <span className="flex items-center gap-2"><Package size={16} className="text-emerald-500" /> {delivery.weightKg} kg</span>
                                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">{delivery.category}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100 mb-6">
                            <div className="flex flex-col items-center gap-1">
                                <MapPin size={20} className="text-slate-400" />
                                <div className="w-0.5 h-6 bg-emerald-200" />
                                <MapPin size={20} className="text-emerald-500" />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pickup Target</div>
                                    <div className="font-bold text-slate-800">{delivery.pickupLocation}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Dropoff Target</div>
                                    <div className="font-bold text-slate-900">{delivery.dropLocation}</div>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end justify-center">
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Route Distance</div>
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold flex items-center justify-center">{dist} km</div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-emerald-600 text-white p-6 rounded-2xl mb-8 shadow-lg shadow-emerald-200">
                            <div>
                                <div className="text-xs font-bold text-emerald-200 uppercase tracking-widest">Guaranteed Payout</div>
                                <div className="text-sm font-medium text-emerald-100 mt-1">Escrow secured</div>
                            </div>
                            <div className="text-3xl font-black">₹{delivery.escrowAmount.toLocaleString()}</div>
                        </div>

                        <button onClick={handleConfirm} disabled={loading} className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all">
                            {loading ? 'Securing Match...' : <><CheckCircle size={20} /> Confirm & Commit to Route</>}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AcceptDeliveryModal;
