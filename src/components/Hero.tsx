'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Landmark, Shield, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

type HomeMode = 'financial' | 'technical';

type HeroProps = {
    mode?: HomeMode;
    onModeChange?: (mode: HomeMode) => void;
};

const Hero = ({ mode = 'financial', onModeChange }: HeroProps) => {
    const isTechnical = mode === 'technical';

    const heading = isTechnical ? 'Technology Partner' : 'Finance Partner';

    const description = isTechnical
        ? 'We deliver modern web, app, cloud, and automation solutions to help your business ship faster and scale reliably.'
        : 'We provide strategic financial planning, insurance, SIP, and retirement advisory to help you build long-term wealth securely.';

    return (
        <section className="relative bg-linear-to-br from-blue-50 via-white to-cyan-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden transition-colors duration-300">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-200 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-pulse delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
                <div className="w-full max-w-md mx-auto mb-10 lg:mb-14">
                    <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 mb-2">
                        Select Focus
                    </p>
                    <div className="relative rounded-2xl border border-blue-200/70 dark:border-blue-900/60 bg-white/80 dark:bg-gray-900/70 backdrop-blur-xl p-1.5 shadow-[0_8px_30px_rgba(37,99,235,0.18)]">
                        <motion.div
                            className="absolute top-1.5 bottom-1.5 w-[calc(50%-0.375rem)] rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg"
                            animate={{ x: isTechnical ? '100%' : 0 }}
                            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        />
                        <div className="relative grid grid-cols-2 gap-1">
                            <button
                                onClick={() => onModeChange?.('financial')}
                                className={`h-12 rounded-xl px-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                                    !isTechnical
                                        ? 'text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300'
                                }`}
                            >
                                <Landmark className="h-4 w-4" />
                                Financial
                            </button>
                            <button
                                onClick={() => onModeChange?.('technical')}
                                className={`h-12 rounded-xl px-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                                    isTechnical
                                        ? 'text-white'
                                        : 'text-gray-700 dark:text-gray-300 hover:text-cyan-700 dark:hover:text-cyan-300'
                                }`}
                            >
                                <Cpu className="h-4 w-4" />
                                Technical
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="space-y-8"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`hero-copy-${mode}`}
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -12 }}
                                transition={{ duration: 0.32 }}
                                className="space-y-5"
                            >
                                <h1 className="font-heading text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                                    Your Trusted
                                    <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-cyan-700 dark:from-blue-400 dark:to-cyan-500">
                                        {heading}
                                    </span>
                                </h1>

                                <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {description}
                                </p>

                                <div className="flex flex-wrap gap-6">
                                    <div className="flex items-center space-x-2">
                                        <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Compliance First</span>
                                    </div>
                                    {!isTechnical ? (
                                        <div className="flex items-center space-x-2">
                                            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">Financial Growth</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Code2 className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">Engineering Delivery</span>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">Expert-Led Team</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    {!isTechnical ? (
                                        <>
                                            <Link
                                                href="/services/financial-services/budgeting"
                                                className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                            >
                                                Explore Financial
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                            <a
                                                href="https://www.assetplus.in/mfd/ARN-338883"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                            >
                                                Contact Advisor
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href="/services/technical-training"
                                                className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-cyan-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                            >
                                                Explore Technical
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                            <Link
                                                href="/#contact"
                                                className="inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                                            >
                                                Start Project
                                                <ArrowRight className="ml-2 h-5 w-5" />
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`hero-snapshot-${mode}`}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -12 }}
                                    transition={{ duration: 0.28 }}
                                    className="space-y-5"
                                >
                                    <div className="text-center">
                                        <h3 className="font-heading text-2xl font-bold text-gray-800 dark:text-white mb-1">
                                            {isTechnical ? 'Technical Snapshot' : 'Financial Snapshot'}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            {isTechnical
                                                ? 'Focused engineering for scalable digital outcomes'
                                                : 'Focused advisory for long-term financial outcomes'}
                                        </p>
                                    </div>

                                    {!isTechnical ? (
                                        <div className="rounded-xl p-5 bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200/40 dark:border-blue-900/60">
                                            <p className="text-sm font-semibold tracking-wide text-blue-700 dark:text-blue-400 uppercase mb-3">Financial</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 dark:text-gray-300">Planning</span>
                                                    <span className="font-semibold text-blue-700 dark:text-blue-400">SIP, NPS, Insurance</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 dark:text-gray-300">Advisory</span>
                                                    <span className="font-semibold text-blue-700 dark:text-blue-400">Goal-based</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="rounded-xl p-5 bg-linear-to-r from-cyan-50 to-teal-100 dark:from-cyan-900/20 dark:to-teal-900/20 border border-cyan-200/40 dark:border-cyan-900/60">
                                            <p className="text-sm font-semibold tracking-wide text-cyan-700 dark:text-cyan-400 uppercase mb-3">Technical</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 dark:text-gray-300">Delivery</span>
                                                    <span className="font-semibold text-cyan-700 dark:text-cyan-400">Web, Apps, Cloud</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700 dark:text-gray-300">Operations</span>
                                                    <span className="font-semibold text-cyan-700 dark:text-cyan-400">DevOps, Security</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
