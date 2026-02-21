import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Truck, MapPin, Calendar, Weight, ArrowLeft, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const PostTrip = () => {
    const [formData, setFormData] = useState({
        startPoint: '',
        endPoint: '',
        travelDate: '',
        availableCapacityKg: ''
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
            await api.post('/trips', formData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to post trip');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-mesh pt-32 pb-20 px-6">
            <div className="max-w-2xl mx-auto">
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm mb-8 hover:underline decoration-2 underline-offset-4">
                    <ArrowLeft size={16} /> Dashboard
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-10 md:p-14 bg-white/70 backdrop-blur-2xl border border-white"
                >
                    <div className="mb-10 text-center">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                            <Truck size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Post Your Trip</h1>
                        <p className="text-slate-500 font-medium whitespace-nowrap">Monetize your extra luggage space by helping others.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-emerald-600">Starting Point</label>
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600" />
                                    <input type="text" name="startPoint" placeholder="SF, USA" className="input-group pl-12" value={formData.startPoint} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="group relative">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-emerald-600">Destination</label>
                                <div className="relative">
                                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600" />
                                    <input type="text" name="endPoint" placeholder="London, UK" className="input-group pl-12" value={formData.endPoint} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="group relative">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-emerald-600">Travel Date</label>
                                <div className="relative">
                                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600" />
                                    <input type="date" name="travelDate" className="input-group pl-12" value={formData.travelDate} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="group relative">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-emerald-600">Free Capacity (kg)</label>
                                <div className="relative">
                                    <Weight size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600" />
                                    <input type="number" step="0.5" name="availableCapacityKg" placeholder="5.0" className="input-group pl-12" value={formData.availableCapacityKg} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50">
                            <div className="flex gap-3">
                                <Info size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                                <p className="text-xs font-bold text-slate-500 leading-relaxed uppercase tracking-wider">
                                    By posting your trip, you agree to safely transport items in exchange for the agreed payout. Ensure your bags remain under weight limits.
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-500 text-white rounded-[20px] py-5 text-lg font-black shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-emerald-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3"
                            disabled={loading}
                        >
                            {loading ? 'Posting Trip...' : <><Truck size={24} /> Authorize Trip Session</>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default PostTrip;
