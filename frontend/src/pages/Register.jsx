import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { UserPlus, User, Mail, Lock, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await api.post('/auth/signup', formData);
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{ width: '100%', maxWidth: '500px', padding: '40px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '10px' }}>Join CarryMate</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Start sending or traveling today</p>
                </div>

                {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}
                {success && <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)', color: 'var(--success)', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <UserCircle size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="fullName" placeholder="John Doe" style={{ paddingLeft: '45px' }} value={formData.fullName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Username</label>
                        <div style={{ position: 'relative' }}>
                            <User size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="text" name="username" placeholder="johndoe123" style={{ paddingLeft: '45px' }} value={formData.username} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="email" name="email" placeholder="john@example.com" style={{ paddingLeft: '45px' }} value={formData.email} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '14px', color: 'var(--text-muted)' }} />
                            <input type="password" name="password" placeholder="••••••••" style={{ paddingLeft: '45px' }} value={formData.password} onChange={handleChange} required />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }} disabled={loading}>
                        {loading ? 'Creating account...' : <><UserPlus size={20} /> Create Account</>}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: 'var(--text-muted)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Login</Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
