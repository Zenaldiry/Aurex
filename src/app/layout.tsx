import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AUREX Integrated | Turnkey Solutions',
  description: 'Elite custom home building and luxury remodeling.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // ADDED: overflow-x-hidden to completely disable horizontal scrolling
    <html lang='en' suppressHydrationWarning className='overflow-x-hidden'>
      <body
        className={`${inter.className} bg-slate-900 text-slate-50 overflow-x-hidden w-full`}
      >
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
