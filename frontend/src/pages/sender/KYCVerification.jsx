import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { ShieldCheck, ShieldAlert, CheckCircle, Smartphone, Lock, User as UserIcon } from 'lucide-react';

const KYCVerification = () => {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [kycId, setKycId] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSendOtp = (e) => {
        e.preventDefault();
        setError('');
        
        // Aadhaar must be 12 digits
        if (!/^\d{12}$/.test(kycId)) {
            setError('Please enter a valid 12-digit Aadhaar number.');
            return;
        }

        setLoading(true);
        // Simulate sending OTP
        setTimeout(() => {
            setStep(2);
            setLoading(false);
        }, 1500);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        if (otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }

        setLoading(true);
        setError('');
        
        try {
            await api.post('/kyc/verify', { kycIdReference: kycId });
            setSuccess(true);
            
            // Manually update User context if possible
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                storedUser.kycVerified = true;
                localStorage.setItem('user', JSON.stringify(storedUser));
            }
            
            setTimeout(() => {
                navigate('/sender/my-shipments');
                window.location.reload(); 
            }, 2000);
            
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (user?.kycVerified && !success) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-sm border border-green-100 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Identity Verified</h2>
                <p className="text-gray-600 mb-6">Your Aadhaar verification is already complete. You have full access to the Sender Dashboard.</p>
                <button 
                    onClick={() => navigate('/sender/my-shipments')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Go to My Shipments
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 font-sans">
            <div className="bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-5 mb-8 pb-8 border-b border-slate-100">
                    <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-sm w-fit">
                        <ShieldAlert className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Aadhaar eKYC Verification</h2>
                        <p className="text-slate-500 font-medium text-sm mt-1.5">Verify your identity instantly via Aadhaar OTP.</p>
                    </div>
                </div>

                {success ? (
                    <div className="p-8 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-3xl flex flex-col items-center">
                        <ShieldCheck className="w-16 h-16 mb-4 text-emerald-500 drop-shadow-sm" />
                        <h3 className="text-2xl font-bold mb-2 text-emerald-900">Verification Successful!</h3>
                        <p className="font-medium">Directing you to your dashboard...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="mb-6 p-4 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl text-sm font-semibold">
                                {error}
                            </div>
                        )}
                        
                        {step === 1 && (
                            <form onSubmit={handleSendOtp} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                                        Enter your 12-digit Aadhaar Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <UserIcon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            maxLength="12"
                                            value={kycId}
                                            onChange={(e) => setKycId(e.target.value.replace(/\D/g, ''))}
                                            className="pl-12 w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-900 text-lg tracking-widest"
                                            placeholder="XXXX XXXX XXXX"
                                        />
                                    </div>
                                </div>
                                
                                <div className="bg-indigo-50/50 p-5 rounded-xl flex items-start space-x-3 border border-indigo-100/50">
                                    <input type="checkbox" required className="mt-1 w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300" id="consent" />
                                    <label htmlFor="consent" className="text-xs text-indigo-900/80 font-medium leading-relaxed">
                                        I hereby consent to provide my Aadhaar Number to CarryMate for authentication with UIDAI. I understand my Aadhaar number will not be stored according to UIDAI guidelines.
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || kycId.length !== 12}
                                    className={`w-full py-4 rounded-xl font-bold text-white transition-all flex justify-center items-center gap-2 ${
                                        loading || kycId.length !== 12 ? 'bg-indigo-300 shadow-none cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-[0_4px_12px_rgba(79,70,229,0.25)] hover:-translate-y-0.5'
                                    }`}
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <><span>Generate OTP</span><Smartphone className="w-5 h-5" /></>
                                    )}
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleVerifyOtp} className="space-y-6">
                                <div className="text-center mb-8">
                                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Smartphone className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">OTP Sent universally</h3>
                                    <p className="text-sm text-slate-500 mt-1">Please enter the 6-digit OTP sent to the mobile number legally verified with Aadhaar <span className="font-bold text-slate-700">XXXX XXXX {kycId.slice(-4)}</span>.</p>
                                </div>
                                
                                <div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            maxLength="6"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                            className="pl-12 text-center w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-slate-900 text-2xl tracking-[0.5em]"
                                            placeholder="••••••"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="py-4 px-6 rounded-xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all border border-slate-200"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading || otp.length !== 6}
                                        className={`flex-1 py-4 rounded-xl font-bold text-white transition-all flex justify-center items-center ${
                                            loading || otp.length !== 6 ? 'bg-indigo-300 shadow-none cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-[0_4px_12px_rgba(79,70,229,0.25)] hover:-translate-y-0.5'
                                        }`}
                                    >
                                        {loading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            'Verify Identity'
                                        )}
                                    </button>
                                </div>
                                <div className="text-center text-sm">
                                    <span className="text-slate-500">Didn't receive code? </span>
                                    <button type="button" className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors" onClick={handleSendOtp}>Resend via SMS</button>
                                </div>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default KYCVerification;
