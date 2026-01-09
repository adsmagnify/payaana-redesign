import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SchoolTripsBanner from "@/components/ui/SchoolTripsBanner";

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-dm-sans",
  weight: ["400", "700"], // Regular and Bold
  display: "swap",
});

export const metadata: Metadata = {
  title: "Payaana - Adventure Travel",
  description: "Discover amazing travel packages and destinations with Payaana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="font-sans">
        <SchoolTripsBanner />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
