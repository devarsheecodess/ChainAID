import React, { useState } from 'react';
import axios from 'axios';

const ChainAidLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/admin/login`, { email, password });

            if (!response.data || response.data.status === "error") {
                alert("Access Denied!");
                return;
            }

            localStorage.setItem("adminId", response.data.id); // Store Admin ID

            alert("Login Successful!");
            window.location.href = '/admin';

        } catch (err) {
            console.error("Login Error:", err);
            alert("Something went wrong. Please try again.");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-indigo-900 px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Logo & Header */}
                <div className="px-8 pt-8 pb-4 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center">
                            <svg className="w-10 h-10 text-teal-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.5 15.5L9 13M17.5 15.5L15 13M12 12V9.5M8.5 7.5L12 5L15.5 7.5M7 18L5.5 19.5M17 18L18.5 19.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 7C13.1046 7 14 6.10457 14 5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5C10 6.10457 10.8954 7 12 7Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M19 15C20.1046 15 21 14.1046 21 13C21 11.8954 20.1046 11 19 11C17.8954 11 17 11.8954 17 13C17 14.1046 17.8954 15 19 15Z" stroke="currentColor" strokeWidth="2" />
                                <path d="M5 15C6.10457 15 7 14.1046 7 13C7 11.8954 6.10457 11 5 11C3.89543 11 3 11.8954 3 13C3 14.1046 3.89543 15 5 15Z" stroke="currentColor" strokeWidth="2" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-indigo-900">ChainAid Admin</h1>
                    <p className="text-gray-600 mt-2 text-sm">Secure access to donation management</p>
                </div>

                {/* Form */}
                <div className="px-8 py-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                email
                            </label>
                            <input
                                id="email"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChainAidLogin;