import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    BookOpen,
    Zap,
    Shield,
    HelpCircle,
    CreditCard,
    Package,
    User,
    ArrowRight,
    MessageSquare,
    Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HelpCenter = () => {
    const categories = [
        { icon: <Package />, title: "Shipment Basics", count: 12, desc: "How to post, track, and receive items." },
        { icon: <User />, title: "Traveler Guide", count: 8, desc: "Earning while traveling across the grid." },
        { icon: <Shield />, title: "Trust & Safety", count: 15, desc: "Verification and escrow protection." },
        { icon: <CreditCard />, title: "Payments", count: 10, desc: "UPI, refunds, and earnings payout." },
        { icon: <Zap />, title: "Getting Started", count: 5, desc: "Quick start for new CarryMate users." },
        { icon: <HelpCircle />, title: "General FAQ", count: 20, desc: "Common questions about the network." }
    ];

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Search Hero */}
            <section className="bg-professional pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        How can we <span className="text-indigo-600">help?</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-2xl mx-auto relative group"
                    >
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={24} />
                        <input
                            type="text"
                            placeholder="Search for articles, guides..."
                            className="w-full pl-16 pr-8 py-6 bg-white border border-slate-200 rounded-[28px] shadow-xl shadow-slate-200/50 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all text-lg font-medium"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 card-premium hover:-translate-y-1 cursor-pointer group"
                            >
                                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                    {React.cloneElement(cat.icon, { size: 28 })}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{cat.title}</h3>
                                <p className="text-slate-500 font-medium mb-6 leading-relaxed">{cat.desc}</p>
                                <div className="text-sm font-bold text-indigo-600 flex items-center gap-2">
                                    {cat.count} Articles <ArrowRight size={16} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="py-20 px-6 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
                        <BookOpen className="text-indigo-600" />
                        Popular Articles
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            "How to verify your ID for the first time?",
                            "What items are prohibited on CarryMate?",
                            "How does the escrow payment system work?",
                            "Coordinating the pickup with your traveler",
                            "Reporting an issue with a delivery",
                            "Understanding the rating system"
                        ].map((article, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-indigo-100 transition-colors">
                                <span className="font-semibold text-lg text-slate-700 group-hover:text-indigo-600 transition-colors">{article}</span>
                                <ArrowRight size={20} className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Still Need Help? */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Still need assistance?</h2>
                    <p className="text-xl text-slate-500 font-medium mb-12">Our community support team is available 24/7 via chat or email.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Link to="/contact" className="btn-primary px-12 py-5 text-xl flex items-center gap-3">
                            <MessageSquare size={24} /> Contact Support
                        </Link>
                        <button className="btn-login px-12 py-5 text-xl flex items-center gap-3">
                            <Phone size={24} /> +91 800-PLATFORM
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HelpCenter;
