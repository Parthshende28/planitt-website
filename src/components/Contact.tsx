'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Get In Touch
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Ready to start your financial journey? Contact us for a free consultation
                        and personalized financial planning advice.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        {/* Contact Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Mail className="h-8 w-8 text-blue-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Email</h4>
                                <p className="text-gray-600 mb-1">planitt.official@gmail.com</p>
                                <p className="text-sm text-gray-500">We&apos;ll respond within 24 hours</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <Phone className="h-8 w-8 text-green-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Phone</h4>
                                <p className="text-gray-600 mb-1">+91 8605727484</p>
                                <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM IST</p>
                            </div>

                            <div className="text-center">
                                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                    <MapPin className="h-8 w-8 text-purple-600" />
                                </div>
                                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                                <p className="text-gray-600 mb-1">Gorewada, Nagpur</p>
                                <p className="text-sm text-gray-500">Serving clients across India</p>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h4 className="font-heading text-2xl font-bold text-gray-900 mb-6 text-center">
                                Why Choose Planitt?
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center text-gray-600">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span>Free initial consultation</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span>Personalized financial planning</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span>Regular portfolio reviews</span>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span>Transparent fee structure</span>
                                </div>
                                <div className="flex items-center text-gray-600 md:col-span-2">
                                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                                    <span>Ongoing support and guidance</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Now Button */}
                        <div className="text-center">
                            <a
                                href="https://www.assetplus.in/mfd/ARN-338883"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Contact Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
