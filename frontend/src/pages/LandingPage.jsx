import React from 'react';
import { motion } from 'framer-motion';
import {
    Zap,
    Shield,
    Globe,
    ChevronRight,
    ArrowRight,
    Package,
    Navigation,
    TrendingUp,
    MapPin,
    Clock,
    CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="bg-white min-h-screen text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-professional">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-8"
                        >
                            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                            <span className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">Trust-Based Logistics</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-6xl md:text-8xl font-bold text-slate-900 mb-8 tracking-tight leading-[1.05]"
                        >
                            Move items with <br />
                            <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">local travelers.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                        >
                            Empowering people to deliver smarter across India. A secure peer-to-peer network connecting senders with travelers.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link to="/register" className="btn-primary px-8 py-4 text-lg w-full sm:w-auto">
                                Register Account <ArrowRight size={20} />
                            </Link>
                            <Link to="/find-deliveries" className="btn-login px-8 py-4 text-lg w-full sm:w-auto font-semibold">
                                Browse Deliveries
                            </Link>
                        </motion.div>
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-100 pt-12"
                    >
                        {[
                            { label: 'Verified Travelers', val: '12k+' },
                            { label: 'States Covered', val: '28' },
                            { label: 'Fastest Delivery', val: '4h' },
                            { label: 'Carbon Saved', val: '40%' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.val}</div>
                                <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="how-it-works" className="py-32 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">Built for community trust.</h2>
                        <p className="text-xl text-slate-500 max-w-2xl font-medium">We've removed the corporate overhead to prioritize security, speed, and real human connections.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Shield />,
                                title: 'KYC Verified',
                                desc: 'Every user in our network undergoes mandatory identity verification to ensure maximum safety.',
                                tag: 'Safety First'
                            },
                            {
                                icon: <Navigation />,
                                title: 'Direct Transit',
                                desc: 'Your items leverage existing traveler routes—no sorting centers, no delays, no extra CO2.',
                                tag: 'Efficient'
                            },
                            {
                                icon: <TrendingUp />,
                                title: 'Zero Fees',
                                desc: 'As a community platform, we focus on direct person-to-person agreements without hefty taxes.',
                                tag: 'Cost Effective'
                            }
                        ].map((feat, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all group">
                                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    {React.cloneElement(feat.icon, { size: 28 })}
                                </div>
                                <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">{feat.tag}</div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{feat.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Human Element Section */}
            <section className="py-32 px-6 relative overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight">The logistics network with a human touch.</h2>
                        <div className="space-y-6">
                            {[
                                'Secure item handover with real-time location sharing.',
                                'Direct chat with your traveler to coordinate timing.',
                                'Transparent rating system based on verified experiences.',
                                'Leverage the speed of Indias widest transport network.'
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="mt-1 text-emerald-500 bg-emerald-50 p-1 rounded-full">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <p className="text-lg text-slate-600 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="rounded-[40px] overflow-hidden border-8 border-slate-50 shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200"
                                alt="Human Community"
                                className="w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-24 px-6 mb-20">
                <div className="max-w-5xl mx-auto bg-slate-900 rounded-[50px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to join the network?</h2>
                        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">Join thousands of verified users across India simplifying delivery through shared journeys.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link to="/register" className="btn-primary px-12 py-5 text-xl w-full sm:w-auto">Register Now</Link>
                            <Link to="/contact" className="text-lg font-bold hover:text-indigo-300 transition-colors flex items-center gap-2 underline underline-offset-8">Contact Support <ChevronRight size={20} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <Package className="text-white" size={18} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">
                                Carry<span className="text-indigo-600">Mate</span>
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium max-w-sm">Reimagining logistics through community trust and shared travel routes across India.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-sm tracking-widest">Platform</h4>
                        <ul className="space-y-4 text-slate-500 font-medium">
                            <li><Link to="/find-deliveries" className="hover:text-indigo-600">Browse Shipments</Link></li>
                            <li><Link to="/post-trip" className="hover:text-indigo-600">Post a Trip</Link></li>
                            <li><Link to="/login" className="hover:text-indigo-600">Safety & Security</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase text-sm tracking-widest">Company</h4>
                        <ul className="space-y-4 text-slate-500 font-medium">
                            <li><Link to="/contact" className="hover:text-indigo-600">Contact Us</Link></li>
                            <li><Link to="/privacy" className="hover:text-indigo-600">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-indigo-600">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
