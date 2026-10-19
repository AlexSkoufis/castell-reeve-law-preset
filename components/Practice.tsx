'use client';

import { useRef, useState } from 'react';
import { practice } from '@/lib/content';
import { gsap, useGsap, MQ } from '@/lib/motion';
import { Img } from './Img';

/**
 * § 2 — Practice areas as a drawer of case files. Choosing an area slides its file
 * out of the stack: tab, matter code, summary, typical matters and the lead partner.
 * Desktop: list + sticky file. Mobile: the list opens each file inline.
 */
export default function Practice() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  const choose = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from('.area', { autoAlpha: 0, x: -24, stagger: 0.06, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.areas', start: 'top 85%', once: true } });
      gsap.from('.files', { autoAlpha: 0, y: 60, rotate: 2, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: '.files', start: 'top 85%', once: true } });
    });
  });

  return (
    <section id="practice" ref={root} className="practice" aria-labelledby="practice-title">
      <header className="sec-head wrap">
        <p className="sec-head__meta">
          <span className="clause">§ 2</span> Practice
        </p>
        <h2 id="practice-title" className="h2">
          Six practices, <em>one standard of care.</em>
        </h2>
      </header>

      <div className="practice__grid wrap">
        <ol className="areas" role="tablist" aria-label="Practice areas" aria-orientation="vertical">
          {practice.map((p, i) => (
            <li key={p.code} className={`area${i === active ? ' is-on' : ''}`}>
              <button
                role="tab"
                id={`tab-${p.code}`}
                aria-selected={i === active}
                aria-controls={`file-${p.code}`}
                onClick={() => choose(i)}
                onPointerEnter={() => window.matchMedia(MQ.fine).matches && choose(i)}
              >
                <span className="area__code">{p.code}</span>
                <span className="area__name">{p.name}</span>
                <span className="area__arrow" aria-hidden="true">
                  →
                </span>
              </button>
              {/* Mobile: the file opens inline under its tab */}
              <div className="area__inline" hidden={i !== active}>
                <p>{p.summary}</p>
                <ul>
                  {p.matters.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <p className="area__lead">Lead partner — {p.lead}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="files" aria-live="polite">
          {practice.map((p, i) => (
            <article
              key={p.code}
              id={`file-${p.code}`}
              role="tabpanel"
              aria-labelledby={`tab-${p.code}`}
              hidden={i !== active && i !== prev}
              className={`file${i === active ? ' is-on' : ''}${i === prev ? ' is-out' : ''}`}
              onAnimationEnd={() => i === prev && setPrev(null)}
            >
              <span className="file__tab">{p.code}</span>
              <div className="file__paper">
                <header className="file__head">
                  <span>Matter file · {p.code}</span>
                  <span>Confidential</span>
                </header>
                <h3>{p.name}</h3>
                <p className="file__summary">{p.summary}</p>
                <div className="file__cols">
                  <div>
                    <p className="file__k">Typical matters</p>
                    <ul>
                      {p.matters.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="file__img">
                    <Img image={p.image} alt="" sizes="(min-width: 1024px) 20vw, 1px" />
                  </div>
                </div>
                <footer className="file__foot">
                  <span>Lead partner</span>
                  <b>{p.lead}</b>
                  <span className="file__stamp" aria-hidden="true">
                    Reviewed
                  </span>
                </footer>
              </div>
            </article>
          ))}
          <span className="files__stack" aria-hidden="true" />
          <span className="files__stack files__stack--2" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
