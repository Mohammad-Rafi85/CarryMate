import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Package, MapPin, DollarSign, Info, Weight, ArrowLeft, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const PostDelivery = () => {
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropLocation: '',
        itemDescription: '',
        weightKg: '',
        category: 'Electronics',
        escrowAmount: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/deliveries', formData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to post delivery request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-mesh pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto">
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm mb-8 hover:underline">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-10 md:p-14 bg-white/70 backdrop-blur-2xl border border-white"
                >
                    <div className="mb-10 text-center">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-600/20">
                            <Package size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Send an Item</h1>
                        <p className="text-slate-500 font-medium tracking-tight whitespace-nowrap">Tell us what you're shipping and where it needs to go.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="group relative transition-all duration-200">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600">Item Description</label>
                            <div className="relative">
                                <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
                                <input type="text" name="itemDescription" placeholder="e.g. MacBook Pro 14 inch" className="input-group pl-12" value={formData.itemDescription} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600">Pickup City</label>
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
                                    <input type="text" name="pickupLocation" placeholder="San Francisco" className="input-group pl-12" value={formData.pickupLocation} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="group relative">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600">Drop-off City</label>
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
                                    <input type="text" name="dropLocation" placeholder="London" className="input-group pl-12" value={formData.dropLocation} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600">Est. Weight (kg)</label>
                                <div className="relative">
                                    <Weight size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
                                    <input type="number" step="0.1" name="weightKg" placeholder="1.5" className="input-group pl-12" value={formData.weightKg} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="group relative">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600">Category</label>
                                <div className="relative">
                                    <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 z-10" />
                                    <select name="category" value={formData.category} onChange={handleChange} className="input-group pl-12 bg-white appearance-none relative z-0">
                                        <option value="Electronics">Electronics</option>
                                        <option value="Documents">Documents</option>
                                        <option value="Clothing">Clothing</option>
                                        <option value="Food">Food & Perisables</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="group relative py-6">
                            <div className="bg-indigo-50/50 p-8 rounded-[24px] border border-indigo-100/50 transition-all duration-300 group-focus-within:bg-indigo-50">
                                <label className="text-xs font-black text-indigo-400 uppercase tracking-widest ml-1 mb-4 block group-focus-within:text-indigo-600">Offer Amount ($)</label>
                                <div className="relative mb-4">
                                    <DollarSign size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-600" />
                                    <input type="number" name="escrowAmount" placeholder="0.00" className="w-full bg-white text-2xl font-black text-slate-900 px-14 py-4 rounded-2xl border-2 border-transparent focus:border-indigo-500 outline-none transition-all duration-200" value={formData.escrowAmount} onChange={handleChange} required />
                                </div>
                                <div className="flex items-start gap-3 p-4 bg-white/60 rounded-xl border border-white">
                                    <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
                                    <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-wide">
                                        This amount will be placed in a secure escrow and released to the traveler only once you confirm delivery.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full py-5 text-lg shadow-2xl shadow-indigo-600/20" disabled={loading}>
                            {loading ? 'Processing Shipment...' : 'Post Delivery Request'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default PostDelivery;
