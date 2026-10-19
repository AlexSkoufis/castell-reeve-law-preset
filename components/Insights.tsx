'use client';

import { useRef, useState } from 'react';
import { insights, faq } from '@/lib/content';
import { gsap, useGsap, MQ } from '@/lib/motion';
import { Img } from './Img';

/** § 6 — Insights as a reading list with a floating preview; § 7 — FAQ accordion. */
export default function Insights() {
  const root = useRef<HTMLElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(0);
  const move = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null);

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.fine} and ${MQ.desktop}`, () => {
      move.current = {
        x: gsap.quickTo(plate.current, 'x', { duration: 0.6, ease: 'power3.out' }),
        y: gsap.quickTo(plate.current, 'y', { duration: 0.6, ease: 'power3.out' }),
      };
      return () => (move.current = null);
    });
    mm.add(MQ.motion, () => {
      // Animate the link, not the row: the row's opacity belongs to the CSS dimming transition.
      gsap.from('.post a', { autoAlpha: 0, y: 30, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.posts', start: 'top 85%', once: true } });
    });
  });

  return (
    <section id="insights" ref={root} className="insights" aria-labelledby="insights-title" onPointerMove={(e) => move.current && (move.current.x(e.clientX), move.current.y(e.clientY))}>
      <header className="sec-head wrap">
        <p className="sec-head__meta">
          <span className="clause">§ 6</span> Insights
        </p>
        <h2 id="insights-title" className="h2">
          Notes from <em>the practice.</em>
        </h2>
      </header>
      <ol className="posts wrap" onPointerLeave={() => setHover(null)}>
        {insights.map((p, i) => (
          <li key={p.title} className={`post${hover !== null && hover !== i ? ' is-dim' : ''}`}>
            <a href="#insights" onPointerEnter={() => setHover(i)} onFocus={() => setHover(i)} onBlur={() => setHover(null)}>
              <span className="post__date">{p.date}</span>
              <span className="post__title">{p.title}</span>
              <span className="post__tag">{p.tag}</span>
              <span className="post__read">{p.read} read →</span>
            </a>
          </li>
        ))}
      </ol>
      <div ref={plate} className={`post-plate${hover !== null ? ' is-on' : ''}`} aria-hidden="true">
        <div className="post-plate__inner">
          {insights.map((p, i) => (
            <div key={p.title} className={`post-plate__img${hover === i ? ' is-on' : ''}`}>
              <Img image={p.image} alt="" sizes="22vw" />
            </div>
          ))}
        </div>
      </div>

      <div className="faq wrap" id="faq">
        <header className="sec-head sec-head--flush">
          <p className="sec-head__meta">
            <span className="clause">§ 7</span> Questions
          </p>
        </header>
        <dl className="faq__list">
          {faq.map((f, i) => (
            <div key={f.q} className={`faq__item${open === i ? ' is-open' : ''}`}>
              <dt>
                <button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
                  <i aria-hidden="true" />
                </button>
              </dt>
              <dd id={`faq-${i}`}>
                <div>
                  <p>{f.a}</p>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
