import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import StoreProvider from '@/state/provider';
import './globals.css';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'W guides',
  description: 'You already know',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className}`}>
        <StoreProvider>
          <div className="root-layout">{children}</div>
          <Toaster richColors closeButton />
        </StoreProvider>
      </body>
    </html>
  );
}
