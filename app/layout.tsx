import './globals.css';

export const metadata = {
  title: 'TisdaleSports',
  description: 'Clean Vercel-ready app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
