import ServicePageLayout from '@/components/ServicePageLayout';
import BudgetingCalculator from '@/components/BudgetingCalculator';
import BudgetingContact from '@/components/BudgetingContact';
import { Calculator } from 'lucide-react';

export default function BudgetingPage() {
    return (
        <div className="min-h-screen bg-white">
            <ServicePageLayout
                serviceName="Budgeting Calculator"
                serviceDescription="Track your spending and saving patterns with visual insights and financial planning tools. Analyze your monthly income and expenses to optimize your financial health."
                serviceIcon={<Calculator className="h-12 w-12 text-white" />}
                serviceColor="bg-gradient-to-r from-indigo-500 to-indigo-600"
            >
                <BudgetingCalculator />
            </ServicePageLayout>
            <BudgetingContact />
        </div>
    );
}
