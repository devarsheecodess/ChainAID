import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Signup = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState('donor');
    const [base64PhotoURL, setBase64PhotoURL] = useState('');
    const [confirmDonorPassword, setConfirmDonorPassword] = useState('');
    const [confirmOrgPassword, setConfirmOrgPassword] = useState('');

    const [donorForm, setDonorForm] = useState({
        id: uuidv4(),
        username: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        joinedOn: Date.now(),  // Fixed function call
    });

    const [organizationForm, setOrganizationForm] = useState({
        id: uuidv4(),
        orgID: '',
        name: '',
        email: '',
        telephone: '',
        type: '',
        address: '',
        certificate: '',
        password: '',
        joinedOn: Date.now, // Fixed function call
    });

    // Generate username/orgID based on name
    const generateUsername = (name) => {
        const cleanName = name.toLowerCase().replace(/\s+/g, "");
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        return `${cleanName}${randomNumber}`;
    };

    // Handle input changes for Donor
    const handleDonorFormChange = (e) => {
        const { name, value } = e.target;
        setDonorForm((prevState) => ({
            ...prevState,
            [name]: value,
            username: name === "name" ? generateUsername(value) : prevState.username,
        }));
    };

    // Handle input changes for Organization
    const handleOrganizationFormChange = (e) => {
        const { name, value } = e.target;
        setOrganizationForm((prevState) => ({
            ...prevState,
            [name]: value,
            orgID: name === "name" ? generateUsername(value) : prevState.orgID,
        }));
    };

    // Convert certificate file to base64
    const handleCertificate = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const maxSize = 500; // Resize image to max 500px width/height
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                setBase64PhotoURL(canvas.toDataURL('image/jpeg', 0.7)); // Reduce quality to 70%
            };
        };
    };

    // Update organization form when base64PhotoURL changes
    useEffect(() => {
        setOrganizationForm((prevState) => ({
            ...prevState,
            certificate: base64PhotoURL,
        }));
    }, [base64PhotoURL]);

    // Donor Signup Handler
    const handleDonorSignup = async (e) => {
        e.preventDefault();
        if (donorForm.password !== confirmDonorPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3000/donor', donorForm);
            if (response.data.status === 'exists') {
                alert('User already exists');
            } else if (response.data.status === 'success') {
                alert('Donor registered successfully');
                window.location.reload();
            } else {
                console.log('Failed to register donor');
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Organization Signup Handler
    const handleOrgSignup = async (e) => {
        e.preventDefault();
        if (organizationForm.password !== confirmOrgPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            console.log(organizationForm);
            const response = await axios.post('http://localhost:3000/organization', organizationForm);
            if (response.data.status === 'success') {
                alert('Organization registered successfully');
                localStorage.setItem('orgID', organizationForm.id);
                window.location.href = '/organization/info';
            } else {
                console.log('Failed to register organization');
            }
        } catch (err) {
            console.error(err);
        }
    };

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
                <form onSubmit={handleDonorSignup}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="donor-name" className="block mb-2 font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name='name'
                                value={donorForm.name}
                                onChange={handleDonorFormChange}
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
                                name='email'
                                value={donorForm.email}
                                onChange={handleDonorFormChange}
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
                                name='phone'
                                value={donorForm.phone}
                                onChange={handleDonorFormChange}
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
                                name='address'
                                value={donorForm.address}
                                onChange={handleDonorFormChange}
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
                                name='password'
                                value={donorForm.password}
                                onChange={handleDonorFormChange}
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
                                name='confirmPassword'
                                value={confirmDonorPassword}
                                onChange={(e) => setConfirmDonorPassword(e.target.value)}
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
                <form onSubmit={handleOrgSignup}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="org-name" className="block mb-2 font-medium text-gray-700">
                                Organization Name
                            </label>
                            <input
                                type="text"
                                name='name'
                                value={organizationForm.name}
                                onChange={handleOrganizationFormChange}
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
                                name='email'
                                value={organizationForm.email}
                                onChange={handleOrganizationFormChange}
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
                                name='telephone'
                                value={organizationForm.telephone}
                                onChange={handleOrganizationFormChange}
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
                                name='type'
                                value={organizationForm.type}
                                onChange={handleOrganizationFormChange}
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
                            name='address'
                            value={organizationForm.address}
                            onChange={handleOrganizationFormChange}
                            id="org-address"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 font-medium text-gray-700">
                            Proof of Organization
                        </label>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-indigo-500 transition-colors"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            <div className="text-indigo-900 mb-2 text-3xl">
                                <span>📄</span>
                            </div>
                            <p className="text-gray-700 mb-1">Drag and drop your organization certificate here</p>
                            <p className="text-gray-500 text-sm">or</p>
                            <button
                                type="button"
                                className="mt-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-medium transition-colors"
                            >
                                Browse Files
                            </button>
                            <input
                                type="file"
                                id="fileInput"
                                name="certificate"
                                accept=".pdf,.jpg,.png"
                                onChange={(e) => handleCertificate(e)}
                                className="hidden"
                            />
                            <p className="text-xs text-gray-500 mt-2">
                                Supported formats: JPG, PNG (Max size: 5MB)
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div>
                            <label htmlFor="org-password" className="block mb-2 font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name='password'
                                value={organizationForm.password}
                                onChange={handleOrganizationFormChange}
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
                                onChange={(e) => setConfirmOrgPassword(e.target.value)}
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