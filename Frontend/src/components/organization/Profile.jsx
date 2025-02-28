import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telephone: '',
        type: '',
        address: '',
        walletAddress: '',
        newPassword: '',
        confirmPassword: '',
        // Added missing fields from the schema
        vision: '',
        donationAim: '',
        donationAmount: 0,
        currency: '',
        website: '',
        image: ''
    });


    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const [isEditing, setIsEditing] = useState(false);
    const [passwordView, setPasswordView] = useState({
        new: false,
        confirm: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePasswordView = (field) => {
        setPasswordView({
            ...passwordView,
            [field]: !passwordView[field]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setIsEditing(false);
    };

    const organizationTypes = [
        'Non-Profit',
        'Charity',
        'Foundation',
        'NGO',
        'Educational',
        'Healthcare',
        'Environmental',
        'Community',
        'Religious',
        // 'NGO',
        'Other'
    ];

    const currencies = [
        'ETH',
        'BTC',
        'USDT',
        'USDC',
        'DAI'
    ];

    const fetchOrganization = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/organization/data`, {
                params: { id: localStorage.getItem('organizationId') }
            });
            setFormData(response.data);
        } catch (err) {
            console.log(err)
        }
    }

    const updateOrganizationDetails = async () => {
        try {
            if (formData.newPassword !== formData.confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            const response = await axios.put(
                `${BACKEND_URL}/organization/update`,
                formData,
                {
                    params: { id: localStorage.getItem('organizationId') }, // Query parameters
                }
            );
            if (response.data.success == true) {
                alert('Details updated successfully!');
                setFormData({
                    ...formData,
                    newPassword: '',
                    confirmPassword: ''
                });
                fetchOrganization();
            }
        } catch (error) {
            console.error('Error updating organization details:', error);
            alert('Failed to update details. Please try again.');
        }
    };

    useEffect(() => {
        fetchOrganization();
    }, []);

    return (
        <div className="min-h-screen bg-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6">
                        Organization <span className="text-teal-400">Profile</span>
                    </h1>
                    <p className="text-xl">
                        Manage your organization's information and settings
                    </p>
                </div>

                <div className="bg-indigo-800/50 rounded-lg p-8 backdrop-blur-sm shadow-xl">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <div className="bg-teal-400/20 p-3 rounded-full mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold">Organization Details</h2>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-teal-400 text-indigo-900 hover:bg-teal-300 transition duration-300"
                        >
                            {isEditing ? 'Cancel' : 'Edit Details'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Organization Logo/Image Section */}
                        <div className="flex flex-col sm:flex-row items-center mb-8">
                            <div className="w-24 h-24 bg-indigo-700 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-6 overflow-hidden">
                                {formData.image ? (
                                    <img
                                        src={formData.image}
                                        alt="Organization Logo"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                    </svg>
                                )}
                            </div>
                            {isEditing && (
                                <div>
                                    <label className="inline-block px-4 py-2 bg-indigo-700 text-white rounded-lg cursor-pointer hover:bg-indigo-600 transition">
                                        <span>Change Logo</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData({
                                                            ...formData,
                                                            image: reader.result
                                                        });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                    <p className="text-sm text-gray-300 mt-2">Recommended: Square image, at least 200x200px</p>
                                </div>
                            )}
                        </div>

                        {/* Organization Name */}
                        <div>
                            <label className="block text-lg mb-2">Organization Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                            />
                        </div>

                        {/* Vision */}
                        <div>
                            <label className="block text-lg mb-2">Vision</label>
                            <textarea
                                name="vision"
                                value={formData.vision}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows="3"
                                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                            ></textarea>
                        </div>

                        {/* Donation Aim */}
                        <div>
                            <label className="block text-lg mb-2">Donation Aim</label>
                            <textarea
                                name="donationAim"
                                value={formData.donationAim}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows="2"
                                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                            ></textarea>
                        </div>

                        {/* Type of Organization */}
                        <div>
                            <label className="block text-lg mb-2">Type of Organization</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                            >
                                {organizationTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* Website */}
                        <div>
                            <label className="block text-lg mb-2">Website</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                            />
                        </div>

                        {/* Contact Information Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Email */}
                            <div>
                                <label className="block text-lg mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                                />
                            </div>

                            {/* Telephone */}
                            <div>
                                <label className="block text-lg mb-2">Telephone</label>
                                <input
                                    type="tel"
                                    name="telephone"
                                    value={formData.telephone}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                                />
                            </div>
                        </div>

                        {/* Donation Amount & Currency */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Donation Amount */}
                            <div>
                                <label className="block text-lg mb-2">Minimum Donation Amount</label>
                                <input
                                    type="number"
                                    name="donationAmount"
                                    value={formData.donationAmount}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    min="0"
                                    step="0.01"
                                    className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                                />
                            </div>

                            {/* Currency */}
                            <div>
                                <label className="block text-lg mb-2">Currency</label>
                                <select
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                                >
                                    {currencies.map((currency) => (
                                        <option key={currency} value={currency}>{currency}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-lg mb-2">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                                rows="3"
                                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                            ></textarea>
                        </div>

                        {/* Wallet Address */}
                        <div>
                            <label className="block text-lg mb-2">Organization Wallet Address</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="walletAddress"
                                    value={formData.walletAddress}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    className={`w-full p-3 rounded-lg font-mono text-sm ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                                />
                                {!isEditing && (
                                    <button
                                        type="button"
                                        className="absolute outline-0 inset-y-0 right-0 pr-3 flex items-center text-teal-400 hover:text-teal-300"
                                        onClick={() => { navigator.clipboard.writeText(formData.walletAddress); alert('Wallet address copied to clipboard!'); }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                                            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-300 mt-1">This is the wallet address that will receive donations</p>
                        </div>

                        {/* Password Section */}
                        {isEditing && (
                            <div className="mt-10 pt-6 border-t border-indigo-600">
                                <h3 className="text-xl font-bold mb-4">Change Password</h3>

                                {/* New Password */}
                                <div className="mb-4">
                                    <label className="block text-lg mb-2">New Password</label>
                                    <div className="relative">
                                        <input
                                            type={passwordView.new ? "text" : "password"}
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordView('new')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {passwordView.new ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-4">
                                    <label className="block text-lg mb-2">Confirm New Password</label>
                                    <div className="relative">
                                        <input
                                            type={passwordView.confirm ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordView('confirm')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {passwordView.confirm ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        {isEditing && (
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={updateOrganizationDetails}
                                    type="submit"
                                    className="flex-1 py-4 px-6 rounded-full text-lg font-bold text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition duration-300 transform hover:scale-105 shadow-lg"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 py-4 px-6 rounded-full text-lg font-bold text-white bg-indigo-700 hover:bg-indigo-600 transition duration-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;