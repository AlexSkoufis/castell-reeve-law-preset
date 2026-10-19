'use client';

import { useEffect, useRef, useState } from 'react';
import { firm, nav } from '@/lib/content';
import { gsap, useGsap, MQ } from '@/lib/motion';
import { Monogram } from './Nav';
import { scrollToTarget } from './SmoothScroll';

/** Footer: offices with local times, regulatory placeholder, links and a large italic signature line. */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const [times, setTimes] = useState(firm.offices.map(() => '--:--'));

  useEffect(() => {
    const tick = () => setTimes(firm.offices.map((o) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: o.tz }).format(new Date())));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo('.ft__mark', { yPercent: 40, autoAlpha: 0.4 }, { yPercent: 0, autoAlpha: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'bottom bottom', scrub: 0.6 } });
    });
  });

  return (
    <footer ref={root} className="ft">
      <div className="ft__top wrap">
        <div className="ft__brand">
          <a href="#top" className="nav__logo" onClick={(e) => (e.preventDefault(), scrollToTarget(0))}>
            <Monogram />
            <span>{firm.name}</span>
          </a>
          <p>{firm.line} · Est. {firm.founded}</p>
          <a className="ft__mail" href={`mailto:${firm.email}`}>
            {firm.email}
          </a>
          <a className="ft__phone" href={firm.phoneHref}>
            {firm.phone}
          </a>
        </div>
        {firm.offices.map((o, i) => (
          <address key={o.city} className="ft__office">
            <p className="ft__k">
              {o.city} <span>{times[i]}</span>
            </p>
            <span>{o.address}</span>
          </address>
        ))}
      </div>
      <nav className="ft__nav wrap" aria-label="Footer">
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={(e) => (e.preventDefault(), scrollToTarget(n.href, { offset: -70 }))}>
            {n.label}
          </a>
        ))}
        <a href="#faq" onClick={(e) => (e.preventDefault(), scrollToTarget('#faq', { offset: -70 }))}>
          FAQ
        </a>
      </nav>
      <div className="ft__legal wrap">
        <p>{firm.disclaimer}</p>
        <p>
          © {new Date().getFullYear()} {firm.name} · Concept by{' '}
          <a href={firm.credit.href} target="_blank" rel="noreferrer">
            {firm.credit.label}
          </a>
        </p>
      </div>
      <p className="ft__mark" aria-hidden="true">
        {firm.name}
      </p>
    </footer>
  );
}
