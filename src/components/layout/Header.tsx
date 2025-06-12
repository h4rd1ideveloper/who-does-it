"use client";
import React from 'react';
import Link from 'next/link';
import {FaSearch, FaBars} from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (<header className="bg-blue-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold">
                        Eu Faço Isso
                    </Link>

                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex flex-1 mx-10">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="O que você precisa? Ex.: eletricista, encanador..."
                                className="w-full py-2 px-4 rounded-lg focus:outline-none"
                            />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                                <FaSearch/>
                            </button>
                        </div>
                    </div>

                    {/* Navigation - Desktop */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/login" className="hover:text-blue-200 transition">
                            Login
                        </Link>
                        <Link
                            href="/cadastro-prestador"
                            className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition"
                        >
                            Seja um Prestador
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <FaBars/>
                    </button>
                </div>

                {/* Search Bar - Mobile */}
                <div className="mt-3 md:hidden">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="O que você precisa?"
                            className="w-full py-2 px-4 rounded-lg focus:outline-none"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
                            <FaSearch/>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (<nav className="mt-3 md:hidden">
                        <div className="flex flex-col space-y-3 py-3">
                            <Link
                                href="/login"
                                className="hover:text-blue-200 transition py-2"
                            >
                                Login
                            </Link>
                            <Link
                                href="/cadastro-prestador"
                                className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded-lg transition text-center"
                            >
                                Seja um Prestador
                            </Link>
                        </div>
                    </nav>)}
            </div>
        </header>);
};

export default Header;
