import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Lock, AtSign, Eye, EyeOff, ArrowLeft, Package } from 'lucide-react';
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
                setError('Could not connect to the server. Please check if the backend is running.');
            } else {
                setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-mesh min-h-screen flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white p-10 md:p-12 shadow-2xl rounded-[40px] border border-slate-100 relative overflow-hidden"
            >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full" />

                <div className="relative z-10 text-center">
                    <Link to="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold text-sm mb-10 transition-colors">
                        <ArrowLeft size={16} /> Back to explore
                    </Link>

                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-600/20">
                        <Package size={32} />
                    </div>

                    <h2 className="text-4xl font-black text-slate-900 mb-2">Welcome Back.</h2>
                    <p className="text-slate-500 font-medium mb-10 tracking-tight">Sign in to manage your shipments and trips.</p>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-rose-50 text-rose-500 rounded-2xl border border-rose-100 text-xs font-bold mb-8 text-left"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 text-left">
                        <div className="group relative">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">Username</label>
                            <div className="relative">
                                <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type="text"
                                    name="username"
                                    className="input-group pl-12"
                                    placeholder="your_username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="group relative">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-600 transition-colors">Password</label>
                                <Link to="#" className="text-[11px] font-bold text-indigo-600 hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="input-group pl-12 pr-12"
                                    placeholder="••••••••"
                                    value={credentials.password}
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

                        <button
                            type="submit"
                            className="btn-primary w-full py-4 text-base mt-2 shadow-2xl shadow-indigo-600/20"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Sign In to CarryMate'}
                        </button>
                    </form>

                    <div className="mt-10 text-sm font-bold">
                        <span className="text-slate-400">New around here? </span>
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-700 underline decoration-2 underline-offset-4">Create Account</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
