import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { User, Mail, Lock, Box, Plane, Eye, EyeOff, AtSign, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        userType: 'SENDER'
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
            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error('Registration error details:', err);
            if (!err.response) {
                setError('Could not connect to the server. Please check if the backend is running.');
            } else {
                setError(err.response?.data?.message || 'Registration failed. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-mesh min-h-screen flex items-center justify-center p-6 pt-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-[40px] overflow-hidden bg-white/40 ring-1 ring-white/50 backdrop-blur-2xl"
            >
                {/* Left Side - Info */}
                <div className="md:w-[45%] bg-indigo-600 p-12 text-white flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/30 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />

                    <Link to="/" className="flex items-center gap-2 text-indigo-100/70 hover:text-white transition-colors mb-20 relative z-10 w-fit">
                        <ArrowLeft size={18} /> Back to home
                    </Link>

                    <div className="relative z-10">
                        <h1 className="text-5xl font-black tracking-tight leading-tight mb-6">Join the global <br /> community.</h1>
                        <p className="text-indigo-100 text-lg leading-relaxed mb-12">Whether you're shipping across the world or traveling across cities, CarryMate makes it seamless.</p>

                        <div className="space-y-6">
                            {[
                                { icon: <Box size={18} />, text: 'Over 10,000 active senders' },
                                { icon: <Plane size={18} />, text: 'Verified travel mates globally' },
                                { icon: <User size={18} />, text: 'Join for free and start saving' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className="flex items-center gap-4 text-indigo-100/90 text-sm font-bold"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">{item.icon}</div>
                                    {item.text}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-auto relative z-10 text-xs font-bold text-indigo-200 uppercase tracking-widest">
                        Handcrafted by CarryMate Inc.
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="flex-1 bg-white p-12 md:p-16">
                    <div className="max-w-md mx-auto">
                        <div className="mb-10 text-center md:text-left">
                            <h2 className="text-3xl font-black text-slate-900 mb-2">Create Account</h2>
                            <p className="text-slate-500 font-medium tracking-tight">Set up your profile to start your journey.</p>
                        </div>

                        {error && <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-rose-50 text-rose-500 rounded-2xl border border-rose-100 text-sm font-bold mb-6">{error}</motion.div>}
                        {success && <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 text-sm font-bold mb-6">{success}</motion.div>}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Role Selection */}
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button
                                    type="button"
                                    onClick={() => handleTypeSelect('SENDER')}
                                    className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group ${formData.userType === 'SENDER' ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-600/10' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                >
                                    <Box size={24} className={formData.userType === 'SENDER' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
                                    <span className={`text-sm font-black ${formData.userType === 'SENDER' ? 'text-indigo-600' : 'text-slate-600'}`}>Sender</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleTypeSelect('TRAVELER')}
                                    className={`p-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 group ${formData.userType === 'TRAVELER' ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-600/10' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                                >
                                    <Plane size={24} className={formData.userType === 'TRAVELER' ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
                                    <span className={`text-sm font-black ${formData.userType === 'TRAVELER' ? 'text-indigo-600' : 'text-slate-600'}`}>Traveler</span>
                                </button>
                            </div>

                            <div className="relative group">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">Full Name</label>
                                <div className="relative">
                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input type="text" name="fullName" className="input-group pl-12" placeholder="Johnathan Doe" value={formData.fullName} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative group">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">Username</label>
                                    <div className="relative">
                                        <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input type="text" name="username" className="input-group pl-12" placeholder="johndoe" value={formData.username} onChange={handleChange} required />
                                    </div>
                                </div>
                                <div className="relative group">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">Email</label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input type="email" name="email" className="input-group pl-12" placeholder="john@mate.com" value={formData.email} onChange={handleChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="relative group">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">Password</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="input-group pl-12 pr-12"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary w-full py-4 text-base mt-4 shadow-xl shadow-indigo-600/20" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Continue to Dashboard'}
                            </button>
                        </form>

                        <div className="mt-8 text-center sm:text-left text-sm font-bold">
                            <span className="text-slate-400">Already have an account? </span>
                            <Link to="/login" className="text-indigo-600 hover:text-indigo-700 underline decoration-2 underline-offset-4">Log In</Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
