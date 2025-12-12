import type { Metadata } from "next";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Timer - Kişisel Zamanlayıcı',
    template: '%s | Timer',
  },
  description: 'Özel anlarınızı takip edin, geri sayım oluşturun ve sevdiklerinizle paylaşın.',
  keywords: ['timer', 'zamanlayıcı', 'countdown', 'geri sayım', 'sayaç', 'özel gün'],
  authors: [{ name: 'Timer Team' }],
  creator: 'Timer Team',
  publisher: 'Timer Team',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: 'Timer',
    title: 'Timer - Kişisel Zamanlayıcı',
    description: 'Özel anlarınızı takip edin, geri sayım oluşturun ve sevdiklerinizle paylaşın.',
    images: [
      {
        url: '/og-image.png', // We might need to ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: 'Timer - Kişisel Zamanlayıcı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Timer - Kişisel Zamanlayıcı',
    description: 'Özel anlarınızı takip edin, geri sayım oluşturun ve sevdiklerinizle paylaşın.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: "/manifest.json",
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
        {children}
      </body>
    </html>
  );
}
