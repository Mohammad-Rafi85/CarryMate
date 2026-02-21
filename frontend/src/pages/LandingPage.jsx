import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Plane, Shield, Zap, Globe, Users, Trophy, ChevronRight } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-mesh min-h-screen">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[500px] h-[500px] bg-teal-500/10 blur-[100px] rounded-full animate-float" />

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold border border-indigo-100 mb-8"
                    >
                        <Zap size={14} fill="currentColor" />
                        <span>Reinventing Global Logistics</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-slate-900 tracking-tight leading-[0.9] mb-8"
                    >
                        Ship smarter with <br />
                        <span className="gradient-text">CarryMate.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        The world's first peer-to-peer delivery network. Connect with travelers and ship items globally, faster and more sustainably than ever.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/register" className="btn-primary w-full sm:w-auto px-10 py-4 text-lg">
                            Get Started Now <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="btn-secondary w-full sm:w-auto px-10 py-4 text-lg">
                            Track Shipment
                        </Link>
                    </motion.div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, type: 'spring' }}
                        className="mt-20 relative max-w-5xl mx-auto"
                    >
                        <div className="glass-card p-2 bg-white/40 ring-1 ring-slate-200 shadow-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2070"
                                alt="Platform Preview"
                                className="w-full rounded-[20px] shadow-sm"
                            />
                            {/* Floating Stats */}
                            <div className="absolute top-10 -right-8 glass-card p-6 hidden lg:block animate-float">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                        <Trophy size={24} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-2xl font-black text-slate-900">10k+</div>
                                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Successful Mates</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Delivery Redefined.</h2>
                        <p className="text-lg text-slate-500">Why wait weeks when you can ship with a mate?</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: <Zap />, title: 'Lightning Speed', desc: 'Same-day or next-day delivery on common travel routes between major cities.', color: 'indigo' },
                            { icon: <Shield />, title: 'Trusted Escrow', desc: 'Secure payment system releases funds only after proof of successful delivery.', color: 'teal' },
                            { icon: <Globe />, title: 'Green Logistics', desc: 'Zero extra carbon footprint by utilizing unused space in traveler luggage.', color: 'purple' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-8 bg-white border border-slate-100 rounded-[32px] hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className={`w-14 h-14 bg-${feature.color}-50 text-${feature.color}-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-6">{feature.desc}</p>
                                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm cursor-pointer group/link">
                                    Learn More <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="pb-32 px-6">
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto bg-slate-900 rounded-[48px] p-12 md:p-24 relative overflow-hidden text-center"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to join the <br /> <span className="text-indigo-400">logistics revolution?</span></h2>
                        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">Join thousands of senders and travelers already saving time and money with CarryMate.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/register" className="btn-primary bg-white text-slate-900 hover:bg-slate-100 py-4 px-10 text-lg">Join Now</Link>
                            <Link to="/login" className="border border-slate-700 text-white hover:bg-slate-800 rounded-xl py-4 px-10 font-bold transition-colors text-lg">Sign In</Link>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <Package size={16} />
                        </div>
                        <span className="text-xl font-black text-slate-900">CarryMate</span>
                    </div>
                    <div className="flex gap-10 text-sm font-bold text-slate-400">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Contact Us</a>
                    </div>
                    <div className="text-slate-400 text-sm font-medium italic">
                        © 2024 Carry Mate Inc. Handcrafted for global citizens.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
