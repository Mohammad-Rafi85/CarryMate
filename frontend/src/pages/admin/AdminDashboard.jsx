import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, PackageCheck, Ban, ShieldCheck, Activity, Search, ShieldAlert, CheckCircle } from 'lucide-react';

import api from '../../api/axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [users, setUsers] = useState([]);
    const [disputes, setDisputes] = useState([]);
    const [allDeliveries, setAllDeliveries] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const loadRealData = async () => {
            try {
                // Try to fetch real users from backend. Fallbacks to other routes if standard fails.
                let usersRes;
                try {
                    usersRes = await api.get('/admin/users');
                } catch {
                    try {
                        usersRes = await api.get('/users/all');
                    } catch {
                        usersRes = await api.get('/auth/users');
                    }
                }
                if (usersRes?.data) {
                    const fetched = usersRes.data.data || usersRes.data;
                    setUsers(Array.isArray(fetched) ? fetched : []);
                }
            } catch (err) {
                console.error("Failed to load real users", err);
                setUsers([]);
            }

            try {
                let devRes;
                try {
                    devRes = await api.get('/admin/deliveries');
                } catch {
                    try { devRes = await api.get('/deliveries/all'); } catch { devRes = null; }
                }
                if (devRes?.data) {
                    const fetchedD = devRes.data.data || devRes.data;
                    setAllDeliveries(Array.isArray(fetchedD) ? fetchedD : []);
                }
            } catch (err) {
                console.error("Failed to load real deliveries", err);
                setAllDeliveries([]);
            }
            
            // Load disputes (using local storage to guarantee demo functionality post-submission)
            const storedDisputes = JSON.parse(localStorage.getItem('carrymate_disputes') || '[]');
            setDisputes(storedDisputes);
        };
        loadRealData();
    }, []);

    const toggleUserStatus = async (id) => {
        setUsers(users.map(user => {
            if (user.id === id) {
                return { ...user, status: user.status === 'ACTIVE' ? 'BLOCKED' : 'ACTIVE' };
            }
            return user;
        }));
        // try to push update to backend
        try {
            await api.put(`/admin/users/${id}/block`);
        } catch (e) {
            console.error(e);
        }
    };

    const markDisputeResolved = (id) => {
        const newDisputes = disputes.map(d => d.id === id ? { ...d, status: 'RESOLVED' } : d);
        setDisputes(newDisputes);
        localStorage.setItem('carrymate_disputes', JSON.stringify(newDisputes));
    };

    const overviewStats = [
        { title: 'Total Users', value: users?.length || 0, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { title: 'Platform Deliveries', value: allDeliveries?.length || 0, icon: PackageCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { title: 'Active Disputes', value: disputes?.filter?.(d => d.status === 'OPEN').length || 0, icon: AlertTriangle, color: 'text-rose-600', bg: 'bg-rose-50' },
        { title: 'Blocked Accounts', value: users?.filter?.(u => u.status === 'BLOCKED').length || 0, icon: Ban, color: 'text-slate-600', bg: 'bg-slate-100' }
    ];

    const filteredUsers = (Array.isArray(users) ? users : []).filter(u => 
        (u?.name || u?.username || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (u?.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="h-20 flex items-center px-8 border-b border-slate-800">
                    <ShieldCheck className="w-8 h-8 text-indigo-500 mr-3 shrink-0" />
                    <h1 className="text-xl font-black tracking-tight mt-1 truncate">CarryMate Admin</h1>
                </div>
                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
                    <button 
                        onClick={() => setActiveTab('overview')} 
                        className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Activity className="w-5 h-5 mr-3" /> Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('users')} 
                        className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Users className="w-5 h-5 mr-3" /> Users Directory
                    </button>
                    <button 
                        onClick={() => setActiveTab('disputes')} 
                        className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'disputes' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <AlertTriangle className="w-5 h-5 mr-3" /> Dispute Resolution
                    </button>
                    <button 
                        onClick={() => setActiveTab('deliveries')} 
                        className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'deliveries' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <PackageCheck className="w-5 h-5 mr-3" /> Global Deliveries
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 shadow-sm z-10">
                    <h2 className="text-2xl font-black text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">AD</div>
                        <span className="text-sm font-bold text-slate-700">Super Admin</span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-10">
                    {activeTab === 'overview' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {overviewStats.map((stat, idx) => (
                                    <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6`}>
                                            <stat.icon className="w-7 h-7" />
                                        </div>
                                        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.title}</p>
                                        <p className="text-4xl font-black text-slate-900 mt-2">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                                    <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center"><ShieldAlert className="w-5 h-5 mr-2 text-rose-500" /> Recent Urgent Disputes</h3>
                                    <div className="space-y-4">
                                        {disputes.filter(d => d.status === 'OPEN').map(d => (
                                            <div key={d.id} className="p-4 rounded-xl bg-rose-50/50 border border-rose-100 flex justify-between items-center">
                                                <div>
                                                    <p className="font-bold text-sm text-slate-800">{d.id} - {d.issue}</p>
                                                    <p className="text-xs font-semibold text-slate-500 mt-1">{d.sender} vs {d.traveller}</p>
                                                </div>
                                                <button onClick={() => setActiveTab('disputes')} className="text-xs font-bold text-indigo-600 bg-white px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm hover:bg-indigo-50">View Details</button>
                                            </div>
                                        ))}
                                        {disputes.filter(d => d.status === 'OPEN').length === 0 && (
                                            <p className="text-sm text-slate-500 italic">No active disputes requiring immediate action.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-lg font-black text-slate-800">Directory Management</h3>
                                <div className="relative">
                                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="Search by name or email..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium w-64"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-100">
                                            <th className="px-6 py-4 font-bold">User</th>
                                            <th className="px-6 py-4 font-bold">Role</th>
                                            <th className="px-6 py-4 font-bold">Deliveries</th>
                                            <th className="px-6 py-4 font-bold">Status</th>
                                            <th className="px-6 py-4 font-bold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {filteredUsers.map(user => (
                                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-800">{user.name || user.username || 'Unknown'}</span>
                                                        <span className="text-xs font-semibold text-slate-500">{user.email || 'No email'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${user.role === 'SENDER' || user.userType === 'SENDER' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                                        {user.role || user.userType || 'USER'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate-700">{user.totalDeliveries || 0}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${user.status === 'ACTIVE' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                        <div className={`w-2 h-2 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button 
                                                        onClick={() => toggleUserStatus(user.id)}
                                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${user.status === 'ACTIVE' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100'}`}
                                                    >
                                                        {user.status === 'ACTIVE' ? 'Block User' : 'Unblock User'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {filteredUsers.length === 0 && (
                                    <div className="p-10 text-center text-slate-500 font-bold">No users found matching your search.</div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'disputes' && (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <h3 className="text-lg font-black text-slate-800">Support & Dispute Center</h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {disputes.map(dispute => (
                                    <div key={dispute.id} className="p-6 flex items-start gap-6 hover:bg-slate-50 transition-colors">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${dispute.status === 'OPEN' ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-400'}`}>
                                            {dispute.status === 'OPEN' ? <AlertTriangle className="w-6 h-6" /> : <CheckCircle className="w-6 h-6" />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <span className="text-xs font-bold text-slate-400 tracking-widest">{dispute.id} • {dispute.date}</span>
                                                    <h4 className="text-lg font-bold text-slate-800 mt-1">{dispute.issue}</h4>
                                                </div>
                                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${dispute.status === 'OPEN' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'}`}>
                                                    {dispute.status}
                                                </span>
                                            </div>
                                            <p className="text-sm font-semibold text-slate-600">Sender: <span className="font-bold text-slate-800">{dispute.sender}</span> vs Traveller: <span className="font-bold text-slate-800">{dispute.traveller}</span></p>
                                        </div>
                                        <div>
                                            {dispute.status === 'OPEN' ? (
                                                <button onClick={() => markDisputeResolved(dispute.id)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-md">Mark Resolved</button>
                                            ) : (
                                                <button disabled className="px-4 py-2 bg-slate-100 text-slate-400 font-bold text-sm rounded-xl cursor-not-allowed">Resolved</button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'deliveries' && (
                        <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                                <h3 className="text-lg font-black text-slate-800">Global Deliveries Ledger</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-widest border-b border-slate-100">
                                            <th className="px-6 py-4 font-bold">Item Info</th>
                                            <th className="px-6 py-4 font-bold">Sender</th>
                                            <th className="px-6 py-4 font-bold">Traveller</th>
                                            <th className="px-6 py-4 font-bold">Financials</th>
                                            <th className="px-6 py-4 font-bold text-right">Route Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {allDeliveries.map(dev => (
                                            <tr key={dev.id} className="hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-800">{dev.itemName} <span className="text-slate-400 font-semibold ml-1">({dev.itemType || 'Package'})</span></span>
                                                        <span className="text-xs font-semibold text-slate-500 mt-1 max-w-[200px] truncate">To: {dev.destinationAddress || dev.receiverName || 'Pending Address'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold text-indigo-600 block">{dev.senderName || 'Anonymous'}</span>
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">ID: {dev.senderId || 'N/A'}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-sm font-bold text-emerald-600 block">{dev.travellerName || 'Not Assigned'}</span>
                                                    <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">ID: {dev.travellerId || 'N/A'}</span>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-black text-slate-700">₹{dev.price}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border
                                                        ${dev.status === 'DELIVERED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                          dev.status === 'PENDING' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                                          'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                                        {dev.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {allDeliveries.length === 0 && (
                                    <div className="p-10 text-center text-slate-500 font-bold">No registered deliveries across platform yet.</div>
                                )}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
