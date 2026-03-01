import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blue Chip RE Advisors — AI-Powered Acquisition System Demo",
  description: "Off-Market Multifamily Deal Sourcing, AI Underwriting & Automated Outreach — Built for Blue Chip RE Advisors by NextAutomation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
