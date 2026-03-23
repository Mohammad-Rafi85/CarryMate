import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Search, Map, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const TravellerSidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const navItems = [
        { name: 'Find Deliveries', path: '/traveller/feed', icon: Search },
        { name: 'My Active Trips', path: '/traveller/active', icon: Map },
        { name: 'Earnings & Profile', path: '/traveller/profile', icon: Activity },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="w-72 bg-slate-900 border-r border-slate-800 h-full flex flex-col z-20 shadow-xl font-sans">
            <div className="p-8 border-b border-slate-800">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Traveller Hub</h2>
            </div>
            
            <nav className="flex-1 p-6 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-4 px-5 py-3.5 rounded-xl transition-all font-semibold text-sm ${
                                    isActive
                                        ? 'bg-emerald-600 text-white shadow-[0_4px_12px_rgba(16,185,129,0.25)]'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-transparent'
                                }`
                            }
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-slate-800">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-4 px-5 py-3.5 w-full rounded-xl text-slate-400 font-semibold hover:bg-rose-600 hover:shadow-lg hover:text-white transition-all border border-transparent"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default TravellerSidebar;
