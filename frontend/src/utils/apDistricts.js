export const AP_DISTRICTS = [
    { name: 'Visakhapatnam', lat: 17.6868, lng: 83.2185 },
    { name: 'Vijayawada', lat: 16.5062, lng: 80.6480 },
    { name: 'Guntur', lat: 16.3067, lng: 80.4365 },
    { name: 'Tirupati', lat: 13.6288, lng: 79.4192 },
    { name: 'Kurnool', lat: 15.8281, lng: 78.0373 },
    { name: 'Kakinada', lat: 16.9891, lng: 82.2475 },
    { name: 'Rajahmundry', lat: 17.0005, lng: 81.8040 },
    { name: 'Nellore', lat: 14.4426, lng: 79.9865 },
    { name: 'Anantapur', lat: 14.6819, lng: 77.6006 },
    { name: 'Kadapa', lat: 14.4673, lng: 78.8242 },
    { name: 'Eluru', lat: 16.7107, lng: 81.1031 },
    { name: 'Vizianagaram', lat: 18.1067, lng: 83.3956 },
    { name: 'Machilipatnam', lat: 16.1809, lng: 81.1303 },
    { name: 'Srikakulam', lat: 18.3000, lng: 83.9000 }
];

// Helper to calculate haversine distance exactly for accurate local AP runs
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

export const getDistanceKm = (city1, city2) => {
    if (city1 === city2) return 0;
    const loc1 = AP_DISTRICTS.find(d => d.name === city1);
    const loc2 = AP_DISTRICTS.find(d => d.name === city2);
    if (!loc1 || !loc2) return 0;
    return Math.round(calculateDistance(loc1.lat, loc1.lng, loc2.lat, loc2.lng));
};

// Application pricing logic for peer-to-peer AP
// Base fare: ₹150
// Per km: ₹2.5
// Per kg: ₹25
export const calculateShippingPrice = (pickup, drop, weightKg) => {
    const defaultPrice = 150;
    if (!pickup || !drop) return defaultPrice;
    
    const distance = getDistanceKm(pickup, drop);
    const weightFee = (parseFloat(weightKg) || 0) * 25;
    const distanceFee = distance * 2.5;
    
    // Minimum cap is ₹150 for intra-city trips.
    return Math.max(150, Math.floor(defaultPrice + distanceFee + weightFee));
};
