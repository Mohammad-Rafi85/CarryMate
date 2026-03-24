import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { Package, Truck, Search, Check, Info, ShieldCheck, MapPin, Navigation, Calendar, Route } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDistanceKm } from '../utils/apDistricts';
import AcceptDeliveryModal from '../components/AcceptDeliveryModal';

const TravellerPortal = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDelivery, setSelectedDelivery] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                // Fetch all unassigned requests
                const response = await api.get('/deliveries');
                const filtered = response.data.filter(d => d.status === 'PENDING');
                setMatches(filtered);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const fetchMatchesOnly = async () => {
        try {
            const response = await api.get('/deliveries');
            const filtered = response.data.filter(d => d.status === 'PENDING');
            setMatches(filtered);
        } catch (err) {
            console.error(err);
        }
    };

    const handleMatchOpen = (delivery) => {
        setSelectedDelivery(delivery);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100 flex items-center gap-1.5"><Navigation size={12} /> Traveller Portal</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Post & Deliver</h1>
                        <p className="text-lg text-slate-500 font-medium mt-3 max-w-2xl">Find items to deliver along your route or register a new upcoming trip to get matched automatically.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/post-trip" className="btn-primary py-4 px-8 shadow-lg shadow-emerald-100">
                            <Truck size={20} /> Register My Trip
                        </Link>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Main Content - Shipments */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                Available from Senders
                                <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">{matches.length}</span>
                            </h2>
                        </div>

                        {loading ? (
                            <div className="py-20 flex flex-col items-center gap-6">
                                <div className="w-14 h-14 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                                <p className="font-bold text-slate-400 uppercase tracking-widest text-xs animate-pulse">Scanning the Network...</p>
                            </div>
                        ) : matches.length === 0 ? (
                            <div className="py-20 text-center bg-white border-2 border-dashed border-slate-200 rounded-[40px] px-8">
                                <Package className="mx-auto text-slate-200 mb-6" size={60} />
                                <h3 className="text-xl font-bold text-slate-900 mb-3">No pending senders</h3>
                                <p className="text-slate-500 font-medium">There are currently no active delivery requests. Post your trip details to be notified when items match your route.</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-8">
                                {matches.map((delivery, i) => (
                                    <motion.div
                                        key={delivery.id || i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="bg-white border border-slate-200 rounded-[32px] p-8 hover:border-emerald-400 transition-all shadow-sm hover:shadow-xl group flex flex-col relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />
                                        
                                        <div className="flex justify-between items-start mb-8 relative">
                                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
                                                <Package size={28} />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Guaranteed Reward</div>
                                                <div className="text-3xl font-black text-slate-900 tracking-tight">
                                                    ₹{delivery.escrowAmount.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex-1 relative">
                                            <h3 className="text-xl font-bold text-slate-950 mb-6 line-clamp-2">{delivery.itemDescription}</h3>
                                            
                                            <div className="space-y-5 mb-8">
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 w-2 h-2 rounded-full border-2 border-slate-300" />
                                                    <div>
                                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pickup at</div>
                                                        <div className="text-base font-bold text-slate-700">{delivery.pickupLocation}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-4">
                                                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />
                                                    <div>
                                                        <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Deliver to</div>
                                                        <div className="text-base font-bold text-slate-900">{delivery.dropLocation}</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-3 mb-8">
                                                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight</span>
                                                    <span className="text-sm font-bold text-slate-900">{delivery.weightKg} kg</span>
                                                </div>
                                                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 flex items-center gap-2">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</span>
                                                    <span className="text-sm font-bold text-slate-900">{delivery.category}</span>
                                                </div>
                                                <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100 flex items-center gap-2">
                                                    <Route size={14} className="text-emerald-500" />
                                                    <span className="text-sm font-bold text-emerald-700">{getDistanceKm(delivery.pickupLocation, delivery.dropLocation)} km</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleMatchOpen(delivery)}
                                            className="w-full py-4 text-sm font-bold rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-slate-900/20 active:scale-95 border border-slate-800"
                                        >
                                            <Check size={18} /> Accept Shipment
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        <div className="p-8 bg-emerald-50 rounded-[32px] border border-emerald-100">
                            <h3 className="font-bold flex items-center gap-3 mb-4 text-emerald-900">
                                <ShieldCheck size={20} className="text-emerald-600" /> Secure Transport
                            </h3>
                            <p className="text-sm text-emerald-800/80 mb-6 leading-relaxed font-medium">As a traveler, you will only receive the escrowed funds once the sender confirms successful delivery. Please ensure tracking updates.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">1</div>
                                    <span className="text-sm text-emerald-900 font-semibold">Accept a shipment that matches your route</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">2</div>
                                    <span className="text-sm text-emerald-900 font-semibold">Coordinate pickup with the sender securely</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-700 flex items-center justify-center text-[10px] font-bold mt-0.5 shrink-0">3</div>
                                    <span className="text-sm text-emerald-900 font-semibold">Deliver item & receive rewards instantly</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            <AcceptDeliveryModal 
                isOpen={!!selectedDelivery}
                onClose={() => setSelectedDelivery(null)}
                delivery={selectedDelivery}
                onSuccess={fetchMatchesOnly}
            />
        </div>
    );
};

export default TravellerPortal;
