"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    Heart,
    Calendar,
    Calculator,
    Wallet,
    ArrowRight,
    Globe,
    SmartphoneCharging,
    Pen,
    InfinityIcon,
    ShieldCheck,
    CloudCheck,
    type LucideIcon,
} from 'lucide-react';

type ServiceDomain = 'financial' | 'technical';
type HomeMode = 'all' | 'financial' | 'technical';

type ServiceItem = {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    textColor: string;
    url: string;
    domain: ServiceDomain;
};

type ServicesProps = {
    mode?: HomeMode;
};

const Services = ({ mode = 'all' }: ServicesProps) => {
    const financialServices: ServiceItem[] = [
        {
            icon: Target,
            title: 'Goal Setting',
            description: 'Calculate the monthly SIP required to achieve your financial goals with inflation adjustment.',
            color: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-700',
            url: '/services/financial-services/goal-setting',
            domain: 'financial',
        },
        {
            icon: Heart,
            title: 'Insurance & NPS',
            description: 'Comprehensive life and health insurance solutions to protect your loved ones.',
            color: 'from-red-500 to-red-600',
            textColor: 'text-red-700',
            url: '/services/financial-services/insurance',
            domain: 'financial',
        },
        {
            icon: Calendar,
            title: 'SIP & SWP',
            description: 'Retirement planning with tax benefits and long-term wealth accumulation.',
            color: 'from-orange-500 to-orange-600',
            textColor: 'text-orange-700',
            url: '/services/financial-services/nps',
            domain: 'financial',
        },
        {
            icon: Calculator,
            title: 'Budgeting',
            description: 'Track your spending and savings patterns with visual insights and planning tools.',
            color: 'from-indigo-500 to-indigo-600',
            textColor: 'text-indigo-700',
            url: '/services/financial-services/budgeting',
            domain: 'financial',
        },
        {
            icon: Wallet,
            title: 'Daily SIP Tracker',
            description: 'Monitor and manage your daily expenses effectively to stay within your budget.',
            color: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-700',
            url: '/services/financial-services/Daily-Expense-Tracker',
            domain: 'financial',
        },
    ];

    const technicalServices: ServiceItem[] = [
        {
            icon: SmartphoneCharging,
            title: 'Application Development',
            description: 'Native and cross-platform applications built with modern architecture.',
            color: 'from-green-500 to-green-600',
            textColor: 'text-green-700',
            url: '/services/technical-services/app-dev',
            domain: 'technical',
        },
        {
            icon: Globe,
            title: 'Website Development',
            description: 'High-performance websites that deliver clear user journeys and conversions.',
            color: 'from-cyan-500 to-cyan-600',
            textColor: 'text-cyan-700',
            url: '/services/technical-services/web-dev',
            domain: 'technical',
        },
        {
            icon: CloudCheck,
            title: 'Cloud Services',
            description: 'Scalable and secure cloud solutions tailored to your business operations.',
            color: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-700',
            url: '/services/technical-services/cloud-services',
            domain: 'technical',
        },
        {
            icon: Pen,
            title: 'Digital Marketing',
            description: 'Campaigns and brand communication designed for measurable growth.',
            color: 'from-red-500 to-red-600',
            textColor: 'text-red-700',
            url: '/services/technical-services/digital-marketing',
            domain: 'technical',
        },
        {
            icon: InfinityIcon,
            title: 'DevOps & Automation',
            description: 'Automated delivery pipelines for faster releases and stable operations.',
            color: 'from-orange-500 to-orange-600',
            textColor: 'text-orange-700',
            url: '/services/technical-services/devops-automation',
            domain: 'technical',
        },
        {
            icon: ShieldCheck,
            title: 'Cyber Security',
            description: 'Prevention, detection, and response strategies to reduce cyber risk.',
            color: 'from-indigo-500 to-indigo-600',
            textColor: 'text-indigo-700',
            url: '/services/technical-services/cyber-security',
            domain: 'technical',
        },
    ];

    const allServices = [...financialServices, ...technicalServices];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const [active, setActive] = useState<'all' | 'financial' | 'technical'>('all');

    const effectiveMode = mode === 'all' ? active : mode;

    const visibleServices =
        effectiveMode === 'all'
            ? allServices
            : effectiveMode === 'financial'
                ? financialServices
                : technicalServices;

    return (
        <section
            id="services"
            className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Solutions
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        We deliver financial advisory and technical execution under one roof, so your strategy and implementation stay aligned.
                    </p>
                </motion.div>

                {mode === 'all' && (
                    <motion.div className="w-full mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-2 transition-colors duration-300">
                            <button
                                onClick={() => setActive('all')}
                                className={`py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${active === 'all'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                All Solutions
                            </button>
                            <button
                                onClick={() => setActive('financial')}
                                className={`py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${active === 'financial'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                Financial
                            </button>
                            <button
                                onClick={() => setActive('technical')}
                                className={`py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${active === 'technical'
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                            >
                                Technical
                            </button>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    key={effectiveMode}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {visibleServices.map((service) => (
                        <motion.div
                            key={`${service.domain}-${service.title}`}
                            variants={itemVariants}
                            className="group"
                        >
                            <a
                                href={service.url}
                                className="block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full cursor-pointer"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div
                                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <service.icon className="h-8 w-8 text-white" />
                                    </div>
                                    {effectiveMode === 'all' && (
                                        <span className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${service.domain === 'financial'
                                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                                            : 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300'
                                            }`}>
                                            {service.domain}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {service.description}
                                    </p>

                                    <div className="pt-4 flex justify-end">
                                        <ArrowRight
                                            className={`h-5 w-5 ${service.textColor} dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-200`}
                                        />
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-700 dark:from-blue-700 dark:via-blue-800 dark:to-cyan-800 rounded-2xl p-8 text-white shadow-xl">
                        <h3 className="font-heading text-2xl font-bold mb-4">
                            {effectiveMode === 'financial'
                                ? 'Plan Your Financial Growth'
                                : effectiveMode === 'technical'
                                    ? 'Build Your Technical Roadmap'
                                    : 'Build Growth Across Finance and Technology'}
                        </h3>
                        <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                            {effectiveMode === 'financial'
                                ? 'Get personalized guidance for SIP, protection planning, and long-term wealth decisions.'
                                : effectiveMode === 'technical'
                                    ? 'Get practical execution support for apps, web platforms, cloud, and secure delivery.'
                                    : 'Get domain-specific advisory and execution plans from our team based on your goals, stage, and budget.'}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            {effectiveMode !== 'technical' && (
                                <a
                                    href="/services/financial-services/budgeting"
                                    className="inline-flex items-center px-7 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
                                >
                                    Explore Financial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            )}
                            {effectiveMode !== 'financial' && (
                                <a
                                    href="/services/technical-training"
                                    className="inline-flex items-center px-7 py-3 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-300 shadow-lg"
                                >
                                    Explore Technical
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
