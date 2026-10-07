import { useEffect, useMemo, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import { foodbridge } from '../../data/content';
import { MaskLine } from '../SectionHeader';

// Toy candidates for the demo. Not real NGOs, not production weights.
const CANDIDATES = [
  { id: 'A', semantic: 0.9, distance: 0.3, capacity: 0.6, urgency: 0.5 },
  { id: 'B', semantic: 0.5, distance: 0.9, capacity: 0.5, urgency: 0.6 },
  { id: 'C', semantic: 0.7, distance: 0.6, capacity: 0.2, urgency: 0.9 },
  { id: 'D', semantic: 0.4, distance: 0.5, capacity: 0.9, urgency: 0.3 },
];

function MatchingDemo() {
  const [enabled, setEnabled] = useState(() => new Set(foodbridge.signals.map((s) => s.key)));

  const ranked = useMemo(() => {
    const keys = [...enabled];
    return CANDIDATES.map((c) => ({
      ...c,
      score: keys.length ? keys.reduce((sum, k) => sum + c[k], 0) / keys.length : 0,
    })).sort((a, b) => b.score - a.score);
  }, [enabled]);

  const toggle = (key) =>
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <figure className="border border-rule bg-[color-mix(in_srgb,var(--raised)_40%,transparent)]">
      <figcaption className="flex items-baseline justify-between gap-4 border-b border-rule px-4 py-3 sm:px-5">
        <span className="label">fig. 2 — ranking NGOs for a new donation</span>
        <span className="label hidden sm:inline">toy data</span>
      </figcaption>

      <div className="px-4 pt-5 sm:px-5">
        <p className="label mb-3" id="signals-label">
          Signals in the score
        </p>
        <div role="group" aria-labelledby="signals-label" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {foodbridge.signals.map((s) => {
            const on = enabled.has(s.key);
            return (
              <button
                key={s.key}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.key)}
                className={`flex min-h-[52px] flex-col items-start justify-center border px-3 py-2 text-left transition-colors ${
                  on ? 'border-[color-mix(in_srgb,var(--ink)_60%,transparent)] bg-paper text-ink' : 'border-rule text-ink-3 hover:border-rule-strong'
                }`}
              >
                <span className="flex items-center gap-2 text-[13.5px]">
                  <span aria-hidden="true" className={`h-2 w-2 ${on ? 'bg-accent' : 'border border-rule-strong'}`} />
                  {s.label}
                </span>
                <span className="mt-0.5 font-mono text-[10.5px] text-ink-3">{s.how}</span>
              </button>
            );
          })}
        </div>
      </div>

      <LayoutGroup>
        <ol className="mt-5 px-4 pb-4 sm:px-5" aria-live="polite" aria-label="Ranked matches">
          {ranked.map((c, i) => (
            <motion.li
              layout
              key={c.id}
              transition={{ type: 'spring', stiffness: 420, damping: 38 }}
              className="grid grid-cols-[1.5rem_4.2rem_1fr_3rem] items-center gap-3 border-t border-rule py-3 font-mono text-[12px]"
            >
              <span className={i === 0 && enabled.size ? 'text-accent-ink' : 'text-ink-3'}>{i + 1}</span>
              <span className="text-ink">NGO {c.id}</span>
              <span className="flex h-6 items-end gap-[3px]" aria-hidden="true">
                {foodbridge.signals.map((s) => (
                  <span
                    key={s.key}
                    title={s.label}
                    className={`w-full max-w-[22px] transition-[height,background-color] duration-300 ${
                      enabled.has(s.key) ? 'bg-ink-2' : 'bg-rule'
                    }`}
                    style={{ height: `${c[s.key] * 100}%` }}
                  />
                ))}
              </span>
              <span className="text-right text-ink-2">{enabled.size ? c.score.toFixed(2) : '—'}</span>
            </motion.li>
          ))}
        </ol>
      </LayoutGroup>
      <p className="border-t border-rule px-4 py-3 font-mono text-[10.5px] leading-relaxed text-ink-3 sm:px-5">
        Turn signals off to see the ranking change. The real engine combines the same four signals; these numbers are made up.
      </p>
    </figure>
  );
}

/* Two NGOs try to claim the same donation at once. The RPC lets exactly one through. */
function RaceDemo() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState('idle'); // idle | racing | done

  useEffect(() => {
    if (phase !== 'racing') return undefined;
    const t = setTimeout(() => setPhase('done'), reduce ? 0 : 900);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  const rows = [
    { who: 'NGO B', result: 'claimed', ok: true },
    { who: 'NGO C', result: 'rejected · already claimed', ok: false },
  ];

  return (
    <div className="border border-rule">
      <div className="flex items-center justify-between gap-4 border-b border-rule px-4 py-3">
        <span className="label">Two claims, same donation, same moment</span>
        <button
          type="button"
          onClick={() => setPhase(phase === 'done' ? 'idle' : 'racing')}
          disabled={phase === 'racing'}
          className="min-h-[36px] shrink-0 border border-rule-strong px-3 font-mono text-[11px] uppercase tracking-[0.12em] hover:border-ink disabled:opacity-50"
        >
          {phase === 'done' ? 'Reset' : 'Run it'}
        </button>
      </div>
      <ul className="px-4 py-2 font-mono text-[12px]" aria-live="polite">
        {rows.map((r) => (
          <li key={r.who} className="grid grid-cols-[4.5rem_1fr] gap-3 py-2">
            <span className="text-ink">{r.who}</span>
            <span className={phase === 'done' ? (r.ok ? 'text-ink' : 'text-accent-ink') : 'text-ink-3'}>
              {phase === 'idle' && 'claim →'}
              {phase === 'racing' && 'claim → rpc…'}
              {phase === 'done' && (r.ok ? '✓ ' : '✗ ') + r.result}
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-rule px-4 py-3 font-mono text-[10.5px] leading-relaxed text-ink-3">
        The check and the update happen inside one SECURITY DEFINER function, so the second claim can’t slip in between them.
      </p>
    </div>
  );
}

function FoodBridge() {
  return (
    <article id="foodbridge" aria-labelledby="foodbridge-title" className="scroll-mt-20">
      <div className="grid-12 gap-y-6">
        <p className="label col-span-4 sm:col-span-8 lg:col-span-3">
          <span className="text-accent-ink">03.2</span> / {foodbridge.period}
        </p>
        <div className="col-span-4 sm:col-span-8 lg:col-span-9">
          <h3 id="foodbridge-title" className="font-serif text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95] tracking-[-0.02em]">
            <MaskLine>FoodBridge</MaskLine>
          </h3>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-3">{foodbridge.subtitle}</p>
        </div>
      </div>

      <div className="mt-12 grid-12 gap-y-12">
        <div className="col-span-4 sm:col-span-8 lg:col-span-7">
          <MatchingDemo />
        </div>
        <div className="col-span-4 sm:col-span-8 lg:col-span-5">
          <p className="text-[18px] leading-[1.6] text-ink">{foodbridge.intro}</p>

          <div className="mt-8">
            <p className="label mb-3">Four roles, one set of tables</p>
            <ul className="grid grid-cols-4 border-y border-rule">
              {foodbridge.roles.map((r) => (
                <li key={r} className="border-l border-rule px-2 py-3 text-center font-mono text-[11.5px] first:border-l-0">
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-2 font-mono text-[10.5px] text-ink-3">each row filtered by Postgres row-level security</p>
          </div>

          <div className="mt-8">
            <RaceDemo />
          </div>
        </div>
      </div>

      <ul className="mt-12 grid gap-x-12 gap-y-5 border-t border-rule pt-8 md:grid-cols-2">
        {foodbridge.points.map((p, i) => (
          <li key={i} className="grid grid-cols-[2rem_1fr] text-[15.5px] leading-relaxed text-ink-2">
            <span className="font-mono text-[12px] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-mono text-[11.5px] leading-6 text-ink-3">{foodbridge.stack.join(' · ')}</p>
        <a
          href={foodbridge.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-2 hover:text-ink"
        >
          <span className="link-underline">Repository ↗</span>
        </a>
      </div>
    </article>
  );
}

export default FoodBridge;
