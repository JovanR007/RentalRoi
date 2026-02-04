export interface RentalMetrics {
    grossYield: number;
    netYield: number;
    annualRent: number;
    annualExpenses: number;
    netOperatingIncome: number;
    monthlyCashFlow: number;
    totalInvestment: number;
    cashOnCash: number;
    monthlyMortgage: number;
}

/**
 * Calculates rental yield metrics based on user leverage and expenses.
 */
export function calculateRentalMetrics(
    purchasePrice: number,
    monthlyRent: number,
    monthlyExpenses: number,
    closingCosts: number = 0,
    renovationCosts: number = 0,
    downPaymentPercent: number = 100,
    interestRate: number = 0,
    loanTermYears: number = 30
): RentalMetrics {
    const annualRent = monthlyRent * 12;
    const annualExpenses = monthlyExpenses * 12;
    const netOperatingIncome = annualRent - annualExpenses;

    // Mortgage Calculation
    let monthlyMortgage = 0;
    const loanAmount = purchasePrice * (1 - downPaymentPercent / 100);

    if (loanAmount > 0 && interestRate > 0) {
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTermYears * 12;
        monthlyMortgage = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments));
    }

    const annualMortgage = monthlyMortgage * 12;
    const annualCashFlow = netOperatingIncome - annualMortgage;

    // Initial Cash Invested (Down Payment + Closing + Reno)
    const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
    const totalInvestment = downPaymentAmount + closingCosts + renovationCosts;

    // Avoid division by zero
    if (totalInvestment === 0) {
        return {
            grossYield: 0,
            netYield: 0,
            annualRent,
            annualExpenses,
            netOperatingIncome,
            monthlyCashFlow: annualCashFlow / 12,
            totalInvestment,
            cashOnCash: 0,
            monthlyMortgage
        };
    }

    const grossYield = (annualRent / purchasePrice) * 100;

    // Cap Rate = NOI / Purchase Price (Independent of financing)
    const netYield = (netOperatingIncome / purchasePrice) * 100;

    // Cash on Cash = Annual Cash Flow / Total Cash Invested
    const cashOnCash = (annualCashFlow / totalInvestment) * 100;

    return {
        grossYield: Number(grossYield.toFixed(2)),
        netYield: Number(netYield.toFixed(2)),
        annualRent,
        annualExpenses,
        netOperatingIncome,
        monthlyCashFlow: Number(annualCashFlow.toFixed(2)), // Fixed to 2 decimals
        totalInvestment,
        cashOnCash: Number(cashOnCash.toFixed(2)),
        monthlyMortgage: Number(monthlyMortgage.toFixed(2))
    };
}

export interface ProjectionData {
    year: number;
    equity: number;
    cashFlow: number;
}

export function calculateProjection(
    purchasePrice: number,
    monthlyCashFlow: number,
    appreciationRate: number = 0.03
): ProjectionData[] {
    const data: ProjectionData[] = [];
    let currentEquity = purchasePrice;

    for (let year = 1; year <= 10; year++) {
        currentEquity = currentEquity * (1 + appreciationRate);
        // Simple cumulative cash flow (does not reinvest)
        const cumulativeCashFlow = monthlyCashFlow * 12 * year;

        data.push({
            year,
            equity: Math.round(currentEquity),
            cashFlow: Math.round(cumulativeCashFlow),
        });
    }
    return data;
}
