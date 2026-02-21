import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { User, Mail, Lock, Chrome, Facebook, Box, Plane, Eye, EyeOff, AtSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        userType: 'SENDER' // Add default
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTypeSelect = (type) => {
        setFormData({ ...formData, userType: type });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            console.log('Attempting registration with:', formData);
            const response = await api.post('/auth/signup', formData);
            console.log('Registration success:', response.data);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error('Registration error details:', err);
            if (!err.response) {
                setError('Could not connect to the server. Please check if the backend is running on port 8080.');
            } else {
                setError(err.response?.data?.message || 'Registration failed. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            {/* Left Sidebar - Hero Section */}
            <div className="auth-sidebar">
                <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
                    <div className="logo-container" style={{ margin: 0 }}>
                        <div className="logo-icon">
                            <Box color="var(--primary)" size={24} />
                        </div>
                        <span className="logo-text">Carry Mate</span>
                    </div>
                </div>

                <div style={{ maxWidth: '600px', marginBottom: '60px' }}>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="hero-title"
                    >
                        Start your journey with us.
                    </motion.h1>
                    <p className="hero-subtitle">
                        Whether you're shipping across the sea or flying over it, CarryMate is your partner in global logistics.
                    </p>
                </div>

                <div className="stat-grid">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="stat-card"
                    >
                        <Plane size={20} />
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '15px' }}>Verified Mates</div>
                            <div style={{ fontSize: '12px', opacity: 0.8 }}>Trusted Community</div>
                        </div>
                    </motion.div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '24px', opacity: 0.6, fontSize: '12px' }}>
                    <span>© 2024 Carry Mate Inc.</span>
                </div>
            </div>

            {/* Right Side - Register Form */}
            <div className="auth-content">
                <div className="auth-form-wrapper" style={{ maxWidth: '500px' }}>
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>Create Account</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Sign up to start shipping or traveling.</p>
                    </div>

                    {error && <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: 'var(--danger)', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}
                    {success && <div style={{ background: '#ecfdf5', border: '1px solid #d1fae5', color: 'var(--success)', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>{success}</div>}

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '12px' }}>I want to be a:</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div
                                onClick={() => handleTypeSelect('SENDER')}
                                style={{
                                    padding: '20px',
                                    borderRadius: '16px',
                                    border: `2px solid ${formData.userType === 'SENDER' ? 'var(--primary)' : 'var(--border-color)'}`,
                                    background: formData.userType === 'SENDER' ? 'var(--indigo-50)' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'center'
                                }}
                            >
                                <Box size={24} color={formData.userType === 'SENDER' ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '8px' }} />
                                <div style={{ fontWeight: '700', color: formData.userType === 'SENDER' ? 'var(--primary)' : 'var(--text-main)' }}>Sender</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>I have items to send</div>
                            </div>

                            <div
                                onClick={() => handleTypeSelect('TRAVELER')}
                                style={{
                                    padding: '20px',
                                    borderRadius: '16px',
                                    border: `2px solid ${formData.userType === 'TRAVELER' ? 'var(--primary)' : 'var(--border-color)'}`,
                                    background: formData.userType === 'TRAVELER' ? 'var(--indigo-50)' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    textAlign: 'center'
                                }}
                            >
                                <Plane size={24} color={formData.userType === 'TRAVELER' ? 'var(--primary)' : 'var(--text-muted)'} style={{ marginBottom: '8px' }} />
                                <div style={{ fontWeight: '700', color: formData.userType === 'TRAVELER' ? 'var(--primary)' : 'var(--text-main)' }}>Traveler</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>I am traveling soon</div>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Full Name</label>
                            <div style={{ position: 'relative' }}>
                                <User size={18} style={{ position: 'absolute', left: '16px', top: '22px', color: 'var(--text-muted)' }} />
                                <input type="text" name="fullName" className="input-field" style={{ paddingLeft: '48px' }} placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Username</label>
                            <div style={{ position: 'relative' }}>
                                <AtSign size={18} style={{ position: 'absolute', left: '16px', top: '22px', color: 'var(--text-muted)' }} />
                                <input type="text" name="username" className="input-field" style={{ paddingLeft: '48px' }} placeholder="johndoe123" value={formData.username} onChange={handleChange} required />
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '16px', top: '22px', color: 'var(--text-muted)' }} />
                                <input type="email" name="email" className="input-field" style={{ paddingLeft: '48px' }} placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '16px', top: '22px', color: 'var(--text-muted)' }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input-field"
                                    style={{ paddingLeft: '48px' }}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '16px', top: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn-auth" style={{ marginBottom: '24px' }} disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', fontSize: '15px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Already a member? </span>
                        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Log In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
