'use client';

import { useRef } from 'react';
import { firm, hero } from '@/lib/content';
import { gsap, useGsap, MQ } from '@/lib/motion';
import { Img } from './Img';
import { scrollToTarget } from './SmoothScroll';

const HERO_SIZES = '(orientation: portrait) 170vh, 100vw';

/**
 * Hero: full-bleed photograph (a library in raking light), headline over it, and a
 * signature that writes itself — a script face revealed left-to-right with a pen nib
 * riding the edge of the ink. A circular seal turns slowly beside it.
 * Reduced motion: everything is simply present.
 */
export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo('.hero__photo picture', { scale: 1.18 }, { scale: 1.04, duration: 3.2, ease: 'expo.out' })
        .from('.hero__line > span', { yPercent: 110, stagger: 0.12, duration: 1.3, ease: 'expo.out' }, 0.3)
        .from('.hero__kicker, .hero__lede, .hero__ctas', { autoAlpha: 0, y: 20, stagger: 0.08, duration: 1 }, 0.8)
        .from('.seal', { autoAlpha: 0, scale: 0.8, rotate: -40, duration: 1.6, ease: 'expo.out' }, 0.9)
        // The signature: ink revealed left-to-right, nib travelling with it.
        .fromTo('.sig__ink', { clipPath: 'inset(-20% 100% -20% 0%)' }, { clipPath: 'inset(-20% 0% -20% 0%)', duration: 2.2, ease: 'power1.inOut' }, 1.2)
        .fromTo('.sig__nib', { left: '0%', autoAlpha: 1 }, { left: '100%', duration: 2.2, ease: 'power1.inOut' }, 1.2)
        .to('.sig__nib', { autoAlpha: 0, duration: 0.3 })
        .from('.sig__rule', { scaleX: 0, transformOrigin: 'left', duration: 1, ease: 'expo.inOut' }, 1.1);

      // Scroll: the photo drifts and darkens slightly while the copy lifts away.
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.5 } })
        .to('.hero__photo picture', { yPercent: 10 }, 0)
        .to('.hero__content', { yPercent: -14, autoAlpha: 0 }, 0)
        .to('.seal', { rotate: 120, autoAlpha: 0 }, 0);
    });
  });

  return (
    <section id="top" ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero__photo">
        <Img image="hero" alt="Sunlight falling across the shelves of a quiet library" sizes={HERO_SIZES} priority />
      </div>
      <span className="hero__tint" aria-hidden="true" />

      <div className="hero__content wrap">
        <p className="hero__kicker">{hero.kicker}</p>
        <h1 id="hero-title" className="hero__title">
          {hero.title.map((l, i) => (
            <span key={l} className={`hero__line${i === 1 ? ' hero__line--em' : ''}`}>
              <span>{l}</span>
            </span>
          ))}
        </h1>

        <div className="hero__row">
          <div className="sig" aria-label={`Signed, ${hero.signature}`}>
            <span className="sig__ink" aria-hidden="true">
              {hero.signature}
            </span>
            <span className="sig__nib" aria-hidden="true" />
            <span className="sig__rule" aria-hidden="true" />
          </div>
          <div className="hero__side">
            <p className="hero__lede">{hero.lede}</p>
            <div className="hero__ctas">
              <a href="#consult" className="btn btn--brass" onClick={(e) => (e.preventDefault(), scrollToTarget('#consult', { offset: -70 }))}>
                {hero.cta} <span aria-hidden="true">→</span>
              </a>
              <a href={firm.phoneHref} className="btn btn--glass">
                {firm.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      <svg className="seal" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <path id="seal-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <circle cx="100" cy="100" r="96" className="seal__ring" />
        <circle cx="100" cy="100" r="60" className="seal__ring" />
        <g className="seal__spin">
          <text>
            <textPath href="#seal-path">{hero.seal}</textPath>
          </text>
        </g>
        <text x="100" y="112" textAnchor="middle" className="seal__mono">
          {firm.short}
        </text>
      </svg>
    </section>
  );
}
