import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Package, MapPin, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-panel" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '16px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #00d2ff, #3a7bd5)', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Package color="white" size={24} />
                </div>
                <span style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>CarryMate</span>
            </Link>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="nav-link"><LayoutDashboard size={20} /> Dashboard</Link>
                        <Link to="/post-delivery" className="nav-link"><Package size={20} /> Send Item</Link>
                        <Link to="/post-trip" className="nav-link"><MapPin size={20} /> Post Trip</Link>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '10px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '20px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '14px', fontWeight: '600' }}>{user.username}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{user.roles[0]}</div>
                            </div>
                            <button onClick={handleLogout} className="btn-icon" title="Logout"><LogOut size={20} /></button>
                        </div>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
                        <Link to="/register" className="btn-primary" style={{ padding: '8px 20px' }}>Register</Link>
                    </>
                )}
            </div>
            <style>{`
        .nav-link {
          color: var(--text-muted);
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: color 0.3s;
        }
        .nav-link:hover {
          color: white;
        }
        .btn-icon {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.3s;
        }
        .btn-icon:hover {
          color: var(--danger);
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
