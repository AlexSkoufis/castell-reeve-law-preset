import type { Metadata, Viewport } from 'next';
import { preload } from 'react-dom';
import { Newsreader, Manrope, Mrs_Saint_Delafield } from 'next/font/google';
import { srcSet } from '@/components/Img';
import { firm } from '@/lib/content';
import './globals.css';

// Newsreader: editorial serif with an optical-size axis (headings use large opsz).
const serif = Newsreader({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'], variable: '--font-serif', display: 'swap' });
const sans = Manrope({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
// Script face used only for the hand-signed signature in the hero.
const script = Mrs_Saint_Delafield({ subsets: ['latin'], weight: '400', variable: '--font-script', display: 'swap' });

export const metadata: Metadata = {
  title: `${firm.name} — ${firm.line}`,
  description: `${firm.name}: corporate, disputes and private-client counsel in London, Athens and Nicosia. A fictional law firm design concept.`,
};

export const viewport: Viewport = { themeColor: '#0f2a24', width: 'device-width', initialScale: 1 };

const motionFlag = `try{if(matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preload('/img/hero-1200.avif', { as: 'image', imageSrcSet: srcSet('hero', 'avif'), imageSizes: '(orientation: portrait) 170vh, 100vw', type: 'image/avif', fetchPriority: 'high' });
  return (
    // suppressHydrationWarning: the inline script adds `motion` to <html> before hydration.
    <html lang="en" suppressHydrationWarning className={`${serif.variable} ${sans.variable} ${script.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
