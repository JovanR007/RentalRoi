import type { Metadata } from "next";
import { AnalyticsProvider } from "@/components/features/analytics-provider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RentalRoi | Free Real Estate Investment Calculator 2025",
  description: "RentalRoi: Calculate Cash on Cash Return, Net Yield, and 10-Year Projections instantly. The best free tool for real estate investors.",
  keywords: ["RentalRoi", "rental yield calculator", "real estate roi", "cap rate calculator", "investment property analysis", "cash flow calculator"],
  openGraph: {
    title: "RentalRoi - Visual Investment & Yield Calculator",
    description: "Instant, visual analysis for your next real estate investment.",
    type: "website",
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2711463860910246"
          crossOrigin="anonymous"
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "RentalRoi",
              "applicationCategory": "GenericApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "RentalRoi: Calculate Gross Yield, Net Yield, Cash Flow, and Cap Rate instantly with this free interactive tool for real estate investors.",
              "featureList": "Mortgage Calculator, Cash on Cash Return, 10-Year Projection, Investment Analysis"
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans`}
        suppressHydrationWarning
      >
        <AnalyticsProvider>
          <main className="relative z-10">{children}</main>
        </AnalyticsProvider>
        {/* Ambient Background Glow */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-500/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-500/10 blur-[120px]" />
        </div>
      </body>
    </html>
  );
}
