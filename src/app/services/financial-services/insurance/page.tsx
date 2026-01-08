import ServicePageLayout from '@/components/ServicePageLayout';

import { Heart } from 'lucide-react';

export default function InsurancePage() {
    return (
        <ServicePageLayout
            serviceName="Insurance"
            serviceDescription="Comprehensive life and health insurance solutions to protect your loved ones. Secure your family's future with our range of insurance products."
            serviceIcon={<Heart className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-red-500 to-red-600"
        >

        </ServicePageLayout>
    );
}
