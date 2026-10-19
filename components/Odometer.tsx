'use client';

import { useEffect, useRef, useState } from 'react';
import { MQ } from '@/lib/motion';

const DIGITS = '0123456789';

/**
 * Mechanical counter: each digit is a column of 0–9 that rolls to its value.
 * Starts at zero and rolls up the first time it scrolls into view (instantly for
 * reduced motion). Screen readers get the formatted number.
 */
export default function Odometer({ value, decimals = 0, className = '' }: { value: number; decimals?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia(MQ.motion).matches) {
      setShown(value);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect();
          requestAnimationFrame(() => setShown(value));
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  // Later value changes (e.g. the live day counter) roll immediately.
  useEffect(() => {
    if (shown !== null) setShown(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const text = value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const current = (shown ?? 0).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).padStart(text.length, '0');

  return (
    <span ref={ref} className={`odo ${className}`} aria-label={text} role="img">
      {[...text].map((ch, i) => {
        if (!DIGITS.includes(ch)) {
          return (
            <span key={i} className="odo__sep" aria-hidden="true">
              {ch}
            </span>
          );
        }
        const d = DIGITS.includes(current[i]) ? Number(current[i]) : 0;
        return (
          <span key={i} className="odo__col" aria-hidden="true">
            <span className="odo__strip" style={{ transform: `translateY(${-d * 10}%)`, transitionDelay: `${(text.length - i) * 60}ms` }}>
              {DIGITS.split('').map((n) => (
                <span key={n}>{n}</span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
