import React, { useEffect, useState } from 'react';
import { Search, Edit, User, Download, ArrowUpRight, ChevronDown, LogOut, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import FullLoader from '../FullLoader';

const OrganizationDashboard = () => {
    const [stats, setStats] = useState({ total: 0, amount: 0, recent: 0 });

    const [orgName, setOrgName] = useState(localStorage.getItem('organizationName'));
    const [orgImg, setOrgImg] = useState(localStorage.getItem('organizationImage'));
    const [verified, setVerified] = useState(localStorage.getItem('verified'));
    const [loading, setLoading] = useState(true);

    const [donors, setDonors] = useState([]);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [searchTerm, setSearchTerm] = useState('');

    // Filter donors based on search term
    const filteredDonors = donors.filter(donor =>
        donor.donorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = () => {
        const cf = window.confirm('Are you sure you want to logout?');
        if (cf) {
            window.location.href = '/';
            localStorage.clear();
        }
    }

    const fetchStats = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${BACKEND_URL}/organization/stats?id=${localStorage.getItem("organizationId")}`
            );

            setStats(response.data);

            console.log(response.data);
        } catch (err) {
            console.error("Error fetching stats:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchDonors = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/organization/donations?id=${localStorage.getItem("organizationId")}`
            );

            setDonors(response.data);
        } catch (err) {
            console.error("Error fetching donors:", err);
        }
    }

    useEffect(() => {
        fetchStats();
        fetchDonors();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="fixed w-full bg-indigo-900 text-white p-4 flex justify-between items-center z-50">
                <div className="flex items-center sm:mb-0">
                    <div className="mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight flex">Chain<p className='text-[#55dcd9]'>Aid</p></h1>
                </div>
                <div className="flex items-center">
                    <button onClick={() => window.location.href = '/organization/profile'} className="bg-white text-indigo-900 rounded-full px-6 py-2 flex items-center">
                        <User size={18} className="mr-2" />
                        Profile
                    </button>
                    <button onClick={handleLogout} className="text-white outline-0 ml-5 flex items-center">
                        <LogOut size={20} className="mr-2 font-bold" />
                    </button>
                </div>
            </header>

            {loading && <FullLoader />}

            <main className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8">Welcome Back!</h1>

                {/* Organization Info Card */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full flex items-center justify-center overflow-hidden mb-4 md:mb-0 md:mr-6">
                            <img src={orgImg} className="w-full h-full object-cover" alt="Organization" />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-2xl font-bold text-gray-800">{orgName}</h2>
                            <span
                                className={`inline-flex items-center gap-1 mt-5 rounded-full px-3 py-1 text-sm font-semibold ${verified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {verified ? (
                                    <>
                                        <CheckCircle size={16} />
                                        Verified
                                    </>
                                ) : (
                                    <>
                                        <XCircle size={16} />
                                        Not Verified
                                    </>
                                )}
                            </span>

                        </div>
                    </div>
                </div>

                {/* Donation Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                        <p className="text-gray-600 mb-2">Total Donations</p>
                        <h2 className="text-4xl font-bold">{stats.total}</h2>
                        <p className="text-gray-500 mt-2">All time</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
                        <p className="text-gray-600 mb-2">Amount Received</p>
                        <h2 className="text-4xl font-bold">{stats.amount} ETH</h2>
                        <p className="text-gray-500 mt-2">Total contributions</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                        <p className="text-gray-600 mb-2">Recent Activity</p>
                        <h2 className="text-4xl font-bold">{stats.recent}</h2>
                        <p className="text-gray-500 mt-2">Last 7 days</p>
                    </div>
                </div>

                {/* Donors List */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold">Donor List</h2>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search donors..."
                                    className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                            </div>
                            <button className="flex items-center justify-center px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium rounded-lg">
                                <Download size={18} className="mr-2" />
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b">
                                    <th className="p-3 text-left text-gray-600 font-semibold">Donor</th>
                                    <th className="p-3 text-right text-gray-600 font-semibold">Amount</th>
                                    <th className="p-3 text-left text-gray-600 font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDonors.map((donor) => (
                                    <tr key={donor.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">
                                            <div className="font-medium text-gray-800">{donor.donorName}</div>
                                        </td>
                                        <td className="p-3 text-right font-medium text-gray-800">{donor.amount} ETH</td>
                                        <td className="p-3 text-gray-600">{donor.donatedOn.slice(0, 10)}</td>
                                    </tr>
                                ))}

                                {filteredDonors.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-3 text-center text-gray-600">No donors found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                        <div className="text-gray-600 text-sm">
                            Showing <span className="font-medium">{filteredDonors.length}</span> of <span className="font-medium">{donors.length}</span> donors
                        </div>
                        <div className="flex items-center">
                            <button className="flex items-center px-3 py-1 border rounded-md mr-2 text-gray-600 hover:bg-gray-50">
                                <span>10 per page</span>
                                <ChevronDown size={16} className="ml-1" />
                            </button>
                            <div className="flex">
                                <button className="px-3 py-1 border rounded-l-md bg-indigo-50 text-indigo-600">1</button>
                                <button className="px-3 py-1 border-t border-b text-gray-600 hover:bg-gray-50">2</button>
                                <button className="px-3 py-1 border rounded-r-md text-gray-600 hover:bg-gray-50">3</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrganizationDashboard;