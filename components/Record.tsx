'use client';

import { useRef } from 'react';
import { record } from '@/lib/content';
import { gsap, useGsap, MQ } from '@/lib/motion';
import Odometer from './Odometer';

/** § 3 — Track record: rolling figures on a dark ground, then recent matters as a ledger. */
export default function Record() {
  const root = useRef<HTMLElement>(null);

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from('.stat', { autoAlpha: 0, y: 30, stagger: 0.08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: '.stats', start: 'top 85%', once: true } });
      gsap.utils.toArray<HTMLElement>('.ledger__row').forEach((row) => {
        gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 92%', once: true } })
          .from(row, { '--rule': 0, duration: 1.2, ease: 'expo.inOut' })
          .from(row.children, { autoAlpha: 0, y: 12, stagger: 0.06, duration: 0.8 }, 0.2);
      });
    });
  });

  return (
    <section id="record" ref={root} className="record" aria-labelledby="record-title">
      <header className="sec-head wrap">
        <p className="sec-head__meta">
          <span className="clause">§ 3</span> Record
        </p>
        <h2 id="record-title" className="h2">
          Results, <em>on the record.</em>
        </h2>
      </header>
      <dl className="stats wrap">
        {record.stats.map((s) => (
          <div key={s.label} className="stat">
            <dd>
              {s.prefix && <span className="stat__fix">{s.prefix}</span>}
              <Odometer value={s.value} decimals={s.decimals} />
              {s.suffix && <span className="stat__fix">{s.suffix}</span>}
            </dd>
            <dt>{s.label}</dt>
          </div>
        ))}
      </dl>
      <div className="ledger wrap">
        <p className="ledger__k">Recent matters — anonymised with client consent</p>
        <ol>
          {record.matters.map((m) => (
            <li key={m.text} className="ledger__row">
              <span className="ledger__year">{m.year}</span>
              <span className="ledger__text">{m.text}</span>
              <span className="ledger__area">{m.area}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
