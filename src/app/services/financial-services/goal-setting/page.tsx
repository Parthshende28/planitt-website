import ServiceCalculator from '@/components/ServiceCalculator';

export default function GoalSettingPage() {
    return (
        
            <ServiceCalculator
                serviceType="goal-setting"
                title="Goal Setting Calculator"
                description="Calculate how much you need to invest monthly to achieve your financial goals. Our calculator considers inflation to ensure your goal amount maintains its purchasing power over time."
            />
       
    );
}
