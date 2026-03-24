import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Phone,
    ChevronDown,
    ChevronUp
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

    const articles = [
        {
            q: "How to verify your ID for the first time?",
            a: "To verify your ID, navigate to your Profile dashboard, click on 'Verify Identity', and securely upload a scanned copy of your government-issued ID. Verification typically takes up to 24 hours."
        },
        {
            q: "What items are prohibited on CarryMate?",
            a: "Prohibited items include illegal substances, hazardous materials, firearms, perishables lacking proper packaging, and extremely fragile items without traveler consent. Please consult our Terms of Service for the complete list."
        },
        {
            q: "How does the escrow payment system work?",
            a: "When a delivery is agreed upon, the sender's payment is securely held in escrow. It is only released to the traveler once the item is confirmed delivered by both parties, ensuring total protection."
        },
        {
            q: "Coordinating the pickup with your traveler",
            a: "Once a match is confirmed, you can use our secure in-app chat to discuss safe meeting spots, recognize each other, and complete the OTP-based handover process."
        },
        {
            q: "Reporting an issue with a delivery",
            a: "If an issue arises, navigate to your active shipments, select 'Report Issue', and provide details along with any photo evidence. Our 24/7 support grid will intervene immediately."
        },
        {
            q: "Understanding the rating system",
            a: "After every successful handover, both the sender and the traveler can rate each other out of 5 stars and leave a review. Consistently high ratings unlock priority matching status."
        }
    ];

    const [activeArticle, setActiveArticle] = useState(null);

    const toggleArticle = (index) => {
        setActiveArticle(activeArticle === index ? null : index);
    };

    return (
        <div className="min-h-screen text-slate-900 font-sans bg-slate-50 bg-gradient-to-b from-slate-50 via-indigo-50/30 to-slate-50">
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
                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        {articles.map((article, i) => (
                            <motion.div 
                                key={i} 
                                className="bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer hover:border-indigo-100 transition-colors shadow-sm"
                                onClick={() => toggleArticle(i)}
                                layout
                            >
                                <div className="p-6 flex items-center justify-between group">
                                    <span className={`font-semibold text-lg transition-colors ${activeArticle === i ? 'text-indigo-600' : 'text-slate-700 group-hover:text-indigo-600'}`}>
                                        {article.q}
                                    </span>
                                    {activeArticle === i ? (
                                        <ChevronUp size={20} className="text-indigo-600 flex-shrink-0 ml-4" />
                                    ) : (
                                        <ChevronDown size={20} className="text-slate-300 group-hover:text-indigo-600 flex-shrink-0 ml-4 transition-colors" />
                                    )}
                                </div>
                                <AnimatePresence>
                                    {activeArticle === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="px-6 pb-6 text-slate-500 leading-relaxed font-medium">
                                                <div className="border-t border-slate-100 pt-4 mt-2">
                                                    {article.a}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
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
