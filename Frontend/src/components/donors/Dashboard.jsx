import React, { useState } from 'react';
import { Search, User, X } from 'lucide-react';

const Dashboard = () => {
    const [organizations, setOrganizations] = useState([
        {
            id: 1,
            name: "Water for All",
            category: "Environment",
            raised: "12.45 ETH",
            vision: "Providing clean water access to communities in need around the world through sustainable solutions and local partnerships."
        },
        {
            id: 2,
            name: "Education First",
            category: "Education",
            raised: "8.32 ETH",
            vision: "Creating educational opportunities for underprivileged children through technology, resources, and teacher training programs."
        },
        {
            id: 3,
            name: "Medical Relief",
            category: "Healthcare",
            raised: "15.67 ETH",
            vision: "Delivering essential medical supplies and healthcare services to disaster-affected areas and underserved communities."
        },
        {
            id: 4,
            name: "Food Security",
            category: "Humanitarian",
            raised: "10.21 ETH",
            vision: "Fighting hunger through sustainable agriculture, food distribution networks, and community-based nutrition programs."
        },
        {
            id: 5,
            name: "Wildlife Protection",
            category: "Environment",
            raised: "7.83 ETH",
            vision: "Conserving endangered species and their habitats through protection initiatives, research, and community engagement."
        },
        {
            id: 6,
            name: "Digital Literacy",
            category: "Education",
            raised: "5.96 ETH",
            vision: "Bridging the digital divide by providing technology access and skills training to underserved populations."
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrg, setSelectedOrg] = useState(null);
    const [showDonateModal, setShowDonateModal] = useState(false);

    // Filter organizations based on search term
    const filteredOrganizations = organizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDonateClick = (org) => {
        setSelectedOrg(org);
        setShowDonateModal(true);
    };

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
                    <h1 className="text-xl font-bold">ChainAid</h1>
                </div>
                <div className="flex items-center">
                    <button onClick={() => window.location.href = '/donor/profile'} className="bg-white text-indigo-900 rounded-full px-6 py-2 flex items-center">
                        <User size={18} className="mr-2" />
                        Profile
                    </button>
                </div>
            </header>

            <main className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8">Donor Dashboard</h1>

                {/* Donation Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
                        <p className="text-gray-600 mb-2">Your Donations</p>
                        <h2 className="text-4xl font-bold">24</h2>
                        <p className="text-gray-500 mt-2">Total donations made</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-500">
                        <p className="text-gray-600 mb-2">Amount Donated</p>
                        <h2 className="text-4xl font-bold">8.45 ETH</h2>
                        <p className="text-gray-500 mt-2">Total contribution</p>
                    </div>
                </div>

                {/* Organizations Section */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                        <h2 className="text-2xl font-bold">Organizations to Support</h2>
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Search organizations..."
                                className="w-full md:w-64 pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredOrganizations.map(org => (
                            <div key={org.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-40 bg-gradient-to-r from-indigo-500 to-teal-400 flex items-center justify-center">
                                    {/* Placeholder for organization image/logo */}
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                        <span className="text-2xl font-bold text-indigo-500">{org.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                                        {org.category}
                                    </span>
                                    <h3 className="font-bold text-xl mb-2">{org.name}</h3>
                                    <p className="text-gray-600 mb-4">Raised so far: {org.raised}</p>
                                    <button
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => handleDonateClick(org)}
                                    >
                                        Donate
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredOrganizations.length === 0 && (
                            <div className="text-center text-gray-600 col-span-3">
                                No organizations found.
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Donation Modal */}
            {showDonateModal && selectedOrg && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden relative animate-fadeIn">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                            onClick={() => setShowDonateModal(false)}
                        >
                            <X size={24} />
                        </button>

                        <div className="h-32 bg-gradient-to-r from-indigo-600 to-teal-500 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-3xl font-bold text-indigo-600">{selectedOrg.name.charAt(0)}</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="mb-6">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                                    {selectedOrg.category}
                                </span>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedOrg.name}</h3>
                                <p className="text-gray-600 mb-2">Raised so far: {selectedOrg.raised}</p>
                                <h4 className="font-semibold text-gray-800 mt-4 mb-2">Our Vision</h4>
                                <p className="text-gray-600">{selectedOrg.vision}</p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-semibold text-gray-800 mb-4">Make a Donation</h4>
                                <div className="flex mb-4">
                                    <button className="flex-1 mr-2 py-2 px-4 bg-gray-200 rounded-lg text-center font-medium hover:bg-gray-300">0.1 ETH</button>
                                    <button className="flex-1 mx-2 py-2 px-4 bg-gray-200 rounded-lg text-center font-medium hover:bg-gray-300">0.5 ETH</button>
                                    <button className="flex-1 ml-2 py-2 px-4 bg-gray-200 rounded-lg text-center font-medium hover:bg-gray-300">1.0 ETH</button>
                                </div>
                                <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded">
                                    Confirm Donation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;