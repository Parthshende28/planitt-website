'use client';

import ServicePageLayout from '@/components/ServicePageLayout';
import Image from 'next/image';
import { TrendingUp, ShieldCheck, Calculator, Heart } from 'lucide-react';
import NPSCalculator from '@/components/NPSCalculator';

const insurancePlans = {
    health: [
        {
            name: "Niva Bupa ReAssure 2.0",
            description: "A comprehensive health plan with high coverage and a recharge benefit that restores your sum insured for future claims.",
            logo: "/niva-bupa.png"
        },
        {
            name: "Care Supreme",
            description: "A premium health insurance plan offering extensive coverage, no-claim benefits, and flexibility to enhance protection.",
            logo: "/care.png"
        },
        {
            name: "HDFC ERGO Optima Secure",
            description: "A feature-rich health plan that provides multiple layers of coverage from day one, ensuring strong financial security.",
            logo: "/hdfc-ergo.png"
        },
        {
            name: "Star Comprehensive",
            description: "An all-round health insurance plan covering hospitalization, day-care treatments, and wellness benefits for the entire family.",
            logo: "/star.png"
        }
    ],
    term: [
        {
            name: "ICICI Pru iProtect Smart Plus",
            description: "A flexible term plan offering high life cover with options for critical illness, disability benefits, and premium payment choices.",
            logo: "/icici-pru.png"
        },
        {
            name: "HDFC Life Click to Protect Supreme",
            description: "A comprehensive term plan with customizable coverage, return of premium option, and enhanced protection through riders.",
            logo: "/hdfc-life.png"
        },
        {
            name: "Bajaj Allianz eTouch Life",
            description: "An affordable online term plan providing pure life cover with optional riders for extra financial security.",
            logo: "/bajaj-allianz.png"
        },
        {
            name: "Tata AIA Sampoorna Raksha Promise",
            description: "A robust term plan that ensures complete family protection with multiple payout options and optional return of premium.",
            logo: "/tata-aia.png"
        }
    ]
};

export default function InsurancePage() {
    return (
       
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Health Insurance Section */}
                <section className="mb-20">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Health Insurance</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Comprehensive health insurance for peace of mind and financial protection
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {insurancePlans.health.map((plan, index) => (
                            <div key={index} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                <div className="h-32 mb-6 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                    <Image 
                                        src={plan.logo} 
                                        alt={plan.name} 
                                        width={200}
                                        height={100}
                                        className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-110" 
                                    />
                                </div>
                                <h3 className="text-lg font-bold mb-2 dark:text-white">{plan.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                    {plan.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Term Insurance Section */}
                <section className="mb-20">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Term Insurance</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            Affordable term insurance to secure your family&apos;s financial future
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {insurancePlans.term.map((plan, index) => (
                            <div key={index} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
                                <div className="h-32 mb-6 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                    <Image 
                                        src={plan.logo} 
                                        alt={plan.name} 
                                        width={200}
                                        height={100}
                                        className="max-h-[80%] max-w-[80%] object-contain transition-transform duration-300 group-hover:scale-110" 
                                    />
                                </div>
                                <h3 className="text-lg font-bold mb-2 dark:text-white">{plan.name}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                                    {plan.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
                    {/* What is NPS */}
                    <section className="max-w-5xl mx-auto mb-20">
                        <div className="max-w-2xl mx-auto text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                What is National Pension System (NPS)?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                NPS is a government-sponsored pension scheme launched in 2004 to provide retirement income to Indian citizens. It offers market-linked returns with tax benefits under Section 80C and 80CCD(1B).
                            </p>
                        </div>
        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl">
                                <TrendingUp className="h-12 w-12 text-orange-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Market-Linked Returns</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Invest in equity, corporate bonds, and government securities for potentially higher returns compared to traditional savings.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl">
                                <ShieldCheck className="h-12 w-12 text-orange-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Tax Benefits</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Get deductions up to ₹1.5 lakh under Section 80C and additional ₹50,000 under 80CCD(1B) for contributions.
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-2xl">
                                <Calculator className="h-12 w-12 text-orange-500 mb-4" />
                                <h3 className="text-xl font-semibold mb-2">Flexible Contributions</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Minimum annual contribution of ₹500, with no upper limit. Suitable for salaried individuals and self-employed.
                                </p>
                            </div>
                        </div>
                    </section>
        
                    {/* How NPS Works */}
                    <section className="mb-12">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                                How NPS Works
                            </h2>
                            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg">
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    NPS operates through three tiers: Tier 1 for retirement savings, Tier 2 for additional investments. Contributions are invested in various asset classes based on your risk profile.
                                </p>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                                    <li>Choose from Active Choice or Auto Choice investment options</li>
                                    <li>Minimum investment period of 3 years, with partial withdrawals allowed after 3 years</li>
                                    <li>At retirement, 60% of corpus can be withdrawn as lump sum, remaining 40% must be used to purchase annuity</li>
                                    <li>Nomination facility available for account holders</li>
                                </ul>
                            </div>
                        </div>
                    </section>
        
                    {/* Random Facts */}
                    <section className="mb-12">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                                Interesting NPS Facts
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">Over 4 Crore Subscribers</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        As of 2023, NPS has more than 4 crore subscribers, making it one of India&apos;s largest retirement schemes.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">Atal Pension Yojana Integration</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        NPS is integrated with Atal Pension Yojana for unorganized sector workers, providing guaranteed pension benefits.
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">Corporate NPS</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                    Employers can contribute to employees&apos; NPS accounts, with additional tax benefits under Section 80CCD(2).
                                    </p>
                                </div>
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                                    <h3 className="text-lg font-semibold mb-2">International Benchmarks</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        NPS fund managers are benchmarked against global indices like MSCI World Index for equity investments.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
    
                <NPSCalculator />
            </div>
    );
}
