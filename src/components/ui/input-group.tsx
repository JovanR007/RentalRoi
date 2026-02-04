import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: LucideIcon;
    prefix?: string;
    suffix?: string;
    error?: string;
}

export function InputGroup({
    label,
    icon: Icon,
    prefix,
    suffix,
    error,
    className,
    id,
    ...props
}: InputGroupProps) {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className={cn("flex flex-col gap-2", className)}>
            <label htmlFor={inputId} className="text-sm font-medium text-brand-100/80">
                {label}
            </label>
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300 pointer-events-none">
                        <Icon size={18} />
                    </div>
                )}
                {prefix && !Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-300 pointer-events-none font-medium">
                        {prefix}
                    </div>
                )}
                <input
                    id={inputId}
                    className={cn(
                        "w-full glass-input rounded-xl px-4 py-3 outline-none text-lg transition-all",
                        (Icon || prefix) && "pl-10",
                        suffix && "pr-10",
                        error ? "border-red-500/50 focus:border-red-500" : ""
                    )}
                    {...props}
                />
                {suffix && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-300 pointer-events-none font-medium">
                        {suffix}
                    </div>
                )}
            </div>
            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
}
