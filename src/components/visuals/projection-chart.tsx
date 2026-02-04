"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ProjectionData {
    year: number;
    equity: number;
    cashFlow: number;
}

interface ProjectionChartProps {
    data: ProjectionData[];
}

export function ProjectionChart({ data }: ProjectionChartProps) {
    return (
        <div className="h-[300px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <XAxis
                        dataKey="year"
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `Yr ${value}`}
                    />
                    <YAxis
                        stroke="#94a3b8"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: number | undefined) => [`$${(value || 0).toLocaleString()}`, ""]}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="equity" name="Property Equity" stackId="a" fill="#0ea5e9" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="cashFlow" name="Cumulative Cash Flow" stackId="a" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
