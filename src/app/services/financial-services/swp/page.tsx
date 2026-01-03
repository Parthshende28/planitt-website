import ServicePageLayout from '@/components/ServicePageLayout';
import ServiceCalculator from '@/components/ServiceCalculator';
import { TrendingDown } from 'lucide-react';

export default function SWPPage() {
    return (
        <ServicePageLayout
            serviceName="Systematic Withdrawal Plan (SWP)"
            serviceDescription="Generate regular income from your lump sum investments while keeping the remaining amount invested for growth. Perfect for retirees and those seeking steady income."
            serviceIcon={<TrendingDown className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-blue-500 to-blue-600"
        >
            <ServiceCalculator
                serviceType="swp"
                title="SWP Calculator"
                description="Calculate your systematic withdrawal plan returns. See how much you can withdraw regularly while keeping your investment growing over time."
            />
        </ServicePageLayout>
    );
}
