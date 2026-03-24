import React from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
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

=======
import { Link } from 'react-router-dom';
import { Building, Globe, ArrowLeft, ArrowRight } from 'lucide-react';

const Register = () => {
>>>>>>> fff9d68e72e3e06cdf03555325be188e60fe8b01
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors group z-20">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <div className="w-full max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Join CarryMate</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-500 font-medium">How would you like to use our platform?</motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <Link to="/register/sender" className="block h-full bg-white rounded-[40px] p-10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group border border-slate-100 hover:border-indigo-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[50px] group-hover:bg-indigo-100 transition-colors" />
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                <Building size={32} />
                            </div>
<<<<<<< HEAD
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Registration Successful!</h2>
                            <p className="text-slate-500 font-medium">Welcome {formData.fullName || formData.username}! Redirecting you to sign in...</p>
                        </motion.div>
                    ) : (
                        <div>
                            <div className="mb-10">
                                <h2 className="text-3xl font-bold text-slate-900 mb-2">Create Account</h2>
                                <p className="text-slate-500 font-medium tracking-tight">Enter your professional details to get started.</p>
=======
                            <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">I want to Send</h2>
                            <p className="text-slate-500 leading-relaxed mb-8">Ship your packages faster and cheaper by leveraging our network of verified travelers.</p>
                            <div className="flex items-center text-indigo-600 font-bold gap-2">
                                Register as Sender <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
>>>>>>> fff9d68e72e3e06cdf03555325be188e60fe8b01
                            </div>
                        </Link>
                    </motion.div>

<<<<<<< HEAD
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
=======
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <Link to="/register/traveler" className="block h-full bg-white rounded-[40px] p-10 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group border border-slate-100 hover:border-emerald-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[50px] group-hover:bg-emerald-100 transition-colors" />
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                <Globe size={32} />
>>>>>>> fff9d68e72e3e06cdf03555325be188e60fe8b01
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">I am Traveling</h2>
                            <p className="text-slate-500 leading-relaxed mb-8">Monetize your empty luggage space by delivering items safely along your existing route.</p>
                            <div className="flex items-center text-emerald-600 font-bold gap-2">
                                Register as Traveler <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>
                </div>
                
                <div className="mt-16 text-center font-bold text-sm">
                    <span className="text-slate-400">Already have an account? </span>
                    <Link to="/login" className="text-indigo-600 hover:underline underline-offset-8 transition-all">Sign In Here</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
