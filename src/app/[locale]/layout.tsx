import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Prompt } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons:{
    icon: '/scmc_logo.svg'
  }
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={prompt.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
