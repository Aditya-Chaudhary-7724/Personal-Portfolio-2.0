import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { agent, links, profile } from '../data/content';
import { MaskLine } from './SectionHeader';
import Magnetic from './Magnetic';

// A depiction of one agent run. Each line links to the step that explains it.
const TRACE = [
  { step: 'ingest', cmd: 'parse', detail: 'repository · tree-sitter, ast', status: 'ok' },
  { step: 'index', cmd: 'index', detail: 'neo4j graph · pgvector · full-text', status: 'ok' },
  { step: 'retrieve', cmd: 'retrieve', detail: 'semantic + lexical + graph', status: 'ok' },
  { step: 'reason', cmd: 'plan', detail: 'langgraph · anthropic api', status: 'ok' },
  { step: 'reason', cmd: 'patch', detail: 'proposed change', status: 'ok' },
  { step: 'execute', cmd: 'test', detail: 'docker sandbox', status: 'fail' },
  { step: 'execute', cmd: 'revise', detail: 'test output → agent', status: 'retry' },
  { step: 'execute', cmd: 'test', detail: 'docker sandbox', status: 'pass' },
  { step: 'evaluate', cmd: 'judge', detail: 'llm-as-judge · quality, latency', status: 'ok' },
  { step: 'approve', cmd: 'interrupt', detail: 'waiting for human approval', status: 'wait' },
];

const SEEN_KEY = 'trace-played';

function readSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function Status({ status }) {
  if (status === 'wait') return <span className="caret" aria-label="waiting" />;
  const tone =
    status === 'fail' ? 'text-accent-ink' : status === 'retry' ? 'text-ink-2' : 'text-ink-3';
  const text = { ok: 'ok', fail: 'fail', retry: '↺', pass: 'pass' }[status];
  return <span className={tone}>{text}</span>;
}

function RunTrace() {
  const reduce = useReducedMotion();
  // Plays once per session; afterwards (or with reduced motion) it is shown complete.
  const [shown, setShown] = useState(() => (reduce || readSeen() ? TRACE.length : 0));

  useEffect(() => {
    if (shown >= TRACE.length) {
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        // ignore
      }
      return undefined;
    }
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 700 : 170);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <figure className="relative border-t border-rule-strong">
      <figcaption className="flex items-baseline justify-between gap-4 py-3">
        <span className="label">fig. 0 — one run of the agent</span>
        <span className="label hidden sm:inline">illustrative</span>
      </figcaption>
      <ol className="font-mono text-[12px] leading-none sm:text-[12.5px]" aria-label="Agent run trace">
        {TRACE.map((line, i) => {
          const visible = i < shown;
          const last = i === TRACE.length - 1;
          return (
            <li key={i} className="border-t border-rule">
              <a
                href={`#agent-step-${line.step}`}
                tabIndex={visible ? 0 : -1}
                aria-hidden={!visible}
                className={`group grid grid-cols-[1.6rem_4.6rem_1fr_auto] items-center gap-x-2 py-[9px] transition-[opacity,background-color] duration-200 hover:bg-raised sm:grid-cols-[2rem_5.5rem_1fr_auto] ${
                  visible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <span className="pl-1 text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                <span className={last ? 'text-accent-ink' : 'text-ink'}>{line.cmd}</span>
                <span className="truncate text-ink-2">
                  {line.detail}
                  <span className="ml-2 text-accent-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    →
                  </span>
                </span>
                <span className="pr-1 text-right">
                  <Status status={line.status} />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
      <div className="flex items-center justify-between border-t border-rule pt-3">
        <span className="label">click a line to jump to that step</span>
        <a href="#agent" className="label link-underline text-ink-2 hover:text-ink">
          follow the run ↓
        </a>
      </div>
    </figure>
  );
}

function Hero() {
  return (
    <section id="top" aria-labelledby="hero-name" className="relative overflow-hidden pb-20 pt-24 sm:pt-28 lg:pb-28">
      {/* the layout grid, made visible: twelve hairline columns */}
      <div aria-hidden="true" className="page pointer-events-none absolute inset-0 hidden lg:block">
        <div className="grid-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-l border-rule opacity-50 last:border-r" />
          ))}
        </div>
      </div>

      <div className="page relative">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-rule pb-3">
          <p className="label">Portfolio · rev. {profile.updated}</p>
          <p className="label">Final-year B.Tech CSE · SRM IST</p>
        </div>

        <h1
          id="hero-name"
          className="mt-10 font-serif text-[clamp(4.2rem,13.5vw,12.5rem)] leading-[0.86] tracking-[-0.02em] sm:mt-14"
        >
          <MaskLine>{profile.firstName}</MaskLine>
          <MaskLine delay={0.08} className="lg:pl-[16.66%]">
            <span className="italic">{profile.lastName}</span>
            <span className="text-accent">.</span>
          </MaskLine>
        </h1>

        <motion.p
          className="mt-6 font-mono text-[12px] uppercase tracking-[0.16em] text-ink-2 lg:pl-[16.66%]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {profile.focus.join('  /  ')}
        </motion.p>

        <div className="grid-12 mt-14 gap-y-14 lg:mt-20">
          <motion.div
            className="col-span-4 sm:col-span-6 lg:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <p className="text-[19px] leading-[1.55] text-ink sm:text-[21px]">{profile.lede}</p>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-2">{profile.now}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic
                href="#agent"
                className="inline-flex min-h-[44px] items-center gap-3 bg-ink px-5 font-mono text-[12px] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent hover:text-[#0f0e0c]"
              >
                See the agent <span aria-hidden="true">↓</span>
              </Magnetic>
              <Magnetic
                href={`mailto:${links.email}`}
                className="inline-flex min-h-[44px] items-center gap-3 border border-rule-strong px-5 font-mono text-[12px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-ink"
              >
                Email me
              </Magnetic>
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center px-2 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-2 hover:text-ink"
              >
                <span className="link-underline">GitHub ↗</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <RunTrace />
            <p className="sr-only">
              {agent.title}: {agent.intro}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
