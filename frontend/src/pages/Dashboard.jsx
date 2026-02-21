import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { Package, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

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

    const getStatusColor = (status) => {
        switch (status) {
            case 'DELIVERED': return 'var(--success)';
            case 'PENDING': return 'var(--warning)';
            case 'MATCHED': return 'var(--primary)';
            case 'PICKED_UP': return 'var(--secondary)';
            default: return 'var(--text-muted)';
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading your dashboard...</div>;

    return (
        <div className="container" style={{ padding: '40px 20px' }}>
            <header style={{ marginBottom: '40px' }}>
                <h1 className="page-title">Dashboard</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '15px', background: 'rgba(0, 210, 255, 0.1)', borderRadius: '15px' }}>
                            <Package color="var(--primary)" size={30} />
                        </div>
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: '800' }}>{deliveries.length}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Active Requests</div>
                        </div>
                    </div>
                    <div className="glass-panel" style={{ padding: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div style={{ padding: '15px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '15px' }}>
                            <Truck color="var(--success)" size={30} />
                        </div>
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: '800' }}>{trips.length}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Posted Trips</div>
                        </div>
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px' }}>
                {/* Deliveries Section */}
                <section>
                    <h2 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Package size={20} /> My Delivery Requests
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {deliveries.length === 0 ? (
                            <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>No delivery requests yet.</div>
                        ) : deliveries.map(delivery => (
                            <motion.div key={delivery.id} whileHover={{ scale: 1.01 }} className="glass-panel" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                    <div style={{ fontWeight: '700', fontSize: '18px' }}>{delivery.itemDescription}</div>
                                    <div style={{ color: getStatusColor(delivery.status), background: getStatusColor(delivery.status) + '15', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>{delivery.status}</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '14px', marginBottom: '10px' }}>
                                    <MapPin size={16} /> {delivery.pickupLocation} → {delivery.dropLocation}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '15px' }}>
                                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Category: <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{delivery.category}</span></div>
                                    <div style={{ fontWeight: '700', color: 'var(--primary)' }}>${delivery.escrowAmount}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Trips Section */}
                <section>
                    <h2 style={{ fontSize: '20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Truck size={20} /> My Trips
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {trips.length === 0 ? (
                            <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>No trips posted yet.</div>
                        ) : trips.map(trip => (
                            <motion.div key={trip.id} whileHover={{ scale: 1.01 }} className="glass-panel" style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontWeight: '700', fontSize: '18px', marginBottom: '10px' }}>
                                    <MapPin size={18} color="var(--primary)" /> {trip.startPoint} → {trip.endPoint}
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Date: <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{trip.travelDate}</span></div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Capacity: <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{trip.availableCapacityKg}kg</span></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Dashboard;
