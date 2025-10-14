import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Modals from "@/components/modal";
import MainNav from "@/components/main-nav";
import Footer from "@/components/footer";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome Sufi's - Store Online",
  description: "100% Original Products and Halal Products",
};

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
      </body>
    </html>
  );
}
