import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building, Globe, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

const Register = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            <Link to="/" className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold transition-colors group z-20">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </Link>

            <div className="w-full max-w-5xl relative z-10">
                <div className="text-center mb-16">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Join CarryMate</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-xl text-slate-500 font-medium">How would you like to use our platform today?</motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Sender Choice */}
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <Link to="/register/sender" className="block h-full bg-white rounded-[40px] p-10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group border border-slate-100 hover:border-indigo-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-[50px] group-hover:bg-indigo-100 transition-colors" />
                            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                <Building size={32} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">I want to Send</h2>
                            <p className="text-slate-500 leading-relaxed mb-8">Ship your packages faster and cheaper by leveraging our network of verified travelers.</p>
                            <div className="flex items-center text-indigo-600 font-bold gap-2">
                                Register as Sender <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* Traveler Choice */}
                    <motion.div initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                        <Link to="/register/traveler" className="block h-full bg-white rounded-[40px] p-10 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all group border border-slate-100 hover:border-emerald-100 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-[50px] group-hover:bg-emerald-100 transition-colors" />
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                <Globe size={32} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">I am Traveling</h2>
                            <p className="text-slate-500 leading-relaxed mb-8">Monetize your empty luggage space by delivering items safely along your existing route.</p>
                            <div className="flex items-center text-emerald-600 font-bold gap-2">
                                Register as Traveler <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </motion.div>

                    {/* Admin Choice */}
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                        <Link to="/register/admin" className="block h-full bg-white rounded-[40px] p-10 hover:shadow-2xl hover:shadow-slate-500/10 transition-all group border border-slate-100 hover:border-slate-900 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-[50px] group-hover:bg-slate-200 transition-colors" />
                            <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                                <ShieldCheck size={32} />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-slate-900 transition-colors">Platform Admin</h2>
                            <p className="text-slate-500 leading-relaxed mb-8">Manage users, solve disputes, and oversee the platform's global operations officially.</p>
                            <div className="flex items-center text-slate-900 font-bold gap-2">
                                Register as Admin <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
