"use client";

import { useEffect } from "react";

interface GoogleAdProps {
    slot?: string;
    format?: "auto" | "fluid" | "rectangle";
    className?: string;
    style?: React.CSSProperties;
}

export function GoogleAd({ slot, format = "auto", className, style }: GoogleAdProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense error:", e);
        }
    }, []);

    return (
        <div className={`w-full overflow-hidden flex justify-center my-4 ${className || ""}`}>
            {/* Placeholder for development */}
            <div className="bg-brand-950/30 border border-brand-500/10 text-brand-500/50 text-[10px] w-full min-h-[100px] flex items-center justify-center rounded-lg">
                Google Ad Space
            </div>

            {/* 
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-2711463860910246"
        data-ad-slot={slot || "1234567890"} // Replace with specific slot IDs if created
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
      */}
        </div>
    );
}
