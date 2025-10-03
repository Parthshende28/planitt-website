'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, CheckCircle, MessageCircle } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');

    const handleWhatsAppMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstName.trim()) {
            alert('Please enter your first name');
            return;
        }

        const message = `Hello I am ${firstName} and I am interested in investing. Please guide me...`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/918605727484?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
            {/* Full Section Gradient Noodles Illustration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* WhatsApp Green Noodles - Top Left */}
                <div className="absolute -top-10 -left-10 w-64 h-64 opacity-15">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                            d="M10,20 Q30,10 50,30 Q70,50 90,40 Q85,60 60,70 Q40,80 20,60 Q5,45 10,20 Z"
                            fill="url(#whatsappGradient)"
                            className="animate-pulse"
                        />
                        <path
                            d="M80,15 Q60,25 40,45 Q20,65 30,85 Q50,75 70,55 Q90,35 80,15 Z"
                            fill="url(#whatsappGradient2)"
                            className="animate-pulse"
                            style={{ animationDelay: '1s' }}
                        />
                    </svg>
                </div>

                {/* Instagram Pink Noodles - Top Right */}
                <div className="absolute -top-10 -right-10 w-72 h-72 opacity-15">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                            d="M15,10 Q35,5 55,25 Q75,45 85,65 Q80,85 60,75 Q40,55 25,35 Q10,20 15,10 Z"
                            fill="url(#instagramGradient)"
                            className="animate-pulse"
                            style={{ animationDelay: '0.5s' }}
                        />
                        <path
                            d="M75,20 Q55,30 35,50 Q15,70 25,90 Q45,80 65,60 Q85,40 75,20 Z"
                            fill="url(#instagramGradient2)"
                            className="animate-pulse"
                            style={{ animationDelay: '1.5s' }}
                        />
                    </svg>
                </div>

                {/* WhatsApp Green Noodles - Middle Left */}
                <div className="absolute top-1/2 -left-20 w-48 h-48 opacity-12">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                            d="M20,30 Q40,20 60,40 Q80,60 85,80 Q70,90 50,70 Q30,50 20,30 Z"
                            fill="url(#whatsappGradient)"
                            className="animate-pulse"
                            style={{ animationDelay: '2s' }}
                        />
                    </svg>
                </div>

                {/* Instagram Purple Noodles - Middle Right */}
                <div className="absolute top-1/3 -right-16 w-56 h-56 opacity-12">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                            d="M25,15 Q45,5 65,25 Q85,45 90,65 Q75,85 55,65 Q35,45 25,15 Z"
                            fill="url(#instagramGradient2)"
                            className="animate-pulse"
                            style={{ animationDelay: '1.2s' }}
                        />
                    </svg>
                </div>

                {/* Additional Floating Elements - Bottom */}
                <div className="absolute -bottom-10 left-1/4 w-40 h-40 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="30" fill="url(#blueGradient)" className="animate-pulse" style={{ animationDelay: '2.5s' }} />
                    </svg>
                </div>

                <div className="absolute -bottom-10 right-1/3 w-32 h-32 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="25" fill="url(#purpleGradient)" className="animate-pulse" style={{ animationDelay: '3s' }} />
                    </svg>
                </div>

                {/* Center Large Element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-8">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <path
                            d="M50,10 Q70,20 80,40 Q90,60 70,80 Q50,90 30,80 Q10,60 20,40 Q30,20 50,10 Z"
                            fill="url(#mixedGradient)"
                            className="animate-pulse"
                            style={{ animationDelay: '0.8s' }}
                        />
                    </svg>
                </div>

                {/* Gradient Definitions */}
                <svg width="0" height="0" className="absolute">
                    <defs>
                        <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#25D366" />
                            <stop offset="100%" stopColor="#128C7E" />
                        </linearGradient>
                        <linearGradient id="whatsappGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#128C7E" />
                            <stop offset="100%" stopColor="#075E54" />
                        </linearGradient>
                        <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#E4405F" />
                            <stop offset="50%" stopColor="#F77737" />
                            <stop offset="100%" stopColor="#FCAF45" />
                        </linearGradient>
                        <linearGradient id="instagramGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#833AB4" />
                            <stop offset="50%" stopColor="#E4405F" />
                            <stop offset="100%" stopColor="#F77737" />
                        </linearGradient>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#1D4ED8" />
                        </linearGradient>
                        <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#7C3AED" />
                        </linearGradient>
                        <linearGradient id="mixedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#25D366" />
                            <stop offset="33%" stopColor="#E4405F" />
                            <stop offset="66%" stopColor="#833AB4" />
                            <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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

                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
                    >
                        {/* Left Side - Contact Information */}
                        <div className="space-y-8">
                            {/* Why Choose Us */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h4 className="font-heading text-xl font-bold text-gray-900 mb-4 text-center lg:text-left">
                                    Why Choose Planitt?
                                </h4>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-sm">Free initial consultation</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-sm">Personalized financial planning</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-sm">Regular portfolio reviews</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-sm">Transparent fee structure</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                        <span className="text-sm">Ongoing support and guidance</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h4 className="font-heading text-2xl font-bold text-gray-900 mb-6 text-center">
                                Send Message on WhatsApp
                            </h4>
                            <form onSubmit={handleWhatsAppMessage} className="space-y-6">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                        First Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number (Optional)
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your phone number"
                                    />
                                </div>


                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    Send Message on WhatsApp
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
