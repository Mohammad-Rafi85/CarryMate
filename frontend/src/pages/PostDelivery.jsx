import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { Package, MapPin, Weight, CreditCard, ArrowLeft, Shield, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const PostDelivery = () => {
    const [formData, setFormData] = useState({
        itemDescription: '',
        category: 'ELECTRONICS',
        weightKg: '',
        pickupLocation: '',
        dropLocation: '',
        escrowAmount: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/deliveries/request', formData);
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError('Failed to post delivery request. Please check all fields.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-10 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-3 lg:order-1 order-2"
                    >
                        <div className="bg-white border border-slate-200 rounded-[40px] p-10 md:p-14 shadow-xl">
                            {success ? (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Posted!</h2>
                                    <p className="text-slate-500 font-medium leading-relaxed">Your delivery request is now live in our network. Redirecting you to your dashboard...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-10 text-center lg:text-left">
                                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Ship an Item</h1>
                                        <p className="text-slate-500 font-medium">Reach verified travelers on your desired route.</p>
                                    </div>

                                    {error && (
                                        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 bg-rose-600 rounded-full shrink-0" />
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Item Title</label>
                                            <div className="relative">
                                                <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    type="text"
                                                    className="input-group pl-12"
                                                    placeholder="What are you sending?"
                                                    onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Category</label>
                                                <select
                                                    className="input-group"
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                >
                                                    <option value="ELECTRONICS">Electronics</option>
                                                    <option value="DOCUMENTS">Documents</option>
                                                    <option value="CLOTHING">Clothing</option>
                                                    <option value="OTHER">Other</option>
                                                </select>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Weight (kg)</label>
                                                <div className="relative">
                                                    <Weight size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="number"
                                                        className="input-group pl-12"
                                                        placeholder="0.5"
                                                        onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Route Details</label>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        className="input-group pl-12"
                                                        placeholder="Pickup City"
                                                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                                                    <input
                                                        type="text"
                                                        className="input-group pl-12"
                                                        placeholder="Drop City"
                                                        onChange={(e) => setFormData({ ...formData, dropLocation: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Shipping Reward (₹)</label>
                                            <div className="relative">
                                                <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
                                                <input
                                                    type="number"
                                                    className="input-group pl-12"
                                                    placeholder="500"
                                                    onChange={(e) => setFormData({ ...formData, escrowAmount: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn-primary w-full py-5 text-lg mt-6 shadow-xl shadow-indigo-100"
                                            disabled={loading}
                                        >
                                            {loading ? 'Submitting to Network...' : 'Post Delivery Request'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>

                    {/* Info Side */}
                    <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
                        <div className="p-8 bg-slate-900 rounded-[32px] text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full" />
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Shield className="text-indigo-400" size={20} /> Professional Network
                            </h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-white font-bold text-xs italic">KYC</div>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium">Only verified members will be able to view and accept your shipment on their route.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 text-white font-bold text-xs italic">ESC</div>
                                    <p className="text-slate-400 text-sm leading-relaxed font-medium">Your payment is held securely in escrow and only released when you confirm successful delivery.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-indigo-50 rounded-[32px] border border-indigo-100 text-indigo-900">
                            <h3 className="font-bold flex items-center gap-3 mb-4"><Info size={20} /> Guidelines</h3>
                            <ul className="space-y-3 text-sm font-medium text-indigo-700/80">
                                <li className="flex items-center gap-2">• Ensure item is legal & properly packed</li>
                                <li className="flex items-center gap-2">• Provide accurate weight for traveler</li>
                                <li className="flex items-center gap-2">• Coordinate pickup in public space</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDelivery;
