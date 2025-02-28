import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrgInfo = () => {
    const [formData, setFormData] = useState({
        id: localStorage.getItem('orgID'),
        name: '',
        type: '',
        vision: '',
        donationAim: '',
        image: null,
        donationAmount: 0,
        currency: '',
        walletAddress: '',
        website: '',
        verified: false,
    });
    const [base64PhotoURL, setBase64PhotoURL] = useState('');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
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
        setFormData((prevState) => ({
            ...prevState,
            image: base64PhotoURL,
        }));
    }, [base64PhotoURL]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post(`${BACKEND_URL}/organization/info`, formData);
            if (response.status === 200) {
                alert('Organization information submitted successfully!');
                window.location.href = '/auth';
                localStorage.removeItem('OrgID');
                return
            } else {
                console.error(response);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-indigo-900 text-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-6">
                        We Want to Know More
                        <span className="block text-teal-400">About You</span>
                    </h1>
                    <p className="text-xl">
                        Help us understand your organization better so we can connect you with the right donors
                    </p>
                </div>

                <div className="bg-indigo-500/50 rounded-lg p-8 backdrop-blur-sm shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Organization Name */}
                        <div>
                            <label className="block text-xl mb-2">Organization Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                placeholder="Enter your organization's name"
                                required
                            />
                        </div>

                        {/* Organization Type */}
                        <div>
                            <label className="block text-xl mb-2">Organization Type</label>
                            <input
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                placeholder="Enter your organization's type"
                                required
                            />
                        </div>

                        {/* Organization Image */}
                        <div>
                            <label className="block text-xl mb-2">Organization Logo/Image</label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-indigo-500 bg-indigo-700/30 hover:bg-indigo-700/50">
                                    {!formData.image ? (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-12 h-12 mb-4 text-teal-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-center"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-300">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <p className="text-teal-400 font-medium">File selected</p>
                                            <p className="text-sm">{formData.image.name}</p>
                                        </div>
                                    )}
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Vision */}
                        <div>
                            <label className="block text-xl mb-2">Organization Vision</label>
                            <textarea
                                name="vision"
                                value={formData.vision}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-32"
                                placeholder="Describe your organization's vision and mission"
                                required
                            ></textarea>
                        </div>

                        {/* Donation Aim */}
                        <div>
                            <label className="block text-xl mb-2">Donation Aim</label>
                            <div className="flex flex-col lg:flex-row gap-4">
                                <input
                                    type="number"
                                    name="donationAmount"
                                    onChange={handleChange}
                                    className="w-full lg:w-1/3 p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    placeholder="Target amount"
                                    required
                                />
                                <select
                                    name="currency"
                                    onChange={handleChange}
                                    className="w-full lg:w-1/3 p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled>Select currency</option>
                                    <option value="ETH">ETH</option>
                                    <option value="BTC">BTC</option>
                                    <option value="USDC">USDC</option>
                                    <option value="USDT">USDT</option>
                                </select>
                            </div>
                        </div>

                        {/* Purpose */}
                        <div>
                            <label className="block text-xl mb-2">Purpose of Donation</label>
                            <textarea
                                name="donationAim"
                                value={formData.donationAim}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400 min-h-32"
                                placeholder="Explain how the donations will be used"
                                required
                            ></textarea>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xl mb-2">Wallet Address</label>
                                <input
                                    type="text"
                                    name="walletAddress"
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    placeholder="0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xl mb-2">Website (if any)</label>
                                <input
                                    type="url"
                                    name="website"
                                    onChange={handleChange}
                                    className="w-full p-3 rounded-lg bg-indigo-700/50 border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
                                    placeholder="https://www.yourorganization.com"
                                />
                            </div>
                        </div>

                        {/* Submit button */}
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full py-4 px-6 rounded-full text-lg font-bold text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 transition duration-300 transform hover:scale-105 shadow-lg"
                            >
                                Submit Information
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrgInfo;