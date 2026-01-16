"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Target,
    Heart,
    Calendar,
    Calculator,
    ArrowRight,
    Globe,
    SmartphoneCharging,
    Pen,
    InfinityIcon,
    ShieldCheck,
    CloudCheck,
} from 'lucide-react';

const Services = () => {
    const financialServices = [
        {
            icon: Target,
            title: 'Goal Setting',
            description: 'Calculate the monthly SIP required to achieve your financial goals with inflation adjustment.',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700',
            url: '/services/financial-services/goal-setting'
        },
        {
            icon: Heart,
            title: 'Insurance & NPS (National Pension System)',
            description: 'Comprehensive life and health insurance solutions to protect your loved ones.',
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50',
            textColor: 'text-red-700',
            url: '/services/financial-services/insurance'
        },
        {
            icon: Calendar,
            title: 'SIP (Systematic Investment Plan) & SWP (Systematic Withdrawal Plan)',
            description: 'Retirement planning with tax benefits and long-term wealth accumulation.',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700',
            url: '/services/financial-services/nps'
        },
        {
            icon: Calculator,
            title: 'Budgeting',
            description: 'Track your spending and saving patterns with visual insights and financial planning tools.',
            color: 'from-indigo-500 to-indigo-600',
            bgColor: 'bg-indigo-50',
            textColor: 'text-indigo-700',
            url: '/services/financial-services/budgeting'
        }
    ];

    const technicalServices = [
        {
            icon: SmartphoneCharging,
            title: "Application Development",
            description: "Native & cross-platform applications built with cutting-edge technologies",
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            textColor: 'text-green-700',
            url: '/services/technical-services/app-dev'
        },
        {
            icon: Globe,
            title: "Website Development",
            description: "Modern, responsive websites that deliver exceptional user experiences",
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-700',
            url: '/services/technical-services/web-dev'
        },
        {
            icon: CloudCheck,
            title: "Cloud Services",
            description: "Scalable and secure cloud solutions tailored to your business needs",
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-700',
            url: '/services/technical-services/cloud-services'
        },
        {
            icon: Pen,
            title: "Digital Marketing",
            description: "Memorable brand identities that represent your vision and values",
            features: ["Brand Identity", "Logo Design", "Style Guides", "Brand Strategy"],
            color: 'from-red-500 to-red-600',
            bgColor: 'bg-red-50',
            textColor: 'text-red-700',
            url: '/services/technical-services/digital-marketing'
        },
        {
            icon: InfinityIcon,
            title: "DevOps & Automation",
            description: "Integrates development & operations with automated workflows for faster delivery.",
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            textColor: 'text-orange-700',
            url: '/services/technical-services/devops-automation'
        },
        {
            icon: ShieldCheck,
            title: "Cyber Security",
            description: "Protection from threats through robust prevention, detection, response.",
            color: 'from-indigo-500 to-indigo-600',
            bgColor: 'bg-indigo-50',
            textColor: 'text-indigo-700',
            url: '/services/technical-services/cyber-security'
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

    const [active, setActive] = useState('financial');

    return (
      <section
        id="services"
        className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
      >
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
              Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Comprehensive financial solutions designed to help you achieve
              your goals, whether you&apos;re a teacher, young professional, or
              working individual.
            </p>
          </motion.div>

          {/* Selector: show two boxes side-by-side when nothing is active */}
          {/* Full-width subheader with toggles (always visible) */}
          <motion.div className="w-full mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-gray-700 flex transition-colors duration-300">
              <button
                onClick={() => setActive("financial")}
                className={`flex-1 py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${
                  active === "financial"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                Financial Services
              </button>
              <button
                onClick={() => setActive("technical")}
                className={`flex-1 py-3 px-4 text-center rounded-lg font-medium transition-all duration-200 ${
                  active === "technical"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                Technical Services
              </button>
            </div>
          </motion.div>

          {/* Conditional: Financial content */}
          {active === "financial" && (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {financialServices.map((service) => (
                  <motion.div
                    key={service.title}
                    variants={itemVariants}
                    className="group"
                  >
                    <a
                      href={service.url}
                      className="block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full cursor-pointer"
                    >
                      {/* Icon */}
                      <div
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {service.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Arrow indicator */}
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

              {/* Financial CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 text-white">
                  <h3 className="font-heading text-2xl font-bold mb-4">
                    Ready to Start Your Financial Journey?
                  </h3>
                  <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                    Get personalized financial advice from our expert team led
                    by Piyush Tembhekar. We&apos;re here to help you make
                    informed decisions for a secure financial future.
                  </p>
                  <a
  href="/services/financial-services/budgeting"
  className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-900
             text-blue-600 dark:text-blue-400
             font-semibold rounded-lg
             hover:text-blue-700 dark:hover:text-blue-300
             dark:hover:bg-gray-800
             transition-colors duration-300 shadow-lg"
>
  Budgeting
  <ArrowRight className="ml-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
</a>

                </div>
              </motion.div>
            </>
          )}

          {/* Conditional: Technical content */}
          {active === "technical" && (
            <>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {technicalServices.map((service) => (
                  <motion.div
                    key={service.title}
                    variants={itemVariants}
                    className="group"
                  >
                    <a
                      href={service.url}
                      className="block bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full cursor-pointer"
                    >
                      {/* Icon */}
                      <div
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <service.icon className="h-8 w-8 text-white" />
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {service.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Arrow indicator */}
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

              {/* Technical CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-16"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-8 text-white shadow-xl">
                  <h3 className="font-heading text-2xl font-bold mb-4">
                    Ready to Start Your Technical Journey?
                  </h3>
                  <p className="text-blue-100 dark:text-blue-200 mb-6 max-w-2xl mx-auto">
                    Get personalized technical advice or training from our
                    expert team led by Parth Shende. We&apos;ll help you build
                    your technical future.
                  </p>
                  <a
                    href="/services/technical-training"
                    className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300 shadow-lg"
                  >
                    Technical Training
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>
    );
};

export default Services;