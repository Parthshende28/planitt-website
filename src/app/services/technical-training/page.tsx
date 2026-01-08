import ServicePageLayout from '@/components/ServicePageLayout';
import { BookOpen } from 'lucide-react';

export default function TechnicalTrainingPage() {
    return (
        <ServicePageLayout
            serviceName="Technical Training"
            serviceDescription="Get personalized technical advice or training from our expert team. We help you build your technical future with hands-on learning and industry insights."
            serviceIcon={<BookOpen className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-blue-600 to-blue-700"
        >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h3>
                <p className="text-gray-600">
                    We are currently developing our comprehensive technical training programs. 
                    Stay tuned for courses on Web Development, App Development, Cloud Services, and more.
                </p>
            </div>
        </ServicePageLayout>
    );
}
