import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppLayout } from "../components/layout/AppLayout";
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
  title: "JetEngine CCT PWA",
  description: "Premium Showcase of PWA Projects and AI Solutions",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/icon-512x512.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JetEngine",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
