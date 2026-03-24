import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import {
    User,
    Mail,
    Lock,
    AtSign,
    Eye,
    EyeOff,
    ArrowLeft,
    CheckCircle2,
    Shield,
    Globe,
    Zap
} from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        userType: 'SENDER'
    });
    const [showPassword, setShowPassword] = useState(false);
    const { register, loading } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [step, setStep] = useState(1); // 1: Details, 2: OTP
    const [otp, setOtp] = useState('');
    const [isOtpSending, setIsOtpSending] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [timer, setTimer] = useState(0);
    const navigate = useNavigate();

    React.useEffect(() => {
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
            setTimer(30); // 30 seconds cooldown
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

        // Final Step: Verify OTP and Register
        try {
            await register({ ...formData, otp });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP or Registration failed.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors group z-20">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl grid lg:grid-cols-5 bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100"
            >
                {/* Left Side - Info */}
                <div className="hidden lg:flex lg:col-span-2 bg-slate-900 p-16 flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-indigo-500/20 shadow-xl">
                                <Shield className="text-white" size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">Join the Network</span>
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-8 leading-tight">Trust-based delivery for a better India.</h2>

                        <div className="space-y-8">
                            {[
                                { icon: <Shield size={18} />, title: 'Identity Verified', desc: 'Secure KYC ensures a safe community for everyone.' },
                                { icon: <Zap size={18} />, title: 'Direct Transit', desc: 'Move items faster through existing traveler routes.' },
                                { icon: <Globe size={18} />, title: 'Eco-Friendly', desc: 'Zero added carbon missions per delivery.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1 w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold mb-1">{item.title}</h4>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 pt-10 border-t border-white/10">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Powered by CarryMate P2P</p>
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="lg:col-span-3 p-10 md:p-16 relative">
                    {success ? (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-8">
                                <CheckCircle2 size={48} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Registration Successful!</h2>
                            <p className="text-slate-500 font-medium">Welcome {formData.fullName || formData.username}! Redirecting you to sign in...</p>
                        </motion.div>
                    ) : (
                        <div>
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                                <p className="text-slate-500 font-medium tracking-tight">Enter your professional details to get started.</p>
                            </div>

                            {error && (
                                <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold animate-shake">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {step === 1 ? (
                                    <>
                                        <div className="flex p-1 bg-slate-50 border border-slate-200 rounded-2xl mb-8">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, userType: 'SENDER' })}
                                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${formData.userType === 'SENDER' ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                                            >
                                                I want to Send
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, userType: 'TRAVELER' })}
                                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${formData.userType === 'TRAVELER' ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' : 'text-slate-500 hover:text-slate-800'}`}
                                            >
                                                I am Traveling
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                                            <div className="relative">
                                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input type="text" name="fullName" className="input-group pl-12" placeholder="e.g. Rahul Sharma" value={formData.fullName} onChange={handleChange} required />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                                                <div className="relative">
                                                    <AtSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input type="text" name="username" className="input-group pl-12" placeholder="rahul_s" value={formData.username} onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 ml-1">Email</label>
                                                <div className="relative">
                                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                                    <input type="email" name="email" className="input-group pl-12" placeholder="rahul@email.com" value={formData.email} onChange={handleChange} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 ml-1">Secure Password</label>
                                            <div className="relative">
                                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
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
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn-primary w-full py-4 text-base mt-6 shadow-indigo-100 shadow-xl" disabled={isOtpSending}>
                                            {isOtpSending ? 'Sending OTP...' : 'Send OTP & Register'}
                                        </button>
                                    </>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-700 text-sm font-medium">
                                            We've sent a 6-digit verification code to <strong>{formData.email}</strong>. Please enter it below.
                                        </div>
                                        
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

                                        <button type="submit" className="btn-primary w-full py-4 text-base mt-2 shadow-indigo-100 shadow-xl" disabled={loading}>
                                            {loading ? 'Verifying...' : 'Verify & Create Account'}
                                        </button>

                                        <div className="flex justify-between items-center mt-4 px-1">
                                            <button 
                                                type="button" 
                                                onClick={() => setStep(1)}
                                                className="text-slate-400 text-xs font-bold hover:text-slate-600 transition-colors uppercase tracking-wider"
                                            >
                                                Edit Email
                                            </button>

                                            {timer > 0 ? (
                                                <span className="text-slate-400 text-xs font-bold">Resend in {timer}s</span>
                                            ) : (
                                                <button 
                                                    type="button" 
                                                    onClick={handleSendOtp}
                                                    className="text-indigo-600 text-xs font-bold hover:underline uppercase tracking-wider"
                                                >
                                                    Resend OTP
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </form>

                            <div className="mt-12 text-center font-bold text-sm pt-8 border-t border-slate-100">
                                <span className="text-slate-400">Already part of the network? </span>
                                <Link to="/login" className="text-indigo-600 hover:underline underline-offset-8 transition-all">Sign In</Link>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
