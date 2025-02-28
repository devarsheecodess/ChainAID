import React, { useState } from 'react';
import { Home, ShieldCheck, Ban, Menu, X, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async (e) => {
        e.preventDefault()
        try {
            const cf = window.confirm("Are you sure you want to logout?");
            if (!cf) return;
            localStorage.clear()
            window.location.href = '/';
        } catch (err) {
            console.error("Logout Error:", err);
            alert("Something went wrong. Please try again.");
        }
    }

    return (
        <header className="fixed top-0 left-0 w-full bg-indigo-900 text-white shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/admin" className="flex items-center">
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
                            <span className="ml-2 text-xl font-bold text-white">
                                Chain<span className="text-[#55dcd9]">Aid</span>
                                <span className="text-sm font-normal ml-2 text-indigo-200">Admin</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-1">
                        <Link to="/admin" className="flex items-center px-4 py-2 rounded-md text-white hover:bg-indigo-800 transition">
                            <Home size={20} className="mr-2 text-white" />
                            <span className='text-white'>Home</span>
                        </Link>
                        <Link to="/admin/verify" className="flex items-center px-4 py-2 rounded-md text-white hover:bg-indigo-800 transition">
                            <ShieldCheck size={20} className="mr-2 text-white" />
                            <span className='text-white'>Verify</span>
                        </Link>
                        <Link to="/admin/blacklist" className="flex items-center px-4 py-2 rounded-md text-white hover:bg-indigo-800 transition">
                            <Ban size={20} className="mr-2 text-white" />
                            <span className='text-white'>Blacklist</span>
                        </Link>
                    </nav>

                    {/* User Profile / Logout */}
                    <div className="hidden md:flex items-center">
                        <div className="border-l border-indigo-700 pl-4 ml-4">
                            <button onClick={(e) => handleLogout(e)} className="flex items-center text-indigo-200 hover:text-white transition">
                                <LogOut size={20} className="mr-2 text-white" />
                                <span className='text-white'>Logout</span>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="p-2 rounded-md text-indigo-950 hover:text-white focus:outline-none"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden fixed w-full h-full" style={{ background: 'rgba(40, 53, 147, 0.9)' }}>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/admin"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black/50 mb-5"
                            onClick={toggleMenu}
                        >
                            <div className="flex items-center justify-center p-2 pt-3 pb-3 rounded-lg">
                                <Home size={18} className="mr-3 text-white" />
                                <span className=' text-white'>Home</span>
                            </div>
                        </Link>
                        <Link
                            to="/admin/verify"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black/50 mb-5"
                            onClick={toggleMenu}
                        >
                            <div className="flex items-center justify-center p-2 pt-3 pb-3 rounded-lg">
                                <ShieldCheck size={18} className="mr-3 text-white" />
                                <span className=' text-white'>Verify</span>
                            </div>
                        </Link>
                        <Link
                            to="/admin/blacklist"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black/50 mb-5"
                            onClick={toggleMenu}
                        >
                            <div className="flex items-center justify-center p-2 pt-3 pb-3 rounded-lg">
                                <Ban size={18} className="mr-3 text-white" />
                                <span className=' text-white'>Blacklist</span>
                            </div>
                        </Link>
                        <div className="border-t border-black/50 pt-2 mt-2">
                            <button
                                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-indigo-200 hover:text-white bg-black/50 mb-5"
                                onClick={(e) => handleLogout(e)}
                            >
                                <div className="flex items-center justify-center p-2 pt-3 pb-3 rounded-lg">
                                    <LogOut size={18} className="mr-3 text-white" />
                                    <span className=' text-white'>Logout</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;