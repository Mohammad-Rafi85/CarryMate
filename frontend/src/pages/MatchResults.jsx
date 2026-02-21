import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Package, MapPin, Search, Check } from 'lucide-react';
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
                // In a real app, you'd match deliveries based on route. 
                // For this demo, we'll fetch all pending deliveries or search specifically.
                const response = await api.get('/admin/deliveries'); // Simplified for demo
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
        <div className="container" style={{ padding: '40px 20px' }}>
            <h1 className="page-title">Available Deliveries</h1>
            {start && end && (
                <p style={{ color: 'var(--text-muted)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Search size={16} /> Showing results for: <strong>{start}</strong> to <strong>{end}</strong>
                </p>
            )}

            {loading ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>Searching for matches...</div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
                    {matches.length === 0 ? (
                        <div className="glass-panel" style={{ gridColumn: '1/-1', padding: '50px', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No matching delivery requests found for this route.
                        </div>
                    ) : matches.map(delivery => (
                        <motion.div key={delivery.id} whileHover={{ y: -5 }} className="glass-panel" style={{ padding: '25px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                <div style={{ fontWeight: '800', fontSize: '18px' }}>{delivery.itemDescription}</div>
                                <div style={{ color: 'var(--primary)', fontWeight: '700' }}>${delivery.escrowAmount}</div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                    <MapPin size={16} color="var(--primary)" />
                                    <span style={{ color: 'var(--text-muted)' }}>From:</span> {delivery.pickupLocation}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                                    <MapPin size={16} color="var(--secondary)" />
                                    <span style={{ color: 'var(--text-muted)' }}>To:</span> {delivery.dropLocation}
                                </div>
                            </div>

                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', borderTop: '1px solid var(--glass-border)', paddingTop: '15px' }}>
                                Weight: <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{delivery.weightKg}kg</span> | Category: <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{delivery.category}</span>
                            </div>

                            <button onClick={() => handleMatch(delivery.id)} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                <Check size={18} /> I can deliver this
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MatchResults;
