import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { useAuth } from '../../context/AuthContext';

const SenderDashboardLayout = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
    
    // Unauthenticated or not sender (assuming we rely on userType in the future, currently we enforce by route)
    if (!isAuthenticated) return <Navigate to="/login" replace />;

    // Force KYC check unless already on KYC page
    // if (user && !user.kycVerified && location.pathname !== '/sender/kyc') {
    //     return <Navigate to="/sender/kyc" replace />;
    // }

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden relative">
                <header className="bg-white/90 backdrop-blur-sm border-b border-slate-200 h-20 flex items-center justify-between px-8 shadow-sm z-10 transition-all">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800 flex items-center gap-3">
                        Sender Console
                    </h1>
                    <div className="flex items-center space-x-6">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-bold text-slate-700">{user?.username}</span>
                            <span className={`text-xs font-bold uppercase tracking-widest ${user?.kycVerified ? 'text-emerald-600' : 'text-amber-500'}`}>
                                {user?.kycVerified ? 'Verified Sender' : 'Action Required'}
                            </span>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-black text-lg shadow-sm">
                            {user?.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>
                </header>
                
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-8 relative z-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SenderDashboardLayout;
