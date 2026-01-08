'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative bg-linear-to-br from-blue-50 via-white to-blue-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden transition-colors duration-300">
            {/* Background decorative elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-2000"></div>
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
                                className="font-heading text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                            >
                                Your Trusted
                                <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">
                                    Fin-Tech Partner
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed"
                            >
                                Led by CEO & Financial Distributor <span className="font-semibold text-blue-700 dark:text-blue-400">Piyush Tembhekar</span>,
                                we provide comprehensive financial solutions for Teachers, Youths, and Working Professionals.
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
                                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Trusted & Secure</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Proven Results</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                <span className="text-gray-700 dark:text-gray-300 font-medium">Expert Guidance</span>
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
                                href="/services/financial-services/budgeting"
                                className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Budgeting
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                            <a
                                href="https://www.assetplus.in/mfd/ARN-338883"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                            >
                                Contact Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                            <div className="space-y-6">
                                <div className="text-center">
                                    <h3 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                        Financial Growth Calculator
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">See your potential returns</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">Monthly Investment</span>
                                            <span className="font-bold text-blue-700 dark:text-blue-400">₹5,000</span>
                                        </div>
                                    </div>

                                    <div className="bg-linear-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">Expected Returns</span>
                                            <span className="font-bold text-green-700 dark:text-green-400">12% p.a.</span>
                                        </div>
                                    </div>

                                    <div className="bg-linear-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">Maturity Value (10 years)</span>
                                            <span className="font-bold text-purple-700 dark:text-purple-400">₹11.7 Lakhs</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <Link
                                        href="/#calculator"
                                        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200"
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
