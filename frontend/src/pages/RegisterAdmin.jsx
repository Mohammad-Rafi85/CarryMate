import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { Mail, Lock, AtSign, Eye, EyeOff, ArrowLeft, CheckCircle2, Shield, ShieldCheck, Zap } from 'lucide-react';

const RegisterAdmin = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        userType: 'ADMIN'
    });
    const [showPassword, setShowPassword] = useState(false);
    const { register, loading } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1); // 1: Details, 2: OTP
    const [otp, setOtp] = useState('');
    const [isOtpSending, setIsOtpSending] = useState(false);
    const [timer, setTimer] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSendOtp = async () => {
        if (!formData.email) {
            setError('Please enter your email first.');
            return;
        }
        setIsOtpSending(true);
        setError('');
        try {
            await api.post('/auth/send-otp', { email: formData.email });
            setStep(2);
            setTimer(30);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send OTP.');
        } finally {
            setIsOtpSending(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (step === 1) {
            handleSendOtp();
            return;
        }

        try {
            await register({ ...formData, otp });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            if (err.response?.data?.errors?.length > 0) {
                setError(err.response.data.errors[0].defaultMessage);
            } else {
                setError(err.response?.data?.message || 'Invalid OTP or Registration failed.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            <Link to="/register" className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors group z-20">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Options
            </Link>

            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-6xl grid lg:grid-cols-5 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
                
                {/* Left Side - Info */}
                <div className="hidden lg:flex lg:col-span-2 bg-slate-900 p-16 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-700/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-xl">
                                <ShieldCheck className="text-slate-900" size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Platform Authority</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-8 leading-tight">Master control for CarryMate operations.</h2>
                        <div className="space-y-8">
                            {[
                                { icon: <Shield size={18} />, title: 'Global Oversight', desc: 'Full visibility across all deliveries, users, and financial transactions.' },
                                { icon: <ShieldCheck size={18} />, title: 'Dispute Settlement', desc: 'Resolve conflicts between senders and travelers officially.' },
                                { icon: <Zap size={18} />, title: 'Security Controls', desc: 'Block suspicious accounts and ensure ecosystem integrity.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-slate-200 shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                        <p className="text-slate-300 text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:col-span-3 p-10 md:p-14 relative flex items-center">
                    {success ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Registration Successful!</h2>
                            <p className="text-slate-500 font-medium">Platform access granted. Redirecting to sign in...</p>
                        </motion.div>
                    ) : (
                        <div className="w-full max-w-md mx-auto">
                            <div className="mb-10 text-center">
                                <h2 className="text-3xl font-bold text-slate-900 mb-3">{step === 1 ? 'Admin Onboarding' : 'Verify Email'}</h2>
                                <p className="text-slate-500 font-medium tracking-tight">
                                    {step === 1 ? 'Establish your administrative credentials.' : `Confirm identity via: ${formData.email}`}
                                </p>
                            </div>
                            
                            {error && (
                                <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {step === 1 ? (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Admin Username</label>
                                            <div className="relative">
                                                <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input type="text" name="username" className="input-group pl-12" placeholder="admin_01" value={formData.username} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Corporate Email</label>
                                            <div className="relative">
                                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input type="email" name="email" className="input-group pl-12" placeholder="admin@carrymate.com" value={formData.email} onChange={handleChange} required />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Secure Admin Password</label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input type={showPassword ? "text" : "password"} name="password" className="input-group pl-12 pr-12" placeholder="••••••••" value={formData.password} onChange={handleChange} required />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn-primary bg-slate-900 hover:bg-black w-full py-4 text-base mt-2 shadow-slate-200 shadow-xl" disabled={isOtpSending}>
                                            {isOtpSending ? 'Sending OTP...' : 'Send OTP & Register'}
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Verification Code</label>
                                            <div className="relative">
                                                <Shield size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input 
                                                    type="text" 
                                                    maxLength="6"
                                                    className="input-group pl-12 tracking-[1em] font-black text-xl text-center" 
                                                    placeholder="000000" 
                                                    value={otp} 
                                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} 
                                                    required 
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="btn-primary bg-slate-900 hover:bg-black w-full py-4 text-base mt-2 shadow-slate-200 shadow-xl" disabled={loading}>
                                            {loading ? 'Verifying...' : 'Verify & Grant Access'}
                                        </button>

                                        <div className="flex justify-between items-center mt-4 px-1">
                                            <button type="button" onClick={() => setStep(1)} className="text-slate-400 text-xs font-bold hover:text-slate-600 uppercase tracking-wider">
                                                Edit Email
                                            </button>
                                            {timer > 0 ? (
                                                <span className="text-slate-400 text-xs font-bold">Resend in {timer}s</span>
                                            ) : (
                                                <button type="button" onClick={handleSendOtp} className="text-slate-900 text-xs font-bold hover:underline uppercase tracking-wider">
                                                    Resend OTP
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default RegisterAdmin;
