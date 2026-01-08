'use client';

import { motion } from 'framer-motion';
import Contact from './Contact';

interface ServicePageLayoutProps {
    children?: React.ReactNode;
    serviceName: string;
    serviceDescription: string;
    serviceIcon: React.ReactNode;
    serviceColor: string;
}

const ServicePageLayout = ({
    children,
    serviceName,
    serviceDescription,
    serviceIcon,
    serviceColor
}: ServicePageLayoutProps) => {
    return (
        <div className="min-h-screen bg-white">
            {/* Service Hero Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <div className={`inline-flex items-center justify-center p-4 ${serviceColor} rounded-2xl mb-8`}>
                            {serviceIcon}
                        </div>

                        <h1 className="font-heading text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                            {serviceName}
                        </h1>

                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            {serviceDescription}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <main>
                {children}
            </main>

            {/* Contact Section */}
            <Contact />
        </div>
    );
};

export default ServicePageLayout;
