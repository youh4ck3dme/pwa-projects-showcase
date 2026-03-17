import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppLayout } from "../components/layout/AppLayout";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
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

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { language, t } = useLanguage();

  return (
    <html lang={language.toLowerCase()}>
      <head>
        <title>{t('title', 'seo')}</title>
        <meta name="description" content={t('description', 'seo')} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </LanguageProvider>
  );
}
