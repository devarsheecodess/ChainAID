import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+1 234 567 8901',
        address: '123 Blockchain Street, Crypto City, CC 12345',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [passwordView, setPasswordView] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/donor/data`, {
                params: { id: localStorage.getItem('donorId') }
            });
            console.log(response.data);
            setFormData(response.data);
        } catch (err) {
            console.error("Error fetching donor data:", err);
        }
    };

    useEffect(() => {
        fetchUserData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const donorId = localStorage.getItem('donorId');
            if (!donorId) {
                alert("User not authenticated!");
                return;
            }

            // Send only schema-defined fields
            const updatedData = {
                id: donorId,
                username: formData.username,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                password: formData.newPassword || formData.password
            };

            // Include password fields only if changing the password
            if (formData.newPassword) {
                updatedData.currentPassword = formData.currentPassword;
                updatedData.newPassword = formData.newPassword;
            }

            console.log(updatedData);

            const response = await axios.put(`${BACKEND_URL}/update`, updatedData);

            if (response.data.success) {
                alert("Profile updated successfully!");
                setIsEditing(false);
            } else {
                alert("Failed to update profile");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("An error occurred while updating the profile");
        }
    };

    return (
        <div className="min-h-screen bg-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6">
                        Your <span className="text-teal-400">Profile</span>
                    </h1>
                    <p className="text-xl">
                        Update your personal information and settings
                    </p>
                </div>

                <div className="bg-indigo-800/50 rounded-lg p-8 backdrop-blur-sm shadow-xl">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Personal Information</h2>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="px-4 py-2 rounded-full text-sm font-medium bg-teal-400 text-indigo-900 hover:bg-teal-300 transition duration-300"
                        >
                            {isEditing ? 'Cancel' : 'Edit Details'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block text-lg mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                            />
                        </div>

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

                        {/* Phone */}
                        <div>
                            <label className="block text-lg mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full p-3 rounded-lg ${isEditing ? 'bg-indigo-700/50 border border-indigo-500' : 'bg-indigo-800/70 border border-indigo-700'} focus:outline-none focus:ring-2 focus:ring-teal-400`}
                            />
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

                        {/* Password Section */}
                        {isEditing && (
                            <div className="mt-10 pt-6 border-t border-indigo-600">
                                <h3 className="text-xl font-bold mb-4">Change Password</h3>

                                {/* Current Password */}
                                <div className="mb-4">
                                    <label className="block text-lg mb-2">Current Password</label>
                                    <div className="relative">
                                        <input
                                            type={passwordView.current ? "text" : "password"}
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => togglePasswordView('current')}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {passwordView.current ? (
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

                    {/* Wallet Connection Section */}
                    <div className="mt-12 pt-6 border-t border-indigo-600">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Connected Wallet</h2>
                            <div className="px-3 py-1 rounded-full bg-teal-400/20 text-teal-400 text-sm">
                                Active
                            </div>
                        </div>

                        <div className="bg-indigo-800/70 border border-indigo-700 rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="bg-indigo-600 p-3 rounded-full mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-300">ETH Wallet</p>
                                    <p className="font-mono">0x71C7...F92E</p>
                                </div>
                            </div>
                            <button className="text-red-400 hover:text-red-300 px-3 py-1 rounded-full bg-red-400/10 hover:bg-red-400/20 transition">
                                Disconnect
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;