import ServicePageLayout from '@/components/ServicePageLayout';
import ServiceInfo from '@/components/ServiceInfo';
import CombinedNPSCalculator from '@/components/CombinedNPSCalculator';
import { PiggyBank } from 'lucide-react';

export default function NPSPage() {
    return (
        <ServicePageLayout
            serviceName="National Pension System"
            serviceDescription="Retirement planning with tax benefits and long-term wealth accumulation. Build your retirement corpus with India's most tax-efficient pension scheme."
            serviceIcon={<PiggyBank className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-orange-500 to-orange-600"
        >
            <ServiceInfo serviceType="nps" />
            <CombinedNPSCalculator />
        </ServicePageLayout>
    );
}
