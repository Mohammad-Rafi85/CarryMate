import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Package, MapPin, LayoutDashboard, Menu } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

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

    return (
        <nav style={{
            padding: scrolled ? '12px 40px' : '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            background: scrolled ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
            transition: 'all 0.3s ease'
        }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Package color="white" size={20} />
                </div>
                <span style={{ fontSize: '22px', fontWeight: '800', color: scrolled ? 'var(--text-main)' : (window.location.pathname === '/' ? 'var(--text-main)' : 'var(--text-main)'), letterSpacing: '-0.5px' }}>CarryMate</span>
            </Link>

            <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to="/post-delivery" className="nav-link">Send Item</Link>
                        <Link to="/post-trip" className="nav-link">Post Trip</Link>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '8px', paddingLeft: '24px', borderLeft: '1px solid var(--border-color)' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-main)' }}>{user.username}</div>
                                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{user.roles?.[0]}</div>
                            </div>
                            <button onClick={handleLogout} className="logout-btn" title="Logout">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '700', fontSize: '15px', transition: 'color 0.2s' }}>Login</Link>
                        <Link to="/register" className="btn-auth" style={{ width: 'auto', padding: '10px 24px', fontSize: '14px' }}>
                            Get Started
                        </Link>
                    </>
                )}
            </div>
            <style>{`
                .nav-link {
                    color: var(--text-muted);
                    text-decoration: none;
                    font-weight: 600;
                    font-size: 14px;
                    transition: all 0.2s;
                }
                .nav-link:hover {
                    color: var(--primary);
                }
                .logout-btn {
                    background: #fee2e2;
                    border: none;
                    color: #ef4444;
                    padding: 8px;
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                .logout-btn:hover {
                    background: #ef4444;
                    color: white;
                }
            `}</style>
        </nav>
    );
};

export default Navbar;
