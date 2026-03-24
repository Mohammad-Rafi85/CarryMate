import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Send,
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    CheckCircle2,
    ArrowRight,
    Globe,
    Shield
} from 'lucide-react';

const ContactUs = () => {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare mailto link with developer's email
        const targetEmail = "carrymate@gmail.com";
        const bodyContent = `Name: ${formState.name}%0AEmail: ${formState.email}%0A%0AMessage:%0A${formState.message}`;
        const mailtoLink = `mailto:${targetEmail}?subject=${encodeURIComponent(formState.subject)}&body=${bodyContent}`;

        // Open user's default mail client
        window.location.href = mailtoLink;

        // Show success state on UI
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans bg-slate-50 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-50/50 via-slate-50 to-white">
            {/* Header Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-professional">
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-indigo-700 tracking-wide uppercase">Support Network Active</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
                    >
                        Get in touch with <br />
                        <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">our grid hubs.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-500 max-w-2xl mx-auto font-medium"
                    >
                        Whether you're a sender or a traveler, we're here to ensure your CarryMate experience is seamless and secure.
                    </motion.p>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8 mb-20">
                        {[
                            {
                                icon: <Mail className="text-indigo-600" />,
                                title: "Email Support",
                                detail: "carrymate@gmail.com",
                                desc: "Our response time is under 12 hours."
                            },
                            {
                                icon: <Phone className="text-indigo-600" />,
                                title: "Phone Line",
                                detail: "+91 8978826008",
                                desc: "Available Mon-Fri, 9am - 6pm IST."
                            },
                            {
                                icon: <MapPin className="text-indigo-600" />,
                                title: "Headquarters",
                                detail: "HSR Layout, Bengaluru",
                                desc: "The heart of India's logistics tech."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 card-premium group cursor-pointer"
                            >
                                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 transition-colors">
                                    {React.cloneElement(item.icon, { size: 28, className: "group-hover:text-white transition-colors" })}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                                <p className="text-lg font-semibold text-slate-900 mb-2">{item.detail}</p>
                                <p className="text-slate-500 font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Interaction Area */}
                    <div className="grid lg:grid-cols-2 gap-20 items-start">
                        {/* FAQ/Info Side */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-8">Common Questions</motion.h2>
                            <div className="space-y-10">
                                {[
                                    {
                                        q: "How secure is the item handover?",
                                        a: "We use OTP-based verification and real-time photo confirmation at every handover point."
                                    },
                                    {
                                        q: "What if my traveler is delayed?",
                                        a: "Our app provides real-time tracking. In case of delays, our support team can help coordinate alternatives."
                                    },
                                    {
                                        q: "Are there any size restrictions?",
                                        a: "Items must fit within the traveler's stated capacity (e.g., laptop bag, cabin bag, or check-in)."
                                    }
                                ].map((faq, i) => (
                                    <motion.div key={i} variants={itemVariants} className="flex gap-6">
                                        <div className="mt-1 flex-shrink-0 w-8 h-8 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold mb-2">{faq.q}</h4>
                                            <p className="text-slate-500 font-medium leading-relaxed">{faq.a}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                variants={itemVariants}
                                className="mt-16 p-8 bg-indigo-900 rounded-[32px] text-white relative overflow-hidden shadow-2xl shadow-indigo-200"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                        <Shield size={24} className="text-indigo-300" />
                                        Safety Grid Active
                                    </h3>
                                    <p className="text-indigo-100/80 mb-6 font-medium">Our India-wide network is monitored 24/7 for maximum delivery security and user trust.</p>
                                    <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-indigo-300">
                                        <span>12k+ Verified Users</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Contact Form Side */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-12 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50"
                        >
                            {isSubmitted ? (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                                    <p className="text-slate-500 font-medium text-lg">Thank you for reaching out. A CarryMate representative will contact you shortly.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-10">
                                        <h3 className="text-3xl font-bold mb-2">Send us a message</h3>
                                        <p className="text-slate-500 font-medium">We'll get back to you faster than a flight.</p>
                                    </div>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter ml-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    className="input-group"
                                                    placeholder="John Doe"
                                                    value={formState.name}
                                                    onChange={e => setFormState({ ...formState, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter ml-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    required
                                                    className="input-group"
                                                    placeholder="john@example.com"
                                                    value={formState.email}
                                                    onChange={e => setFormState({ ...formState, email: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter ml-1">Subject</label>
                                            <input
                                                type="text"
                                                required
                                                className="input-group"
                                                placeholder="Shipping Query"
                                                value={formState.subject}
                                                onChange={e => setFormState({ ...formState, subject: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700 uppercase tracking-tighter ml-1">Message</label>
                                            <textarea
                                                rows="5"
                                                required
                                                className="input-group resize-none"
                                                placeholder="Tell us how we can help..."
                                                value={formState.message}
                                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn-primary w-full py-5 text-lg font-bold">
                                            Send Transmission <Send size={20} className="ml-2" />
                                        </button>
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-24 px-6">
                <div className="max-w-5xl mx-auto bg-slate-900 rounded-[50px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-50 text-white">Need immediate help?</h2>
                        <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">Check our detailed documentation or speak with our live chat agents in the dashboard.</p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link to="/help-center" className="btn-primary px-12 py-5 text-xl w-full sm:w-auto">Open Help Center</Link>
                            <span className="text-slate-400 font-bold hidden sm:inline">OR</span>
                            <div className="flex items-center gap-2 text-white font-bold text-lg underline underline-offset-8">
                                <MessageSquare size={20} className="text-indigo-400" /> Live Chat System
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
