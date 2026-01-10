'use client';

import React from 'react';
import { IndianRupee, Target, TrendingUp } from 'lucide-react';
import { formatIndianNumber } from '../lib/numberFormat';

interface CombinedSnapshot2Props {
    goalAmount: number;
    goalDuration: number;
    monthlySIP: number;
    totalInvestment: number;
}

const CombinedSnapshot2: React.FC<CombinedSnapshot2Props> = ({
    goalAmount,
    goalDuration,
    monthlySIP,
    totalInvestment
}) => {
    return (
        <div className="bg-white p-8 max-w-7xl mx-auto" style={{ width: '1200px', minHeight: '600px' }}>
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Goal Amount Calculator</h1>
                <p className="text-lg text-gray-600">Calculate the monthly SIP required to achieve your financial freedom goal at 18% annual returns.</p>
            </div>

            {/* Main Calculator Area */}
            <div className="bg-gray-50 rounded-xl p-8 mb-8">
                <div className="grid grid-cols-2 gap-8">
                    {/* Left: Goal Details */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Set Your Financial Goal</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Freedom Number (Goal Amount) (₹)</label>
                                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                                    <div className="text-3xl font-bold text-gray-900">₹{formatIndianNumber(goalAmount)}</div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>₹10L</span>
                                    <span>₹10Cr</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Years)</label>
                                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                                    <div className="text-3xl font-bold text-gray-900">{goalDuration}</div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500 mt-2">
                                    <span>5 Years</span>
                                    <span>40 Years</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Returns (% p.a.)</label>
                                <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                                    <div className="text-3xl font-bold text-gray-900">18%</div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Fixed rate for optimal growth</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Monthly SIP Required */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Monthly SIP Required</h2>
                        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-center">
                            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <Target className="h-8 w-8 text-green-600" />
                            </div>
                            <div className="text-white">
                                <div className="text-sm font-medium mb-2">Monthly SIP Value</div>
                                <div className="text-4xl font-bold mb-2">₹{formatIndianNumber(monthlySIP)}</div>
                                <div className="text-sm opacity-90">Required monthly investment to achieve your goal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Goal Summary */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Goal Summary</h2>
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 text-center">
                        <Target className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-700 mb-2">Goal Amount</h4>
                        <p className="text-2xl font-bold text-blue-700">₹{formatIndianNumber(goalAmount)}</p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 text-center">
                        <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-700 mb-2">Duration</h4>
                        <p className="text-2xl font-bold text-purple-700">{goalDuration} Years</p>
                    </div>

                    <div className="bg-orange-50 rounded-xl p-6 text-center">
                        <IndianRupee className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-700 mb-2">Total Investment</h4>
                        <p className="text-2xl font-bold text-orange-700">₹{formatIndianNumber(totalInvestment)}</p>
                    </div>

                    <div className="bg-green-50 rounded-xl p-6 text-center">
                        <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
                        <h4 className="font-semibold text-gray-700 mb-2">Monthly SIP Required</h4>
                        <p className="text-2xl font-bold text-green-700">₹{formatIndianNumber(monthlySIP)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CombinedSnapshot2;
