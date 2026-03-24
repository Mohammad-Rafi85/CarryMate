import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, ArrowLeft, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
<<<<<<< HEAD
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const { login, loading } = useAuth();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userData = await login(formData.username, formData.password);

            if (
                formData.username.trim().toLowerCase() === 'carrymate' && 
                formData.password.trim() === '12345678'
            ) {
                navigate('/admin');
                return;
            }
            if (userData.userType === 'SENDER') {
                navigate('/sender/my-shipments');
            } else if (userData.userType === 'TRAVELLER' || userData.userType === 'TRAVELER') {
                navigate('/traveller/feed');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid username or password');
        }
    };

    return (
        <div className="min-h-screen bg-professional flex items-center justify-center p-6">
=======
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pt-24">
            <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-colors group">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>
>>>>>>> fff9d68e72e3e06cdf03555325be188e60fe8b01

            <div className="w-full max-w-4xl">
                <div className="text-center mb-16">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <LogIn className="text-white" size={32} />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Welcome Back</h1>
                    <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">Select how you want to access the professional delivery network today.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    {/* Sender Choice */}
                    <Link to="/login/sender" className="group relative block">
                        <motion.div whileHover={{ y: -8 }} className="h-full bg-white border-2 border-slate-100 group-hover:border-sky-400 rounded-[40px] p-10 transition-all shadow-sm group-hover:shadow-sky-100 group-hover:shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[100px] z-0 transition-transform group-hover:scale-150" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-sky-100 text-sky-600 rounded-3xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 transition-transform">
                                    <Package size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-3">Login as Sender</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">Access your active shipments, track escrow payments, and post new AP routes.</p>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Traveler Choice */}
                    <Link to="/login/traveler" className="group relative block">
                        <motion.div whileHover={{ y: -8 }} className="h-full bg-white border-2 border-slate-100 group-hover:border-emerald-400 rounded-[40px] p-10 transition-all shadow-sm group-hover:shadow-emerald-100 group-hover:shadow-2xl overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[100px] z-0 transition-transform group-hover:scale-150" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-8 -rotate-3 group-hover:-rotate-12 transition-transform">
                                    <Truck size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-3">Login as Traveler</h2>
                                <p className="text-slate-500 font-medium leading-relaxed">Access the portal to find nearby items, manage accepted trips, and earn rewards.</p>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
