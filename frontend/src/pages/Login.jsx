import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Lock, AtSign, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(formData.username, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen bg-professional flex items-center justify-center p-6">
            <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-[480px]"
            >
                <div className="bg-white border border-slate-200 rounded-[32px] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-100 shadow-lg">
                                <Package className="text-white" size={24} />
                            </div>
                            <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-semibold flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                                <div className="relative">
                                    <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type="text"
                                        className="input-group pl-12"
                                        placeholder="your_username"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-bold text-slate-700">Password</label>
                                    <Link to="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-800">Forgot Password?</Link>
                                </div>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="input-group pl-12 pr-12"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full py-4 text-base mt-4 shadow-lg shadow-indigo-100"
                                disabled={loading}
                            >
                                {loading ? 'Authenticating...' : 'Sign In to Account'}
                            </button>
                        </form>

                        <div className="mt-10 pt-10 border-t border-slate-100 flex flex-col items-center gap-4">
                            <div className="text-sm font-medium text-slate-500">
                                New to CarryMate? <Link to="/register" className="text-indigo-600 font-bold hover:underline underline-offset-4">Create account</Link>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-black text-slate-300">
                                <ShieldCheck size={14} /> Secure Encryption Active
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
