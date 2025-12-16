import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { PWAManifest } from '@/components/PWAManifest';
import { ServiceWorkerRegister } from '@/components/ServiceWorkerRegister';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TisdaleSports - Advanced Sports Analytics',
  description: 'Professional sports betting analytics with real-time odds, player props, and Bayesian modeling',
  applicationName: 'TisdaleSports',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'TisdaleSports',
    startupImage: [
      {
        url: '/splashscreens/iphone6_splash.png',
        media: '(device-width: 375px) and (device-height: 667px)',
      },
      {
        url: '/splashscreens/iphoneplus_splash.png',
        media: '(device-width: 414px) and (device-height: 736px)',
      },
      {
        url: '/splashscreens/iphonex_splash.png',
        media: '(device-width: 375px) and (device-height: 812px)',
      },
      {
        url: '/splashscreens/iphonexr_splash.png',
        media: '(device-width: 414px) and (device-height: 896px)',
      },
      {
        url: '/splashscreens/iphonexsmax_splash.png',
        media: '(device-width: 414px) and (device-height: 896px)',
      },
      {
        url: '/splashscreens/ipad_splash.png',
        media: '(device-width: 768px) and (device-height: 1024px)',
      },
      {
        url: '/splashscreens/ipadpro1_splash.png',
        media: '(device-width: 834px) and (device-height: 1112px)',
      },
      {
        url: '/splashscreens/ipadpro2_splash.png',
        media: '(device-width: 1024px) and (device-height: 1366px)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icons/icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/icons/icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icons/icon-128x128.png', sizes: '128x128', type: 'image/png' },
      { url: '/icons/icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#000000',
  backgroundColor: '#000000',
  keywords: ['sports betting', 'odds', 'player props', 'sports analytics', 'bayesian modeling'],
  category: 'sports',
  classification: 'sports',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <PWAManifest />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-system-background">
            <Navigation />
            <div className="lg:ml-64">
              {children}
            </div>
          </div>
          <ServiceWorkerRegister />
        </Providers>
      </body>
    </html>
  );
}