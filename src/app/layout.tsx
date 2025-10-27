import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Header from '@/components/Header';
import "./globals.css";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Planitt - Plan Your Dreams with Us",
  description: "Professional financial services including Mutual Funds, SIP, FD, Insurance, and NPS. Led by CEO & Financial Distributor Piyush Tembhekar.",
  keywords: "financial planning, mutual funds, SIP, FD, insurance, NPS, financial advisor, Piyush Tembhekar",
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
