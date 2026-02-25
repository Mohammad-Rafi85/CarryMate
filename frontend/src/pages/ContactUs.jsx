import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, X, MessageSquare, Phone, Mail, MapPin } from 'lucide-react';

const ContactUs = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Namaste! I'm your CarryMate assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response logic
        setTimeout(() => {
            let botText = "I'm not sure about that. Would you like to speak with a human agent?";
            const input = userMsg.text.toLowerCase();

            if (input.includes('hello') || input.includes('hi')) {
                botText = "Hello! Looking to send a package or earn while traveling?";
            } else if (input.includes('delivery') || input.includes('send')) {
                botText = "To send a package, just head to your Dashboard and click 'New Shipment'. We have travelers ready across all major Indian cities!";
            } else if (input.includes('earn') || input.includes('trip')) {
                botText = "You can earn by posting your upcoming trips. Travelers on trains and flights are making up to ₹2000 per trip!";
            } else if (input.includes('safe') || input.includes('secure')) {
                botText = "Safety is our priority! We use a UPI-linked escrow system and OTP verification for every single delivery.";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-mesh pt-32 pb-20 px-6 relative overflow-hidden text-white">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col justify-center gap-16"
                >
                    <div>
                        <h1 className="text-7xl font-black text-white tracking-tighter mb-8 leading-[0.8]">Support <br /><span className="accent-text uppercase italic">Network.</span></h1>
                        <p className="text-2xl text-slate-400 font-black max-w-lg leading-relaxed italic">Our logistics assistance grid is active 24/7. Connect with our AI or human agents.</p>
                    </div>

                    <div className="grid gap-6">
                        {[
                            { icon: <Mail size={24} />, title: "Transmission", detail: "logistics@carrymate.io" },
                            { icon: <Phone size={24} />, title: "Vocal Support", detail: "+91 800-PLATFORM" },
                            { icon: <MapPin size={24} />, title: "Grid Hub", detail: "HSR Quadrant, Bengaluru" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-8 p-8 glass-card">
                                <div className="w-16 h-16 bg-white/5 text-cyan-400 border border-white/10 rounded-[24px] flex items-center justify-center group-hover:rotate-12 transition-transform duration-500 shadow-glow">
                                    {item.icon}
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2">{item.title}</div>
                                    <div className="text-xl font-black text-white tracking-tight">{item.detail}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Chat Agent */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card overflow-hidden flex flex-col h-[750px] ring-1 ring-white/10"
                >
                    {/* Chat Header */}
                    <div className="p-10 bg-slate-950/80 backdrop-blur-md text-white flex items-center justify-between border-b border-white/5">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-[20px] flex items-center justify-center shadow-glow">
                                <Bot size={30} />
                            </div>
                            <div>
                                <div className="font-black text-xl tracking-tight">CM-Grid Assistant</div>
                                <div className="text-[10px] font-black text-cyan-400 flex items-center gap-2 uppercase tracking-widest mt-1">
                                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-glow" /> Connection active
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat Body */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-10 space-y-8 bg-slate-950/20 scroll-smooth">
                        <AnimatePresence>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-6 rounded-[32px] text-base font-bold leading-relaxed shadow-sm ${msg.sender === 'user'
                                        ? 'bg-cyan-500 text-slate-950 rounded-tr-none'
                                        : 'bg-white/5 text-white rounded-tl-none border border-white/10'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-2"
                                >
                                    <div className="bg-white/5 p-5 rounded-[24px] rounded-tl-none border border-white/10 flex gap-1.5 shadow-sm">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-duration:1s]" />
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.2s]" />
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.4s]" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Chat Input */}
                    <div className="p-8 bg-slate-950/50 backdrop-blur-md border-t border-white/5">
                        <div className="relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Transmission start..."
                                className="w-full bg-white/5 border-2 border-white/5 rounded-[24px] py-6 pl-10 pr-20 font-black text-white focus:border-cyan-400/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-800 shadow-inner"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-14 h-14 bg-cyan-400 text-slate-950 rounded-[18px] flex items-center justify-center hover:bg-white transition-all shadow-glow active:scale-95"
                            >
                                <Send size={24} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;
