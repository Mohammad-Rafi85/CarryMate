import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Package, Search, MapPin, Calendar, ExternalLink } from 'lucide-react';

const MyShipments = () => {
    const navigate = useNavigate();
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL'); // ALL, PENDING, IN_TRANSIT, DELIVERED
    
    useEffect(() => {
        fetchShipments();
    }, []);

    const fetchShipments = async () => {
        try {
            const response = await api.get('/sender/my-shipments');
            // Sort by latest first
            const data = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setShipments(data);
        } catch (error) {
            console.error('Error fetching shipments', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-100 text-yellow-800';
            case 'ACCEPTED': return 'bg-blue-100 text-blue-800';
            case 'PICKED_UP': return 'bg-indigo-100 text-indigo-800';
            case 'IN_TRANSIT': return 'bg-purple-100 text-purple-800';
            case 'DELIVERED': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const filteredShipments = shipments.filter(s => filter === 'ALL' || s.status === filter);

    return (
        <div className="max-w-6xl mx-auto h-full flex flex-col font-sans">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">My Shipments</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and track your active deliveries</p>
                </div>
                <button 
                    onClick={() => navigate('/sender/create')}
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-[0_4px_12px_rgba(79,70,229,0.25)] text-sm font-bold flex items-center gap-2"
                >
                    <Package size={18} />
                    New Shipment
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-200 mb-8 inline-flex space-x-1 flex-wrap gap-y-2">
                {['ALL', 'PENDING', 'ACCEPTED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                            filter === f 
                                ? 'bg-indigo-50 text-indigo-700 shadow-sm' 
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                        }`}
                    >
                        {f.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* List */}
            {loading ? (
                <div className="flex-1 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                </div>
            ) : filteredShipments.length === 0 ? (
                <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-2xl border border-slate-200 border-dashed p-12 text-center shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                        <Package className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">No shipments found</h3>
                    <p className="text-slate-500 mt-2 max-w-sm">You don't have any shipments matching the current filter. Create a new one to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                    {filteredShipments.map((shipment) => (
                        <div key={shipment.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all group overflow-hidden flex flex-col">
                            {shipment.imageUrl ? (
                                <div className="h-40 bg-gray-100 overflow-hidden">
                                    <img src={shipment.imageUrl} alt={shipment.itemName} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                </div>
                            ) : (
                                <div className="h-40 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                                    <Package className="w-12 h-12 text-gray-300" />
                                </div>
                            )}
                            
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-gray-900 line-clamp-1 flex-1 pr-2" title={shipment.itemName}>
                                        {shipment.itemName}
                                    </h3>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusColor(shipment.status)}`}>
                                        {shipment.status.replace('_', ' ')}
                                    </span>
                                </div>
                                
                                <p className="text-sm text-gray-500 line-clamp-2 mb-4" title={shipment.description}>
                                    {shipment.description}
                                </p>
                                
                                <div className="space-y-2 mt-auto">
                                    <div className="flex items-start text-xs text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-1">{shipment.destinationAddress}</span>
                                    </div>
                                    <div className="flex items-center text-xs text-gray-600">
                                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                        <span>{new Date(shipment.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="pt-3 mt-3 border-t border-gray-50 flex justify-between items-center">
                                        <span className="font-black text-slate-900">₹{shipment.price}</span>
                                        <button 
                                            onClick={() => navigate(`/sender/track/${shipment.id}`)}
                                            className="text-indigo-600 text-sm font-bold hover:text-indigo-800 flex items-center transition-colors"
                                        >
                                            Track <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyShipments;
