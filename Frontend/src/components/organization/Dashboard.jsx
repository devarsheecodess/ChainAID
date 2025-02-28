import React, { useEffect, useState } from 'react';
import { Search, Edit, User, Download, ArrowUpRight, ChevronDown, LogOut, CheckCircle, XCircle } from 'lucide-react';

const OrganizationDashboard = () => {
    // Sample data for donations and donors
    const [donations, setDonations] = useState({
        total: 156,
        amount: "18.45 ETH",
        recent: 12
    });
    const [orgName, setOrgName] = useState(localStorage.getItem('organizationName'));
    const [orgImg, setOrgImg] = useState(localStorage.getItem('organizationImage'));
    const [verified, setVerified] = useState(localStorage.getItem('verified'));

    const [donors, setDonors] = useState([
        { id: 1, name: "Alex Johnson", address: "0x71C...9E3B", amount: "2.5 ETH", date: "2025-02-25", recurring: true },
        { id: 2, name: "Maria Garcia", address: "0x42F...7A1C", amount: "1.2 ETH", date: "2025-02-22", recurring: false },
        { id: 3, name: "Anonymous Donor", address: "0x93D...4F2D", amount: "3.0 ETH", date: "2025-02-20", recurring: false },
        { id: 4, name: "Wei Chen", address: "0x38B...2C5E", amount: "0.75 ETH", date: "2025-02-18", recurring: true },
        { id: 5, name: "Sarah Ahmed", address: "0x62A...8D3F", amount: "1.5 ETH", date: "2025-02-15", recurring: false },
        { id: 6, name: "James Wilson", address: "0x19C...5A7B", amount: "2.0 ETH", date: "2025-02-12", recurring: true },
        { id: 7, name: "Priya Patel", address: "0x27D...9C4E", amount: "0.5 ETH", date: "2025-02-10", recurring: false },
        { id: 8, name: "Anonymous Donor", address: "0x85F...1E3A", amount: "4.0 ETH", date: "2025-02-08", recurring: false },
        { id: 9, name: "David Kim", address: "0x41B...7F2D", amount: "1.0 ETH", date: "2025-02-05", recurring: true },
        { id: 10, name: "Emma Roberts", address: "0x59C...2E4B", amount: "2.0 ETH", date: "2025-02-02", recurring: false }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    // Filter donors based on search term
    const filteredDonors = donors.filter(donor =>
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = () => {
        const cf = window.confirm('Are you sure you want to logout?');
        if (cf) {
            window.location.href = '/';
            localStorage.clear();
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-indigo-900 text-white p-4 flex justify-between items-center">
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
                                className={`inline-flex items-center gap-1 mt-5 rounded-full px-3 py-1 text-sm font-semibold ${verified === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {verified === true ? (
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
                        <h2 className="text-4xl font-bold">{donations.total}</h2>
                        <p className="text-gray-500 mt-2">All time</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
                        <p className="text-gray-600 mb-2">Amount Received</p>
                        <h2 className="text-4xl font-bold">{donations.amount}</h2>
                        <p className="text-gray-500 mt-2">Total contributions</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                        <p className="text-gray-600 mb-2">Recent Activity</p>
                        <h2 className="text-4xl font-bold">{donations.recent}</h2>
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
                                    <th className="p-3 text-left text-gray-600 font-semibold">Wallet Address</th>
                                    <th className="p-3 text-right text-gray-600 font-semibold">Amount</th>
                                    <th className="p-3 text-left text-gray-600 font-semibold">Date</th>
                                    <th className="p-3 text-center text-gray-600 font-semibold">Type</th>
                                    <th className="p-3 text-center text-gray-600 font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDonors.map((donor) => (
                                    <tr key={donor.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">
                                            <div className="font-medium text-gray-800">{donor.name}</div>
                                        </td>
                                        <td className="p-3">
                                            <div className="font-mono text-gray-600">{donor.address}</div>
                                        </td>
                                        <td className="p-3 text-right font-medium text-gray-800">{donor.amount}</td>
                                        <td className="p-3 text-gray-600">{donor.date}</td>
                                        <td className="p-3 text-center">
                                            {donor.recurring ? (
                                                <span className="inline-block bg-teal-100 text-teal-800 rounded-full px-3 py-1 text-xs font-semibold">
                                                    Recurring
                                                </span>
                                            ) : (
                                                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold">
                                                    One-time
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3 text-center">
                                            <button className="text-indigo-600 hover:text-indigo-800">
                                                <ArrowUpRight size={18} />
                                            </button>
                                        </td>
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