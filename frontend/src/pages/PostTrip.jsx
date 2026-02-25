import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, MapPin, Calendar, Weight, ArrowLeft, ShieldCheck, CheckCircle2, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const PostTrip = () => {
    const [formData, setFormData] = useState({
        startPoint: '',
        endPoint: '',
        travelDate: '',
        availableCapacityKg: ''
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
            await api.post('/trips/add', formData);
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 2000);
        } catch (err) {
            setError('Could not list trip. Ensure all fields are filled correctly.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-professional pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-10 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>

                <div className="grid lg:grid-cols-5 gap-12">
                    {/* Info Side (Desktop Priority) */}
                    <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
                        <div className="p-8 bg-indigo-600 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-2xl rounded-full transition-transform group-hover:scale-150 duration-700" />
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Navigation className="text-white" size={24} /> Traveler Network
                            </h3>
                            <p className="text-indigo-100 text-sm leading-relaxed font-medium mb-8">Turn your empty luggage space into earning potential while traveling across India.</p>

                            <div className="space-y-6">
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/5"><ShieldCheck size={20} /></div>
                                    <span className="text-sm font-bold tracking-tight">Verified Route Tracking</span>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/5"><Truck size={20} /></div>
                                    <span className="text-sm font-bold tracking-tight">Direct P2P Handover</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 text-emerald-900">
                            <h3 className="font-bold flex items-center gap-3 mb-4 text-emerald-800"><CheckCircle2 size={20} /> Professional Tip</h3>
                            <p className="text-sm font-medium text-emerald-700 leading-relaxed">
                                Most successful travelers list their trips at least 48 hours in advance to maximize match potential with local senders.
                            </p>
                        </div>
                    </div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-3 lg:order-2 order-1"
                    >
                        <div className="bg-white border border-slate-200 rounded-[40px] p-10 md:p-14 shadow-xl">
                            {success ? (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <Truck size={40} />
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Journey Listed!</h2>
                                    <p className="text-slate-500 font-medium leading-relaxed">Your trip is now visible to senders on this route. Redirecting to dashboard...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-10 text-center lg:text-left">
                                        <h1 className="text-3xl font-bold text-slate-900 mb-2">New Trip Entry</h1>
                                        <p className="text-slate-500 font-medium">Define your travel route and listing capacity.</p>
                                    </div>

                                    {error && (
                                        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Route Details</label>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="relative">
                                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="text"
                                                        className="input-group pl-12"
                                                        placeholder="Starting from..."
                                                        onChange={(e) => setFormData({ ...formData, startPoint: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500" />
                                                    <input
                                                        type="text"
                                                        className="input-group pl-12"
                                                        placeholder="Heading to..."
                                                        onChange={(e) => setFormData({ ...formData, endPoint: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Travel Date</label>
                                                <div className="relative">
                                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="date"
                                                        className="input-group pl-12"
                                                        onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Luggage Capacity (kg)</label>
                                                <div className="relative">
                                                    <Weight size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input
                                                        type="number"
                                                        className="input-group pl-12"
                                                        placeholder="Max capacity"
                                                        onChange={(e) => setFormData({ ...formData, availableCapacityKg: e.target.value })}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn-primary w-full py-5 text-lg mt-6 shadow-xl shadow-indigo-100"
                                            disabled={loading}
                                        >
                                            {loading ? 'Submitting Journey...' : 'Post Trip Route'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PostTrip;
