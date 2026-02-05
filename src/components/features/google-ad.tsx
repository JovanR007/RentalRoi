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
            <ins
                className="adsbygoogle"
                style={{ display: "block", ...style }}
                data-ad-client="ca-pub-2711463860910246"
                data-ad-slot={slot || "1234567890"} // Replace with specific slot IDs if created
                data-ad-format={format}
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
}
