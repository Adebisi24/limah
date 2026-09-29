import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { Masthead } from '@/components/masthead';
import { Footer } from '@/components/footer';

const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Nest Nabber — Interiors, Organization & Thoughtful Shopping',
    template: '%s — Nest Nabber',
  },
  description:
    'Nest Nabber is a home and interiors publication: room-by-room design inspiration, practical organization advice, and carefully considered shopping guides.',
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:4321'),
  robots:
    process.env.CONTENT_MODE === 'sanity' && !!process.env.SITE_URL
      ? { index: true, follow: true }
      : { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrument.variable}`}>
      <body className="flex min-h-screen flex-col bg-ivory">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[3px] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Masthead />
        <>
          <div
            className="border-b border-line bg-ivory-deep px-5 py-2 text-center text-[11px] text-stone"
            role="note"
          >
            <em>
              We independently evaluate all of our recommendations. If you click
              on links we provide, we may receive compensation.
            </em>
          </div>
        </>
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
