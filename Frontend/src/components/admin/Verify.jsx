import React, { useState, useEffect } from 'react';
import { Check, X, Shield } from 'lucide-react';
import axios from 'axios';
import Loader from '../FullLoader';

const Verify = () => {
    const [organizations, setOrganizations] = useState([{
        _id: '',
        id: '',
        name: "",
        certificate: '',
        description: "",
        certificateDate: ""
    }])
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchOrganisations = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/admin/verify/info`);
            setOrganizations(response.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const verifyOrg = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${BACKEND_URL}/admin/verify`, { id });
            if (response.data.status == "success") {
                alert("Organization verified successfully!");
                fetchOrganisations();
            }
        } catch (err) {
            console.log(err);
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

    useEffect(() => {
        fetchOrganisations();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-21">
            {loading && <Loader />}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-indigo-900">Organization Verification</h1>
                <p className="text-gray-600 mt-2">Review certificate uploads and verify organizations to ensure transparency.</p>
            </div>


            <div className="space-y-8">
                {organizations.map((org) => (
                    <div key={org.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="bg-indigo-900 p-4 text-white">
                            <h2 className="text-xl font-bold flex items-center">
                                <Shield className="mr-2" size={20} />
                                {org.name}
                            </h2>
                            <p className="text-indigo-100 text-sm mt-1">{org.description}</p>
                        </div>

                        <div className="p-6">
                            <h3 className="text-lg font-semibold text-indigo-700 mb-4">Certificate Verification</h3>

                            <div className="border rounded-lg overflow-hidden">
                                {/* Certificate Image */}
                                <div className="bg-gray-100 p-2">
                                    <div className="aspect-w-16 aspect-h-9 relative">
                                        <img
                                            src={org.certificate}
                                            alt={`${org.name} Certificate`}
                                            className="w-full object-contain border border-gray-200 rounded bg-white"
                                        />
                                        <div className="absolute top-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded text-xs text-gray-600">
                                            Uploaded: {org.certificateDate.slice(0, 10)}
                                        </div>
                                    </div>
                                </div>

                                {/* Verification Controls */}
                                <div className="p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="text-sm text-gray-600">
                                        Please verify the certificate authenticity and organization legitimacy.
                                    </div>
                                    <div className="flex gap-3">
                                        <button onClick={(e) => verifyOrg(e, org._id)} className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 px-5 rounded-full flex items-center">
                                            <Check size={18} className="mr-2" />
                                            Approve
                                        </button>
                                        <button onClick={(e) => blacklistOrg(e, org._id)} className="bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 px-5 rounded-full flex items-center">
                                            <X size={18} className="mr-2" />
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 text-sm text-gray-500">
                                <p>Organization ID: @{org.id} • Verification request received on {org.certificateDate.slice(0, 10)}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {organizations.length === 0 && (
                    <div className="text-center text-gray-500">
                        <p>No organizations pending verification.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Verify;