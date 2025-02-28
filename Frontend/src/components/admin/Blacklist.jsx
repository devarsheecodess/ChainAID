import React, { useState, useEffect } from 'react';
import { Ban, Search, AlertTriangle, Filter, ExternalLink, Clipboard } from 'lucide-react';
import axios from 'axios';
import Loader from '../FullLoader';

const Blacklist = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const [organizations, setOrganizations] = useState([{
        id: '',
        name: "",
        description: "",
        address: "",
        status: "",
        lastTransaction: "",
    }]);

    // Filter organizations based on search term
    const filteredOrganizations = organizations.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fetchOrganisations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/admin/orgs`);
            setOrganizations(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const blacklistOrg = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BACKEND_URL}/admin/blacklist`, { id });
            alert("Organization blacklisted successfully!");
            fetchOrganisations();
        } catch (err) {
            console.log(err);
        }
    }

    const whitelistOrg = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BACKEND_URL}/admin/whitelist`, { id });
            alert("Organization restored successfully!");
            fetchOrganisations();
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchOrganisations();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-21">
            {loading && <Loader />}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-indigo-900">Organization Blacklist</h1>
                <p className="text-gray-600 mt-2">Monitor and manage potentially fraudulent organizations on the platform.</p>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by organization name or wallet address..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Organizations List */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-indigo-900 text-white">
                    <h2 className="text-xl font-bold">Organizations</h2>
                </div>

                {filteredOrganizations.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        <p>No organizations found matching your search criteria.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {filteredOrganizations.map((org) => (
                            <div key={org.id} className={`p-6 ${org.status === 'blacklisted' ? 'bg-red-50' : ''}`}>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div className="flex-grow">
                                        <div className="flex items-center">
                                            <h3 className="text-lg font-semibold text-indigo-900">{org.name}</h3>
                                            {org.status === 'blacklisted' && (
                                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                                    <AlertTriangle size={12} className="mr-1" />
                                                    Blacklisted
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{org.description}</p>
                                        <div className="mt-2 text-xs text-gray-500 flex items-center">
                                            <span className="font-mono">{org.address}</span>
                                            <Clipboard
                                                size={16}
                                                className="ml-1 text-indigo-500 cursor-pointer"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(org.address);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 md:mt-0 flex">
                                        {org.status === 'blacklisted' ? (
                                            <button onClick={(e) => whitelistOrg(e, org.id)} className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-md text-sm font-medium">
                                                Restore
                                            </button>
                                        ) : (
                                            <button onClick={(e) => blacklistOrg(e, org.id)} className="flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-md text-sm font-medium">
                                                <Ban size={16} className="mr-2" />
                                                Blacklist
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blacklist;