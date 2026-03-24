import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { Package, MapPin, DollarSign, User, Image as ImageIcon, MapPinned, Phone, Map, X, CheckCircle2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaf icon path issue in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});
const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // New Delhi

const CreateShipment = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Form state
    const [formData, setFormData] = useState({
        itemName: '',
        itemType: '',
        weight: '',
        handlingInstructions: '',
        description: '',
        senderContact: '',
        receiverName: '',
        receiverContact: '',
        price: '',
        pickupAddress: '',
        destinationAddress: '',
        destinationDetails: ''
    });
    
    const [pickupLocation, setPickupLocation] = useState(defaultCenter);
    const [destinationLocation, setDestinationLocation] = useState(defaultCenter);
    const [imageBase64, setImageBase64] = useState('');

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setPickupLocation({ lat: latitude, lng: longitude });
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await res.json();
                    if (data && data.display_name) {
                        setFormData(prev => ({ ...prev, pickupAddress: data.display_name }));
                    } else {
                        setFormData(prev => ({ ...prev, pickupAddress: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}` }));
                    }
                } catch (err) {
                    setFormData(prev => ({ ...prev, pickupAddress: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}` }));
                }
            }, (error) => {
                console.error("Error getting location: ", error);
            });
        }
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const isLoaded = await loadRazorpay();
            if (!isLoaded) {
                setError("Razorpay SDK failed to load. Please check your internet connection.");
                setLoading(false);
                return;
            }

            // 1. Create Order via PaymentController
            const orderRes = await api.post('/payment/create-order', {
                amount: parseFloat(formData.price)
            });

            const { orderId, amount, currency } = orderRes.data;

            // 2. Initialize Razorpay Checkout
            const options = {
                key: "rzp_test_SUwWFcLuV8oRjZ",
                amount: amount,
                currency: currency,
                name: "CarryMate",
                description: "Shipment Payment Escrow",
                order_id: orderId,
                handler: async function (response) {
                    // 3. On successful payment, post the shipment details
                    try {
                        await api.post('/sender/create-shipment', {
                            ...formData,
                            destinationAddress: formData.destinationDetails ? `${formData.destinationAddress}, ${formData.destinationDetails}` : formData.destinationAddress,
                            price: parseFloat(formData.price),
                            weight: parseFloat(formData.weight),
                            imageBase64,
                            pickupLat: pickupLocation.lat,
                            pickupLng: pickupLocation.lng,
                            destinationLat: destinationLocation.lat,
                            destinationLng: destinationLocation.lng,
                            paymentId: response.razorpay_payment_id
                        });
                        navigate('/sender/my-shipments');
                    } catch (err) {
                        console.error("Create Shipment Error:", err);
                        const strErr = err.response?.data?.message || err.response?.data || err.message || JSON.stringify(err);
                        setError(`Payment successful but failed to save shipment: ${strErr}`);
                        setLoading(false);
                    }
                },
                prefill: {
                    name: formData.receiverName,
                    contact: formData.senderContact || ""
                },
                theme: {
                    color: "#4f46e5"
                },
                modal: {
                    ondismiss: function() {
                        setLoading(false);
                    }
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();

        } catch (err) {
            console.error("Payment Initiation Error:", err);
            const strErr = err.response?.data?.message || err.response?.data || err.message || JSON.stringify(err);
            setError(`Failed to initiate payment: ${strErr}`);
            setLoading(false);
        }
    };


    const MapUpdater = ({ center }) => {
        const map = useMap();
        React.useEffect(() => {
            if (center && center.lat) {
                map.flyTo([center.lat, center.lng], map.getZoom());
            }
        }, [center, map]);
        return null;
    };

    const MapClickSelector = () => {
        useMapEvents({
            async click(e) {
                const { lat, lng } = e.latlng;
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
                    const data = await res.json();
                    const address = data?.display_name || `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`;
                    
                    if (mapMode === 'destination') {
                        setDestinationLocation({ lat, lng });
                        setFormData(prev => ({ 
                            ...prev, 
                            destinationAddress: address
                        }));
                    } else {
                        setPickupLocation({ lat, lng });
                        setFormData(prev => ({ 
                            ...prev, 
                            pickupAddress: address
                        }));
                    }
                } catch (err) {
                    console.error(err);
                }
            },
        });
        return null;
    };
    
    const [mapMode, setMapMode] = useState('pickup'); // 'pickup' or 'destination'
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    return (
        <div className="max-w-4xl mx-auto pb-10 font-sans">
            <h1 className="text-3xl font-black text-slate-800 mb-8 tracking-tight">Create New Shipment</h1>
            
            {error && (
                <div className="mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-medium shadow-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10 bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                {/* Item Details */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">1. Item Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Package className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="itemName"
                                    required
                                    value={formData.itemName}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="e.g., Important Documents"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
                            <select
                                name="itemType"
                                required
                                value={formData.itemType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                            >
                                <option value="" disabled>Select category</option>
                                <option value="DOCUMENTS">Documents</option>
                                <option value="ELECTRONICS">Electronics</option>
                                <option value="FRAGILE">Fragile (Glass, etc.)</option>
                                <option value="PERISHABLE">Perishable (Food, Bio)</option>
                                <option value="FURNITURE">Furniture</option>
                                <option value="CLOTHING">Clothing / Parcels</option>
                                <option value="OTHER">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Approx. Weight (kg) *</label>
                            <input
                                type="number"
                                name="weight"
                                required
                                min="0.1"
                                step="0.1"
                                value={formData.weight}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="0.0"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Handling Instructions</label>
                            <input
                                type="text"
                                name="handlingInstructions"
                                value={formData.handlingInstructions}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., Keep dry, This side up, Do not stack..."
                            />
                        </div>
                        
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                            <textarea
                                name="description"
                                required
                                rows={3}
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Describe the item, dimensions, and special instructions..."
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Item Image (Optional)</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                </label>
                            </div>
                            {imageBase64 && (
                                <div className="mt-2 text-sm text-green-600 font-medium">Image attached successfully.</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Logistics */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">2. Pickup & Destination</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Pickup */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="pickupAddress"
                                        required
                                        value={formData.pickupAddress}
                                        onChange={handleInputChange}
                                        className="pl-10 pr-12 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Full address (e.g., Block A, Connaught Place)"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => { setMapMode('pickup'); setIsMapModalOpen(true); }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors"
                                        title="Select on Map"
                                    >
                                        <Map className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Destination */}
                        <div className="space-y-4">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination Location *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPinned className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="destinationAddress"
                                            required
                                            value={formData.destinationAddress}
                                            onChange={handleInputChange}
                                            className="pl-10 pr-12 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                            placeholder="Map drop-off location"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => { setMapMode('destination'); setIsMapModalOpen(true); }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors"
                                            title="Select on Map"
                                        >
                                            <Map className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Complete Address Details</label>
                                    <textarea
                                        name="destinationDetails"
                                        rows={2}
                                        value={formData.destinationDetails}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Flat no, Floor, Landmark, Building name (Optional but recommended)"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Map Modal */}
                    {isMapModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                            <div className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl flex flex-col h-[80vh]">
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white z-10">
                                    <div>
                                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                            <Map className="text-indigo-600" /> Pin Your {mapMode === 'pickup' ? 'Pickup' : 'Dropoff'} Location
                                        </h3>
                                        <p className="text-sm text-slate-500 font-medium mt-1">Tap exactly on the map to autofill the address.</p>
                                    </div>
                                    <button onClick={() => setIsMapModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
                                        <X size={24} />
                                    </button>
                                </div>
                                
                                <div className="flex-1 relative z-0">
                                    <MapContainer 
                                        center={mapMode === 'destination' ? [destinationLocation.lat, destinationLocation.lng] : [pickupLocation.lat, pickupLocation.lng]} 
                                        zoom={13} 
                                        style={{ width: '100%', height: '100%' }}
                                    >
                                        <TileLayer 
                                            url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" 
                                            subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                                            attribution="&copy; Google Maps" 
                                        />
                                        <MapUpdater center={mapMode === 'destination' ? destinationLocation : pickupLocation} />
                                        <MapClickSelector />
                                        
                                        {mapMode === 'pickup' && (
                                            <Marker position={[pickupLocation.lat, pickupLocation.lng]}>
                                                <Popup>Pickup Location</Popup>
                                            </Marker>
                                        )}
                                        {mapMode === 'destination' && (
                                            <Marker position={[destinationLocation.lat, destinationLocation.lng]}>
                                                <Popup>Destination Location</Popup>
                                            </Marker>
                                        )}
                                    </MapContainer>
                                </div>
                                
                                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div className="flex-1 w-full p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                                        <span className="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Selected Address</span>
                                        <span className="font-semibold text-slate-700 truncate block">
                                            {mapMode === 'pickup' ? formData.pickupAddress : formData.destinationAddress}
                                        </span>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => setIsMapModalOpen(false)}
                                        className="w-full md:w-auto px-8 py-3.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <CheckCircle2 size={20} /> Confirm Location
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Receiver & Pricing */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 border-b pb-2 mb-4">3. Delivery & Contact Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Contact (Sender) *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="senderContact"
                                    required
                                    value={formData.senderContact}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Your Mobile Number"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    name="receiverName"
                                    required
                                    value={formData.receiverName}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter receiver's name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Contact *</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="tel"
                                    name="receiverContact"
                                    required
                                    value={formData.receiverContact}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Mobile Number"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Price (₹) *</label>
                            <div className="relative md:w-1/2">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <DollarSign className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="number"
                                    name="price"
                                    required
                                    min="0"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Offer amount to traveler"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex justify-end">
                    <button
                        type="button"
                        onClick={() => navigate('/sender/my-shipments')}
                        className="px-6 py-3 text-slate-500 font-bold rounded-xl mr-2 hover:bg-slate-50 transition-all"
                    >
                        Discard
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-[0_4px_12px_rgba(79,70,229,0.25)] flex items-center ${loading ? 'opacity-75 cursor-wait' : ''}`}
                    >
                        {loading ? 'Creating...' : 'Create Shipment'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateShipment;
