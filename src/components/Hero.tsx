'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="font-heading text-4xl lg:text-6xl font-bold text-gray-900 leading-tight"
                            >
                                Your Trusted
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                                    Financial Partner
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl text-gray-600 leading-relaxed"
                            >
                                Led by CEO & Financial Distributor <span className="font-semibold text-blue-700">Piyush Tembhekar</span>,
                                we provide comprehensive financial solutions for teachers, youths, and working professionals.
                            </motion.p>
                        </div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="flex flex-wrap gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <Shield className="h-6 w-6 text-blue-600" />
                                <span className="text-gray-700 font-medium">Trusted & Secure</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="h-6 w-6 text-green-600" />
                                <span className="text-gray-700 font-medium">Proven Results</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-6 w-6 text-purple-600" />
                                <span className="text-gray-700 font-medium">Expert Guidance</span>
                            </div>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="/services/budgeting"
                                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Budgeting
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                            <Link
                                href="/#calculator"
                                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-300"
                            >
                                Try Our Calculator
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h3 className="font-heading text-2xl font-bold text-gray-800 mb-2">
                                        Financial Growth Calculator
                                    </h3>
                                    <p className="text-gray-600">See your potential returns</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-medium">Monthly Investment</span>
                                            <span className="font-bold text-blue-700">₹5,000</span>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-medium">Expected Returns</span>
                                            <span className="font-bold text-green-700">12% p.a.</span>
                                        </div>
                                    </div>

                                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-medium">Maturity Value (10 years)</span>
                                            <span className="font-bold text-purple-700">₹11.5 Lakhs</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Link
                                        href="/#calculator"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                    >
                                        Calculate Your Returns
                                        <ArrowRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
