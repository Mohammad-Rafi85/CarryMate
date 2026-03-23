import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  PlusCircle, 
  Package, 
  Map, 
  ShieldCheck, 
  User as UserIcon,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
    const { logout } = useAuth();

    const navItems = [
        { path: '/sender/my-shipments', name: 'My Shipments', icon: Package },
        { path: '/sender/create', name: 'Add Item', icon: PlusCircle },
        { path: '/sender/track', name: 'Track Shipment', icon: Map },
        { path: '/sender/kyc', name: 'KYC Verification', icon: ShieldCheck },
        { path: '/sender/profile', name: 'Profile', icon: UserIcon },
    ];

    return (
        <div className="w-72 bg-slate-900 border-r border-slate-800 h-full flex flex-col z-20 shadow-xl">
            <div className="p-8 border-b border-slate-800">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workspace</h2>
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
                                        ? 'bg-indigo-600 text-white shadow-md'
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
                    onClick={logout}
                    className="flex items-center space-x-4 px-5 py-3.5 w-full rounded-xl text-slate-400 font-semibold hover:bg-rose-600 hover:shadow-lg hover:text-white transition-all border border-transparent"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
