'use client';

import { Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <Image src="/planitt-logo-screenshot.png" alt="Planitt Logo" width={30} height={30} className="mr-2 rounded-full" />
                            <h3 className="font-heading text-xl font-bold">Planitt</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your trusted financial partner for comprehensive wealth management and
                            financial planning solutions.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h4 className="font-heading text-lg font-semibold">Contact Piyush Tembhekar</h4>
                        <div className="flex gap-8">
                            {/* Left Side - Contact Info */}
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-blue-400" />
                                    <a
                                        href="mailto:planitt.official@gmail.com"
                                        className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200"
                                    >
                                        planitt.official@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-blue-400" />
                                    <a
                                        href="tel:+918605727484"
                                        className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200"
                                    >
                                        +91 8605727484
                                    </a>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-blue-400" />
                                    <span className="text-gray-300 text-sm">Gorewada, Nagpur</span>
                                </div>
                            </div>

                            {/* Right Side - Social Media Links */}
                            <div className="space-y-3 flex-1">
                                <a
                                    href="https://www.instagram.com/planitt_official/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-gray-300 text-sm hover:text-pink-400 transition-colors duration-200"
                                >
                                    <Instagram className="h-5 w-5" />
                                    <span>planitt_official</span>
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/planittt/posts/?feedView=all"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200"
                                >
                                    <Linkedin className="h-5 w-5" />
                                    <span>planitt</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Services Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-heading text-lg font-semibold">Our Services</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <a
                                href="#services"
                                className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                            >
                                SIP
                            </a>
                            <a
                                href="#services"
                                className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                            >
                                SWP
                            </a>
                            <a
                                href="#services"
                                className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                            >
                                Goal Setting
                            </a>
                            <a
                                href="#services"
                                className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                            >
                                Insurance
                            </a>
                            <a
                                href="#services"
                                className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                            >
                                NPS
                            </a>
                            <a
                                href="#services"
                                className="text-gray-300 text-sm hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                            >
                                Budgeting
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 Planitt. All Rights Reserved. | CEO & Financial Distributor: <a
                            href="#about"
                            className="text-gray-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                        >
                            Piyush Tembhekar
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
