"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface InitialData {
    name: string;
    value: number;
    color: string;
}

interface YieldChartProps {
    netIncome: number;
    expenses: number;
}

export function YieldChart({ netIncome, expenses }: YieldChartProps) {
    const data = [
        { name: "Net Income", value: netIncome, color: "#22d3ee" }, // Accent-500
        { name: "Expenses", value: expenses, color: "#0ea5e9" }, // Brand-500
    ];

    if (netIncome <= 0 && expenses <= 0) {
        return (
            <div className="h-[250px] flex items-center justify-center text-white/30 text-sm">
                Enter data to see chart
            </div>
        );
    }

    return (
        <div className="w-full mt-4 flex flex-col gap-4">
            <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value: number | undefined) => [`$${(value || 0).toLocaleString()}`, ""]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6">
                {data.map((item) => (
                    <div key={item.name} className="flex items-center gap-2 text-sm text-brand-100/80">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
