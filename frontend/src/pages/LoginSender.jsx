import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, Lock, AtSign, Eye, EyeOff, ArrowLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginSender = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (
                formData.username.trim().toLowerCase() === 'carrymate' && 
                formData.password.trim() === '12345678'
            ) {
                navigate('/admin');
                return;
            }
            await login(formData.username, formData.password);
            navigate('/dashboard'); 
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen bg-sky-50/50 flex items-center justify-center p-6">
            <Link to="/login" className="absolute top-10 left-10 flex items-center gap-2 text-sky-600 hover:text-sky-800 font-bold transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Login Selection
            </Link>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-[480px]">
                <div className="bg-white border-2 border-sky-100 rounded-[40px] p-10 md:p-14 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-100 rounded-bl-full -z-0" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 bg-sky-500 rounded-2xl flex items-center justify-center shadow-sky-200 shadow-xl">
                                <Package className="text-white" size={28} />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sender Login</h1>
                                <p className="text-sm font-bold text-sky-600 uppercase tracking-widest mt-1">Workspace</p>
                            </div>
                        </div>

                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-semibold flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-rose-600 rounded-full animate-pulse" /> {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-sky-900 ml-1">Username</label>
                                <div className="relative">
                                    <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
                                    <input type="text" className="input-group pl-12 focus:ring-sky-500 focus:border-sky-500" placeholder="your_username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-sm font-bold text-sky-900">Password</label>
                                </div>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400" />
                                    <input type={showPassword ? "text" : "password"} className="input-group pl-12 pr-12 focus:ring-sky-500 focus:border-sky-500" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-400 hover:text-sky-600">
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button type="submit" disabled={loading} className="w-full py-4 text-base mt-4 shadow-xl shadow-sky-200 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-2xl transition-all">
                                {loading ? 'Authenticating...' : 'Access Sender Dashboard'}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginSender;
