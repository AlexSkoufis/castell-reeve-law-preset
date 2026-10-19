'use client';

import { useRef } from 'react';
import { statement } from '@/lib/content';
import { gsap, useGsap, MQ } from '@/lib/motion';

// Split "text [redacted] text" into plain and redacted parts.
const parts = statement.split(/(\[[^\]]+\])/g).filter(Boolean).map((p) => (p.startsWith('[') ? { r: true, t: p.slice(1, -1) } : { r: false, t: p }));

/**
 * § 1 — The statement arrives redacted: key phrases sit under ink bars that are
 * struck away one by one as the reader scrolls. Screen readers get the full sentence.
 */
export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      root.current!.classList.add('is-redacted');
      gsap.to('.redact__bar', {
        scaleX: 0,
        stagger: 0.6,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.statement__text', start: 'top 75%', end: 'bottom 40%', scrub: 0.6 },
      });
      gsap.from('.statement__meta > *', { autoAlpha: 0, y: 16, stagger: 0.1, duration: 1, scrollTrigger: { trigger: root.current, start: 'top 80%', once: true } });
      return () => root.current?.classList.remove('is-redacted');
    });
  });

  return (
    <section ref={root} className="statement wrap" aria-label="About the firm">
      <div className="statement__meta">
        <span className="clause">§ 1</span>
        <span>Our position</span>
      </div>
      <p className="statement__text">
        {parts.map((p, i) =>
          p.r ? (
            <span key={i} className="redact">
              <span className="redact__word">{p.t}</span>
              <span className="redact__bar" aria-hidden="true" />
            </span>
          ) : (
            <span key={i}>{p.t}</span>
          ),
        )}
      </p>
    </section>
  );
}
