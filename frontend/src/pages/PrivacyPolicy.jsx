import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-mesh pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-10 md:p-16 bg-white/70 backdrop-blur-3xl"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                            <Shield size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Privacy Policy</h1>
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-800 font-bold leading-relaxed space-y-8">
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                <Eye className="text-indigo-600" size={24} /> 1. Data Collection
                            </h2>
                            <p>
                                At CarryMate, we collect information that you provide directly to us when you create an account, post a delivery request, or offer to carry an item. This includes your name, email address, phone number, and location data necessary for matching users.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                <Lock className="text-indigo-600" size={24} /> 2. Information Security
                            </h2>
                            <p>
                                We implement industry-standard security measures to protect your personal information. Your payment details are processed through secure, encrypted gateways (UPI/Stripe) and are never stored on our servers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                <FileText className="text-indigo-600" size={24} /> 3. Usage of Information
                            </h2>
                            <p>
                                We use the information we collect to operate, maintain, and provide the features of the CarryMate platform. This includes matching senders with travelers, processing payments, and communicating with you about your shipments.
                            </p>
                        </section>

                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 mt-12 text-sm text-slate-700 italic font-bold">
                            Last updated: February 24, 2025. CarryMate reserves the right to modify this policy at any time.
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
