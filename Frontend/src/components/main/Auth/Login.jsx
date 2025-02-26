import React, { useState } from 'react';

const Login = () => {
    const [userType, setUserType] = useState('donor');

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
                <form>
                    <div className="mb-5">
                        <label htmlFor="donor-username" className="block mb-2 font-medium text-gray-700">
                            Email ID
                        </label>
                        <input
                            type="text"
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
                            id="donor-password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex items-center mb-5">
                        <input
                            type="checkbox"
                            id="donor-remember"
                            className="w-5 h-5 text-indigo-900 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="donor-remember" className="ml-2 text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 px-4 bg-indigo-900 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
                    >
                        Login as Donor
                    </button>

                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Forgot your password? <a href="#" className="text-indigo-900 font-medium hover:underline">Reset it here</a>
                        </p>
                    </div>
                </form>
            )}

            {/* Organization Login Form */}
            {userType === 'organization' && (
                <form>
                    <div className="mb-5">
                        <label htmlFor="org-username" className="block mb-2 font-medium text-gray-700">
                            Email ID
                        </label>
                        <input
                            type="text"
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
                            id="org-password"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="flex items-center mb-5">
                        <input
                            type="checkbox"
                            id="org-remember"
                            className="w-5 h-5 text-indigo-900 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="org-remember" className="ml-2 text-gray-700">
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 px-4 bg-indigo-900 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors"
                    >
                        Login as Organization
                    </button>

                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-3 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Forgot your password? <a href="#" className="text-indigo-900 font-medium hover:underline">Reset it here</a>
                        </p>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Login;