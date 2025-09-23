'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator, TrendingUp, IndianRupee, Target } from 'lucide-react';

interface CalculatorData {
    monthlyInvestment?: number;
    duration: number;
    expectedReturns: number;
    totalInvestment?: number;
    monthlyWithdrawal?: number;
    withdrawalFrequency?: 'monthly' | 'quarterly' | 'annually';
    goalAmount?: number;
    inflationRate?: number;
    oneTimeInvestment?: number;
}

interface ChartData {
    year: number;
    investment: number;
    corpus: number;
    gains: number;
}

interface ServiceCalculatorProps {
    serviceType: 'swp' | 'sip' | 'goal-setting' | 'insurance' | 'nps';
    title: string;
    description: string;
}

const ServiceCalculator = ({ serviceType, title, description }: ServiceCalculatorProps) => {
    // Add investment type state for SIP/LUMSUM toggle
    const [investmentType, setInvestmentType] = useState<'sip' | 'lumpsum'>('sip');

    // Initialize form data based on service type
    const getInitialFormData = () => {
        if (serviceType === 'sip') {
            return {
                monthlyInvestment: 25000,
                duration: 12,
                expectedReturns: 6,
                oneTimeInvestment: 1000000
            };
        } else if (serviceType === 'swp') {
            return {
                totalInvestment: 100000,
                monthlyWithdrawal: 5000,
                expectedReturns: 12,
                duration: 10,
                withdrawalFrequency: 'monthly' as const
            };
        } else if (serviceType === 'goal-setting') {
            return {
                goalAmount: 1000000,
                duration: 5,
                expectedReturns: 12,
                inflationRate: 6
            };
        }
        // Default for other services
        return {
            monthlyInvestment: 25000,
            duration: 12,
            expectedReturns: 6
        };
    };

    const [formData, setFormData] = useState<CalculatorData>(getInitialFormData());

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [summary, setSummary] = useState({
        totalInvestment: 0,
        maturityValue: 0,
        totalGains: 0
    });

    const calculateReturns = useCallback(() => {
        const data: ChartData[] = [];
        const monthlyRate = formData.expectedReturns / 100 / 12;
        let totalInvested = 0;
        let corpus = 0;
        let gains = 0;

        if (serviceType === 'sip' && (formData.monthlyInvestment || formData.oneTimeInvestment)) {
            if (investmentType === 'sip' && formData.monthlyInvestment) {
                // SIP Calculation
                for (let year = 1; year <= formData.duration; year++) {
                    // Calculate total invested up to this year
                    totalInvested = formData.monthlyInvestment * 12 * year;

                    // Calculate corpus using Future Value of Annuity formula
                    // FV = PMT × [((1 + r)^n - 1) / r]
                    const monthsInvested = year * 12;
                    if (monthlyRate > 0) {
                        corpus = formData.monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsInvested) - 1) / monthlyRate);
                    } else {
                        corpus = formData.monthlyInvestment * monthsInvested;
                    }

                    gains = corpus - totalInvested;

                    data.push({
                        year,
                        investment: Math.round(totalInvested),
                        corpus: Math.round(corpus),
                        gains: Math.round(gains)
                    });
                }
            } else if (investmentType === 'lumpsum' && formData.oneTimeInvestment) {
                // LUMSUM Calculation
                for (let year = 1; year <= formData.duration; year++) {
                    // For lumpsum, total invested is the same throughout
                    totalInvested = formData.oneTimeInvestment;

                    // Calculate corpus using compound interest formula
                    // A = P(1 + r)^n
                    const annualRate = formData.expectedReturns / 100;
                    corpus = formData.oneTimeInvestment * Math.pow(1 + annualRate, year);

                    gains = corpus - totalInvested;

                    data.push({
                        year,
                        investment: Math.round(totalInvested),
                        corpus: Math.round(corpus),
                        gains: Math.round(gains)
                    });
                }
            }
        } else if (serviceType === 'swp' && formData.totalInvestment && formData.monthlyWithdrawal) {
            // SWP Calculation
            let currentBalance = formData.totalInvestment;
            let totalWithdrawn = 0;

            // Calculate withdrawal amount based on frequency
            let withdrawalAmount = formData.monthlyWithdrawal;
            if (formData.withdrawalFrequency === 'quarterly') {
                withdrawalAmount = formData.monthlyWithdrawal * 3;
            } else if (formData.withdrawalFrequency === 'annually') {
                withdrawalAmount = formData.monthlyWithdrawal * 12;
            }

            for (let year = 1; year <= formData.duration; year++) {
                // Calculate monthly withdrawals and returns for this year
                for (let month = 1; month <= 12; month++) {
                    // Apply monthly returns first
                    currentBalance = currentBalance * (1 + monthlyRate);

                    // Then make withdrawal if it's a withdrawal month
                    if (formData.withdrawalFrequency === 'monthly' ||
                        (formData.withdrawalFrequency === 'quarterly' && month % 3 === 0) ||
                        (formData.withdrawalFrequency === 'annually' && month === 12)) {

                        if (currentBalance >= withdrawalAmount) {
                            currentBalance -= withdrawalAmount;
                            totalWithdrawn += withdrawalAmount;
                        } else {
                            // If balance is less than withdrawal amount, withdraw remaining
                            totalWithdrawn += currentBalance;
                            currentBalance = 0;
                        }
                    }
                }

                const gains = currentBalance + totalWithdrawn - formData.totalInvestment;

                data.push({
                    year,
                    investment: Math.round(formData.totalInvestment),
                    corpus: Math.round(currentBalance),
                    gains: Math.round(gains)
                });
            }

            totalInvested = formData.totalInvestment;
            corpus = currentBalance;
            gains = totalWithdrawn;
        } else if (serviceType === 'goal-setting' && formData.goalAmount && formData.inflationRate) {
            // Goal Setting Calculation
            // Step 1: Calculate inflation-adjusted goal
            const inflationAdjustedGoal = formData.goalAmount * Math.pow(1 + formData.inflationRate / 100, formData.duration);

            // Step 2: Calculate monthly SIP required
            const monthlyRate = formData.expectedReturns / 100 / 12;
            const totalMonths = formData.duration * 12;
            let monthlySIP = 0;

            if (monthlyRate > 0) {
                monthlySIP = inflationAdjustedGoal / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate));
            } else {
                monthlySIP = inflationAdjustedGoal / totalMonths;
            }

            for (let year = 1; year <= formData.duration; year++) {
                const monthsInvested = year * 12;
                totalInvested = monthlySIP * monthsInvested;

                if (monthlyRate > 0) {
                    corpus = monthlySIP * ((Math.pow(1 + monthlyRate, monthsInvested) - 1) / monthlyRate);
                } else {
                    corpus = monthlySIP * monthsInvested;
                }

                gains = corpus - totalInvested;

                data.push({
                    year,
                    investment: Math.round(totalInvested),
                    corpus: Math.round(corpus),
                    gains: Math.round(gains)
                });
            }
        }

        setChartData(data);
        setSummary({
            totalInvestment: Math.round(totalInvested),
            maturityValue: Math.round(corpus),
            totalGains: Math.round(gains)
        });
    }, [formData, serviceType, investmentType]);

    useEffect(() => {
        calculateReturns();
    }, [calculateReturns]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handleInputChange = (field: keyof CalculatorData, value: number | string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Don't render calculator for insurance and nps
    if (serviceType === 'insurance' || serviceType === 'nps') {
        return null;
    }

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-6">
                        <Calculator className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        {title}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {description}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Calculator Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="bg-gray-50 rounded-2xl p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-heading text-2xl font-bold text-gray-900">
                                    Investment Parameters
                                </h3>
                                {/* SIP/LUMSUM Toggle - Only for SIP service */}
                                {serviceType === 'sip' && (
                                    <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
                                        <button
                                            onClick={() => setInvestmentType('sip')}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${investmentType === 'sip'
                                                ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-200'
                                                : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                        >
                                            SIP
                                        </button>
                                        <button
                                            onClick={() => setInvestmentType('lumpsum')}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${investmentType === 'lumpsum'
                                                ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-200'
                                                : 'text-gray-600 hover:text-gray-900'
                                                }`}
                                        >
                                            LUMSUM
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Investment Input - Only for SIP service */}
                            {serviceType === 'sip' && (
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {investmentType === 'sip' ? 'Monthly Investment (₹)' : 'One Time Investment (₹)'}
                                    </label>
                                    <div className="">
                                        <input
                                            type="range"
                                            min={investmentType === 'sip' ? "100" : "100000"}
                                            max={investmentType === 'sip' ? "100000" : "50000000"}
                                            step={investmentType === 'sip' ? "1000" : "100000"}
                                            value={investmentType === 'sip' ? (formData.monthlyInvestment || 0) : (formData.oneTimeInvestment || 0)}
                                            onChange={(e) => {
                                                if (investmentType === 'sip') {
                                                    handleInputChange('monthlyInvestment', parseInt(e.target.value));
                                                } else {
                                                    handleInputChange('oneTimeInvestment', parseInt(e.target.value));
                                                }
                                            }}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            style={{
                                                '--slider-value': investmentType === 'sip'
                                                    ? ((formData.monthlyInvestment || 0) - 100) / (100000 - 100) * 100
                                                    : ((formData.oneTimeInvestment || 0) - 100000) / (50000000 - 100000) * 100
                                            } as React.CSSProperties}
                                        />
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>{investmentType === 'sip' ? '₹100' : '₹1,00,000'}</span>
                                            <span>{investmentType === 'sip' ? '₹1,00,000' : '₹5,00,00,000'}</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        value={investmentType === 'sip' ? (formData.monthlyInvestment || 0) : (formData.oneTimeInvestment || 0)}
                                        onChange={(e) => {
                                            if (investmentType === 'sip') {
                                                handleInputChange('monthlyInvestment', parseInt(e.target.value) || 0);
                                            } else {
                                                handleInputChange('oneTimeInvestment', parseInt(e.target.value) || 0);
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {/* Total Investment - Only for SWP */}
                            {serviceType === 'swp' && (
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Total Investment (₹)
                                    </label>
                                    <div className="">
                                        <input
                                            type="range"
                                            min="100000"
                                            max="50000000"
                                            step="10000"
                                            value={formData.totalInvestment || 0}
                                            onChange={(e) => handleInputChange('totalInvestment', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            style={{
                                                '--slider-value': ((formData.totalInvestment || 0) - 100000) / (50000000 - 100000) * 100
                                            } as React.CSSProperties}
                                        />
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>₹1,00,000</span>
                                            <span>₹5,00,00,000</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        value={formData.totalInvestment || 0}
                                        onChange={(e) => handleInputChange('totalInvestment', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {/* Goal Amount - Only for Goal Setting */}
                            {serviceType === 'goal-setting' && (
                                <div className="">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Goal Amount (₹)
                                    </label>
                                    <div className="">
                                        <input
                                            type="range"
                                            min="100000"
                                            max="10000000"
                                            step="100000"
                                            value={formData.goalAmount || 0}
                                            onChange={(e) => handleInputChange('goalAmount', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            style={{
                                                '--slider-value': ((formData.goalAmount || 0) - 100000) / (10000000 - 100000) * 100
                                            } as React.CSSProperties}
                                        />
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>₹1,00,000</span>
                                            <span>₹1,00,00,000</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        value={formData.goalAmount || 0}
                                        onChange={(e) => handleInputChange('goalAmount', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {/* Duration */}
                            <div className="mt-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Duration (Years)
                                </label>
                                <div className="">
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={formData.duration}
                                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((formData.duration - 1) / (50 - 1)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>1 Year</span>
                                        <span>50 Years</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Expected Returns */}
                            <div className="mt-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Expected Returns (% p.a.)
                                </label>
                                <div className="">
                                    <input
                                        type="range"
                                        min="6"
                                        max="50"
                                        step="0.5"
                                        value={formData.expectedReturns}
                                        onChange={(e) => handleInputChange('expectedReturns', parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((formData.expectedReturns - 6) / (50 - 6)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>6%</span>
                                        <span>50%</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={formData.expectedReturns}
                                    onChange={(e) => handleInputChange('expectedReturns', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Inflation Rate - Only for Goal Setting */}
                            {serviceType === 'goal-setting' && (
                                <div className="mt-5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Inflation Rate (% p.a.)
                                    </label>
                                    <div className="">
                                        <input
                                            type="range"
                                            min="3"
                                            max="10"
                                            step="0.5"
                                            value={formData.inflationRate || 0}
                                            onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            style={{
                                                '--slider-value': ((formData.inflationRate || 0) - 3) / (10 - 3) * 100
                                            } as React.CSSProperties}
                                        />
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>3%</span>
                                            <span>10%</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={formData.inflationRate || 0}
                                        onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {/* Monthly Withdrawal - Only for SWP */}
                            {serviceType === 'swp' && (
                                <div className="mt-5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Withdrawal per Month (₹)
                                    </label>
                                    <div className="">
                                        <input
                                            type="range"
                                            min="1000"
                                            max="100000"
                                            step="1000"
                                            value={formData.monthlyWithdrawal || 0}
                                            onChange={(e) => handleInputChange('monthlyWithdrawal', parseInt(e.target.value))}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                            style={{
                                                '--slider-value': ((formData.monthlyWithdrawal || 0) - 1000) / (100000 - 1000) * 100
                                            } as React.CSSProperties}
                                        />
                                        <div className="flex justify-between text-sm text-gray-500">
                                            <span>₹1,000</span>
                                            <span>₹1,00,000</span>
                                        </div>
                                    </div>
                                    <input
                                        type="number"
                                        value={formData.monthlyWithdrawal || 0}
                                        onChange={(e) => handleInputChange('monthlyWithdrawal', parseInt(e.target.value) || 0)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            )}

                            {/* Withdrawal Frequency - Only for SWP */}
                            {serviceType === 'swp' && (
                                <div className="mt-5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Withdrawal Frequency
                                    </label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button
                                            onClick={() => handleInputChange('withdrawalFrequency', 'monthly')}
                                            className={`px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${formData.withdrawalFrequency === 'monthly'
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                                }`}
                                        >
                                            Monthly
                                        </button>
                                        <button
                                            onClick={() => handleInputChange('withdrawalFrequency', 'quarterly')}
                                            className={`px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${formData.withdrawalFrequency === 'quarterly'
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                                }`}
                                        >
                                            Quarterly
                                        </button>
                                        <button
                                            onClick={() => handleInputChange('withdrawalFrequency', 'annually')}
                                            className={`px-4 py-3 rounded-lg border-2 transition-colors duration-200 ${formData.withdrawalFrequency === 'annually'
                                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                                }`}
                                        >
                                            Annually
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                    </motion.div>

                    {/* Chart and Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Chart */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                            <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">
                                Investment Growth Projection
                            </h3>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="year"
                                            stroke="#666"
                                            fontSize={12}
                                        />
                                        <YAxis
                                            stroke="#666"
                                            fontSize={12}
                                            tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                                        />
                                        <Tooltip
                                            formatter={(value: number, name: string) => [
                                                formatCurrency(value),
                                                name === 'investment' ? 'Total Investment' :
                                                    name === 'corpus' ? 'Maturity Value' : 'Gains'
                                            ]}
                                            labelFormatter={(year) => `Year ${year}`}
                                        />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="investment"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                            name={serviceType === 'goal-setting' ? 'Total Investment' :
                                                (serviceType === 'sip' && investmentType === 'lumpsum') ? 'One Time Investment' : 'Total Invested'}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="corpus"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                            name={serviceType === 'goal-setting' ? 'Inflation Adjusted Goal' : 'Maturity Value'}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="gains"
                                            stroke="#F59E0B"
                                            strokeWidth={3}
                                            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                                            name={serviceType === 'goal-setting' ? 'Gains' : 'Interest Gained'}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-blue-50 rounded-xl p-6 text-center">
                                <IndianRupee className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 mb-2">
                                    {serviceType === 'goal-setting' ? 'Total Invested' :
                                        serviceType === 'swp' ? 'Total Investment' :
                                            (serviceType === 'sip' && investmentType === 'lumpsum') ? 'One Time Investment' : 'Total Invested'}
                                </h4>
                                <p className="text-2xl font-bold text-blue-700">
                                    {formatCurrency(summary.totalInvestment)}
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6 text-center">
                                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 mb-2">
                                    {serviceType === 'goal-setting' ? 'Inflation Adjusted Goal' :
                                        serviceType === 'swp' ? 'Final Value' : 'Maturity Value'}
                                </h4>
                                <p className="text-2xl font-bold text-green-700">
                                    {formatCurrency(summary.maturityValue)}
                                </p>
                            </div>

                            <div className="bg-orange-50 rounded-xl p-6 text-center">
                                <Target className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 mb-2">
                                    {serviceType === 'goal-setting' ? 'Gain' :
                                        serviceType === 'swp' ? 'Total Withdrawal' : 'Interest Gained'}
                                </h4>
                                <p className="text-2xl font-bold text-orange-700">
                                    {formatCurrency(summary.totalGains)}
                                </p>
                            </div>
                        </div>

                        {/* Monthly SIP Required - Only for Goal Setting */}
                        {serviceType === 'goal-setting' && (
                            <div className="mt-8 bg-purple-50 rounded-xl p-8 text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Monthly SIP Required</h3>
                                <p className="text-4xl font-bold text-purple-700">
                                    {formData.goalAmount && formData.inflationRate ?
                                        formatCurrency(
                                            (formData.goalAmount * Math.pow(1 + formData.inflationRate / 100, formData.duration)) /
                                            (((Math.pow(1 + formData.expectedReturns / 100 / 12, formData.duration * 12) - 1) / (formData.expectedReturns / 100 / 12)))
                                        ) :
                                        '₹0'
                                    }
                                </p>
                                <p className="text-sm text-gray-600 mt-2">to achieve your goal</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ServiceCalculator;
