import ServicePageLayout from '@/components/ServicePageLayout';
import ServiceInfo from '@/components/ServiceInfo';
import ServiceCalculator from '@/components/ServiceCalculator';
import SIPCalculator from '@/components/SIPCalculator';
import DailySIPCalculator from '@/components/DailySIPCalculator';
import { Heart } from 'lucide-react';

export default function InsurancePage() {
    return (
        <ServicePageLayout
            serviceName="Insurance"
            serviceDescription="Comprehensive life and health insurance solutions to protect your loved ones. Secure your family's future with our range of insurance products."
            serviceIcon={<Heart className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-red-500 to-red-600"
        >
            <ServiceInfo serviceType="insurance" />
            <ServiceCalculator
                serviceType="insurance"
                title="Investment Calculator"
                description="Calculate your insurance premium and coverage needs. Plan your life and health insurance with our comprehensive calculator to ensure adequate protection."
            />
            <SIPCalculator />
            <DailySIPCalculator />
        </ServicePageLayout>
    );
}
