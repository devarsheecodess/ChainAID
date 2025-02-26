import React, { useState } from 'react';
import '../../../App.css';
import Login from './Login';
import Signup from './Signup';

// Main App Component
const AuthPage = () => {
    const [activeTab, setActiveTab] = useState('login');

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-indigo-900">
            <div className="w-full max-w-4xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight flex justify-center items-center mb-5">Chain<p className='text-[#55dcd9]'>Aid</p></h1>
                    <p className="text-white text-lg">Connecting donors with organizations making a difference</p>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden flex">
                    <button
                        className={`flex-1 py-4 px-6 font-semibold text-lg transition-colors ${activeTab === 'login' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-4 px-6 font-semibold text-lg transition-colors ${activeTab === 'signup' ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Tab Content */}
                <div className="w-full">
                    {activeTab === 'login' && <Login />}
                    {activeTab === 'signup' && <Signup />}
                </div>
            </div>
        </div>
    );
};


export default AuthPage;