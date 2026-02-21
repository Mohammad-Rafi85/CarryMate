import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { Package, MapPin, DollarSign, Info, Weight } from 'lucide-react';
import { motion } from 'framer-motion';

const PostDelivery = () => {
    const [formData, setFormData] = useState({
        pickupLocation: '',
        dropLocation: '',
        itemDescription: '',
        weightKg: '',
        category: 'Electronics',
        escrowAmount: ''
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
            await api.post('/deliveries', formData);
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to post delivery request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px', display: 'flex', justifyContent: 'center' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel" style={{ width: '100%', maxWidth: '700px', padding: '40px' }}>
                <h1 className="page-title" style={{ fontSize: '28px', textAlign: 'center' }}>Send an Item</h1>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Item Description</label>
                        <div style={{ position: 'relative' }}>
                            <Package size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="itemDescription" placeholder="e.g. MacBook Pro 14 inch" style={{ paddingLeft: '45px' }} value={formData.itemDescription} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Pickup Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="pickupLocation" placeholder="City name" style={{ paddingLeft: '45px' }} value={formData.pickupLocation} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Drop Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="dropLocation" placeholder="City name" style={{ paddingLeft: '45px' }} value={formData.dropLocation} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Weight (kg)</label>
                        <div style={{ position: 'relative' }}>
                            <Weight size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="number" step="0.1" name="weightKg" placeholder="1.5" style={{ paddingLeft: '45px' }} value={formData.weightKg} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} style={{ background: 'white', color: 'var(--text-main)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '12px 16px', width: '100%', outline: 'none' }}>
                            <option value="Electronics" style={{ color: 'black' }}>Electronics</option>
                            <option value="Documents" style={{ color: 'black' }}>Documents</option>
                            <option value="Clothing" style={{ color: 'black' }}>Clothing</option>
                            <option value="Food" style={{ color: 'black' }}>Food & Perisables</option>
                            <option value="Other" style={{ color: 'black' }}>Other</option>
                        </select>
                    </div>

                    <div className="input-group" style={{ gridColumn: 'span 2' }}>
                        <label>Offer Amount ($)</label>
                        <div style={{ position: 'relative' }}>
                            <DollarSign size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="number" name="escrowAmount" placeholder="Amount to be held in escrow" style={{ paddingLeft: '45px' }} value={formData.escrowAmount} onChange={handleChange} required />
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                            <Info size={12} /> This amount will be deducted from your wallet and released to the traveler upon delivery completion.
                        </p>
                    </div>

                    <button type="submit" className="btn-primary" style={{ gridColumn: 'span 2', justifyContent: 'center' }} disabled={loading}>
                        {loading ? 'Posting...' : 'Post Delivery Request'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default PostDelivery;
