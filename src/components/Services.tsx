'use client';

import { motion } from 'framer-motion';
import {
    TrendingUp,
    Calendar,
    Shield,
    Heart,
    PiggyBank,
    ArrowRight
} from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: TrendingUp,
            title: 'Mutual Funds',
            description: 'Diversified investment options with professional fund management for optimal returns.',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700'
        },
        {
            icon: Calendar,
            title: 'SIP (Systematic Investment Plan)',
            description: 'Regular investment strategy to build wealth gradually with disciplined approach.',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-700'
        },
        {
            icon: Shield,
            title: 'Fixed Deposits',
            description: 'Secure and guaranteed returns with flexible tenure options for your savings.',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700'
        },
        {
            icon: Heart,
            title: 'Insurance',
            description: 'Comprehensive life and health insurance solutions to protect your loved ones.',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50',
            textColor: 'text-red-700'
        },
        {
            icon: PiggyBank,
            title: 'NPS (National Pension System)',
            description: 'Retirement planning with tax benefits and long-term wealth accumulation.',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <section id="services" className="py-20 bg-gray-50">
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
                        Our Financial Services
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Comprehensive financial solutions designed to help you achieve your goals,
                        whether you&apos;re a teacher, young professional, or working individual.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service) => (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            className="group"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                                {/* Icon */}
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="h-8 w-8 text-white" />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <h3 className="font-heading text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    <p className="text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Learn More Link */}
                                    <div className="pt-4">
                                        <a
                                            href="#contact"
                                            className={`inline-flex items-center ${service.textColor} hover:opacity-80 font-medium transition-opacity duration-200`}
                                        >
                                            Learn More
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                        <h3 className="font-heading text-2xl font-bold mb-4">
                            Ready to Start Your Financial Journey?
                        </h3>
                        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                            Get personalized financial advice from our expert team led by Piyush Tembhekar.
                            We&apos;re here to help you make informed decisions for a secure financial future.
                        </p>
                        <a
                            href="#contact"
                            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                        >
                            Get Free Consultation
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
