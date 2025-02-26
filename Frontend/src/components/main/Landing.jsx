import React, { useEffect } from 'react';
import About from './About';
import Organisations from './Organisations';
import Footer from './Footer';
import HeroImg from '../../assets/hero-img.png';

const Landing = () => {

    return (
        <div className="min-h-screen pt-10">
            {/* Hero Section */}
            <section className="pt-16 pb-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Left content */}
                        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
                            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                                Transparency in <span className="text-teal-500">Giving</span>,<br />
                                Powered by <span className="text-indigo-300">Blockchain</span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8">
                                ChainAid connects donors directly with organizations in need through secure,
                                transparent cryptocurrency transactions. Every donation is tracked on the blockchain,
                                ensuring your support reaches those who need it most.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200">
                                    Start Donating
                                </button>
                            </div>
                        </div>
                        {/* Right content - Logo and animated elements */}
                        <div className="md:w-1/2 relative">
                            <div className="relative bg-white rounded-2xl shadow-xl">
                                <img
                                    src={HeroImg}
                                    className="mx-auto w-full h-80 object-cover rounded-2xl"  // Ensure it fills the box
                                />

                                {/* Animated blockchain elements */}
                                <div className="absolute top-0 right-0 w-full h-full overflow-hidden rounded-2xl -z-10">
                                    <div className="absolute top-6 right-6 bg-teal-500 opacity-20 w-20 h-20 rounded-full"></div>
                                    <div className="absolute bottom-10 left-6 bg-indigo-500 opacity-20 w-16 h-16 rounded-full"></div>
                                    <div className="absolute top-1/2 left-1/3 bg-blue-500 opacity-20 w-12 h-12 rounded-full"></div>
                                </div>
                            </div>

                            {/* Stats Overlay */}
                            <div className="absolute -bottom-6 right-4 bg-white p-4 rounded-lg shadow-lg">
                                <p className="text-sm text-gray-500">Total Donations</p>
                                <p className="text-xl font-bold text-indigo-600">Ξ 256.78 ETH</p>
                            </div>
                            <div className="absolute -bottom-6 left-4 bg-white p-4 rounded-lg shadow-lg">
                                <p className="text-sm text-gray-500">Organizations</p>
                                <p className="text-xl font-bold text-teal-500">48</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Features Section */}
            <About />

            {/* Organizations Section */}
            <Organisations />

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Make a Difference Today</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join our community of donors and help create a positive impact through the power of blockchain technology.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200">
                            Start Donating
                        </button>
                        <button className="px-8 py-3 border border-white text-white font-medium rounded-full hover:bg-indigo-700 transition-colors duration-200">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Landing;