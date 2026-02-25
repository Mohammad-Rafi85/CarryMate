import React from 'react';
import { motion } from 'framer-motion';
import { Scale, Gavel, AlertCircle, CheckCircle } from 'lucide-react';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-mesh pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-10 md:p-16 bg-white/70 backdrop-blur-3xl"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-teal-500/20">
                            <Scale size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Terms of Service</h1>
                    </div>

                    <div className="prose prose-slate prose-lg max-w-none text-slate-800 font-bold leading-relaxed space-y-8">
                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                <Gavel className="text-teal-600" size={24} /> 1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing or using the CarryMate platform, you agree to be bound by these Terms of Service and all applicable laws and regulations in India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                <AlertCircle className="text-teal-600" size={24} /> 2. User Responsibilities
                            </h2>
                            <p>
                                Travelers are responsible for ensuring they do not carry any prohibited items (e.g., narcotics, flammable materials, illegal goods). Senders must accurately describe all items being shipped. CarryMate is a peer-to-peer facilitator and is not liable for the contents of shipments.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                                <CheckCircle className="text-teal-600" size={24} /> 3. Payment & Escrow
                            </h2>
                            <p>
                                All payments are held in escrow. Funds are only released to the traveler upon successful verification of the delivery via the one-time-password (OTP) provided to the recipient.
                            </p>
                        </section>

                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 mt-12 text-sm text-slate-700 italic font-bold">
                            By using CarryMate, you acknowledge that you are at least 18 years of age and authorized to enter into this agreement.
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
