import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { ArrowLeft, Package, MapPin, Navigation, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaf icon path issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icon for Traveller
const travellerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-emerald.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const TrackShipment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchShipment = async () => {
            try {
                const response = await api.get(`/sender/track/${id}`);
                setShipment(response.data);
                
                // Fallback coordinates if backend has nulls (Delhi to Gurugram)
                const pLat = response.data.pickupLat || 28.6139;
                const pLng = response.data.pickupLng || 77.2090;
                const dLat = response.data.destinationLat || 28.4595;
                const dLng = response.data.destinationLng || 77.0266;

                const latDiff = dLat - pLat;
                const lngDiff = dLng - pLng;
                
                // Set initial random location between pickup and destination for demo based on status
                let factor = 0.1;
                if (response.data.status === 'IN_TRANSIT') factor = 0.6;
                if (response.data.status === 'DELIVERED') factor = 1.0;

                setCurrentLocation({
                    lat: pLat + latDiff * factor,
                    lng: pLng + lngDiff * factor
                });

            } catch (err) {
                console.error("Track error:", err);
                const strErr = err.response?.data?.message || err.response?.data || err.message || JSON.stringify(err);
                setError(`Failed to fetch tracking information: ${strErr}`);
            } finally {
                setLoading(false);
            }
        };

        fetchShipment();

        // Simulate live marker moving
        const interval = setInterval(() => {
            setCurrentLocation(prev => {
                if (!prev || !shipment || shipment.status === 'DELIVERED') return prev;
                const dLat = shipment.destinationLat || 28.4595;
                const dLng = shipment.destinationLng || 77.0266;
                const latDiff = dLat - prev.lat;
                const lngDiff = dLng - prev.lng;
                return {
                    lat: prev.lat + latDiff * 0.05,
                    lng: prev.lng + lngDiff * 0.05
                };
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [id]);

    if (!id) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-sm border border-slate-100 text-center">
                <MapPin className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Track a Shipment</h2>
                <button onClick={() => navigate('/sender/my-shipments')} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer">View My Shipments</button>
            </div>
        );
    }

    if (loading) return <div className="p-8 text-center text-slate-500 font-bold">Connecting to GPS Network...</div>;
    if (error) return <div className="p-8 text-center text-rose-500">{error}</div>;
    if (!shipment) return null;

    const pLat = shipment.pickupLat || 28.6139;
    const pLng = shipment.pickupLng || 77.2090;
    const dLat = shipment.destinationLat || 28.4595;
    const dLng = shipment.destinationLng || 77.0266;

    const pickup = [pLat, pLng];
    const destination = [dLat, dLng];
    const travellerCoord = currentLocation ? [currentLocation.lat, currentLocation.lng] : pickup;

    const path = [pickup, destination];

    const getStatusStep = () => {
        switch (shipment.status) {
            case 'PENDING': return 1;
            case 'ACCEPTED': return 2;
            case 'PICKED_UP': return 3;
            case 'IN_TRANSIT': return 4;
            case 'DELIVERED': return 5;
            default: return 1;
        }
    };
    const currentStep = getStatusStep();

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <button onClick={() => navigate('/sender/my-shipments')} className="flex items-center text-slate-600 hover:text-indigo-600 font-bold mb-6 transition">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to My Shipments
            </button>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 mb-6">
                <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-100">
                    <div>
                        <h1 className="text-2xl font-black text-slate-900 mb-1">{shipment.itemName}</h1>
                        <p className="text-slate-500 text-sm font-bold">Tracking ID: #{shipment.id} • <span className="text-indigo-600">{shipment.status.replace('_', ' ')}</span></p>
                    </div>
                </div>

                {/* Status Timeline */}
                <div className="mb-10">
                    <div className="flex items-center justify-between relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0"></div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-indigo-500 z-0 transition-all duration-1000" style={{ width: `${((currentStep - 1) / 4) * 100}%` }}></div>

                        {[
                            { step: 1, label: 'Pending', icon: Package },
                            { step: 2, label: 'Accepted', icon: CheckCircle },
                            { step: 3, label: 'Picked Up', icon: MapPin },
                            { step: 4, label: 'In Transit', icon: Navigation },
                            { step: 5, label: 'Delivered', icon: CheckCircle }
                        ].map(({ step, label, icon: Icon }) => (
                            <div key={label} className="relative z-10 flex flex-col items-center bg-white px-2">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${currentStep >= step ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-50 border border-slate-200 text-slate-400'}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs mt-3 font-bold uppercase tracking-wider ${currentStep >= step ? 'text-indigo-700' : 'text-slate-400'}`}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* OpenStreetMap via Leaflet */}
                <div className="border-4 border-slate-50 rounded-2xl overflow-hidden shadow-inner h-[400px]">
                    <MapContainer center={currentStep >= 3 ? travellerCoord : pickup} zoom={11} style={{ width: '100%', height: '100%' }} zoomControl={false}>
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" attribution="&copy; OpenStreetMap contributors" />
                        
                        <Marker position={pickup}>
                            <Popup>Pickup: {shipment.pickupAddress}</Popup>
                        </Marker>
                        
                        <Marker position={destination}>
                            <Popup>Destination: {shipment.destinationAddress}</Popup>
                        </Marker>
                        
                        {shipment.status !== 'DELIVERED' && shipment.status !== 'PENDING' && (
                            <Marker position={travellerCoord} icon={travellerIcon}>
                                <Popup>Traveller's Live Location</Popup>
                            </Marker>
                        )}
                        
                        <Polyline positions={path} pathOptions={{ color: '#6366f1', weight: 4, dashArray: '10, 10' }} />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default TrackShipment;
