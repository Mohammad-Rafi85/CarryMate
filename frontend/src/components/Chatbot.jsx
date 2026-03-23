import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ShieldAlert, Bot, User } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../context/AuthContext';

const genAI = new GoogleGenerativeAI("AIzaSyBi-le53QnJmumcP3GUFsb4tZqlcSnJHpk");

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! I'm your CarryMate AI assistant. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [reportingDispute, setReportingDispute] = useState(false);
    const [disputeData, setDisputeData] = useState({ issue: '', against: '' });
    const { user, isAuthenticated } = useAuth();
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, isBot: false }]);
        setLoading(true);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
            const prompt = `You are the customer support assistant for CarryMate, a P2P micro-delivery platform connecting Senders and Travellers. Be helpful, professional, and concise. The user is asking: ${userMsg}`;
            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            setMessages(prev => [...prev, { id: Date.now(), text: responseText, isBot: true }]);
        } catch (error) {
            console.error("Gemini Error:", error);
            const errMsg = error?.message || error?.toString() || "Unknown error";
            setMessages(prev => [...prev, { id: Date.now(), text: `Error connecting to Gemini API: ${errMsg}. Please ensure the API key is active.`, isBot: true }]);
        } finally {
            setLoading(false);
        }
    };

    const submitDispute = (e) => {
        e.preventDefault();
        if (!disputeData.issue || !disputeData.against) return;

        const newDispute = {
            id: `#DP-${Math.floor(Math.random() * 9000) + 1000}`,
            sender: user?.userType === 'SENDER' ? (user?.username || 'Current Sender') : disputeData.against,
            traveller: user?.userType === 'TRAVELLER' || user?.userType === 'TRAVELER' ? (user?.username || 'Current Traveller') : disputeData.against,
            issue: disputeData.issue,
            status: 'OPEN',
            date: new Date().toISOString().split('T')[0]
        };

        const existing = JSON.parse(localStorage.getItem('carrymate_disputes') || '[]');
        localStorage.setItem('carrymate_disputes', JSON.stringify([newDispute, ...existing]));

        setReportingDispute(false);
        setDisputeData({ issue: '', against: '' });
        setMessages(prev => [...prev, { id: Date.now(), text: `Dispute ${newDispute.id} has been securely logged and forwarded to our admins for immediate review.`, isBot: true }]);
    };

    if (!isAuthenticated || window.location.pathname.includes('/admin')) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px]">
                    <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Bot className="w-5 h-5 text-indigo-400" />
                            <h3 className="font-bold">CarryMate Support</h3>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm' : 'bg-indigo-600 text-white rounded-tr-sm shadow-md'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm flex items-center gap-1 shadow-sm">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {reportingDispute ? (
                        <div className="p-4 bg-white border-t border-slate-200">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest flex items-center"><ShieldAlert className="w-4 h-4 mr-1" /> Open Dispute</span>
                                <button onClick={() => setReportingDispute(false)} className="text-xs text-slate-500 font-bold hover:text-slate-800">Cancel</button>
                            </div>
                            <form onSubmit={submitDispute} className="space-y-3">
                                <input 
                                    type="text" 
                                    placeholder={user?.userType === 'SENDER' ? "Traveller's username" : "Sender's username"}
                                    required 
                                    value={disputeData.against}
                                    onChange={e => setDisputeData({...disputeData, against: e.target.value})}
                                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-rose-500 outline-none"
                                />
                                <textarea 
                                    placeholder="Describe the issue..."
                                    required
                                    rows={2}
                                    value={disputeData.issue}
                                    onChange={e => setDisputeData({...disputeData, issue: e.target.value})}
                                    className="w-full text-sm px-3 py-2 border border-slate-200 rounded-lg focus:ring-1 focus:ring-rose-500 outline-none"
                                />
                                <button type="submit" className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-sm shadow-sm transition-colors">
                                    Submit Report
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="p-4 bg-white border-t border-slate-200">
                            <button 
                                onClick={() => setReportingDispute(true)} 
                                className="mb-3 w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-lg text-xs tracking-wide transition-colors flex items-center justify-center gap-1 border border-rose-100"
                            >
                                <ShieldAlert className="w-4 h-4" /> Report an Issue / Dispute
                            </button>
                            <form onSubmit={handleSend} className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Type your message..."
                                    disabled={loading}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors text-sm"
                                />
                                <button 
                                    type="submit" 
                                    disabled={loading || !input.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}

            {/* Floating Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 ${isOpen ? 'bg-slate-800 text-white' : 'bg-indigo-600 text-white'}`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            </button>
        </div>
    );
};

export default Chatbot;
