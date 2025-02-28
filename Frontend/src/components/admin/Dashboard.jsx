import React, { useState, useEffect } from 'react';
import { Activity, Users, AlertTriangle, BarChart2, TrendingUp, DollarSign, List, Shield, ExternalLink } from 'lucide-react';
import axios from 'axios';
import Loader from '../FullLoader';

const Dashboard = () => {
    // Sample data
    const [stats, setStats] = useState([{
        totalOrganizations: 0,
        activeOrganizations: 0,
        blacklistedOrganizations: 0,
        totalDonations: 0,
        totalTransactions: 0,
        pendingVerifications: 0
    }]);

    const [loading, setLoading] = useState(true);

    // Recent transactions data
    const recentTransactions = [
        { id: 1, from: "0x7a86...8F2a", to: "Sneha Mandir", amount: "0.5 ETH", time: "2 hours ago" },
        { id: 2, from: "0x3c4B...9F7A", to: "EcoRestore Foundation", amount: "1.2 ETH", time: "5 hours ago" },
        { id: 3, from: "0x2d8E...29F7", to: "ChildFirst Initiative", amount: "0.8 ETH", time: "Yesterday" },
    ];

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    // Organizations needing verification
    const [pendingVerifications, setPendingVerifications] = useState([{ id: " ", name: " ", submittedDate: " " }]);

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/admin/stats`);
            setStats(response.data)
            console.log(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const fetchPendingVerifications = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/admin/verify/info`);
            setPendingVerifications(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchStats();
        fetchPendingVerifications();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-21">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-indigo-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Overview of platform activity and organization status</p>
            </div>

            {loading && <Loader />}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Organizations */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-700">Total Organizations</h3>
                    <p className="text-4xl font-bold text-indigo-700 mt-2">{stats.totalOrganizations}</p>
                    <div className="mt-4 flex items-center text-sm text-indigo-600">
                        <Users size={16} className="mr-1" />
                        <span>All registered entities</span>
                    </div>
                </div>

                {/* Active Organizations */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-700">Active Organizations</h3>
                    <p className="text-4xl font-bold text-green-600 mt-2">{stats.activeOrganizations}</p>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                        <Shield size={16} className="mr-1" />
                        <span>Verified and operational</span>
                    </div>
                </div>

                {/* Blacklisted Organizations */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-medium text-gray-700">Blacklisted Organizations</h3>
                    <p className="text-4xl font-bold text-red-600 mt-2">{stats.blacklistedOrganizations}</p>
                    <div className="mt-4 flex items-center text-sm text-red-600">
                        <AlertTriangle size={16} className="mr-1" />
                        <span>Flagged for suspicious activity</span>
                    </div>
                </div>
            </div>

            {/* Additional Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Donations */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-700">Total Donations</h3>
                        <div className="p-2 bg-indigo-100 rounded-md">
                            <DollarSign size={20} className="text-indigo-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalDonations} ETH</p>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                        <TrendingUp size={16} className="mr-1" />
                        <span>+5.2% from last month</span>
                    </div>
                </div>

                {/* Total Transactions */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-700">Transactions</h3>
                        <div className="p-2 bg-indigo-100 rounded-md">
                            <Activity size={20} className="text-indigo-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalTransactions}</p>
                    <div className="mt-4 flex items-center text-sm text-green-600">
                        <TrendingUp size={16} className="mr-1" />
                        <span>+12.3% from last month</span>
                    </div>
                </div>

                {/* Pending Verifications */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-700">Pending Verifications</h3>
                        <div className="p-2 bg-yellow-100 rounded-md">
                            <List size={20} className="text-yellow-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mt-2">{stats.pendingVerifications}</p>
                    <div className="mt-4">
                        <a href="/admin/verify" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                            <span>Go to verification page</span>
                            <ExternalLink size={14} className="ml-1" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Transactions */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-indigo-900 text-white">
                        <h2 className="text-lg font-bold flex items-center">
                            <Activity size={18} className="mr-2" />
                            Recent Transactions
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {recentTransactions.map(tx => (
                            <div key={tx.id} className="p-4 hover:bg-gray-50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm text-gray-600">From: <span className="font-mono">{tx.from}</span></p>
                                        <p className="text-sm font-medium text-gray-800">To: {tx.to}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-indigo-700">{tx.amount}</p>
                                        <p className="text-xs text-gray-500">{tx.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 bg-gray-50 text-center">
                        <a href="/admin/transactions" className="text-sm text-indigo-600 hover:text-indigo-800">
                            View all transactions
                        </a>
                    </div>
                </div>

                {/* Pending Verifications */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-indigo-900 text-white">
                        <h2 className="text-lg font-bold flex items-center">
                            <Shield size={18} className="mr-2" />
                            Pending Verifications
                        </h2>
                    </div>
                    {pendingVerifications.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {pendingVerifications.map(org => (
                                <div key={org.id} className="p-4 hover:bg-gray-50">
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium text-gray-800">{org.name}</p>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">Submitted: {org.submittedDate}</p>
                                            <a href={`/admin/verify/${org.id}`} className="text-xs text-indigo-600 hover:text-indigo-800">
                                                Review
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <p>No pending verifications.</p>
                        </div>
                    )}
                    <div className="p-4 bg-gray-50 text-center">
                        <a href="/admin/verify" className="text-sm text-indigo-600 hover:text-indigo-800">
                            Go to verification page
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;