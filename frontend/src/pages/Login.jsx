import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Lock, ArrowRight, Chrome, Apple, Eye, EyeOff, Box, Plane } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            console.log('Attempting login...');
            const response = await api.post('/auth/signin', credentials);
            login(response.data, response.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error details:', err);
            if (!err.response) {
                setError('Could not connect to the server. Please check if the backend is running on port 8080.');
            } else {
                setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
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

                <div style={{ maxWidth: '600px' }}>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hero-title"
                    >
                        Welcome home, Mate.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="hero-subtitle"
                    >
                        Sign in to manage your deliveries, track your trips, and connect with our global community.
                    </motion.p>
                </div>

                <div className="stat-grid">
                    <div className="stat-card">
                        <Box size={20} />
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '16px' }}>50k+</div>
                            <div style={{ opacity: 0.7, fontSize: '12px' }}>Items Delivered</div>
                        </div>
                    </div>
                    <div className="stat-card">
                        <Plane size={20} />
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '16px' }}>10k+</div>
                            <div style={{ opacity: 0.7, fontSize: '12px' }}>Verified Mates</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="auth-content">
                <div className="auth-form-wrapper">
                    <div style={{ marginBottom: '32px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '8px' }}>Log In</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Enter your credentials to access your account.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                        <button className="social-btn">
                            <Chrome size={20} /> Google
                        </button>
                        <button className="social-btn">
                            <Apple size={20} /> Apple
                        </button>
                    </div>

                    <div className="divider">or use username</div>

                    {error && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: 'var(--danger)', padding: '12px', borderRadius: '12px', marginBottom: '20px', fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Username</label>
                            <input
                                type="text"
                                name="username"
                                className="input-field"
                                placeholder="mate_2024"
                                value={credentials.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>Password</label>
                                <a href="#" style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</a>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input-field"
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                                <div
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: 'absolute', right: '16px', top: '18px', cursor: 'pointer', color: 'var(--text-muted)' }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-auth"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : <>Sign In <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '15px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>New to CarryMate? </span>
                        <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>Join our community</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
