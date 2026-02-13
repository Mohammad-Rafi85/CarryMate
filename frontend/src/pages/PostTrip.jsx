import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Truck, MapPin, Calendar, Weight } from 'lucide-react';
import { motion } from 'framer-motion';

const PostTrip = () => {
    const [formData, setFormData] = useState({
        startPoint: '',
        endPoint: '',
        travelDate: '',
        availableCapacityKg: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/trips', formData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to post trip');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '40px' }}>
                <h1 className="page-title" style={{ fontSize: '28px', textAlign: 'center' }}>Post Your Trip</h1>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="input-group">
                        <label>Starting From</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="startPoint" placeholder="e.g. New York" style={{ paddingLeft: '45px' }} value={formData.startPoint} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Heading To</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="endPoint" placeholder="e.g. Washington D.C." style={{ paddingLeft: '45px' }} value={formData.endPoint} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Travel Date</label>
                        <div style={{ position: 'relative' }}>
                            <Calendar size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="date" name="travelDate" style={{ paddingLeft: '45px' }} value={formData.travelDate} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Available Capacity (kg)</label>
                        <div style={{ position: 'relative' }}>
                            <Weight size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="number" step="0.5" name="availableCapacityKg" placeholder="How much weight can you carry?" style={{ paddingLeft: '45px' }} value={formData.availableCapacityKg} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '10px' }} disabled={loading}>
                        {loading ? 'Posting...' : <><Truck size={20} /> Post Trip</>}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default PostTrip;
