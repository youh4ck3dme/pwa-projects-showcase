import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { AppLayout } from "../components/layout/AppLayout";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LARSEN EVANS PROJECTS",
  description: "Elite Showcase of Premium PWA and AI Solutions by LARSEN EVANS",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.png",
    apple: "/icon-512x512.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LARSEN EVANS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <html lang="sk">
        <head>
          <title>LARSEN EVANS PROJECTS</title>
          <meta name="description" content="Elite Showcase of Premium PWA and AI Solutions by LARSEN EVANS" />
        </head>
        <body
          className={`${inter.variable} ${outfit.variable} antialiased`}
        >
          <AppLayout>{children}</AppLayout>
        </body>
      </html>
    </LanguageProvider>
  );
}
