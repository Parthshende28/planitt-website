'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials = () => {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            name: 'Priya Sharma',
            role: 'School Teacher',
            location: 'Mumbai',
            content: 'Piyush helped me start my SIP journey 3 years ago. Today, I have built a corpus of ₹5 lakhs through disciplined investing. His guidance on mutual funds has been invaluable for my retirement planning.',
            rating: 5,
            investment: '₹10,000/month SIP'
        },
        {
            name: 'Rajesh Kumar',
            role: 'Software Engineer',
            location: 'Bangalore',
            content: 'As a young professional, I was confused about financial planning. Piyush simplified everything and created a comprehensive plan including insurance, mutual funds, and NPS. I feel secure about my financial future.',
            rating: 5,
            investment: '₹25,000/month diversified'
        },
        {
            name: 'Sunita Patel',
            role: 'Bank Manager',
            location: 'Delhi',
            content: 'The financial calculator on this website helped me understand the power of compounding. Piyush\'s expertise in NPS and tax-saving investments has helped me optimize my tax planning significantly.',
            rating: 5,
            investment: '₹15,000/month NPS + MF'
        },
        {
            name: 'Amit Singh',
            role: 'Business Owner',
            location: 'Pune',
            content: 'I needed help with my children\'s education fund and retirement planning. Piyush created a perfect balance of growth and safety investments. The returns have exceeded my expectations.',
            rating: 5,
            investment: '₹50,000/month portfolio'
        },
        {
            name: 'Meera Joshi',
            role: 'Government Employee',
            location: 'Ahmedabad',
            content: 'Piyush helped me understand the importance of insurance and created a comprehensive protection plan for my family. His patient approach and clear explanations made complex financial concepts easy to understand.',
            rating: 5,
            investment: '₹20,000/month + Insurance'
        }
    ];

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToTestimonial = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section id="testimonials" className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        What Our Clients Say
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say
                        about their financial journey with Planitt.
                    </p>
                </motion.div>

                {/* Testimonials Carousel */}
                <div className="relative">
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 lg:p-12 border border-transparent dark:border-gray-800 transition-colors duration-300"
                            >
                                <div className="max-w-4xl mx-auto">
                                    {/* Quote Icon */}
                                    <div className="flex justify-center mb-8">
                                        <div className="bg-blue-600 dark:bg-blue-700 p-4 rounded-full shadow-lg">
                                            <Quote className="h-8 w-8 text-white" />
                                        </div>
                                    </div>

                                    {/* Testimonial Content */}
                                    <div className="text-center space-y-6">
                                        <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed italic">
                                            &ldquo;{testimonials[currentIndex].content}&rdquo;
                                        </p>

                                        {/* Rating */}
                                        <div className="flex justify-center space-x-1">
                                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                                            ))}
                                        </div>

                                        {/* Client Info */}
                                        <div className="space-y-2">
                                            <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
                                                {testimonials[currentIndex].name}
                                            </h3>
                                            <p className="text-blue-600 dark:text-blue-400 font-semibold">
                                                {testimonials[currentIndex].role}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {testimonials[currentIndex].location}
                                            </p>
                                            <div className="inline-block bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md">
                                                {testimonials[currentIndex].investment}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevTestimonial}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-gray-100 dark:border-gray-700"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-gray-100 dark:border-gray-700"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                                ? 'bg-blue-600 dark:bg-blue-400 scale-125'
                                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                                }`}
                        />
                    ))}
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                    <div className="text-center">
                        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
                        <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">₹50Cr+</div>
                        <div className="text-gray-600 dark:text-gray-400">Assets Managed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{currentYear - startYear}+</div>
                        <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">100%</div>
                        <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
