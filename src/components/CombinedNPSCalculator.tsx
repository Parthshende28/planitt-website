'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calculator, TrendingUp, IndianRupee, Target, PiggyBank } from 'lucide-react';

interface SIPData {
    monthlyInvestment: number;
    duration: number;
    expectedReturns: number;
    oneTimeInvestment: number;
}

interface SWPData {
    totalInvestment: number;
    monthlyWithdrawal: number;
    expectedReturns: number;
    duration: number;
    withdrawalFrequency: 'monthly' | 'quarterly' | 'annually';
}

interface ChartData {
    year: number;
    sipInvestment: number;
    sipCorpus: number;
    sipGains: number;
    swpInvestment: number;
    swpCorpus: number;
    swpGains: number;
}

const CombinedNPSCalculator = () => {
    // SIP Calculator State
    const [sipData, setSipData] = useState<SIPData>({
        monthlyInvestment: 25000,
        duration: 12,
        expectedReturns: 6,
        oneTimeInvestment: 1000000
    });
    const [sipInvestmentType, setSipInvestmentType] = useState<'sip' | 'lumpsum'>('sip');

    // SWP Calculator State
    const [swpData, setSwpData] = useState<SWPData>({
        totalInvestment: 0, // Will be set from SIP maturity value
        monthlyWithdrawal: 5000,
        expectedReturns: 6,
        duration: 10,
        withdrawalFrequency: 'monthly'
    });

    // Chart and Summary State
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [sipSummary, setSipSummary] = useState({
        totalInvestment: 0,
        maturityValue: 0,
        totalGains: 0
    });
    const [swpSummary, setSwpSummary] = useState({
        totalInvestment: 0,
        maturityValue: 0,
        totalGains: 0
    });

    // Calculate SIP returns
    const calculateSIPReturns = useCallback(() => {
        const data: ChartData[] = [];
        const monthlyRate = sipData.expectedReturns / 100 / 12;
        let totalInvested = 0;
        let corpus = 0;
        let gains = 0;

        if (sipInvestmentType === 'sip' && sipData.monthlyInvestment) {
            // SIP Calculation
            for (let year = 1; year <= sipData.duration; year++) {
                totalInvested = sipData.monthlyInvestment * 12 * year;
                const monthsInvested = year * 12;
                if (monthlyRate > 0) {
                    corpus = sipData.monthlyInvestment * ((Math.pow(1 + monthlyRate, monthsInvested) - 1) / monthlyRate);
                } else {
                    corpus = sipData.monthlyInvestment * monthsInvested;
                }
                gains = corpus - totalInvested;

                data.push({
                    year,
                    sipInvestment: Math.round(totalInvested),
                    sipCorpus: Math.round(corpus),
                    sipGains: Math.round(gains),
                    swpInvestment: 0,
                    swpCorpus: 0,
                    swpGains: 0
                });
            }
        } else if (sipInvestmentType === 'lumpsum' && sipData.oneTimeInvestment) {
            // LUMSUM Calculation
            for (let year = 1; year <= sipData.duration; year++) {
                totalInvested = sipData.oneTimeInvestment;
                const annualRate = sipData.expectedReturns / 100;
                corpus = sipData.oneTimeInvestment * Math.pow(1 + annualRate, year);
                gains = corpus - totalInvested;

                data.push({
                    year,
                    sipInvestment: Math.round(totalInvested),
                    sipCorpus: Math.round(corpus),
                    sipGains: Math.round(gains),
                    swpInvestment: 0,
                    swpCorpus: 0,
                    swpGains: 0
                });
            }
        }

        setSipSummary({
            totalInvestment: Math.round(totalInvested),
            maturityValue: Math.round(corpus),
            totalGains: Math.round(gains)
        });

        return { data, maturityValue: Math.round(corpus) };
    }, [sipData, sipInvestmentType]);

    // Calculate SWP returns
    const calculateSWPReturns = useCallback((sipMaturityValue: number) => {
        const data: ChartData[] = [];
        const monthlyRate = swpData.expectedReturns / 100 / 12;
        let currentBalance = sipMaturityValue;
        let totalWithdrawn = 0;

        // Calculate withdrawal amount based on frequency
        let withdrawalAmount = swpData.monthlyWithdrawal;
        if (swpData.withdrawalFrequency === 'quarterly') {
            withdrawalAmount = swpData.monthlyWithdrawal * 3;
        } else if (swpData.withdrawalFrequency === 'annually') {
            withdrawalAmount = swpData.monthlyWithdrawal * 12;
        }

        for (let year = 1; year <= swpData.duration; year++) {
            // Calculate monthly withdrawals and returns for this year
            for (let month = 1; month <= 12; month++) {
                // Apply monthly returns first
                currentBalance = currentBalance * (1 + monthlyRate);

                // Then make withdrawal if it's a withdrawal month
                if (swpData.withdrawalFrequency === 'monthly' ||
                    (swpData.withdrawalFrequency === 'quarterly' && month % 3 === 0) ||
                    (swpData.withdrawalFrequency === 'annually' && month === 12)) {

                    if (currentBalance >= withdrawalAmount) {
                        currentBalance -= withdrawalAmount;
                        totalWithdrawn += withdrawalAmount;
                    } else {
                        totalWithdrawn += currentBalance;
                        currentBalance = 0;
                    }
                }
            }

            const gains = currentBalance + totalWithdrawn - sipMaturityValue;

            data.push({
                year,
                sipInvestment: 0,
                sipCorpus: 0,
                sipGains: 0,
                swpInvestment: Math.round(sipMaturityValue),
                swpCorpus: Math.round(currentBalance),
                swpGains: Math.round(gains)
            });
        }

        setSwpSummary({
            totalInvestment: Math.round(sipMaturityValue),
            maturityValue: Math.round(currentBalance),
            totalGains: Math.round(totalWithdrawn)
        });

        return data;
    }, [swpData]);

    // Combined calculation
    const calculateCombined = useCallback(() => {
        const sipResult = calculateSIPReturns();
        const swpResult = calculateSWPReturns(sipResult.maturityValue);

        // Combine the data
        const combinedData = sipResult.data.map((sipItem, index) => ({
            ...sipItem,
            swpInvestment: swpResult[index]?.swpInvestment || 0,
            swpCorpus: swpResult[index]?.swpCorpus || 0,
            swpGains: swpResult[index]?.swpGains || 0
        }));

        setChartData(combinedData);
    }, [calculateSIPReturns, calculateSWPReturns]);

    useEffect(() => {
        calculateCombined();
    }, [calculateCombined]);

    // Update SWP total investment when SIP maturity value changes
    useEffect(() => {
        setSwpData(prev => ({
            ...prev,
            totalInvestment: sipSummary.maturityValue
        }));
    }, [sipSummary.maturityValue]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(value);
    };

    const handleSipInputChange = (field: keyof SIPData, value: number) => {
        setSipData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSwpInputChange = (field: keyof SWPData, value: number | string) => {
        setSwpData(prev => ({
            ...prev,
            [field]: value
        }));
    };

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
                    <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-full mb-6">
                        <PiggyBank className="h-8 w-8 text-orange-600" />
                    </div>
                    <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        NPS Investment & Withdrawal Calculator
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                        Plan your retirement with NPS. First, build your corpus through SIP or lump-sum investments,
                        then plan your systematic withdrawals during retirement.
                    </p>
                </motion.div>

                {/* Calculators Side by Side */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
                    {/* SIP Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-heading text-2xl font-bold text-gray-900">
                                    SIP Calculator
                                </h3>
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                    <button
                                        onClick={() => setSipInvestmentType('sip')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${sipInvestmentType === 'sip'
                                            ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-200'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        SIP
                                    </button>
                                    <button
                                        onClick={() => setSipInvestmentType('lumpsum')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${sipInvestmentType === 'lumpsum'
                                            ? 'bg-blue-500 text-white shadow-lg ring-2 ring-blue-200'
                                            : 'text-gray-600 hover:text-gray-900'
                                            }`}
                                    >
                                        LUMSUM
                                    </button>
                                </div>
                            </div>

                            {/* Investment Input */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {sipInvestmentType === 'sip' ? 'Monthly Investment (₹)' : 'One Time Investment (₹)'}
                                </label>
                                <div className="mb-2">
                                    <input
                                        type="range"
                                        min={sipInvestmentType === 'sip' ? "100" : "100000"}
                                        max={sipInvestmentType === 'sip' ? "100000" : "50000000"}
                                        step={sipInvestmentType === 'sip' ? "1000" : "100000"}
                                        value={sipInvestmentType === 'sip' ? sipData.monthlyInvestment : sipData.oneTimeInvestment}
                                        onChange={(e) => {
                                            if (sipInvestmentType === 'sip') {
                                                handleSipInputChange('monthlyInvestment', parseInt(e.target.value));
                                            } else {
                                                handleSipInputChange('oneTimeInvestment', parseInt(e.target.value));
                                            }
                                        }}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': sipInvestmentType === 'sip'
                                                ? ((sipData.monthlyInvestment - 100) / (100000 - 100)) * 100
                                                : ((sipData.oneTimeInvestment - 100000) / (50000000 - 100000)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>{sipInvestmentType === 'sip' ? '₹100' : '₹1,00,000'}</span>
                                        <span>{sipInvestmentType === 'sip' ? '₹1,00,000' : '₹5,00,00,000'}</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={sipInvestmentType === 'sip' ? sipData.monthlyInvestment : sipData.oneTimeInvestment}
                                    onChange={(e) => {
                                        if (sipInvestmentType === 'sip') {
                                            handleSipInputChange('monthlyInvestment', parseInt(e.target.value) || 0);
                                        } else {
                                            handleSipInputChange('oneTimeInvestment', parseInt(e.target.value) || 0);
                                        }
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Duration */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration (Years)
                                </label>
                                <div className="mb-2">
                                    <input
                                        type="range"
                                        min="1"
                                        max="50"
                                        value={sipData.duration}
                                        onChange={(e) => handleSipInputChange('duration', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((sipData.duration - 1) / (50 - 1)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>1 Year</span>
                                        <span>50 Years</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={sipData.duration}
                                    onChange={(e) => handleSipInputChange('duration', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Expected Returns */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expected Returns (% p.a.)
                                </label>
                                <div className="mb-2">
                                    <input
                                        type="range"
                                        min="6"
                                        max="50"
                                        step="0.5"
                                        value={sipData.expectedReturns}
                                        onChange={(e) => handleSipInputChange('expectedReturns', parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((sipData.expectedReturns - 6) / (50 - 6)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>6%</span>
                                        <span>50%</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={sipData.expectedReturns}
                                    onChange={(e) => handleSipInputChange('expectedReturns', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* SIP Summary */}
                            <div className="bg-blue-50 rounded-xl p-6">
                                <h4 className="font-semibold text-gray-700 mb-4 text-center">SIP Summary</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Total Invested</p>
                                        <p className="text-xl font-bold text-blue-700">
                                            {formatCurrency(sipSummary.totalInvestment)}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Maturity Value</p>
                                        <p className="text-xl font-bold text-green-700">
                                            {formatCurrency(sipSummary.maturityValue)}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Total Gains</p>
                                        <p className="text-xl font-bold text-orange-700">
                                            {formatCurrency(sipSummary.totalGains)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* SWP Calculator */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <h3 className="font-heading text-2xl font-bold text-gray-900 mb-6">
                                SWP Calculator
                            </h3>

                            {/* Total Investment (Auto-filled from SIP) */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Total Investment (₹) - From SIP Maturity
                                </label>
                                <input
                                    type="number"
                                    value={swpData.totalInvestment}
                                    disabled
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                                />
                                <p className="text-xs text-gray-500 mt-1">This value is automatically set from SIP maturity value</p>
                            </div>

                            {/* Monthly Withdrawal */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Withdrawal per Month (₹)
                                </label>
                                <div className="mb-2">
                                    <input
                                        type="range"
                                        min="1000"
                                        max="100000"
                                        step="1000"
                                        value={swpData.monthlyWithdrawal}
                                        onChange={(e) => handleSwpInputChange('monthlyWithdrawal', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((swpData.monthlyWithdrawal - 1000) / (100000 - 1000)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>₹1,000</span>
                                        <span>₹1,00,000</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={swpData.monthlyWithdrawal}
                                    onChange={(e) => handleSwpInputChange('monthlyWithdrawal', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Duration */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Duration (Years)
                                </label>
                                <div className="mb-2">
                                    <input
                                        type="range"
                                        min="1"
                                        max="30"
                                        value={swpData.duration}
                                        onChange={(e) => handleSwpInputChange('duration', parseInt(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((swpData.duration - 1) / (30 - 1)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>1 Year</span>
                                        <span>30 Years</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    value={swpData.duration}
                                    onChange={(e) => handleSwpInputChange('duration', parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Expected Returns */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Expected Returns (% p.a.)
                                </label>
                                <div className="mb-2">
                                    <input
                                        type="range"
                                        min="6"
                                        max="50"
                                        step="0.5"
                                        value={swpData.expectedReturns}
                                        onChange={(e) => handleSwpInputChange('expectedReturns', parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                        style={{
                                            '--slider-value': ((swpData.expectedReturns - 6) / (50 - 6)) * 100
                                        } as React.CSSProperties}
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                                        <span>6%</span>
                                        <span>50%</span>
                                    </div>
                                </div>
                                <input
                                    type="number"
                                    step="0.5"
                                    value={swpData.expectedReturns}
                                    onChange={(e) => handleSwpInputChange('expectedReturns', parseFloat(e.target.value) || 0)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            {/* Withdrawal Frequency */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Withdrawal Frequency
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => handleSwpInputChange('withdrawalFrequency', 'monthly')}
                                        className={`px-3 py-2 rounded-lg border-2 transition-colors duration-200 text-sm ${swpData.withdrawalFrequency === 'monthly'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        onClick={() => handleSwpInputChange('withdrawalFrequency', 'quarterly')}
                                        className={`px-3 py-2 rounded-lg border-2 transition-colors duration-200 text-sm ${swpData.withdrawalFrequency === 'quarterly'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                    >
                                        Quarterly
                                    </button>
                                    <button
                                        onClick={() => handleSwpInputChange('withdrawalFrequency', 'annually')}
                                        className={`px-3 py-2 rounded-lg border-2 transition-colors duration-200 text-sm ${swpData.withdrawalFrequency === 'annually'
                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                    >
                                        Annually
                                    </button>
                                </div>
                            </div>

                            {/* SWP Summary */}
                            <div className="bg-green-50 rounded-xl p-6">
                                <h4 className="font-semibold text-gray-700 mb-4 text-center">SWP Summary</h4>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Total Investment</p>
                                        <p className="text-xl font-bold text-blue-700">
                                            {formatCurrency(swpSummary.totalInvestment)}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Final Value</p>
                                        <p className="text-xl font-bold text-green-700">
                                            {formatCurrency(swpSummary.maturityValue)}
                                        </p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">Total Withdrawal</p>
                                        <p className="text-xl font-bold text-orange-700">
                                            {formatCurrency(swpSummary.totalGains)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Combined Charts - Side by Side */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 xl:grid-cols-2 gap-8"
                >
                    {/* SIP Chart */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                        <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">
                            SIP Investment Growth Projection
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
                                            name === 'sipInvestment' ? 'Total Invested' :
                                                name === 'sipCorpus' ? 'Maturity Value' : 'Gains'
                                        ]}
                                        labelFormatter={(year) => `Year ${year}`}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="sipInvestment"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                        name="Total Invested"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="sipCorpus"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                        name="Maturity Value"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="sipGains"
                                        stroke="#F59E0B"
                                        strokeWidth={3}
                                        dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                                        name="Interest Gained"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* SWP Chart */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
                        <h3 className="font-heading text-xl font-bold text-gray-900 mb-6">
                            SWP Withdrawal Projection
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
                                            name === 'swpInvestment' ? 'Total Investment' :
                                                name === 'swpCorpus' ? 'Final Value' : 'Total Withdrawal'
                                        ]}
                                        labelFormatter={(year) => `Year ${year}`}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="swpInvestment"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                        name="Total Investment"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="swpCorpus"
                                        stroke="#10B981"
                                        strokeWidth={3}
                                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                        name="Final Value"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="swpGains"
                                        stroke="#F59E0B"
                                        strokeWidth={3}
                                        dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                                        name="Total Withdrawal"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CombinedNPSCalculator;
