'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { consult, practice } from '@/lib/content';
import { gsap, useGsap, MQ } from '@/lib/motion';
import { Img } from './Img';

type Step = 0 | 1 | 2 | 3;

/** Next ten weekdays from today (computed after mount so server and client agree). */
function weekdays(n = 10) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() !== 0 && d.getDay() !== 6) out.push(new Date(d));
  }
  return out;
}

/**
 * § 5 — Consultation booker. Matter → urgency (which recommends the lead partner) →
 * day and time → details. A live summary card mirrors every choice. Demo only.
 */
export default function Consult() {
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState<Step>(0);
  const [matter, setMatter] = useState<string | null>(null);
  const [urgency, setUrgency] = useState<string | null>(null);
  const [days, setDays] = useState<Date[]>([]);
  const [day, setDay] = useState<number | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => setDays(weekdays()), []);

  const lead = useMemo(() => practice.find((p) => p.name === matter)?.lead ?? null, [matter]);
  const urgencyInfo = consult.urgency.find((u) => u.id === urgency);
  const dateLabel = day !== null && days[day] ? days[day].toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }) : null;

  // Deterministic "availability": some slots are taken, varied by day.
  const taken = (d: number, s: number) => (d * 7 + s * 3) % 5 === 0;

  useGsap(root, () => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.from('.book, .brief', { autoAlpha: 0, y: 50, stagger: 0.12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.consult__grid', start: 'top 85%', once: true } });
      gsap.fromTo('.consult__bg picture', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });

  const canNext = [matter, urgency, day !== null && slot, true][step];
  const titles = ['What is it about?', 'How urgent is it?', 'When suits you?', 'How can we reach you?'];

  return (
    <section id="consult" ref={root} className="consult" aria-labelledby="consult-title">
      <div className="consult__bg" aria-hidden="true">
        <Img image="penink" alt="" sizes="100vw" />
      </div>
      <header className="sec-head wrap">
        <p className="sec-head__meta">
          <span className="clause">§ 5</span> {consult.label}
        </p>
        <h2 id="consult-title" className="h2">
          {consult.title}
        </h2>
        <p className="consult__text">{consult.text}</p>
      </header>

      <div className="consult__grid wrap">
        <div className="book">
          <ol className="book__steps" aria-label="Progress">
            {titles.map((t, i) => (
              <li key={t} className={i === step ? 'on' : i < step ? 'done' : ''} aria-current={i === step ? 'step' : undefined}>
                <span>{String(i + 1).padStart(2, '0')}</span>
              </li>
            ))}
          </ol>

          {sent ? (
            <div className="book__done" role="status">
              <span className="book__seal" aria-hidden="true">
                ✓
              </span>
              <p>{consult.thanks}</p>
            </div>
          ) : (
            <form
              className="book__body"
              onSubmit={(e) => {
                e.preventDefault();
                if (step < 3) setStep((s) => (s + 1) as Step);
                else setSent(true);
              }}
            >
              <fieldset key={step} className="book__step">
                <legend>{titles[step]}</legend>

                {step === 0 && (
                  <div className="chips" role="radiogroup" aria-label="Matter">
                    {consult.matters.map((m) => (
                      <label key={m} className={`chip${matter === m ? ' on' : ''}`}>
                        <input type="radio" name="matter" checked={matter === m} onChange={() => setMatter(m)} />
                        {m}
                      </label>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div className="urgency" role="radiogroup" aria-label="Urgency">
                    {consult.urgency.map((u) => (
                      <label key={u.id} className={`urg${urgency === u.id ? ' on' : ''}${u.id === 'urgent' ? ' urg--hot' : ''}`}>
                        <input type="radio" name="urgency" checked={urgency === u.id} onChange={() => setUrgency(u.id)} />
                        <b>{u.label}</b>
                        <span>{u.note}</span>
                      </label>
                    ))}
                  </div>
                )}

                {step === 2 && (
                  <div className="when">
                    <div className="days" role="radiogroup" aria-label="Day">
                      {days.map((d, i) => (
                        <label key={+d} className={`day${day === i ? ' on' : ''}`}>
                          <input type="radio" name="day" checked={day === i} onChange={() => (setDay(i), setSlot(null))} />
                          <span>{d.toLocaleDateString('en-GB', { weekday: 'short' })}</span>
                          <b>{d.getDate()}</b>
                          <span>{d.toLocaleDateString('en-GB', { month: 'short' })}</span>
                        </label>
                      ))}
                    </div>
                    <div className="slots" role="radiogroup" aria-label="Time (UK)">
                      {consult.slots.map((s, i) => {
                        const off = day === null || taken(day, i);
                        return (
                          <label key={s} className={`slot${slot === s ? ' on' : ''}${off ? ' off' : ''}`}>
                            <input type="radio" name="slot" disabled={off} checked={slot === s} onChange={() => setSlot(s)} />
                            {s}
                          </label>
                        );
                      })}
                    </div>
                    <p className="when__note">All times UK · 30-minute video or phone call</p>
                  </div>
                )}

                {step === 3 && (
                  <div className="fields">
                    <label>
                      <span>Full name</span>
                      <input required autoComplete="name" />
                    </label>
                    <label>
                      <span>Email</span>
                      <input type="email" required autoComplete="email" />
                    </label>
                    <label className="wide">
                      <span>A few lines about the matter (optional)</span>
                      <textarea rows={3} />
                    </label>
                    <p className="fields__note wide">Your message is protected by our confidentiality policy. Please don’t include sensitive documents yet.</p>
                  </div>
                )}
              </fieldset>

              <div className="book__nav">
                {step > 0 && (
                  <button type="button" className="btn btn--line" onClick={() => setStep((s) => (s - 1) as Step)}>
                    ← Back
                  </button>
                )}
                <button type="submit" className="btn btn--ink" disabled={!canNext}>
                  {step < 3 ? 'Continue' : 'Request consultation'}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="brief" aria-live="polite" aria-label="Your request">
          <p className="brief__k">Your request</p>
          <dl>
            <div>
              <dt>Matter</dt>
              <dd>{matter ?? '—'}</dd>
            </div>
            <div>
              <dt>Urgency</dt>
              <dd>{urgencyInfo?.label ?? '—'}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{dateLabel ? `${dateLabel}${slot ? `, ${slot}` : ''}` : '—'}</dd>
            </div>
          </dl>
          <div className={`brief__partner${lead ? ' is-on' : ''}`}>
            <span className="brief__mono">{lead ? lead.split(' ').map((w) => w[0]).join('') : '··'}</span>
            <div>
              <small>Recommended partner</small>
              <b>{lead ?? 'Choose a matter'}</b>
            </div>
          </div>
          {urgencyInfo && <p className="brief__note">{urgencyInfo.note}</p>}
        </aside>
      </div>
    </section>
  );
}
