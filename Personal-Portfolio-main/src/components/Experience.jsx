import { useState } from 'react';
import { motion } from 'framer-motion';
import { otherExperience, samsung } from '../data/content';
import SectionHeader, { MaskLine } from './SectionHeader';
import { Edge, Node } from './diagram';
import { handleTabKeys } from '../lib/tabs';

const ease = [0.2, 0.7, 0.2, 1];

/* Three paths through the guardrail. Each lights a subset of the diagram. */
const LANES = [
  {
    key: 'prompt',
    label: 'Prompt in',
    body: 'Every prompt goes to the shared ModernBERT classifier before the LLM sees it. Jailbreaks, prompt injection and evasion attempts are flagged there.',
    nodes: ['prompt', 'model', 'llm', 'block'],
    edges: ['p-m', 'm-llm', 'm-block'],
  },
  {
    key: 'attachment',
    label: 'Attachment in',
    body: 'TXT, PDF and DOCX files are split into chunks, and each chunk goes through the same classifier instance. A poisoned instruction hidden deep inside a long document still gets checked.',
    nodes: ['attach', 'chunk', 'model', 'block'],
    edges: ['a-c', 'c-m', 'm-block'],
  },
  {
    key: 'response',
    label: 'Response out',
    body: 'On the way out, Microsoft Presidio with spaCy NER anonymizes personal information before the response reaches the user.',
    nodes: ['llm', 'pii', 'out'],
    edges: ['llm-pii', 'pii-out'],
  },
];

const EDGES = {
  'p-m': 'M152 60 H262 V110 H340',
  'a-c': 'M152 160 H190',
  'c-m': 'M322 160 H331 V130 H340',
  'm-llm': 'M520 120 H600',
  'm-block': 'M520 104 H560 V40 H600',
  'llm-pii': 'M666 140 V200 H520',
  'pii-out': 'M520 236 H560 V250 H600',
};

function GuardrailDiagram({ lane }) {
  const active = LANES.find((l) => l.key === lane);
  const nodeState = (k) => (active.nodes.includes(k) ? (k === 'model' || k === 'pii' || k === 'chunk' ? 'focus' : 'on') : 'idle');
  const edgeState = (k) => (active.edges.includes(k) ? 'focus' : 'idle');

  return (
    <svg viewBox="0 0 760 290" className="h-auto w-full" role="img" aria-labelledby="guardrail-desc">
      <desc id="guardrail-desc">
        Guardrail architecture: user prompts and chunked attachments both go through one shared ModernBERT classifier, which
        either blocks them or passes them to the LLM. LLM responses pass through Presidio and spaCy PII anonymization before
        reaching the user.
      </desc>
      {Object.entries(EDGES).map(([k, d]) => (
        <Edge key={k} d={d} state={edgeState(k)} packet={edgeState(k) === 'focus'} dashed={k === 'm-block'} />
      ))}
      <text x="566" y="54" className="font-mono" fontSize="9.5" fill="var(--ink-3)">unsafe</text>
      <text x="530" y="114" className="font-mono" fontSize="9.5" fill="var(--ink-3)">safe</text>

      <Node x={20} y={40} label="user prompt" state={nodeState('prompt')} />
      <Node x={20} y={140} label="attachment" sub="txt · pdf · docx" state={nodeState('attach')} />
      <Node x={190} y={140} label="chunker" sub="scan every chunk" state={nodeState('chunk')} />
      <Node x={340} y={90} w={180} h={64} label="ModernBERT classifier" sub="one shared instance · CPU" state={nodeState('model')} />
      <Node x={600} y={20} w={132} label="flag / block" state={nodeState('block')} shape="gate" />
      <Node x={600} y={100} w={132} label="LLM" state={nodeState('llm')} />
      <Node x={340} y={180} w={180} h={64} label="Presidio + spaCy" sub="PII anonymization" state={nodeState('pii')} />
      <Node x={600} y={230} w={132} label="response → user" state={nodeState('out')} shape="pill" />
    </svg>
  );
}

function Metric({ value, unit, label, note, i }) {
  return (
    <div className="border-t border-rule-strong pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 first:sm:border-l-0 first:sm:pl-0">
      <p className="label">{label}</p>
      <p className="mt-3 font-serif text-[clamp(4.2rem,9vw,8.5rem)] leading-[0.85] tracking-[-0.03em]">
        <MaskLine delay={i * 0.1}>
          {value}
          <span className="ml-1 align-top font-mono text-[0.18em] tracking-normal text-accent-ink">{unit}</span>
        </MaskLine>
      </p>
      <p className="mt-4 max-w-[28ch] font-mono text-[12px] leading-relaxed text-ink-2">{note}</p>
    </div>
  );
}

function Bar({ label, share, value, highlight }) {
  return (
    <div className="grid grid-cols-[7rem_1fr_4.5rem] items-center gap-3 sm:grid-cols-[10rem_1fr_5rem] sm:gap-4">
      <span className={`font-mono text-[11.5px] ${highlight ? 'text-ink' : 'text-ink-3'}`}>{label}</span>
      <div className="h-5">
        <motion.div
          className={`h-full origin-left ${highlight ? 'bg-accent' : 'bg-rule-strong'}`}
          style={{ width: `${share}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: highlight ? 0.2 : 0 }}
        />
      </div>
      <span className="font-mono text-[11px] text-ink-2">{value}</span>
    </div>
  );
}

function Experience() {
  const [lane, setLane] = useState('prompt');
  const current = LANES.find((l) => l.key === lane);

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 lg:py-28">
      <div className="page">
        <SectionHeader
          id="experience-title"
          index="02"
          label="Experience"
          title={['Samsung PRISM:', <em key="e">guardrails on a CPU.</em>]}
        />

        {/* --- who / what */}
        <div className="grid-12 gap-y-10">
          <dl className="col-span-4 grid grid-cols-2 gap-x-6 gap-y-5 self-start sm:col-span-8 sm:grid-cols-4 lg:col-span-3 lg:grid-cols-1">
            {[
              ['Organisation', `${samsung.org} (${samsung.orgShort})`],
              ['Role', samsung.role],
              ['Period', samsung.period],
              ['Setting', `${samsung.location} · ${samsung.program}`],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="label">{k}</dt>
                <dd className="mt-1.5 text-[14.5px] leading-snug text-ink-2">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="col-span-4 sm:col-span-8 lg:col-span-8 lg:col-start-5">
            <p className="font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-[1.12]">{samsung.headline}</p>
            <p className="mt-6 max-w-[62ch] text-[17px] leading-relaxed text-ink-2">{samsung.summary}</p>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[12px] text-ink-2">
              <span className="label mr-1">Detects</span>
              {samsung.attacks.map((a, i) => (
                <span key={a} className="flex items-center gap-3">
                  {i > 0 && <span className="text-ink-3" aria-hidden="true">·</span>}
                  {a.toLowerCase()}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* --- the numbers */}
        <div className="mt-20 grid gap-10 sm:grid-cols-3 sm:gap-0 lg:mt-28">
          {samsung.metrics.map((m, i) => (
            <Metric key={m.label} {...m} i={i} />
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-rule pt-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label mb-5">Inference latency, relative</p>
            <div className="space-y-3">
              <Bar label="this guardrail" share={33} value="150 ms" highlight />
              <Bar label="LLaMA Guard 2 (7B)" share={100} value="~3×" />
            </div>
          </div>
          <div>
            <p className="label mb-5">Peak memory, relative</p>
            <div className="space-y-3">
              <Bar label="shared singleton" share={40} value="~60% less" highlight />
              <Bar label="multi-model pipeline" share={100} value="baseline" />
            </div>
          </div>
        </div>

        {/* --- architecture */}
        <div className="mt-24 grid-12 gap-y-8 lg:mt-32">
          <div className="col-span-4 sm:col-span-8 lg:col-span-4">
            <p className="label">How a request moves through it</p>
            <div role="tablist" aria-label="Guardrail paths" className="mt-5 flex flex-wrap gap-2 lg:flex-col lg:items-start">
              {LANES.map((l) => (
                <button
                  key={l.key}
                  role="tab"
                  type="button"
                  id={`lane-${l.key}`}
                  aria-selected={lane === l.key}
                  aria-controls="lane-panel"
                  tabIndex={lane === l.key ? 0 : -1}
                  onClick={() => setLane(l.key)}
                  onKeyDown={(e) => handleTabKeys(e, LANES.map((x) => x.key), lane, setLane, 'lane-')}
                  className={`min-h-[40px] border px-4 font-mono text-[12px] tracking-wide transition-colors ${
                    lane === l.key ? 'border-accent text-ink' : 'border-rule text-ink-3 hover:border-rule-strong hover:text-ink'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <div id="lane-panel" role="tabpanel" aria-labelledby={`lane-${lane}`} className="mt-6 min-h-[7.5rem]">
              <motion.p
                key={lane}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="max-w-[44ch] text-[16px] leading-relaxed text-ink-2"
              >
                {current.body}
              </motion.p>
            </div>
          </div>
          <div className="col-span-4 hidden sm:col-span-8 sm:block lg:col-span-8">
            <GuardrailDiagram lane={lane} />
          </div>
        </div>

        {/* --- what I did, in more detail */}
        <ol className="mt-20 grid gap-x-12 gap-y-10 border-t border-rule pt-10 md:grid-cols-2">
          {samsung.details.map((d, i) => (
            <li key={d.title} className="grid grid-cols-[2.5rem_1fr]">
              <span className="font-mono text-[12px] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-[17px] font-medium">{d.title}</h3>
                <p className="mt-2 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-2">{d.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col gap-4 border-t border-rule pt-6 md:flex-row md:items-baseline md:justify-between">
          <p className="text-[15.5px] text-ink-2">{samsung.team}</p>
          <p className="font-mono text-[11.5px] text-ink-3">{samsung.stack.join(' · ')}</p>
        </div>

        {/* --- the rest, deliberately quieter */}
        <div className="mt-24">
          <p className="label mb-4">Also</p>
          <ul>
            {otherExperience.map((e) => (
              <li key={e.org} className="grid-12 gap-y-2 border-t border-rule py-6 last:border-b">
                <span className="col-span-4 font-mono text-[12px] text-ink-3 sm:col-span-2 lg:col-span-3">{e.period}</span>
                <div className="col-span-4 sm:col-span-6 lg:col-span-4">
                  <h3 className="text-[16px] font-medium">{e.role}</h3>
                  <p className="text-[14.5px] text-ink-3">{e.org}</p>
                </div>
                {e.body && (
                  <p className="col-span-4 text-[15px] leading-relaxed text-ink-2 sm:col-span-6 sm:col-start-3 lg:col-span-5 lg:col-start-8">
                    {e.body}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Experience;
