import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Package, MapPin, Search, Check, ArrowLeft, Navigation, CreditCard, ChevronRight } from 'lucide-react';
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
                const response = await api.get('/deliveries');
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
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold text-sm mb-12 transition-colors uppercase tracking-widest group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">Available Shipments</h1>
                        <p className="text-lg text-slate-500 font-medium max-w-2xl">Browse assignments that match your travel route and earn rewards while you journey.</p>
                    </div>

                    {start && end && (
                        <div className="flex items-center gap-3 bg-white p-3 px-6 rounded-2xl border border-slate-200 shadow-sm">
                            <Search size={18} className="text-indigo-600" />
                            <div className="text-sm font-bold flex items-center gap-3">
                                <span className="text-slate-900">{start}</span>
                                <ChevronRight size={14} className="text-slate-300" />
                                <span className="text-slate-900">{end}</span>
                            </div>
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="py-32 flex flex-col items-center gap-8">
                        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        <p className="font-bold text-slate-400 uppercase tracking-widest text-xs animate-pulse">Searching active shipments...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {matches.length === 0 ? (
                            <div className="col-span-full py-32 text-center bg-white border-2 border-dashed border-slate-200 rounded-[40px] p-20">
                                <Search className="mx-auto text-slate-200 mb-8" size={80} />
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">No Shipments Found</h3>
                                <p className="text-slate-500 font-medium text-lg max-w-md mx-auto">Our logistics network is currently quiet on this route. Try broadening your parameters.</p>
                                <button onClick={() => navigate('/post-trip')} className="mt-10 btn-primary inline-flex">Update your Route</button>
                            </div>
                        ) : matches.map((delivery, i) => (
                            <motion.div
                                key={delivery.id || i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white border border-slate-200 rounded-[32px] group p-8 hover:border-indigo-200 transition-all shadow-sm hover:shadow-xl flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
                                        <Package size={28} />
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service Reward</div>
                                        <div className="text-3xl font-bold text-slate-900 tracking-tight">
                                            ₹{delivery.escrowAmount.toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-10 flex-1">
                                    <h3 className="text-xl font-bold text-slate-950 mb-6 group-hover:text-indigo-600 transition-colors line-clamp-2">{delivery.itemDescription}</h3>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full border-2 border-slate-300" />
                                            <div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Origin</div>
                                                <div className="text-base font-bold text-slate-700 leading-none">{delivery.pickupLocation}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                            <div>
                                                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Destination</div>
                                                <div className="text-base font-bold text-slate-900 leading-none">{delivery.dropLocation}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl mb-8 border border-slate-100">
                                    <div className="text-center flex-1 border-r border-slate-200">
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Weight</div>
                                        <div className="text-sm font-bold text-slate-900">{delivery.weightKg}<span className="text-[10px] ml-0.5 opacity-60">KG</span></div>
                                    </div>
                                    <div className="text-center flex-1 px-2">
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Type</div>
                                        <div className="text-[11px] font-bold text-slate-900 truncate uppercase tracking-tighter">{delivery.category}</div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleMatch(delivery.id)}
                                    className="btn-primary w-full py-4 text-base flex items-center justify-center gap-2"
                                >
                                    <Check size={20} /> Accept & Start
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
