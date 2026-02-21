import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Package, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = isAuthenticated ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Send Item', path: '/post-delivery' },
        { name: 'Post Trip', path: '/post-trip' },
    ] : [];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200' : 'py-5 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform duration-300">
                        <Package className="text-white" size={22} />
                    </div>
                    <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                        Carry<span className="text-indigo-600">Mate</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                        >
                            {link.name}
                        </Link>
                    ))}

                    <div className="h-6 w-px bg-slate-200 mx-2" />

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-900">{user.username}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                                    {user.userType || 'MEMBER'}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-200 group"
                                title="Logout"
                            >
                                <LogOut size={18} className="group-active:scale-90 transition-transform" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-6">
                            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary py-2 px-5 text-sm">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-semibold text-slate-600"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-rose-500 font-bold mt-4"
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            ) : (
                                <div className="flex flex-col gap-4 mt-4">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn-secondary py-3">Login</Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary py-3">Get Started</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
