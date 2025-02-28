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