import ServicePageLayout from '@/components/ServicePageLayout';
import ServiceInfo from '@/components/ServiceInfo';
import ServiceCalculator from '@/components/ServiceCalculator';
import { Target } from 'lucide-react';

export default function GoalSettingPage() {
    return (
        <ServicePageLayout
            serviceName="Goal Setting Calculator"
            serviceDescription="Calculate the monthly SIP required to achieve your financial goals with inflation adjustment. Plan your investments to reach your target amount while maintaining purchasing power."
            serviceIcon={<Target className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-purple-500 to-purple-600"
        >
            <ServiceInfo serviceType="goal-setting" />
            <ServiceCalculator
                serviceType="goal-setting"
                title="Goal Setting Calculator"
                description="Calculate how much you need to invest monthly to achieve your financial goals. Our calculator considers inflation to ensure your goal amount maintains its purchasing power over time."
            />
        </ServicePageLayout>
    );
}
