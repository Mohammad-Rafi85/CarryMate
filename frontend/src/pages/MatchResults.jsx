import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Package, MapPin, Search, Check, ArrowLeft, Trophy, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const MatchResults = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const start = queryParams.get('start');
    const end = queryParams.get('end');

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const response = await api.get('/admin/deliveries');
                const filtered = response.data.filter(d =>
                    d.status === 'PENDING' &&
                    (start ? d.pickupLocation.toLowerCase().includes(start.toLowerCase()) : true) &&
                    (end ? d.dropLocation.toLowerCase().includes(end.toLowerCase()) : true)
                );
                setMatches(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, [start, end]);

    const handleMatch = async (deliveryId) => {
        try {
            await api.put(`/deliveries/${deliveryId}/match`);
            alert('Delivery matched successfully! Redirecting to dashboard...');
            navigate('/dashboard');
        } catch (err) {
            alert('Failed to match delivery: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="min-h-screen bg-mesh pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-indigo-600 font-bold text-sm mb-12 hover:underline decoration-2 underline-offset-4">
                    <ArrowLeft size={16} /> Dashboard
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">Available Shipments</h1>
                        {start && end ? (
                            <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
                                <Search size={18} className="text-indigo-600" /> Matches for:
                                <span className="text-indigo-600">{start}</span>
                                <span className="text-slate-300 font-normal mx-1">→</span>
                                <span className="text-indigo-600">{end}</span>
                            </p>
                        ) : (
                            <p className="text-slate-500 font-medium mt-2">Browse all shipments ready to be carried by a mate.</p>
                        )}
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        <p className="font-bold text-slate-400 animate-pulse">Scanning the logistics network...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {matches.length === 0 ? (
                            <div className="col-span-full py-20 text-center glass-card p-12">
                                <Search className="mx-auto text-slate-200 mb-6" size={64} />
                                <h3 className="text-2xl font-black text-slate-400 mb-2">No shipments found.</h3>
                                <p className="text-slate-400 font-medium">Try broadening your search or check back later.</p>
                            </div>
                        ) : matches.map((delivery, i) => (
                            <motion.div
                                key={delivery.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                                        <Package size={24} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Earning</div>
                                        <div className="text-2xl font-black text-indigo-600 flex items-center justify-end">
                                            <DollarSign size={20} className="mr-[-2px]" />{delivery.escrowAmount}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-10">
                                    <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors uppercase tracking-tight line-clamp-1">{delivery.itemDescription}</h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                                            <div className="text-sm font-bold text-slate-400 w-12 shrink-0">FROM</div>
                                            <div className="text-sm font-black text-slate-700 truncate">{delivery.pickupLocation}</div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-1 h-1 rounded-full bg-indigo-500" />
                                            <div className="text-sm font-bold text-slate-400 w-12 shrink-0">TO</div>
                                            <div className="text-sm font-black text-slate-900 truncate">{delivery.dropLocation}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl mb-8">
                                    <div className="text-center flex-1 border-r border-slate-200">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Weight</div>
                                        <div className="text-sm font-black text-slate-900">{delivery.weightKg} kg</div>
                                    </div>
                                    <div className="text-center flex-1">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Type</div>
                                        <div className="text-sm font-black text-slate-900 truncate px-2">{delivery.category}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleMatch(delivery.id)}
                                    className="btn-primary w-full py-4 rounded-2xl shadow-none group-active:scale-95 transition-transform"
                                >
                                    <Check size={18} /> Take Assignment
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MatchResults;
