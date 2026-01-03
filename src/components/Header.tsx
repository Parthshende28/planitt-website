'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Services', href: '/#services' },
        { name: 'Calculator', href: '/#calculator' },
        { name: 'About Us', href: '/#about' },
        { name: 'Testimonials', href: '/#testimonials' },
        { name: 'Join Us', href: '/careers', newWindow: false },
    ];

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                 <Link
    href="/"
    aria-label="Planitt Home"
    className="flex items-center focus:outline-none"
>
    <Image
        src="/planitt-logo.png"   // ✅ NO /public
        alt="Planitt Logo"
        width={48}
        height={48}
        priority
        className="transition-transform duration-200 hover:scale-105"
    />
</Link>


                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                                target={item.newWindow ? '_blank' : undefined}
                                rel={item.newWindow ? 'noopener noreferrer' : undefined}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-200"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                    target={item.newWindow ? '_blank' : undefined}
                                    rel={item.newWindow ? 'noopener noreferrer' : undefined}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </header>
    );
};

export default Header;
