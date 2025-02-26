import react, { useState } from 'react';

const Signup = () => {
    const [userType, setUserType] = useState('donor');

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
            {/* User Type Selection */}
            <div className="flex justify-center space-x-4 mb-6">
                <button
                    className={`px-5 py-2 border-2 border-indigo-900 rounded-full font-semibold transition-colors ${userType === 'donor' ? 'bg-indigo-900 text-white' : 'text-indigo-900'}`}
                    onClick={() => setUserType('donor')}
                >
                    Donor
                </button>
                <button
                    className={`px-5 py-2 border-2 border-indigo-900 rounded-full font-semibold transition-colors ${userType === 'organization' ? 'bg-indigo-900 text-white' : 'text-indigo-900'}`}
                    onClick={() => setUserType('organization')}
                >
                    Organization
                </button>
            </div>

            {/* Donor Signup Form */}
            {userType === 'donor' && (
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="donor-name" className="block mb-2 font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="donor-name"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="donor-email" className="block mb-2 font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="donor-email"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="donor-phone" className="block mb-2 font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="donor-phone"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="donor-address" className="block mb-2 font-medium text-gray-700">
                                Address
                            </label>
                            <input
                                type="text"
                                id="donor-address"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
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

                        <div>
                            <label htmlFor="donor-confirm-password" className="block mb-2 font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="donor-confirm-password"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-900 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors mt-4"
                    >
                        Register as Donor
                    </button>
                </form>
            )}

            {/* Organization Signup Form */}
            {userType === 'organization' && (
                <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="org-name" className="block mb-2 font-medium text-gray-700">
                                Organization Name
                            </label>
                            <input
                                type="text"
                                id="org-name"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="org-email" className="block mb-2 font-medium text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="org-email"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="org-phone" className="block mb-2 font-medium text-gray-700">
                                Telephone
                            </label>
                            <input
                                type="tel"
                                id="org-phone"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="org-type" className="block mb-2 font-medium text-gray-700">
                                Type of Organization
                            </label>
                            <select
                                id="org-type"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                                required
                            >
                                <option value="">Select organization type</option>
                                <option value="oldage">Oldage Home</option>
                                <option value="orphanage">Orphanage</option>
                                <option value="animal">Animal Shelter</option>
                                <option value="education">Educational Institution</option>
                                <option value="healthcare">Healthcare Facility</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="org-address" className="block mb-2 font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="org-address"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-gray-700">
                            Proof of Organization
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors">
                            <div className="text-indigo-900 mb-2 text-3xl">
                                <span>📄</span>
                            </div>
                            <p className="text-gray-700 mb-1">Drag and drop your organization certificate here</p>
                            <p className="text-gray-500 text-sm">or</p>
                            <button type="button" className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium transition-colors">
                                Browse Files
                            </button>
                            <input type="file" className="hidden" />
                            <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, JPG, PNG (Max size: 5MB)</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
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

                        <div>
                            <label htmlFor="org-confirm-password" className="block mb-2 font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="org-confirm-password"
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-900 hover:bg-indigo-700 text-white font-semibold rounded-md transition-colors mt-4"
                    >
                        Register as Organization
                    </button>
                </form>
            )}
        </div>
    );
};

export default Signup;