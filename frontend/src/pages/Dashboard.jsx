import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Package, Truck, MapPin, Search, Plus, Calendar, Weight, ArrowRight, User, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [delivRes, tripRes] = await Promise.all([
                    api.get('/deliveries/my-requests'),
                    api.get('/trips/my-trips')
                ]);
                setDeliveries(delivRes.data);
                setTrips(tripRes.data);
            } catch (err) {
                console.error('Failed to fetch dashboard data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const getStatusStyles = (status) => {
        switch (status) {
            case 'DELIVERED': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'PENDING': return 'bg-amber-50 text-amber-600 border-amber-100';
            case 'MATCHED': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            case 'PICKED_UP': return 'bg-blue-50 text-blue-600 border-blue-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="font-bold text-slate-500 uppercase tracking-widest text-xs">Loading Dashboard...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">Live Network</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Your Dashboard</h1>
                        <p className="text-lg text-slate-500 font-medium">Manage your active shipments and planned trips.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/post-delivery" className="btn-primary py-4 px-8">
                            <Plus size={20} /> New Shipment
                        </Link>
                        <Link to="/post-trip" className="btn-login py-4 px-8 bg-white shadow-sm font-semibold">
                            <Truck size={20} /> Post Trip
                        </Link>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Left Column - Main Activity */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Section: Shipments */}
                        <div>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    Active Shipments <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{deliveries.length}</span>
                                </h2>
                                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">View History</button>
                            </div>

                            <div className="space-y-6">
                                {deliveries.length === 0 ? (
                                    <div className="p-20 text-center bg-white border-2 border-dashed border-slate-200 rounded-[32px]">
                                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Package size={32} />
                                        </div>
                                        <p className="font-bold text-slate-500 text-lg mb-6">No active shipments found</p>
                                        <Link to="/post-delivery" className="btn-primary inline-flex">Send your first item</Link>
                                    </div>
                                ) : (
                                    deliveries.map((delivery, i) => (
                                        <motion.div
                                            key={delivery.id || i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-200 transition-all shadow-sm hover:shadow-md group"
                                        >
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="font-bold text-slate-950 text-xl group-hover:text-indigo-600 transition-colors">{delivery.itemDescription}</h3>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Search size={14} /> {delivery.category}</span>
                                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Weight size={14} /> {delivery.weightKg} kg</span>
                                                    </div>
                                                </div>
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border ${getStatusStyles(delivery.status)}`}>
                                                    {delivery.status}
                                                </span>
                                            </div>

                                            <div className="flex flex-col md:flex-row md:items-center gap-6 p-6 bg-slate-50 rounded-2xl mb-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-slate-400"><MapPin size={16} /></div>
                                                    <span className="text-sm font-semibold text-slate-600">{delivery.pickupLocation}</span>
                                                </div>
                                                <ArrowRight size={16} className="text-slate-300 hidden md:block" />
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-200 text-indigo-600"><MapPin size={16} /></div>
                                                    <span className="text-sm font-semibold text-slate-600">{delivery.dropLocation}</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="text-2xl font-bold text-slate-900">₹{delivery.escrowAmount.toLocaleString()}</div>
                                                <button className="text-sm font-bold text-indigo-600 flex items-center gap-2 hover:gap-3 transition-all">Details <ArrowRight size={16} /></button>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Stats & Trips */}
                    <div className="space-y-12">
                        {/* Profile Summary Card */}
                        <div className="bg-slate-900 text-white rounded-[32px] p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5">
                                        <User size={32} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">Network Member</h3>
                                        <p className="text-slate-400 text-sm font-medium">Since Feb 2026</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Trust Level</span>
                                        <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5"><ShieldCheck size={16} /> High</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl text-white">
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Success Rate</span>
                                        <span className="font-bold">100%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section: Trips */}
                        <div>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    Planned Trips <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{trips.length}</span>
                                </h2>
                            </div>
                            <div className="space-y-6">
                                {trips.length === 0 ? (
                                    <div className="p-10 text-center bg-white border border-slate-200 rounded-3xl">
                                        <p className="text-slate-500 font-bold mb-4">No active trips</p>
                                        <Link to="/post-trip" className="text-indigo-600 font-bold block text-sm underline decoration-2 underline-offset-4">List your journey</Link>
                                    </div>
                                ) : (
                                    trips.map((trip, i) => (
                                        <div key={trip.id || i} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:border-indigo-100 transition-all">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><Calendar size={20} /></div>
                                                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{trip.travelDate}</div>
                                            </div>
                                            <div className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-3">
                                                {trip.startPoint} <ArrowRight size={16} className="text-slate-300" /> {trip.endPoint}
                                            </div>
                                            <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Capacity</span>
                                                <span className="text-indigo-600 font-bold">{trip.availableCapacityKg} kg</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
