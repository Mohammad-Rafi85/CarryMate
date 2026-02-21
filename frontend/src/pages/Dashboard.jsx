import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Package, Truck, MapPin, Search, Plus, Calendar, Weight } from 'lucide-react';
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
            case 'DELIVERED': return 'bg-emerald-50 text-emerald-600 ring-emerald-600/20';
            case 'PENDING': return 'bg-amber-50 text-amber-600 ring-amber-600/20';
            case 'MATCHED': return 'bg-indigo-50 text-indigo-600 ring-indigo-600/20';
            case 'PICKED_UP': return 'bg-blue-50 text-blue-600 ring-blue-600/20';
            default: return 'bg-slate-50 text-slate-600 ring-slate-600/20';
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-mesh">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="font-bold text-slate-500 animate-pulse">Syncing with CarryMate...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-mesh pt-24 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">My Dashboard</h1>
                        <p className="text-slate-500 font-medium">Manage your shipping requests and travel sessions at a glance.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/post-delivery" className="btn-primary py-2.5 px-6 whitespace-nowrap">
                            <Plus size={18} /> New Shipment
                        </Link>
                        <Link to="/post-trip" className="btn-secondary py-2.5 px-6 whitespace-nowrap">
                            <Truck size={18} /> Post Trip
                        </Link>
                    </div>
                </div>

                {/* Stat Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 flex items-center gap-6 bg-white/60">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-600/20">
                            <Package size={30} />
                        </div>
                        <div>
                            <div className="text-4xl font-black text-slate-900">{deliveries.length}</div>
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Shipments</div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-8 flex items-center gap-6 bg-white/60">
                        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                            <Truck size={30} />
                        </div>
                        <div>
                            <div className="text-4xl font-black text-slate-900">{trips.length}</div>
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Planned Trips</div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Shipments Column */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <Package className="text-indigo-600" /> Recent Shipments
                            </h2>
                            <Link to="#" className="text-sm font-bold text-indigo-600 hover:underline">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {deliveries.length === 0 ? (
                                <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-[32px] bg-white/40">
                                    <Package className="mx-auto text-slate-300 mb-4" size={40} />
                                    <p className="font-bold text-slate-400">No shipments found</p>
                                    <Link to="/post-delivery" className="text-indigo-600 text-sm font-bold hover:underline mt-2 inline-block">Start shipping today</Link>
                                </div>
                            ) : (
                                deliveries.map((delivery, i) => (
                                    <motion.div
                                        key={delivery.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group p-6 bg-white border border-slate-100 rounded-[24px] hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="font-black text-slate-900 text-lg group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{delivery.itemDescription}</h3>
                                                <div className="flex items-center gap-2 mt-2 text-slate-400 font-bold text-xs uppercase">
                                                    <Search size={14} /> {delivery.category}
                                                </div>
                                            </div>
                                            <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest ring-1 ring-inset ${getStatusStyles(delivery.status)}`}>
                                                {delivery.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3 text-sm font-bold text-slate-600 mb-6 bg-slate-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-2 truncate">
                                                <MapPin size={16} className="text-indigo-500 shrink-0" /> {delivery.pickupLocation}
                                            </div>
                                            <div className="h-px w-6 bg-slate-300 shrink-0" />
                                            <div className="flex items-center gap-2 truncate text-slate-900">
                                                {delivery.dropLocation}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center text-sm">
                                            <div className="flex items-center gap-2 text-slate-400 font-bold">
                                                <Weight size={16} /> {delivery.weightKg}kg
                                            </div>
                                            <div className="text-xl font-black text-indigo-600">${delivery.escrowAmount}</div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Trips Column */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <Truck className="text-emerald-500" /> Active Trips
                            </h2>
                            <Link to="#" className="text-sm font-bold text-emerald-600 hover:underline">View All</Link>
                        </div>

                        <div className="space-y-4">
                            {trips.length === 0 ? (
                                <div className="p-10 text-center border-2 border-dashed border-slate-200 rounded-[32px] bg-white/40">
                                    <Truck className="mx-auto text-slate-300 mb-4" size={40} />
                                    <p className="font-bold text-slate-400">No active trips</p>
                                    <Link to="/post-trip" className="text-emerald-600 text-sm font-bold hover:underline mt-2 inline-block">Post your first trip</Link>
                                </div>
                            ) : (
                                trips.map((trip, i) => (
                                    <motion.div
                                        key={trip.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="group p-6 bg-white border border-slate-100 rounded-[24px] hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <div className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-3">
                                                    {trip.startPoint} <span className="text-slate-300 font-normal">→</span> {trip.endPoint}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                                                    <Calendar size={14} /> {trip.travelDate}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl">
                                            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">Available Capacity</div>
                                            <div className="text-lg font-black text-emerald-600">{trip.availableCapacityKg} kg</div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
