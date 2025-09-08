// Helper function to generate financial analysis report
export const generateFinancialReport = (budgetData: { monthlyIncome: number; monthlyExpense: number }, sipData: { duration: number }, sipSummary: { maturityValue: number; totalGains: number }, goalData: { goalAmount: number; duration: number }, goalSummary: { monthlySIP: number; totalInvestment: number }) => {
    const reportData = {
        date: new Date().toLocaleDateString(),
        budgeting: {
            monthlyIncome: budgetData.monthlyIncome,
            monthlyExpense: budgetData.monthlyExpense,
            totalSavings: budgetData.monthlyIncome - budgetData.monthlyExpense,
            savingsPercentage: budgetData.monthlyIncome > 0 ?
                ((budgetData.monthlyIncome - budgetData.monthlyExpense) / budgetData.monthlyIncome * 100).toFixed(1) : 0
        },
        sip: {
            monthlyInvestment: budgetData.monthlyIncome - budgetData.monthlyExpense,
            duration: sipData.duration,
            expectedReturns: 18,
            totalInvestment: (budgetData.monthlyIncome - budgetData.monthlyExpense) * sipData.duration * 12,
            maturityValue: sipSummary.maturityValue,
            totalGains: sipSummary.totalGains
        },
        goal: {
            goalAmount: goalData.goalAmount,
            duration: goalData.duration,
            expectedReturns: 18,
            monthlySIP: goalSummary.monthlySIP,
            totalInvestment: goalSummary.totalInvestment
        }
    };

    // Create a simple HTML report
    const reportHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Complete Financial Analysis Report</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 40px; 
                    background: #f3f4f6; 
                    color: #1f2937;
                }
                .container { 
                    max-width: 800px; 
                    margin: 0 auto; 
                    background: white; 
                    padding: 40px; 
                    border-radius: 12px; 
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }
                .header { 
                    text-align: center; 
                    margin-bottom: 40px; 
                    border-bottom: 2px solid #e5e7eb; 
                    padding-bottom: 20px;
                }
                .section { 
                    margin-bottom: 30px; 
                    padding: 20px; 
                    background: #f9fafb; 
                    border-radius: 8px; 
                    border-left: 4px solid #3b82f6;
                }
                .section h3 { 
                    color: #1f2937; 
                    margin-bottom: 15px; 
                    font-size: 18px;
                }
                .row { 
                    display: flex; 
                    justify-content: space-between; 
                    margin-bottom: 10px; 
                    padding: 8px 0;
                }
                .label { 
                    font-weight: 600; 
                    color: #374151;
                }
                .value { 
                    color: #1f2937; 
                    font-weight: 500;
                }
                .highlight { 
                    background: #dbeafe; 
                    padding: 15px; 
                    border-radius: 6px; 
                    margin-top: 15px;
                }
                .highlight .value { 
                    font-size: 18px; 
                    font-weight: bold; 
                    color: #1e40af;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1 style="font-size: 28px; margin-bottom: 10px; color: #1f2937;">Complete Financial Analysis Report</h1>
                    <p style="color: #6b7280; font-size: 16px;">Generated on ${reportData.date}</p>
                </div>

                <div class="section">
                    <h3>📊 Monthly Financial Overview</h3>
                    <div class="row">
                        <span class="label">Monthly Income:</span>
                        <span class="value">₹${reportData.budgeting.monthlyIncome.toLocaleString()}</span>
                    </div>
                    <div class="row">
                        <span class="label">Monthly Expenses:</span>
                        <span class="value">₹${reportData.budgeting.monthlyExpense.toLocaleString()}</span>
                    </div>
                    <div class="highlight">
                        <div class="row">
                            <span class="label">Total Monthly Savings:</span>
                            <span class="value">₹${reportData.budgeting.totalSavings.toLocaleString()}</span>
                        </div>
                        <div class="row">
                            <span class="label">Savings Percentage:</span>
                            <span class="value">${reportData.budgeting.savingsPercentage}%</span>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h3>📈 SIP Investment Projection</h3>
                    <div class="row">
                        <span class="label">Monthly Investment:</span>
                        <span class="value">₹${reportData.sip.monthlyInvestment.toLocaleString()}</span>
                    </div>
                    <div class="row">
                        <span class="label">Duration:</span>
                        <span class="value">${reportData.sip.duration} years</span>
                    </div>
                    <div class="row">
                        <span class="label">Expected Returns:</span>
                        <span class="value">${reportData.sip.expectedReturns}% p.a.</span>
                    </div>
                    <div class="highlight">
                        <div class="row">
                            <span class="label">Total Investment:</span>
                            <span class="value">₹${reportData.sip.totalInvestment.toLocaleString()}</span>
                        </div>
                        <div class="row">
                            <span class="label">Maturity Value:</span>
                            <span class="value">₹${reportData.sip.maturityValue.toLocaleString()}</span>
                        </div>
                        <div class="row">
                            <span class="label">Total Gains:</span>
                            <span class="value">₹${reportData.sip.totalGains.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <h3>🎯 Goal Amount Calculator</h3>
                    <div class="row">
                        <span class="label">Goal Amount:</span>
                        <span class="value">₹${reportData.goal.goalAmount.toLocaleString()}</span>
                    </div>
                    <div class="row">
                        <span class="label">Duration:</span>
                        <span class="value">${reportData.goal.duration} years</span>
                    </div>
                    <div class="row">
                        <span class="label">Expected Returns:</span>
                        <span class="value">${reportData.goal.expectedReturns}% p.a.</span>
                    </div>
                    <div class="highlight">
                        <div class="row">
                            <span class="label">Monthly SIP Required:</span>
                            <span class="value">₹${reportData.goal.monthlySIP.toLocaleString()}</span>
                        </div>
                        <div class="row">
                            <span class="label">Total Investment:</span>
                            <span class="value">₹${reportData.goal.totalInvestment.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

    return reportHTML;
};
