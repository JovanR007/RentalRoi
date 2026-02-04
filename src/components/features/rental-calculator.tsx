"use client";

import React, { useState, useEffect } from "react";
import { InputGroup } from "@/components/ui/input-group";
import { YieldChart } from "@/components/visuals/yield-chart";
import { ProjectionChart } from "@/components/visuals/projection-chart";
import { calculateRentalMetrics, calculateProjection, RentalMetrics, ProjectionData } from "@/lib/calculations";
import { Home, Receipt, Wrench, Landmark, Copy, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type CalculatorValues = {
    price: number;
    rent: number;
    expenses: number;
    closingCosts: number;
    renovation: number;
    downPayment: number;
    interestRate: number;
    loanTerm: number;
};

const INITIAL_VALUES: CalculatorValues = {
    price: 350000,
    rent: 2500,
    expenses: 500,
    closingCosts: 10000,
    renovation: 5000,
    downPayment: 20,
    interestRate: 6.5,
    loanTerm: 30,
};

export function RentalCalculator() {
    const [activeTab, setActiveTab] = useState<"A" | "B">("A");

    const [scenarioA, setScenarioA] = useState<CalculatorValues>(INITIAL_VALUES);
    const [scenarioB, setScenarioB] = useState<CalculatorValues>({ ...INITIAL_VALUES, price: 330000 }); // Slightly different default

    const [metricsA, setMetricsA] = useState<RentalMetrics | null>(null);
    const [metricsB, setMetricsB] = useState<RentalMetrics | null>(null);

    const [projection, setProjection] = useState<ProjectionData[]>([]);

    // Calculate Logic Helper
    const calculate = (vals: CalculatorValues) => calculateRentalMetrics(
        vals.price, vals.rent, vals.expenses, vals.closingCosts,
        vals.renovation, vals.downPayment, vals.interestRate, vals.loanTerm
    );

    useEffect(() => {
        const resA = calculate(scenarioA);
        const resB = calculate(scenarioB);
        setMetricsA(resA);
        setMetricsB(resB);

        // Projection is based on Active Scenario
        const activeRes = activeTab === "A" ? resA : resB;
        const activeVals = activeTab === "A" ? scenarioA : scenarioB;
        if (activeRes) {
            setProjection(calculateProjection(activeVals.price, activeRes.monthlyCashFlow));
        }
    }, [scenarioA, scenarioB, activeTab]);

    const handleChange = (field: keyof CalculatorValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        const newVal = isNaN(val) ? 0 : val;

        if (activeTab === "A") {
            setScenarioA(prev => ({ ...prev, [field]: newVal }));
        } else {
            setScenarioB(prev => ({ ...prev, [field]: newVal }));
        }
    };

    const copyToB = () => {
        setScenarioB({ ...scenarioA });
        setActiveTab("B");
    };

    const activeValues = activeTab === "A" ? scenarioA : scenarioB;
    const activeMetrics = activeTab === "A" ? metricsA : metricsB;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto p-4 md:p-8">
            {/* INPUTS SECTION */}
            <div className="lg:col-span-7 space-y-6">

                {/* Scenario Tabs */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex bg-brand-950/50 p-1 rounded-xl border border-white/10">
                        <button
                            onClick={() => setActiveTab("A")}
                            className={cn(
                                "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                                activeTab === "A" ? "bg-brand-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
                            )}
                        >
                            Scenario A
                        </button>
                        <button
                            onClick={() => setActiveTab("B")}
                            className={cn(
                                "px-6 py-2 rounded-lg text-sm font-medium transition-all",
                                activeTab === "B" ? "bg-accent-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
                            )}
                        >
                            Scenario B
                        </button>
                    </div>
                    {activeTab === "A" && (
                        <button onClick={copyToB} className="text-xs flex items-center gap-1 text-brand-300 hover:text-white transition-colors">
                            <Copy size={12} /> Copy to B
                        </button>
                    )}
                </div>

                {/* Financing Section */}
                <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-brand-400">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <Landmark className="text-brand-400" /> Mortgage & Financing
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup
                            label="Down Payment"
                            suffix="%"
                            value={activeValues.downPayment}
                            onChange={handleChange("downPayment")}
                            type="number"
                        />
                        <InputGroup
                            label="Interest Rate"
                            suffix="%"
                            value={activeValues.interestRate}
                            onChange={handleChange("interestRate")}
                            type="number"
                            step="0.1"
                        />
                        <InputGroup
                            label="Loan Term"
                            suffix="Yrs"
                            value={activeValues.loanTerm}
                            onChange={handleChange("loanTerm")}
                            type="number"
                        />
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <Home className="text-brand-400" /> Property Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup
                            label="Purchase Price"
                            prefix="$"
                            value={activeValues.price}
                            onChange={handleChange("price")}
                            type="number"
                        />
                        <InputGroup
                            label="Monthly Rent"
                            prefix="$"
                            value={activeValues.rent}
                            onChange={handleChange("rent")}
                            type="number"
                        />
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <Receipt className="text-brand-400" /> Expenses & Investment
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InputGroup
                            label="Monthly Expenses"
                            prefix="$"
                            value={activeValues.expenses}
                            onChange={handleChange("expenses")}
                            type="number"
                            icon={Wrench}
                        />
                        <InputGroup
                            label="Closing Costs"
                            prefix="$"
                            value={activeValues.closingCosts}
                            onChange={handleChange("closingCosts")}
                            type="number"
                        />
                        <InputGroup
                            label="Renovation"
                            prefix="$"
                            value={activeValues.renovation}
                            onChange={handleChange("renovation")}
                            type="number"
                        />
                    </div>
                </div>
            </div>

            {/* RESULTS SECTION - SIDE BY SIDE */}
            <div className="lg:col-span-5 space-y-6">
                <div className="glass-panel p-6 rounded-2xl h-full flex flex-col items-center sticky top-8">
                    <div className="flex items-center justify-between w-full mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <ArrowRightLeft className="text-brand-400" size={20} />
                            Comparison
                        </h2>
                        <div className="flex gap-4 text-xs font-bold">
                            <span className="text-brand-400">SCENARIO A</span>
                            <span className="text-accent-400">SCENARIO B</span>
                        </div>
                    </div>

                    {/* CASH ON CASH COMPARISON */}
                    <div className="grid grid-cols-2 gap-4 w-full mb-2">
                        <div className={cn("p-4 rounded-xl border text-center transition-all", activeTab === "A" ? "bg-brand-950/80 border-brand-500/50 shadow-[0_0_15px_rgba(14,165,233,0.1)]" : "bg-brand-950/30 border-white/5 opacity-60")}>
                            <p className="text-brand-200 text-[10px] uppercase tracking-wider mb-1">Cash on Cash (A)</p>
                            <p className="text-3xl font-bold text-brand-400">{metricsA?.cashOnCash}%</p>
                        </div>
                        <div className={cn("p-4 rounded-xl border text-center transition-all", activeTab === "B" ? "bg-brand-950/80 border-accent-500/50 shadow-[0_0_15px_rgba(20,184,166,0.1)]" : "bg-brand-950/30 border-white/5 opacity-60")}>
                            <p className="text-accent-200 text-[10px] uppercase tracking-wider mb-1">Cash on Cash (B)</p>
                            <p className="text-3xl font-bold text-accent-400">{metricsB?.cashOnCash}%</p>
                        </div>
                    </div>

                    {/* DETAILED COMPARISON TABLE */}
                    <div className="w-full space-y-3 mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                        <div className="grid grid-cols-3 text-sm pb-2 border-b border-white/10 text-gray-400 font-medium text-[10px] uppercase tracking-wider">
                            <span>Metric</span>
                            <span className="text-right text-brand-300">Scenario A</span>
                            <span className="text-right text-accent-300">Scenario B</span>
                        </div>

                        <div className="grid grid-cols-3 text-sm items-center">
                            <span className="text-gray-300">Monthly Cash Flow</span>
                            <span className="text-right font-mono text-brand-100">${metricsA?.monthlyCashFlow.toLocaleString()}</span>
                            <span className="text-right font-mono text-accent-100">${metricsB?.monthlyCashFlow.toLocaleString()}</span>
                        </div>

                        <div className="grid grid-cols-3 text-sm items-center">
                            <span className="text-gray-300">Net Yield (Cap)</span>
                            <span className="text-right font-mono text-brand-100">{metricsA?.netYield}%</span>
                            <span className="text-right font-mono text-accent-100">{metricsB?.netYield}%</span>
                        </div>

                        <div className="grid grid-cols-3 text-sm items-center">
                            <span className="text-gray-300">Total Cash Needed</span>
                            <span className="text-right font-mono text-brand-100">${metricsA?.totalInvestment.toLocaleString()}</span>
                            <span className="text-right font-mono text-accent-100">${metricsB?.totalInvestment.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="w-full">
                        <h3 className="text-sm font-semibold text-white mb-2">
                            Expense Breakdown <span className="text-gray-500 font-normal">({activeTab})</span>
                        </h3>
                        <YieldChart netIncome={activeMetrics?.netOperatingIncome || 0} expenses={activeMetrics?.annualExpenses || 0} />
                    </div>

                    {projection.length > 0 && (
                        <div className="w-full mt-8 pt-8 border-t border-white/10">
                            <h3 className="text-sm font-semibold text-white mb-2">
                                10-Year Wealth Projection <span className="text-gray-500 font-normal">({activeTab})</span>
                            </h3>
                            <div className="text-xs text-gray-400 mb-2">Assuming 3% annual appreciation</div>
                            <ProjectionChart data={projection} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
