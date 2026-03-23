import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Camera, CheckCircle2, ShieldAlert, UploadCloud, Car, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TravellerKYC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    
    // Form state
    const [kycData, setKycData] = useState({
        documentNumber: '',
        vehicleType: 'BIKE',
        vehicleReg: '',
    });
    const [documentImage, setDocumentImage] = useState(null);
    const [selfieImage, setSelfieImage] = useState(null);

    const handleFileChange = (e, setter) => {
        if (e.target.files && e.target.files[0]) {
            setter(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleNext = () => setStep(step + 1);

    const handleSubmit = async () => {
        setLoading(true);
        // Simulate API call to verification endpoint
        setTimeout(() => {
            // Update local user state or backend
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) {
                storedUser.kycVerified = true;
                storedUser.vehicleDetails = kycData.vehicleReg;
                localStorage.setItem('user', JSON.stringify(storedUser));
            }
            setLoading(false);
            setStep(4); // Success step
            setTimeout(() => {
                // Force a reload to reflect KYC globally in layout
                window.location.href = '/traveller/feed';
            }, 2000);
        }, 1500);
    };

    if (user?.kycVerified && step !== 4) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <div className="bg-white p-12 rounded-3xl text-center shadow-sm border border-emerald-100 max-w-sm">
                    <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-slate-800">Account Verified</h2>
                    <p className="text-slate-500 mt-2 text-sm">Your traveller account is fully verified. You can accept deliveries now.</p>
                    <button onClick={() => navigate('/traveller/feed')} className="mt-6 w-full py-3 bg-emerald-500 text-white rounded-xl font-bold">Go to Feed</button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                    <ShieldAlert className="w-8 h-8 text-emerald-500" />
                    Traveller Onboarding
                </h1>
                <p className="text-sm text-slate-500 mt-1">Complete your verification to start earning rewards.</p>
            </div>

            {/* Steps Progress */}
            <div className="flex gap-2 mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${step >= i ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                ))}
            </div>

            <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
                {step === 1 && (
                    <div className="space-y-6">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2"><CreditCard className="w-5 h-5 text-emerald-500" /> Verify Identity</h2>
                            <p className="text-sm text-slate-500">Provide your official Driver's License or Aadhaar ID.</p>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Document ID Number</label>
                            <input type="text" value={kycData.documentNumber} onChange={e => setKycData({...kycData, documentNumber: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" placeholder="e.g. DL-14202100" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Upload ID Document</label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                {documentImage ? (
                                    <div className="text-emerald-600 font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5" /> Image Attached</div>
                                ) : (
                                    <>
                                        <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                                        <span className="text-sm font-medium text-slate-500">Tap to upload your ID card</span>
                                    </>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setDocumentImage)} />
                            </label>
                        </div>
                        <button onClick={handleNext} disabled={!kycData.documentNumber || !documentImage} className="w-full py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 mt-4 shadow-md">Next Step</button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2"><Car className="w-5 h-5 text-emerald-500" /> Vehicle Details</h2>
                            <p className="text-sm text-slate-500">How will you be delivering packages?</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button onClick={() => setKycData({...kycData, vehicleType: 'BIKE'})} className={`py-4 border-2 rounded-xl font-bold flex flex-col items-center gap-2 transition-all ${kycData.vehicleType === 'BIKE' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>🏍️ Bike / Scooter</button>
                            <button onClick={() => setKycData({...kycData, vehicleType: 'CAR'})} className={`py-4 border-2 rounded-xl font-bold flex flex-col items-center gap-2 transition-all ${kycData.vehicleType === 'CAR' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>🚗 Car / Van</button>
                        </div>
                        <div className="mt-6">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Registration Number (License Plate)</label>
                            <input type="text" value={kycData.vehicleReg} onChange={e => setKycData({...kycData, vehicleReg: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none uppercase font-black tracking-widest" placeholder="UP 14 AC 8080" />
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button onClick={() => setStep(1)} className="px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">Back</button>
                            <button onClick={handleNext} disabled={!kycData.vehicleReg} className="flex-1 py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-md">Next Step</button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 text-center">
                        <div className="mb-8 text-left">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-2"><Camera className="w-5 h-5 text-emerald-500" /> Security Selfie</h2>
                            <p className="text-sm text-slate-500">Take a clear picture of your face to match your ID.</p>
                        </div>
                        
                        <div className="mx-auto w-48 h-48 rounded-full border-4 border-emerald-100 bg-emerald-50 flex items-center justify-center overflow-hidden relative">
                            {selfieImage ? (
                                <img src={selfieImage} alt="Selfie" className="w-full h-full object-cover" />
                            ) : (
                                <Camera className="w-12 h-12 text-emerald-300" />
                            )}
                            <input type="file" accept="image/*" capture="user" onChange={(e) => handleFileChange(e, setSelfieImage)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                        </div>
                        <p className="font-bold text-emerald-600 text-sm mt-3">{selfieImage ? 'Tap image to retake' : 'Tap to open camera'}</p>

                        <div className="flex gap-4 mt-8 pt-8 border-t border-slate-100">
                            <button onClick={() => setStep(2)} disabled={loading} className="px-6 py-4 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors">Back</button>
                            <button onClick={handleSubmit} disabled={!selfieImage || loading} className="flex-1 py-4 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50 shadow-md flex items-center justify-center gap-2">
                                {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Verify & Complete'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="py-10 text-center">
                        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 mb-2">Onboarding Complete!</h2>
                        <p className="text-slate-500 font-medium">Your profile is now fully approved for deliveries.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravellerKYC;
