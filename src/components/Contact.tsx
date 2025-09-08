'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // EmailJS configuration
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

            // Check if EmailJS is properly configured
            if (serviceId === 'YOUR_SERVICE_ID' || templateId === 'YOUR_TEMPLATE_ID' || publicKey === 'YOUR_PUBLIC_KEY') {
                // Simulate API call for demo purposes
                await new Promise(resolve => setTimeout(resolve, 2000));
            } else {
                // Send email using EmailJS
                await emailjs.send(serviceId, templateId, {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    to_name: 'Piyush Tembhekar'
                }, publicKey);
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            console.error('Error sending email:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                                Contact Information
                            </h3>
                            <p className="text-gray-600 mb-8">
                                Reach out to Piyush Tembhekar for expert financial guidance.
                                We&apos;re here to help you make informed decisions for a secure financial future.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-3 rounded-lg">
                                    <Mail className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                                    <p className="text-gray-600">piyush@planitt.com</p>
                                    <p className="text-sm text-gray-500">We&apos;ll respond within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-green-100 p-3 rounded-lg">
                                    <Phone className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                                    <p className="text-gray-600">+91 98765 43210</p>
                                    <p className="text-sm text-gray-500">Mon-Fri 9AM-6PM IST</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-purple-100 p-3 rounded-lg">
                                    <MapPin className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
                                    <p className="text-gray-600">Mumbai, Maharashtra</p>
                                    <p className="text-sm text-gray-500">Serving clients across India</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h4 className="font-heading text-xl font-bold text-gray-900 mb-4">
                                Why Choose Planitt?
                            </h4>
                            <ul className="space-y-3">
                                <li className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    Free initial consultation
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    Personalized financial planning
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    Regular portfolio reviews
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    Transparent fee structure
                                </li>
                                <li className="flex items-center text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    Ongoing support and guidance
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl p-8 shadow-xl"
                    >
                        <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                            Send us a Message
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            {/* Phone Field */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Message Field */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                                    placeholder="Tell us about your financial goals and how we can help..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg"
                                >
                                    <CheckCircle className="h-5 w-5" />
                                    <span>Message sent successfully! We&apos;ll get back to you soon.</span>
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg"
                                >
                                    <AlertCircle className="h-5 w-5" />
                                    <span>Failed to send message. Please try again or contact us directly.</span>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
