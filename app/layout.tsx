import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Modals from "@/components/modal";
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sufismarket.com"),
  title: "Sufi's Market – 100% Original & Halal Grocery Store Online",
  description:
    "Shop fresh groceries, organic produce, and 100% halal products online at Sufi's Market with convenient delivery.",
  openGraph: {
    title: "Sufi's Market – Online Halal Grocery Store",
    description:
      "Buy fresh vegetables, rice, lentils, and halal groceries online from Sufi's Market.",
    url: "https://sufismarket.com",
    siteName: "Sufi's Market",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <div className="flex min-h-screen flex-col">
        <MainNav />
        <Breadcrumbs />
        {children}

        <Suspense fallback={null}>
          <Modals />
        </Suspense>

        <div className="mt-auto">
          <Footer />
        </div>
      </div>

      {/* Toaster must be inside body, but outside main layout */}
      <Toaster position="top-right" />
    </body>
  </html>
);
}