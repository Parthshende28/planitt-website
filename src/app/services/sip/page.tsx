import ServicePageLayout from '@/components/ServicePageLayout';
import ServiceInfo from '@/components/ServiceInfo';
import ServiceCalculator from '@/components/ServiceCalculator';
import { Calendar } from 'lucide-react';

export default function SIPPage() {
    return (
        <ServicePageLayout
            serviceName="SIP (Systematic Investment Plan)"
            serviceDescription="Regular investment strategy to build wealth gradually with disciplined approach. Start your investment journey with small amounts and benefit from rupee cost averaging."
            serviceIcon={<Calendar className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-green-500 to-green-600"
        >
            <ServiceInfo serviceType="sip" />
            <ServiceCalculator
                serviceType="sip"
                title="Investment Calculator"
                description="Plan your systematic investment journey with our SIP calculator. See how regular monthly investments can help you achieve your financial goals through the power of compounding."
            />
        </ServicePageLayout>
    );
}
