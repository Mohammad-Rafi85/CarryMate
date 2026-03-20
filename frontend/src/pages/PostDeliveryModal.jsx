import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, MapPin, Weight, CreditCard, Image as ImageIcon, Send } from 'lucide-react';
import { AP_DISTRICTS, calculateShippingPrice } from '../utils/apDistricts';
import api from '../api/axios';

const PostDeliveryModal = ({ isOpen, onClose, onSuccess }) => {
    const defaultData = {
        itemDescription: '',
        category: 'ELECTRONICS',
        weightKg: '1',
        pickupLocation: AP_DISTRICTS[0].name,
        dropLocation: AP_DISTRICTS[1].name,
        imageUrl: '',
        escrowAmount: 150
    };
    
    const [formData, setFormData] = useState(defaultData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Auto calculate price whenever pickup, drop, or weight changes
    useEffect(() => {
        if (formData.pickupLocation && formData.dropLocation) {
            const calculated = calculateShippingPrice(formData.pickupLocation, formData.dropLocation, formData.weightKg);
            setFormData(prev => ({ ...prev, escrowAmount: calculated }));
        }
    }, [formData.pickupLocation, formData.dropLocation, formData.weightKg]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const payload = {
                ...formData,
                weightKg: parseFloat(formData.weightKg)
            };
            await api.post('/deliveries', payload);
            if (onSuccess) onSuccess();
            onClose();
            setFormData(defaultData); // clear form state
        } catch (err) {
            setError('Failed to post delivery request. ' + (err.response?.data?.message || ''));
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-white max-w-2xl w-full rounded-[32px] shadow-2xl overflow-hidden relative"
                >
                    <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors z-10">
                        <X size={20} />
                    </button>
                    
                    <div className="p-8 md:p-10 relative">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl">
                                <Send size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Post Local Delivery</h2>
                                <p className="text-sm text-slate-500 font-medium">Andhra Pradesh Inter-district Network</p>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Item Title</label>
                                    <div className="relative">
                                        <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="text" value={formData.itemDescription} onChange={e => setFormData({...formData, itemDescription: e.target.value})} className="input-group pl-12" placeholder="e.g. iPhone 15 Pro Max" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Picture URL (Optional)</label>
                                    <div className="relative">
                                        <ImageIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="input-group pl-12" placeholder="https://..." />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="input-group">
                                        <option value="ELECTRONICS">Electronics</option>
                                        <option value="DOCUMENTS">Documents</option>
                                        <option value="CLOTHING">Clothing</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 ml-1">Weight (kg)</label>
                                    <div className="relative">
                                        <Weight size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                        <input type="number" step="0.1" value={formData.weightKg} onChange={e => setFormData({...formData, weightKg: e.target.value})} className="input-group pl-12" min="0.1" required />
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl space-y-5">
                                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><MapPin size={16} className="text-indigo-500" /> Verify AP Route</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Pickup District</label>
                                        <select value={formData.pickupLocation} onChange={e => setFormData({...formData, pickupLocation: e.target.value})} className="input-group text-sm">
                                            {AP_DISTRICTS.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">Dropoff District</label>
                                        <select value={formData.dropLocation} onChange={e => setFormData({...formData, dropLocation: e.target.value})} className="input-group text-sm">
                                            {AP_DISTRICTS.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-indigo-600 text-white rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between shadow-xl shadow-indigo-200">
                                <div>
                                    <h4 className="font-bold flex items-center gap-2"><CreditCard size={18} className="text-indigo-200" /> Guaranteed Escrow Payout</h4>
                                    <p className="text-indigo-200 text-xs font-medium mt-1">Automatically calculated based on route distance and weight.</p>
                                </div>
                                <div className="text-3xl font-black mt-4 md:mt-0">
                                    ₹{formData.escrowAmount.toLocaleString()}
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full btn-primary py-4 text-base mt-2 shadow-lg shadow-indigo-100">
                                {loading ? 'Broadcasting to Travelers...' : 'Create Shipment Request'}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PostDeliveryModal;
