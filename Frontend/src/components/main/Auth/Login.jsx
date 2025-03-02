import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('donor');
    const [donorForm, setDonorForm] = useState({ email: '', password: '' });
    const [organizationForm, setOrganizationForm] = useState({ email: '', password: '' });
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleDonorChange = (e) => {
        setDonorForm({ ...donorForm, [e.target.name]: e.target.value });
    }

    const handleOrganizationChange = (e) => {
        setOrganizationForm({ ...organizationForm, [e.target.name]: e.target.value });
    }

    const handleDonorLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/donor/login`, donorForm)
            if (response.data.status === 'loggedIn') {
                alert('Logged in successfully!')
                localStorage.setItem('donorId', response.data.id)
                localStorage.setItem('donorName', response.data.name)
                navigate('/donor/dashboard')
            }
            else {
                alert('Invalid username/password!')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleOrgLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${BACKEND_URL}/organization/login`, organizationForm)
            if (response.data.status === 'loggedIn') {
                alert('Logged in successfully!')
                localStorage.setItem('organizationId', response.data.id)
                localStorage.setItem('organizationName', response.data.name)
                localStorage.setItem('organizationImage', response.data.image)
                localStorage.setItem('verified', response.data.verified)
                navigate('/organization/dashboard')
            }
            else {
                alert('Invalid email/password!')
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleDonorGoogleLogin = async () => {
        try {
            window.location.href = `${BACKEND_URL}/auth/donor/login/google`;
        } catch (err) {
            console.error("Google sign-in error:", err);
        }
    };

    // Add this to check for error messages after redirect
    window.addEventListener('load', function () {
        if (window.location.pathname === '/auth' && window.location.search.includes('error=')) {
            const urlParams = new URLSearchParams(window.location.search);
            const errorMessage = urlParams.get('error');
            if (errorMessage) {
                alert(errorMessage);
            }
        }
    });



    return (
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
            {/* User Type Selection */}
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    className={`px-5 cursor-pointer py-2 border-2 border-gray-900 rounded-full font-semibold transition-colors ${userType === 'donor' ? 'bg-gray-900 text-white' : 'text-indigo-900'}`}
                    onClick={() => setUserType('donor')}
                >
                    Donor
                </button>
                <button
                    className={`px-5 cursor-pointer py-2 border-2 border-gray-900 rounded-full font-semibold transition-colors ${userType === 'organization' ? 'bg-gray-900 text-white' : 'text-indigo-900'}`}
                    onClick={() => setUserType('organization')}
                >
                    Organization
                </button>
            </div>

            {/* Donor Login Form */}
            {userType === 'donor' && (
                <form onSubmit={handleDonorLogin}>
                    <div className="mb-5">
                        <label htmlFor="donor-username" className="block mb-2 font-medium text-gray-700">
                            Email ID
                        </label>
                        <input
                            type="text"
                            name="email"
                            onChange={handleDonorChange}
                            value={donorForm.email}
                            id="donor-username"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="donor-password" className="block mb-2 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleDonorChange}
                            value={donorForm.password}
                            id="donor-password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 px-4 bg-indigo-900 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
                    >
                        Login as Donor
                    </button>

                    {/* Google Sign-In Button */}
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={handleDonorGoogleLogin}
                            className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                                <path fill="none" d="M1 1h22v22H1z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>

                    <p className="text-center mt-6 mb-2">
                        <span className="text-gray-600 mr-2">Admin?</span>
                        <a
                            href="/login/admin"
                            className="text-indigo-900 hover:text-indigo-700 font-medium transition-colors duration-200 relative inline-block group"
                        >
                            Login Here
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                        </a>
                    </p>
                </form>
            )}

            {/* Organization Login Form */}
            {userType === 'organization' && (
                <form onSubmit={handleOrgLogin}>
                    <div className="mb-5">
                        <label htmlFor="org-username" className="block mb-2 font-medium text-gray-700">
                            Email ID
                        </label>
                        <input
                            type="text"
                            name='email'
                            onChange={handleOrganizationChange}
                            value={organizationForm.email}
                            id="org-username"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="org-password" className="block mb-2 font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            onChange={handleOrganizationChange}
                            value={organizationForm.password}
                            id="org-password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 px-4 bg-indigo-900 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
                    >
                        Login as Organization
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;