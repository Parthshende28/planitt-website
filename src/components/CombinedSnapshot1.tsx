'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { IndianRupee, TrendingUp, Target } from 'lucide-react';

interface CombinedSnapshot1Props {
    monthlyIncome: number;
    monthlyExpense: number;
    totalSavings: number;
    savingsPercentage: number;
    financialStatus: string;
    sipDuration: number;
    sipTotalInvestment: number;
    sipMaturityValue: number;
    sipTotalGains: number;
    sipChartData: Array<{
        year: number;
        totalInvested: number;
        maturityValue: number;
        gains: number;
    }>;
}

const CombinedSnapshot1: React.FC<CombinedSnapshot1Props> = ({
    monthlyIncome,
    monthlyExpense,
    totalSavings,
    savingsPercentage,
    financialStatus,
    sipDuration,
    sipTotalInvestment,
    sipMaturityValue,
    sipTotalGains,
    sipChartData
}) => {
    // Pie chart data for spending vs saving
    const pieData = [
        { name: 'Monthly Expenses', value: monthlyExpense, color: '#3B82F6' },
        { name: 'Savings', value: totalSavings, color: '#10B981' }
    ];

    return (
        <div className="bg-white p-8 max-w-7xl mx-auto" style={{ width: '1200px', minHeight: '800px' }}>
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Style of Spending and Saving</h1>
                <p className="text-lg text-gray-600">Track your monthly income and expenses to understand your financial patterns and optimize your savings.</p>
            </div>

            {/* First Section: Monthly Financial Overview + Pie Chart */}
            <div className="grid grid-cols-2 gap-8 mb-12">
                {/* Left: Financial Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly Financial Overview</h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income (₹)</label>
                            <div className="text-3xl font-bold text-blue-700">₹{monthlyIncome.toLocaleString()}</div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Expenses (₹)</label>
                            <div className="text-3xl font-bold text-red-700">₹{monthlyExpense.toLocaleString()}</div>
                        </div>
                    </div>

                    {/* Summary Boxes */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-blue-50 rounded-xl p-4 text-center">
                            <IndianRupee className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-gray-700 mb-1 text-sm">Total Income</h4>
                            <p className="text-xl font-bold text-blue-700">₹{monthlyIncome.toLocaleString()}</p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-4 text-center">
                            <TrendingUp className="h-6 w-6 text-red-600 mx-auto mb-2" />
                            <h4 className="font-semibold text-gray-700 mb-1 text-sm">Total Expenses</h4>
                            <p className="text-xl font-bold text-red-700">₹{monthlyExpense.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Financial Health Assessment */}
                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Health Assessment</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-green-50 rounded-xl p-3 text-center">
                                <Target className="h-5 w-5 text-green-600 mx-auto mb-1" />
                                <h4 className="font-semibold text-gray-700 mb-1 text-xs">Total Savings</h4>
                                <p className="text-lg font-bold text-green-700">₹{totalSavings.toLocaleString()}</p>
                            </div>
                            <div className="bg-purple-50 rounded-xl p-3 text-center">
                                <div className="h-5 w-5 bg-purple-600 rounded mx-auto mb-1"></div>
                                <h4 className="font-semibold text-gray-700 mb-1 text-xs">Savings %</h4>
                                <p className="text-lg font-bold text-purple-700">{savingsPercentage.toFixed(1)}%</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-3 text-center">
                                <h4 className="font-semibold text-gray-700 mb-1 text-xs">Status</h4>
                                <p className="text-lg font-bold text-green-700">{financialStatus}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Pie Chart */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Spending & Saving Distribution</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Second Section: SIP Investment Projection + Line Chart */}
            <div className="grid grid-cols-2 gap-8">
                {/* Left: SIP Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">SIP Investment Projection</h2>
                    <p className="text-gray-600 mb-6">See how your monthly savings can grow over time with a systematic investment plan at 18% annual returns.</p>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Investment (₹)</label>
                            <div className="text-2xl font-bold text-blue-700">₹{totalSavings.toLocaleString()}</div>
                            <p className="text-sm text-gray-500">From your monthly savings</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Returns (% p.a.)</label>
                            <div className="text-2xl font-bold text-blue-700">18%</div>
                            <p className="text-sm text-gray-500">Fixed rate for optimal growth</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Years)</label>
                            <div className="text-2xl font-bold text-blue-700">{sipDuration}</div>
                        </div>
                    </div>

                    {/* SIP Summary */}
                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">SIP Investment Summary</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="bg-blue-50 rounded-xl p-4 text-center">
                                <IndianRupee className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                <h4 className="font-semibold text-gray-700 mb-1">Total Investment</h4>
                                <p className="text-2xl font-bold text-blue-700">₹{sipTotalInvestment.toLocaleString()}</p>
                            </div>
                            <div className="bg-green-50 rounded-xl p-4 text-center">
                                <TrendingUp className="h-6 w-6 text-green-600 mx-auto mb-2" />
                                <h4 className="font-semibold text-gray-700 mb-1">Maturity Value</h4>
                                <p className="text-2xl font-bold text-green-700">₹{sipMaturityValue.toLocaleString()}</p>
                            </div>
                            <div className="bg-orange-50 rounded-xl p-4 text-center">
                                <Target className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                                <h4 className="font-semibold text-gray-700 mb-1">Total Gains</h4>
                                <p className="text-2xl font-bold text-orange-700">₹{sipTotalGains.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Line Chart */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Investment Growth Projection</h2>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={sipChartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="year"
                                    tickFormatter={(year) => `Year ${year}`}
                                />
                                <YAxis
                                    tickFormatter={(value) => `${(value / 100000).toFixed(1)}L`}
                                />
                                <Tooltip
                                    formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
                                    labelFormatter={(year) => `Year ${year}`}
                                />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="totalInvested"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                                    name="Total Invested"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="gains"
                                    stroke="#F59E0B"
                                    strokeWidth={3}
                                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                                    name="Gains"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="maturityValue"
                                    stroke="#10B981"
                                    strokeWidth={3}
                                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                                    name="Maturity Value"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CombinedSnapshot1;
