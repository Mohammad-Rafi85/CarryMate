import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Package, Menu, X, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'How it Works', path: '#how-it-works' },
        { name: 'Deliveries', path: '/find-deliveries' },
        { name: 'Trips', path: '/post-trip' },
    ];

    if (isAuthenticated) {
        navLinks.unshift({ name: 'Dashboard', path: '/dashboard' });
    }

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'py-5 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center shadow-indigo-200 shadow-lg group-hover:bg-indigo-700 transition-colors">
                        <Package className="text-white" size={20} />
                    </div>
                    <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                        Carry<span className="text-indigo-600">Mate</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="h-4 w-px bg-slate-200 mx-2" />

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                                    <UserIcon size={14} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">{user.username}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                                title="Logout"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn-primary py-2 px-5 text-sm">
                                Register
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden shadow-xl"
                    >
                        <div className="px-6 py-8 flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-semibold text-slate-900"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-slate-100 my-2" />
                            {isAuthenticated ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 text-rose-600 font-semibold"
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="btn-login py-4 justify-center">Sign In</Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn-primary py-4 justify-center">Start Shipping</Link>
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
