'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator, TrendingUp, IndianRupee, Target } from 'lucide-react';

interface CalculatorData {
    monthlyInvestment: number;
    duration: number;
    expectedReturns: number;
    topUpAmount: number;
    topUpFrequency: '6months' | 'annually';
}

interface ChartData {
    year: number;
    investment: number;
    corpus: number;
    gains: number;
}

const FinancialCalculator = () => {
    const [formData, setFormData] = useState<CalculatorData>({
        monthlyInvestment: 5000,
        duration: 10,
        expectedReturns: 12,
        topUpAmount: 0,
        topUpFrequency: 'annually'
    });

    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [summary, setSummary] = useState({
        totalInvestment: 0,
        maturityValue: 0,
        totalGains: 0
    });

    useEffect(() => {
        const { monthlyInvestment, duration, expectedReturns, topUpAmount, topUpFrequency } = formData;
        const data: ChartData[] = [];
        const monthlyRate = expectedReturns / 100 / 12;
        let totalInvestment = 0;
        let corpus = 0;
        let gains = 0;

        for (let year = 1; year <= duration; year++) {
            // Calculate total invested up to this year
            totalInvestment = monthlyInvestment * 12 * year;

            // Add top-up if applicable
            if (topUpAmount > 0) {
                if (topUpFrequency === 'annually') {
                    totalInvestment += topUpAmount * year;
                } else if (topUpFrequency === '6months') {
                    totalInvestment += topUpAmount * 2 * year;
                }
            }

            // Calculate corpus using Future Value of Annuity formula (SIP formula)
            // FV = PMT × [((1 + r)^n - 1) / r]
            const monthsInvested = year * 12;
            if (monthlyRate > 0) {
                corpus = monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsInvested) - 1) / monthlyRate);
            } else {
                corpus = monthlyInvestment * monthsInvested;
            }

            // Add top-up corpus if applicable
            if (topUpAmount > 0) {
                if (topUpFrequency === 'annually') {
                    // Add top-up with compound interest for each year
                    for (let topUpYear = 1; topUpYear <= year; topUpYear++) {
                        const topUpMonthsRemaining = (year - topUpYear + 1) * 12;
                        corpus += topUpAmount * Math.pow(1 + monthlyRate, topUpMonthsRemaining);
                    }
                } else if (topUpFrequency === '6months') {
                    // Add top-up with compound interest for each 6-month period
                    for (let topUpPeriod = 1; topUpPeriod <= year * 2; topUpPeriod++) {
                        const topUpMonthsRemaining = (year * 2 - topUpPeriod + 1) * 6;
                        corpus += topUpAmount * Math.pow(1 + monthlyRate, topUpMonthsRemaining);
                    }
                }
            }

            gains = corpus - totalInvestment;

            data.push({
                year,
                investment: Math.round(totalInvestment),
                corpus: Math.round(corpus),
                gains: Math.round(gains)
            });
        }

        setChartData(data);
        setSummary({
            totalInvestment: Math.round(totalInvestment),
            maturityValue: Math.round(corpus),
            totalGains: Math.round(gains)
        });
    }, [formData]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handleInputChange = (field: keyof CalculatorData, value: number | string) => {
        let clampedValue: number | string = value;
        if (typeof value === 'number') {
            if (field === 'monthlyInvestment') {
                clampedValue = Math.max(100, Math.min(100000, value));
            } else if (field === 'duration') {
                clampedValue = Math.max(1, Math.min(100, value));
            } else if (field === 'expectedReturns') {
                clampedValue = Math.max(6, Math.min(50, value));
            }
        }
        setFormData(prev => {
            if (prev[field] === clampedValue) {
                return prev; // No change, prevent unnecessary re-render
            }
            return {
                ...prev,
                [field]: clampedValue
            };
        });
    };

    return (
        <section id="calculator" className="py-20 bg-white">
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
                        Financial Growth Calculator
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Plan your financial future with our comprehensive calculator.
                        See how your investments can grow over time with different scenarios.
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
                            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                                Investment Parameters
                            </h3>

                            {/* Monthly Investment */}
                            <div className="">
                                <label className="block text-sm font-medium text-gray-700">
                                    Monthly Investment (₹)
                                </label>
                                <div className="">
                                    <input
                                        type="range"
                                        min="100"
                                        max="100000"
                                        step="1000"
                                        value={formData.monthlyInvestment}
                                        onChange={(e) => handleInputChange('monthlyInvestment', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((formData.monthlyInvestment - 1000) / (100000 - 1000)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>₹100</span>
                                        <span>₹1,00,000</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={formData.monthlyInvestment}
                                    onChange={(e) => handleInputChange('monthlyInvestment', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Duration */}
                            <div className="mt-5">
                                <label className="block text-sm font-medium text-gray-700">
                                    Duration (Years)
                                </label>
                                <div className="">
                                    <input
                                        type="range"
                                        min="1"
                                        max="100"
                                        value={formData.duration}
                                        onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((formData.duration - 1) / (100 - 1)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>1 Year</span>
                                        <span>100 Years</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    min="1"
                                    max="100"
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
                                    min="6"
                                    max="50"
                                    value={formData.expectedReturns}
                                    onChange={(e) => handleInputChange('expectedReturns', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
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
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="corpus"
                                            stroke="#10B981"
                                            strokeWidth={3}
                                            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="gains"
                                            stroke="#F59E0B"
                                            strokeWidth={3}
                                            dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-blue-50 rounded-xl p-6 text-center">
                                <IndianRupee className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 mb-2">Total Investment</h4>
                                <p className="text-2xl font-bold text-blue-700">
                                    {formatCurrency(summary.totalInvestment)}
                                </p>
                            </div>

                            <div className="bg-green-50 rounded-xl p-6 text-center">
                                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 mb-2">Maturity Value</h4>
                                <p className="text-2xl font-bold text-green-700">
                                    {formatCurrency(summary.maturityValue)}
                                </p>
                            </div>

                            <div className="bg-orange-50 rounded-xl p-6 text-center">
                                <Target className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                                <h4 className="font-semibold text-gray-700 mb-2">Total Gains</h4>
                                <p className="text-2xl font-bold text-orange-700">
                                    {formatCurrency(summary.totalGains)}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FinancialCalculator;
