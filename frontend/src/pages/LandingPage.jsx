import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Plane, Shield, Zap, Globe } from 'lucide-react';

const LandingPage = () => {
    return (
        <div style={{ background: 'var(--bg-page)', minHeight: '100vh', overflowX: 'hidden' }}>
            {/* Hero Section */}
            <section style={{
                padding: '120px 20px',
                textAlign: 'center',
                background: 'radial-gradient(circle at top right, var(--indigo-50), transparent), radial-gradient(circle at bottom left, #fff1f2, transparent)',
                position: 'relative'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ maxWidth: '900px', margin: '0 auto' }}
                >
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 20px',
                        background: 'var(--indigo-50)',
                        color: 'var(--primary)',
                        borderRadius: '100px',
                        fontSize: '13px',
                        fontWeight: '700',
                        marginBottom: '32px',
                        border: '1px solid var(--indigo-100)'
                    }}>
                        <Zap size={14} fill="var(--primary)" /> Trusted by 10k+ users globally
                    </div>
                    <h1 style={{ fontSize: 'clamp(48px, 8vw, 84px)', fontWeight: '800', lineHeight: '1', color: 'var(--text-main)', marginBottom: '32px', letterSpacing: '-3px' }}>
                        Ship smarter with <span style={{ color: 'var(--primary)' }}>CarryMate.</span>
                    </h1>
                    <p style={{ fontSize: '22px', color: 'var(--text-muted)', marginBottom: '48px', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 48px' }}>
                        The peer-to-peer delivery network that connects travelers with people who need to ship items globally.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/register" className="btn-auth" style={{ width: 'auto', padding: '18px 40px', fontSize: '18px' }}>
                            Start Shipping <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" style={{
                            padding: '18px 40px',
                            fontSize: '18px',
                            color: 'var(--text-main)',
                            fontWeight: '700',
                            textDecoration: 'none',
                            border: '2px solid var(--border-color)',
                            borderRadius: '12px',
                            background: 'white',
                            transition: 'all 0.2s'
                        }}>
                            Track Item
                        </Link>
                    </div>
                </motion.div>

                {/* Floating Preview Image */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ marginTop: '100px', maxWidth: '1100px', margin: '100px auto 0' }}
                >
                    <div style={{
                        background: 'white',
                        padding: '12px',
                        borderRadius: '32px',
                        boxShadow: '0 25px 60px rgba(15, 23, 42, 0.1)',
                        border: '1.5px solid var(--border-color)'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=2070"
                            alt="CarryMate Dashboard Area"
                            style={{ width: '100%', borderRadius: '22px', display: 'block' }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '120px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <h2 style={{ fontSize: '42px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '20px', letterSpacing: '-1.5px' }}>Delivery redefined.</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '18px' }}>Why follow the old ways when you can ship with a mate?</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                    {[
                        { icon: <Zap />, title: 'Lightning Speed', desc: 'Why wait weeks? Get your items delivered same-day or next-day on common travel routes.' },
                        { icon: <Shield />, title: 'Trusted Escrow', desc: 'Secure payment system releases funds only when the item is safely delivered.' },
                        { icon: <Globe />, title: 'Zero Boredom', desc: 'Meet incredible travelers and be part of a community-driven shipping revolution.' }
                    ].map((feature, i) => (
                        <div key={i} style={{
                            padding: '40px',
                            background: 'white',
                            borderRadius: '24px',
                            border: '1.5px solid var(--border-color)',
                            transition: 'all 0.3s ease',
                            cursor: 'default'
                        }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}>
                            <div style={{ width: '56px', height: '56px', background: 'var(--indigo-50)', color: 'var(--primary)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-main)', marginBottom: '16px' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '15px' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '80px 20px' }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    background: 'var(--text-main)',
                    borderRadius: '40px',
                    padding: '80px 40px',
                    textAlign: 'center',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '24px', letterSpacing: '-2px' }}>Ready to start?</h2>
                        <p style={{ fontSize: '20px', opacity: 0.7, marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>Join thousands of members already shipping and traveling with CarryMate.</p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <Link to="/register" className="btn-auth" style={{ width: 'auto', padding: '18px 48px', background: 'white', color: 'var(--text-main)', fontSize: '17px' }}>Join the community</Link>
                        </div>
                    </div>
                    {/* Decorative Circles */}
                    <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(79, 70, 229, 0.2)', filter: 'blur(60px)' }}></div>
                    <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', filter: 'blur(60px)' }}></div>
                </div>
            </section>

            <footer style={{ padding: '80px 20px', color: 'var(--text-muted)', fontSize: '14px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Package color="white" size={18} />
                        </div>
                        <span style={{ fontWeight: '800', color: 'var(--text-main)', fontSize: '20px', letterSpacing: '-0.5px' }}>CarryMate</span>
                    </div>
                    <div style={{ display: 'flex', gap: '32px', fontWeight: '600' }}>
                        <span>© 2024 Carry Mate Inc.</span>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</a>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
