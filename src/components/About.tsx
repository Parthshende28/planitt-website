'use client';

import { motion } from 'framer-motion';
import { Award, Users, Target, Shield, CheckCircle } from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: Shield,
            title: 'Trust & Transparency',
            description: 'We believe in complete transparency in all our dealings and advice.'
        },
        {
            icon: Target,
            title: 'Goal-Oriented Planning',
            description: 'Every financial plan is tailored to your specific goals and life stage.'
        },
        {
            icon: Users,
            title: 'Client-Centric Approach',
            description: 'Your success is our priority, and we work tirelessly to achieve it.'
        },
        {
            icon: Award,
            title: 'Industrial-Expert Guidance',
            description: 'Led by experienced industrial experts with deep knowledge.'
        }
    ];

    const achievements = [
        '50+ Happy Clients',
        '₹50+ Lakhs Assets Under Management',
        '6+ Years of Experience',
        '100% Client Satisfaction Rate'
    ];

    return (
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                About Planitt
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                Planitt is a trusted Fin-Tech service company led by <span className="font-semibold text-blue-700 dark:text-blue-400">Piyush Tembhekar</span>,
                                a seasoned CEO with over 6 years of experience in wealth management.
                            </p>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                We specialize in providing comprehensive financial & technical solutions to organizations, school teachers, young professionals, working individuals, helping them build a secure financial or technical future through strategic planning and expert guidance.
                            </p>
                        </div>

                        {/* Values Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-transparent dark:border-gray-800"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                                            <value.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                {value.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* CEO Profile Card */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 transition-colors duration-300">
                            <div className="text-center mb-6">
                                <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <span className="text-white text-2xl font-bold">PT</span>
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
                                    Piyush Tembhekar
                                </h3>
                                <p className="text-gray-900 dark:text-gray-100 text-sm font-semibold">
                                    (ARN - 338883)
                                </p>
                                <p className="text-blue-600 dark:text-blue-400 font-semibold">
                                    CEO
                                </p>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-600 dark:text-gray-400 text-center">
                                    With over 6 years of experience in financial services, Piyush has helped
                                    hundreds of clients achieve their financial goals through strategic planning
                                    and expert market insights.
                                </p>

                                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 transition-colors duration-300">
                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Qualifications:</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                        <li className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Certified Financial Planner (CFP)
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Mutual Fund Distributor License
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            Insurance Advisor License
                                        </li>
                                        <li className="flex items-center">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            NPS Certified Advisor
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 text-white">
                            <h3 className="font-heading text-2xl font-bold mb-6 text-center">
                                Our Achievements
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {achievements.map((achievement, index) => (
                                    <motion.div
                                        key={achievement}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="text-center"
                                    >
                                        <p className="text-blue-100 dark:text-blue-200 text-sm font-medium">
                                            {achievement}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
