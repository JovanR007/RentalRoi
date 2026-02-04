import { RentalCalculator } from "@/components/features/rental-calculator";
import { GoogleAd } from "@/components/features/google-ad";
import { SeoGuide } from "@/components/content/seo-guide";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen py-10 px-4 md:px-8 flex flex-col items-center">
      <div className="text-center mb-12 space-y-4 relative z-10 flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <Image src="/icon.svg" alt="RentalRoi Logo" fill className="object-contain" priority />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          Rental<span className="text-gradient">Roi</span>
        </h1>
        <p className="text-blue-200/60 text-lg md:text-xl max-w-2xl mx-auto">
          Instant, visual analysis for your next real estate investment.
          <br /> Calculate yields, cash flow, and ROI in seconds.
        </p>
      </div>

      <RentalCalculator />

      <div className="w-full max-w-6xl mx-auto px-4 mt-12">
        <GoogleAd className="min-h-[250px]" />
      </div>

      <SeoGuide />

      <footer className="mt-20 border-t border-white/10 text-white/40 text-sm py-10 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
        </div>
        © 2025 RentalRoi. All rights reserved.
      </footer>
    </div>
  );
}
