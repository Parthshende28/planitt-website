'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

type HomeMode = 'all' | 'financial' | 'technical';

type Testimonial = {
    name: string;
    role: string;
    location: string;
    content: string;
    rating: number;
    investment: string;
};

type TestimonialsProps = {
    mode?: HomeMode;
};

const financialTestimonials: Testimonial[] = [
    {
        name: 'Priya Sharma',
        role: 'School Teacher',
        location: 'Mumbai',
        content: 'Piyush helped me start my SIP journey 3 years ago. I built a corpus through disciplined investing and structured guidance.',
        rating: 5,
        investment: 'Rs 10,000/month SIP',
    },
    {
        name: 'Rajesh Kumar',
        role: 'Software Engineer',
        location: 'Bangalore',
        content: 'I was confused about planning. The team gave me a clear roadmap across insurance, mutual funds, and retirement planning.',
        rating: 5,
        investment: 'Rs 25,000/month diversified',
    },
    {
        name: 'Amit Singh',
        role: 'Business Owner',
        location: 'Pune',
        content: 'The balance of growth and safety in my portfolio was exactly what I needed. The advisory quality has been consistent.',
        rating: 5,
        investment: 'Rs 50,000/month portfolio',
    },
];

const technicalTestimonials: Testimonial[] = [
    {
        name: 'Nikita Rao',
        role: 'Startup Founder',
        location: 'Hyderabad',
        content: 'Planitt delivered our web platform quickly with a clean architecture. Their communication and release discipline were excellent.',
        rating: 5,
        investment: 'Website + cloud deployment',
    },
    {
        name: 'Vikram Deshmukh',
        role: 'Operations Head',
        location: 'Pune',
        content: 'Their team automated key manual workflows and cut our turnaround time significantly. Execution was practical and stable.',
        rating: 5,
        investment: 'DevOps and automation rollout',
    },
    {
        name: 'Sneha Kulkarni',
        role: 'Product Manager',
        location: 'Mumbai',
        content: 'We got app, backend, and cloud support in one engagement. Delivery quality and documentation were better than expected.',
        rating: 5,
        investment: 'Cross-platform app delivery',
    },
];

const Testimonials = ({ mode = 'all' }: TestimonialsProps) => {
    const startYear = 2020;
    const currentYear = new Date().getFullYear();
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = useMemo(() => {
        if (mode === 'financial') return financialTestimonials;
        if (mode === 'technical') return technicalTestimonials;
        return [...financialTestimonials, ...technicalTestimonials];
    }, [mode]);
    const palette =
        mode === 'technical'
            ? {
                panel: 'from-zinc-100 to-slate-200 dark:from-zinc-900 dark:to-slate-900',
                quoteBg: 'bg-zinc-600 dark:bg-zinc-700',
                role: 'text-zinc-700 dark:text-zinc-300',
                chip: 'bg-zinc-700 dark:bg-zinc-600',
                dotActive: 'bg-zinc-600 dark:bg-zinc-400',
                statA: 'text-zinc-700 dark:text-zinc-300',
                statB: 'text-slate-600 dark:text-slate-300',
                statC: 'text-neutral-600 dark:text-neutral-300',
                statD: 'text-zinc-500 dark:text-zinc-400',
            }
            : {
                panel: 'from-[#fff3d4] to-[#f2deab] dark:from-[#3b2f17] dark:to-[#4d3c1d]',
                quoteBg: 'bg-[#b78622] dark:bg-[#8d6923]',
                role: 'text-[#a9791a] dark:text-[#e7c973]',
                chip: 'bg-[#b78622] dark:bg-[#8d6923]',
                dotActive: 'bg-[#b78622] dark:bg-[#e7c973]',
                statA: 'text-[#b78622] dark:text-[#e7c973]',
                statB: 'text-[#9e721f] dark:text-[#d8b25d]',
                statC: 'text-[#85652a] dark:text-[#c2a463]',
                statD: 'text-[#b58a3a] dark:text-[#e6c16a]',
            };

    useEffect(() => {
        setCurrentIndex(0);
    }, [mode]);

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
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        {mode === 'financial' ? 'Financial Client Feedback' : mode === 'technical' ? 'Technical Client Feedback' : 'What Our Clients Say'}
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        {mode === 'financial'
                            ? 'Feedback from clients who used our planning, protection, and wealth advisory services.'
                            : mode === 'technical'
                                ? 'Feedback from clients who partnered with us for product delivery, cloud, and automation.'
                                : 'Client outcomes across both financial advisory and technical services.'}
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className={`bg-gradient-to-br ${palette.panel} rounded-3xl p-8 lg:p-12 border border-transparent dark:border-gray-800 transition-colors duration-300`}
                            >
                                <div className="max-w-4xl mx-auto">
                                    <div className="flex justify-center mb-8">
                                        <div className={`${palette.quoteBg} p-4 rounded-full shadow-lg`}>
                                            <Quote className="h-8 w-8 text-white" />
                                        </div>
                                    </div>

                                    <div className="text-center space-y-6">
                                        <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed italic">
                                            &ldquo;{testimonials[currentIndex].content}&rdquo;
                                        </p>

                                        <div className="flex justify-center space-x-1">
                                            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                                                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                                            ))}
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
                                                {testimonials[currentIndex].name}
                                            </h3>
                                            <p className={`${palette.role} font-semibold`}>
                                                {testimonials[currentIndex].role}
                                            </p>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {testimonials[currentIndex].location}
                                            </p>
                                            <div className={`inline-block ${palette.chip} text-white px-4 py-2 rounded-full text-sm font-medium shadow-md`}>
                                                {testimonials[currentIndex].investment}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

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

                <div className="flex justify-center space-x-2 mt-8">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToTestimonial(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentIndex
                                ? `${palette.dotActive} scale-125`
                                : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                                }`}
                        />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
                >
                    <div className="text-center">
                        <div className={`text-4xl font-bold ${palette.statA} mb-2`}>50+</div>
                        <div className="text-gray-600 dark:text-gray-400">Happy Clients</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-4xl font-bold ${palette.statB} mb-2`}>{mode === 'technical' ? '30+' : 'Rs 50L+'}</div>
                        <div className="text-gray-600 dark:text-gray-400">{mode === 'technical' ? 'Tech Deliveries' : 'Financial Portfolio Managed'}</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-4xl font-bold ${palette.statC} mb-2`}>{currentYear - startYear}+</div>
                        <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className={`text-4xl font-bold ${palette.statD} mb-2`}>100%</div>
                        <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
