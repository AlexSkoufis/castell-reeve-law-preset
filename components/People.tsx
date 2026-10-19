'use client';

import { useRef } from 'react';
import { people } from '@/lib/content';
import { gsap, useGsap, MQ } from '@/lib/motion';
import { Img } from './Img';

/**
 * § 4 — Partners as monogram cards (no stock faces standing in for real people).
 * Hover or focus turns a card over to show focus, admissions and languages.
 */
export default function People() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from('.partner', { autoAlpha: 0, y: 50, stagger: 0.08, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.partners', start: 'top 85%', once: true } });
      gsap.fromTo('.people__photo picture', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.people__photo', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  return (
    <section id="people" ref={root} className="people" aria-labelledby="people-title">
      <div className="people__top wrap">
        <header className="sec-head sec-head--flush">
          <p className="sec-head__meta">
            <span className="clause">§ 4</span> People
          </p>
          <h2 id="people-title" className="h2">
            Partners who <em>stay on the file.</em>
          </h2>
          <p className="people__intro">{people.intro}</p>
        </header>
        <div className="people__photo">
          <Img image="reader" alt="Silhouette of a lawyer reading in a quiet office" sizes="(min-width: 1024px) 34vw, 92vw" />
          <span className="people__cap">Discretion is a practice, not a policy.</span>
        </div>
      </div>
      <ul className="partners wrap">
        {people.partners.map((p) => (
          <li key={p.name} className="partner">
            <div className="partner__card">
              <div className="partner__front">
                <span className="partner__mono">{p.initials}</span>
                <div>
                  <b>{p.name}</b>
                  <span>{p.role}</span>
                </div>
              </div>
              <dl className="partner__back">
                <div>
                  <dt>Focus</dt>
                  <dd>{p.focus}</dd>
                </div>
                <div>
                  <dt>Admitted</dt>
                  <dd>{p.bars}</dd>
                </div>
                <div>
                  <dt>Languages</dt>
                  <dd>{p.langs}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
