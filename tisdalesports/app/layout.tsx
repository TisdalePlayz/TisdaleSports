import './globals.css';
import { PWAManifest } from '../components/PWAManifest';
import { ServiceWorkerRegister } from '../components/ServiceWorkerRegister';

export const metadata = {
  title: 'TisdaleSports',
  description: 'Advanced Sports Analytics PWA'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <PWAManifest />
      </head>
      <body>
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}