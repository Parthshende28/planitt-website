'use client';

import { motion } from 'framer-motion';
import { CheckCircle, TrendingUp, Target } from 'lucide-react';

interface ServiceInfoProps {
    serviceType: 'swp' | 'sip' | 'goal-setting' | 'insurance' | 'nps' | 'budgeting';
}

const ServiceInfo = ({ serviceType }: ServiceInfoProps) => {
    const serviceData = {
        'swp': {
            title: 'Systematic Withdrawal Plan (SWP)',
            description: 'Generate regular income from your lump sum investments while keeping the remaining amount invested for growth.',
            benefits: [
                'Regular monthly income from investments',
                'Capital remains invested for growth',
                'Flexible withdrawal amounts',
                'Tax-efficient withdrawal strategy',
                'Ideal for retirement planning',
                'Maintains investment discipline'
            ],
            features: [
                'Monthly, quarterly, or annual withdrawals',
                'Flexible withdrawal amounts',
                'Professional fund management',
                'Tax benefits on remaining investment',
                'Automatic withdrawal facility',
                'Portfolio rebalancing options'
            ],
            targetAudience: 'Ideal for retirees and investors seeking regular income from their lump sum investments.',
            howItWorks: [
                'Invest a lump sum amount in mutual funds',
                'Set your desired monthly withdrawal amount',
                'Choose withdrawal frequency (monthly/quarterly)',
                'Fund automatically deducts withdrawal amount',
                'Remaining amount continues to earn returns',
                'Generate steady income while preserving capital'
            ]
        },
        'sip': {
            title: 'Systematic Investment Plan (SIP)',
            description: 'Regular investment strategy to build wealth gradually with disciplined approach.',
            benefits: [
                'Disciplined investing habit',
                'Rupee cost averaging benefits',
                'Power of compounding',
                'Flexible investment amounts',
                'Easy to start and stop',
                'Long-term wealth creation'
            ],
            features: [
                'Monthly, quarterly, or annual SIP options',
                'Step-up SIP for increasing investments',
                'Flexible SIP with pause/resume',
                'SIP in top-performing funds',
                'Goal-based SIP planning',
                'Tax-saving SIP options'
            ],
            targetAudience: 'Perfect for salaried individuals and young professionals starting their investment journey.',
            howItWorks: [
                'Choose your investment amount and frequency',
                'Select suitable mutual fund schemes',
                'Set up auto-debit from your bank account',
                'Investments are made automatically',
                'Track your portfolio growth over time',
                'Achieve your financial goals systematically'
            ]
        },
        'insurance': {
            title: 'Life & Health Insurance',
            description: 'Comprehensive life and health insurance solutions to protect your loved ones.',
            benefits: [
                'Financial protection for family',
                'Tax benefits under Section 80C & 80D',
                'Critical illness coverage',
                'Accidental death benefits',
                'Maturity benefits on survival',
                'Riders for enhanced coverage'
            ],
            features: [
                'Term Life Insurance for pure protection',
                'Whole Life Insurance with savings',
                'Health Insurance for medical expenses',
                'Critical Illness Insurance',
                'Accidental Death & Disability',
                'Child education and marriage plans'
            ],
            targetAudience: 'Essential for all individuals and families seeking financial security and protection.',
            howItWorks: [
                'Assess your insurance needs',
                'Choose suitable insurance products',
                'Complete medical examination if required',
                'Pay regular premiums',
                'Enjoy comprehensive coverage',
                'Claim benefits when needed'
            ]
        },
        'goal-setting': {
            title: 'Goal Setting Calculator',
            description: 'Calculate the monthly SIP required to achieve your financial goals with inflation adjustment. Plan your investments to reach your target amount while maintaining purchasing power.',
            benefits: [
                'Inflation-adjusted goal calculation',
                'Precise monthly SIP requirement',
                'Visual investment growth tracking',
                'Real-time goal progress monitoring',
                'Flexible goal amount and duration',
                'Tax-efficient investment planning'
            ],
            features: [
                'Goal amount input with slider',
                'Duration selection (1-30 years)',
                'Expected returns configuration',
                'Inflation rate consideration',
                'Stacked bar chart visualization',
                'Summary cards with key metrics'
            ],
            targetAudience: 'Ideal for individuals planning specific financial goals like home purchase, education, retirement, or any major expense.',
            howItWorks: [
                'Enter your target goal amount',
                'Set the time period to achieve the goal',
                'Configure expected returns and inflation rate',
                'Calculator adjusts goal for inflation',
                'Get precise monthly SIP amount required',
                'Track progress with visual charts'
            ]
        },
        'budgeting': {
            title: 'Budgeting Calculator',
            description: 'Track your spending and saving patterns with visual insights and financial planning tools. Analyze your monthly income and expenses to optimize your financial health.',
            benefits: [
                'Visual spending analysis with pie charts',
                'Real-time savings calculation',
                'Financial health assessment',
                'Spending pattern insights',
                'Budget optimization recommendations',
                'Export and share financial reports'
            ],
            features: [
                'Monthly income and expense tracking',
                'Interactive pie chart visualization',
                'Automatic savings calculation',
                'Financial security assessment',
                'Take snapshot functionality',
                'Download financial reports'
            ],
            targetAudience: 'Ideal for individuals and families looking to track their spending patterns and optimize their monthly budget for better financial health.',
            howItWorks: [
                'Enter your monthly income and expenses',
                'View automatic calculation of total savings',
                'Analyze spending patterns with visual charts',
                'Get financial security assessment',
                'Take snapshots of your financial overview',
                'Download reports for future reference'
            ]
        },
        'nps': {
            title: 'National Pension System (NPS)',
            description: 'Retirement planning with tax benefits and long-term wealth accumulation.',
            benefits: [
                'Tax benefits up to ₹2 lakhs annually',
                'Flexible contribution options',
                'Professional fund management',
                'Portable across jobs',
                'Annuity income after retirement',
                'Low-cost investment option'
            ],
            features: [
                'Tier I (mandatory) and Tier II (voluntary) accounts',
                'Active and Auto investment choices',
                'Multiple asset classes (Equity, Corporate Bonds, Government Securities)',
                'Life cycle funds for automatic rebalancing',
                'Partial withdrawal options',
                'Annuity purchase at retirement'
            ],
            targetAudience: 'Ideal for salaried individuals and self-employed professionals planning for retirement.',
            howItWorks: [
                'Open NPS account with PAN and Aadhaar',
                'Choose your investment strategy',
                'Make regular contributions',
                'Funds are invested in chosen asset classes',
                'Track your retirement corpus growth',
                'Purchase annuity at retirement age'
            ]
        }
    };

    const data = serviceData[serviceType];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Service Overview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    {/* <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        {data.title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {data.description}
                    </p> */}
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-blue-50 rounded-2xl p-8 h-full">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-600 p-3 rounded-lg mr-4">
                                    <CheckCircle className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-gray-900">
                                    Key Benefits
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {data.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-green-50 rounded-2xl p-8 h-full">
                            <div className="flex items-center mb-6">
                                <div className="bg-green-600 p-3 rounded-lg mr-4">
                                    <Target className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-gray-900">
                                    Features
                                </h3>
                            </div>
                            <ul className="space-y-4">
                                {data.features.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* How It Works */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-purple-50 rounded-2xl p-8 h-full">
                            <div className="flex items-center mb-6">
                                <div className="bg-purple-600 p-3 rounded-lg mr-4">
                                    <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-gray-900">
                                    How It Works
                                </h3>
                            </div>
                            <ol className="space-y-4">
                                {data.howItWorks.map((step, index) => (
                                    <li key={index} className="flex items-start">
                                        <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <span className="text-gray-700">{step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServiceInfo;
