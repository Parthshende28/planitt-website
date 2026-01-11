import ServicePageLayout from '@/components/ServicePageLayout';
import CombinedNPSCalculator from '@/components/CombinedNPSCalculator';
import { PiggyBank, TrendingUp, ShieldCheck, Calculator } from 'lucide-react';

export default function NPSPage() {
    return (
        <ServicePageLayout
            serviceName="NPS Calculator"
            serviceDescription="Retirement planning with tax benefits and long-term wealth accumulation. Build your retirement corpus with India&apos;s most tax-efficient pension scheme."
            serviceIcon={<PiggyBank className="h-12 w-12 text-white" />}
            serviceColor="bg-gradient-to-r from-orange-500 to-orange-600"
        >
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
                                As of 2023, NPS has more than 4 crore subscribers, making it one of India's largest retirement schemes.
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

            <CombinedNPSCalculator />
        </ServicePageLayout>
    );
}
