import ServicePageLayout from '@/components/ServicePageLayout';
import CombinedNPSCalculator from '@/components/CombinedNPSCalculator';
import { PiggyBank } from 'lucide-react';
import ServiceCalculator from '@/components/ServiceCalculator';
import SIPCalculator from '@/components/SIPCalculator';
import DailySIPCalculator from '@/components/DailySIPCalculator';

export default function NPSPage() {
    return (
        <ServicePageLayout
            serviceName="National Pension System"
            serviceDescription="Retirement planning with tax benefits and long-term wealth accumulation. Build your retirement corpus with India's most tax-efficient pension scheme."
            serviceIcon={<PiggyBank className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-orange-500 to-orange-600"
        >
             <ServiceCalculator
                            serviceType="insurance"
                            title="Investment Calculator"
                            description="Calculate your insurance premium and coverage needs. Plan your life and health insurance with our comprehensive calculator to ensure adequate protection."
                        />
                        <SIPCalculator />
                        <DailySIPCalculator />
            <CombinedNPSCalculator />
        </ServicePageLayout>
    );
}
