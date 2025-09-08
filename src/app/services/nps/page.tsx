import ServicePageLayout from '@/components/ServicePageLayout';
import ServiceInfo from '@/components/ServiceInfo';
import ServiceCalculator from '@/components/ServiceCalculator';
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
            <ServiceCalculator
                serviceType="nps"
                title="Investment Calculator"
                description="Calculate your retirement corpus with NPS investments. Plan your retirement savings with tax benefits and see how your contributions can grow over time."
            />
        </ServicePageLayout>
    );
}
