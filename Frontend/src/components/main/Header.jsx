import React, { useState } from 'react';
import { Link, scroller } from 'react-scroll';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const scrollToTop = () => {
        // Scroll to the top of the page using react-scroll
        scroller.scrollTo('top', {
            smooth: true,
            duration: 500, // Duration in ms
            offset: -1500,   // Adjust this if you want to offset the scroll position (e.g., if you have a fixed header)
        });
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50" id='home' style={{ backgroundColor: 'rgba(49,44,133,0.8)' }}>
            <div id="top"></div>
            <div className="max-w-6xl mx-auto px-4 py-4 sticky top-0 z-50 ">
                <div className="flex justify-between items-center">
                    {/* Logo and App Name */}
                    <div className="flex items-center space-x-2">
                        <svg
                            className="h-8 w-8 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                        </svg>
                        <h1 className="text-3xl font-bold text-white tracking-tight flex">Chain<p className='text-[#55dcd9]'>Aid</p></h1>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-10 text-white">
                        <Link
                            to="top"
                            onClick={scrollToTop}
                            smooth={true}
                            duration={500}
                            className="text-white text-lg font-medium cursor-pointer"
                        >
                            <p className='text-white hover:text-gray-300'>Home</p>
                        </Link>
                        <Link
                            to="about"
                            smooth={true}
                            duration={500}
                            className="text-white text-lg font-medium cursor-pointer"
                        >
                            <p className='text-white hover:text-gray-300'>About</p>
                        </Link>
                    </nav>


                    {/* Login Button */}
                    <div className="hidden md:block">
                        <button onClick={() => window.location.href = '/auth'} className="bg-white cursor-pointer hover:bg-gray-300 text-indigo-900 px-8 py-2 rounded-full font-medium shadow hover:bg-opacity-90 transition-colors duration-200">
                            Login
                        </button>
                    </div>

                    {/* Mobile Menu Button - Only visible on small screens */}
                    <div className="md:hidden">
                        <button
                            className="text-white focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu - Toggled by button */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 h-screen py-3 border-t border-indigo-700">
                        <nav className="flex flex-col space-y-3 text-center gap-5">
                            <Link
                                to="home"
                                smooth={true}
                                duration={500}
                                onClick={() => { setIsMenuOpen(false); scrollToTop(); }}
                                className="flex justify-center items-center gap-3 text-white font-medium px-2 py-3 cursor-pointer bg-indigo-700 p-5 rounded-lg"
                                style={{ backgroundColor: 'rgba(49,44,133,0.8)' }}
                            >
                                <i className="fa-solid fa-house text-white"></i>
                                <p className="text-white">Home</p>
                            </Link>
                            <Link
                                to="about"
                                smooth={true}
                                duration={500}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex justify-center items-center gap-3 text-white font-medium px-2 py-3 cursor-pointer bg-indigo-700 p-5 rounded-lg"
                                style={{ backgroundColor: 'rgba(49,44,133,0.8)' }}
                            >
                                <i className="fa-solid fa-question text-white"></i>
                                <p className="text-white">About</p>
                            </Link>
                            <Link
                                smooth={true}
                                duration={500}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex justify-center items-center gap-3 text-white font-medium px-2 py-3 cursor-pointer bg-indigo-700 p-5 rounded-lg"
                                style={{ backgroundColor: 'rgba(49,44,133,0.8)' }}
                            >
                                <i className="fa-solid fa-user text-white"></i>
                                <p className="text-white">Login</p>
                            </Link>
                        </nav>
                    </div>
                )}

            </div>
        </header>
    );
};

export default Header;