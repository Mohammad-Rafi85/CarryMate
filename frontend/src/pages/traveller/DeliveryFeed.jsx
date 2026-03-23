import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Package, MapPin, DollarSign, ExternalLink, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeliveryFeed = () => {
    const navigate = useNavigate();
    const [availableShipments, setAvailableShipments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                // Fetch REAL deliveries requested by the sender
                const res = await api.get('/sender/all-pending');
                
                // Track deliveries accepted by THIS traveller from localStorage (since API might lack mapping locally)
                const activeIds = JSON.parse(localStorage.getItem('carrymate_active_deliveries') || '[]').map(d => d.id);

                // Filter pending AND not already accepted locally.
                const realDeliveries = res.data.filter(d => 
                    d.status === 'PENDING' && !activeIds.includes(d.id)
                ).map(d => ({
                    id: d.id,
                    itemName: d.itemDescription || d.itemName || 'Package',
                    description: d.category || 'Standard Delivery',
                    pickupAddress: d.pickupAddress || d.pickupLocation || 'Pickup Address Not Available',
                    destinationAddress: d.destinationAddress || d.dropLocation || 'Drop-off Address Not Available',
                    price: d.escrowAmount || d.price || 0,
                    weight: d.weightKg || d.weight || 0,
                }));

                setAvailableShipments(realDeliveries);
            } catch (error) {
                console.error("Failed to load real deliveries:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeed();
    }, []);

    const handleAccept = async (shipment) => {
        try {
            // Trigger real backend api to update status to ACCEPTED
            await api.put(`/sender/${shipment.id}/accept`);

            // Always add to MyDeliveries state immediately using localStorage acting as persistence
            const existingActive = JSON.parse(localStorage.getItem('carrymate_active_deliveries') || '[]');
            const newActiveTrip = {
                ...shipment,
                status: 'ACCEPTED',
                senderName: 'Sender' 
            };
            localStorage.setItem('carrymate_active_deliveries', JSON.stringify([...existingActive, newActiveTrip]));

            // Also increment total stats via local tracker
            const stats = JSON.parse(localStorage.getItem('carrymate_stats') || '{"earnings": 0, "completed": 0}');
            localStorage.setItem('carrymate_stats', JSON.stringify(stats)); // just init

            // Remove from current UI feed locally
            setAvailableShipments(prev => prev.filter(s => s.id !== shipment.id));

            alert("Shipment Accepted! Check 'My Active Trips' to manage it.");
            navigate('/traveller/active');
        } catch (error) {
            alert("Failed to accept shipment.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto h-full flex flex-col font-sans pb-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Available Deliveries</h1>
                    <p className="text-sm text-slate-500 mt-1">Accept shipments posted by senders near you</p>
                </div>
                <div className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl shadow-sm text-sm font-bold flex items-center gap-2 text-slate-600">
                    <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                    Live Feed
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
                </div>
            ) : availableShipments.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                        <Package className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No deliveries available</h3>
                    <p className="text-slate-500 mt-2 max-w-sm">There are no pending shipments at the moment. Keep refreshing your feed.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableShipments.map((shipment) => (
                        <div key={shipment.id} className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all flex flex-col p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <Package className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 line-clamp-1 pr-2" title={shipment.itemName}>
                                            {shipment.itemName}
                                        </h3>
                                        <span className="text-xs font-semibold text-slate-500">{shipment.weight} kg</span>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold whitespace-nowrap">
                                    PENDING
                                </span>
                            </div>
                            
                            <p className="text-sm text-slate-500 line-clamp-2 mb-6 font-medium">
                                {shipment.description}
                            </p>
                            
                            <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                <div className="flex items-start text-xs text-slate-700 font-medium">
                                    <MapPin className="w-4 h-4 mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
                                    <span>Pick up: <br/><span className="text-slate-500">{shipment.pickupAddress}</span></span>
                                </div>
                                <div className="flex items-start text-xs text-slate-700 font-medium">
                                    <MapPin className="w-4 h-4 mr-2 text-emerald-500 mt-0.5 flex-shrink-0" />
                                    <span>Drop off: <br/><span className="text-slate-500">{shipment.destinationAddress}</span></span>
                                </div>
                            </div>

                            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-5">
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Earnings</span>
                                    <span className="text-xl font-black text-slate-900 flex items-center">
                                        ₹{shipment.price}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleAccept(shipment)}
                                    className="px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-md"
                                >
                                    Accept Request
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DeliveryFeed;
