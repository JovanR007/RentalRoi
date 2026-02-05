"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Analytics />
            <SpeedInsights />
        </>
    );
}
