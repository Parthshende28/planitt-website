'use client';

import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="font-heading text-xl font-bold">Planitt</h3>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Your trusted financial partner for comprehensive wealth management and
                            financial planning solutions.
                        </p>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h4 className="font-heading text-lg font-semibold">Contact Piyush Tembhekar</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-blue-400" />
                                <span className="text-gray-300 text-sm">planitt.official@gmail.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-400" />
                                <span className="text-gray-300 text-sm">+91 8605727484</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-5 w-5 text-blue-400" />
                                <span className="text-gray-300 text-sm">Gorewada, Nagpur</span>
                            </div>
                        </div>
                    </div>

                    {/* Services Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-heading text-lg font-semibold">Our Services</h4>
                        <div className="grid grid-cols-2 gap-2">
                            <span className="text-gray-300 text-sm">SIP</span>
                            <span className="text-gray-300 text-sm">SWP</span>
                            <span className="text-gray-300 text-sm">Goal Setting</span>
                            <span className="text-gray-300 text-sm">Insurance</span>
                            <span className="text-gray-300 text-sm">NPS</span>
                            <span className="text-gray-300 text-sm">Budgeting</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2025 Planitt. All Rights Reserved. | CEO & Financial Distributor: Piyush Tembhekar
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
