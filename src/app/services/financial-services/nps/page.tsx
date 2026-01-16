import ServicePageLayout from '@/components/ServicePageLayout';
import { Calendar} from 'lucide-react';
import CombinedNPSCalculator from '@/components/CombinedNPSCalculator';


export default function NPSPage() {
    return (
        <ServicePageLayout
            serviceName="Systematic Investment Plan (SIP) AND Systematic Withdrawal Plan (SWP)"
            serviceDescription="Build wealth gradually through disciplined SIPs or generate steady retirement income from lump sum investments. Ideal for both long-term growth and consistent monthly payouts."
            serviceIcon={<Calendar className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-green-500 to-green-600"
        >
             <CombinedNPSCalculator />
        </ServicePageLayout>
    );
}