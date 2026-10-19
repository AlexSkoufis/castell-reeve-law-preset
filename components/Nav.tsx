'use client';

import { useEffect, useState } from 'react';
import { firm, nav } from '@/lib/content';
import { getLenis, scrollToTarget } from './SmoothScroll';

/** Monogram mark: the firm's initials set in the serif inside a thin ring. */
export function Monogram({ size = 34 }: { size?: number }) {
  return (
    <span className="mono-mark" style={{ width: size, height: size }} aria-hidden="true">
      {firm.short}
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 30);
      const hero = document.getElementById('top');
      setOnHero(!!hero && hero.getBoundingClientRect().bottom > 70);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (open) getLenis()?.stop();
    else getLenis()?.start();
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToTarget(href, { offset: -70 }), open ? 150 : 0);
  };

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${onHero && !open ? ' on-hero' : ''}${open ? ' is-open' : ''}`}>
      <a href="#top" className="nav__logo" onClick={(e) => go(e, '#top')} aria-label={`${firm.name} — home`}>
        <Monogram />
        <span>{firm.name}</span>
      </a>
      <nav className="nav__links" aria-label="Primary">
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)}>
            {n.label}
          </a>
        ))}
      </nav>
      <div className="nav__aux">
        <a href={firm.phoneHref} className="nav__phone">
          {firm.phone}
        </a>
        <a href="#consult" className="nav__cta" onClick={(e) => go(e, '#consult')}>
          Book a consultation
        </a>
        <button className="nav__burger" aria-expanded={open} aria-controls="mnav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <i />
          <i />
        </button>
      </div>
      <div id="mnav" className="nav__sheet" hidden={!open}>
        {nav.map((n, i) => (
          <a key={n.href} href={n.href} onClick={(e) => go(e, n.href)} style={{ '--i': i } as React.CSSProperties}>
            <span>§ {i + 1}</span>
            {n.label}
          </a>
        ))}
        <a href="#consult" className="nav__sheet-cta" onClick={(e) => go(e, '#consult')}>
          Book a consultation
        </a>
      </div>
    </header>
  );
}
