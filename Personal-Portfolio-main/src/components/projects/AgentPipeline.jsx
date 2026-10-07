import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { agent } from '../../data/content';
import { Edge, Node } from '../diagram';
import { MaskLine } from '../SectionHeader';

const STEP_KEYS = agent.steps.map((s) => s.key);

/* ---------------------------------------------------------------- diagram */

// U-shaped layout: understanding flows down the left, execution climbs the right.
// Tests sit level with the agent so the failure loop is a single short edge.
const NODES = {
  repo: { x: 65, y: 20, w: 170, label: 'repository', sub: '8+ languages' },
  parse: { x: 65, y: 86, w: 170, label: 'parser', sub: 'tree-sitter · python ast' },
  graph: { x: 5, y: 160, w: 140, label: 'knowledge graph', sub: 'neo4j' },
  index: { x: 155, y: 160, w: 140, label: 'text index', sub: 'pgvector · full-text' },
  retrieve: { x: 65, y: 234, w: 170, label: 'hybrid retrieval', sub: 'semantic · lexical · graph' },
  agent: { x: 65, y: 308, w: 170, label: 'langgraph agent', sub: 'anthropic api · stateful' },
  patch: { x: 65, y: 382, w: 170, label: 'proposed change', sub: 'patch' },
  sandbox: { x: 385, y: 382, w: 170, label: 'docker sandbox', sub: 'apply · run tests' },
  tests: { x: 385, y: 308, w: 170, label: 'tests' },
  judge: { x: 385, y: 234, w: 170, label: 'llm judge', sub: 'quality · latency' },
  gate: { x: 385, y: 160, w: 170, label: 'human approval', sub: 'interrupt / resume', shape: 'gate' },
  pr: { x: 385, y: 86, w: 170, label: 'github pull request', shape: 'pill' },
};

const EDGES = {
  'repo-parse': 'M150 64 V86',
  'parse-graph': 'M150 130 V145 H75 V160',
  'parse-index': 'M150 130 V145 H225 V160',
  'graph-retrieve': 'M75 204 V219 H150 V234',
  'index-retrieve': 'M225 204 V219 H150 V234',
  'retrieve-agent': 'M150 278 V308',
  'agent-patch': 'M150 352 V382',
  'patch-sandbox': 'M235 404 H385',
  'sandbox-tests': 'M470 382 V352',
  'tests-agent': 'M385 330 H235',
  'tests-judge': 'M470 308 V278',
  'judge-gate': 'M470 234 V204',
  'gate-pr': 'M470 160 V130',
};

// What each step switches on.
const STAGE = {
  ingest: { nodes: ['repo', 'parse'], edges: ['repo-parse'] },
  index: { nodes: ['graph', 'index'], edges: ['parse-graph', 'parse-index'] },
  retrieve: { nodes: ['retrieve'], edges: ['graph-retrieve', 'index-retrieve'] },
  reason: { nodes: ['agent', 'patch'], edges: ['retrieve-agent', 'agent-patch'] },
  execute: { nodes: ['sandbox', 'tests'], edges: ['patch-sandbox', 'sandbox-tests'] },
  evaluate: { nodes: ['judge'], edges: ['tests-judge'] },
  approve: { nodes: ['gate'], edges: ['judge-gate'] },
};

const TEST_LABEL = { idle: 'results', run: 'running…', fail: 'failing → back to agent', revise: 'revising patch…', pass: 'passing' };

function useTestLoop(active) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState('idle');
  useEffect(() => {
    if (!active) {
      setPhase((p) => (p === 'idle' ? p : 'pass'));
      return undefined;
    }
    if (reduce) {
      setPhase('pass');
      return undefined;
    }
    // run → fail → revise → run → pass, once per visit
    const seq = [
      [0, 'run'],
      [900, 'fail'],
      [1900, 'revise'],
      [2900, 'run'],
      [3600, 'pass'],
    ];
    const timers = seq.map(([t, p]) => setTimeout(() => setPhase(p), t));
    return () => timers.forEach(clearTimeout);
  }, [active, reduce]);
  return phase;
}

function statusLine(stepKey, phase, approved) {
  switch (stepKey) {
    case 'ingest':
      return 'parsing repository';
    case 'index':
      return 'building graph + index';
    case 'retrieve':
      return 'retrieving context';
    case 'reason':
      return 'planning → proposing patch';
    case 'execute':
      return { run: 'running tests', fail: 'tests failed', revise: 'revising patch', pass: 'tests passed', idle: 'running tests' }[phase];
    case 'evaluate':
      return 'scoring output';
    case 'approve':
      return approved ? 'resumed → PR opened' : 'interrupted · awaiting approval';
    default:
      return 'idle';
  }
}

function PipelineDiagram({ activeIndex, phase, approved }) {
  const activeKey = STEP_KEYS[activeIndex];

  const nodeState = (id) => {
    if (id === 'pr') return approved ? 'focus' : 'idle';
    if (id === 'agent' && activeKey === 'execute' && phase === 'revise') return 'focus';
    for (let i = 0; i < STEP_KEYS.length; i++) {
      if (STAGE[STEP_KEYS[i]].nodes.includes(id)) {
        if (i < activeIndex) return 'on';
        if (i === activeIndex) return 'focus';
        return 'idle';
      }
    }
    return 'idle';
  };

  const edgeState = (id) => {
    if (id === 'gate-pr') return approved ? 'focus' : 'idle';
    if (id === 'tests-agent') {
      if (activeKey === 'execute') return phase === 'fail' || phase === 'revise' ? 'focus' : phase === 'pass' ? 'on' : 'idle';
      return activeIndex > STEP_KEYS.indexOf('execute') ? 'on' : 'idle';
    }
    for (let i = 0; i < STEP_KEYS.length; i++) {
      if (STAGE[STEP_KEYS[i]].edges.includes(id)) {
        if (i < activeIndex) return 'on';
        if (i === activeIndex) return 'focus';
        return 'idle';
      }
    }
    return 'idle';
  };

  const tracing = activeIndex >= STEP_KEYS.indexOf('evaluate');
  const testSub = activeKey === 'execute' ? TEST_LABEL[phase] : activeIndex > STEP_KEYS.indexOf('execute') ? 'passing' : TEST_LABEL.idle;

  return (
    <svg viewBox="0 0 560 476" className="h-auto max-h-full w-full" role="img" aria-labelledby="agent-diagram-desc">
      <desc id="agent-diagram-desc">
        Pipeline: repository, parser, knowledge graph and text index, hybrid retrieval, LangGraph agent, proposed change, Docker
        sandbox, tests with a loop back to the agent on failure, LLM judge, human approval gate, GitHub pull request.
      </desc>

      {/* end-to-end tracing bracket */}
      <motion.g initial={false} animate={{ opacity: tracing ? 1 : 0 }} transition={{ duration: 0.5 }}>
        <path d="M5 440 V448 H555 V440" fill="none" stroke="var(--ink-3)" strokeDasharray="2 4" />
        <text x="280" y="466" textAnchor="middle" className="font-mono" fontSize="10" fill="var(--ink-3)">
          every step traced end to end
        </text>
      </motion.g>

      {Object.entries(EDGES).map(([id, d]) => {
        const state = edgeState(id);
        return <Edge key={id} d={d} state={state} packet={state === 'focus'} dashed={id === 'tests-agent'} />;
      })}
      <text
        x="310"
        y="322"
        textAnchor="middle"
        className="font-mono"
        fontSize="10"
        fill={edgeState('tests-agent') === 'focus' ? 'var(--accent)' : 'var(--ink-3)'}
      >
        ← on fail: revise
      </text>

      {Object.entries(NODES).map(([id, n]) => (
        <Node
          key={id}
          {...n}
          h={44}
          sub={id === 'tests' ? testSub : id === 'gate' && activeKey === 'approve' ? (approved ? 'resumed' : 'waiting…') : n.sub}
          state={nodeState(id)}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ steps */

function Step({ step, index, active, children }) {
  return (
    <li id={`agent-step-${step.key}`} data-step={index} className="relative scroll-mt-24 pl-9 lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center">
      {/* rail + node: the mobile stand-in for the diagram */}
      <span aria-hidden="true" className="absolute bottom-0 left-[5px] top-0 w-px bg-rule" />
      <span
        aria-hidden="true"
        className={`absolute left-0 top-[0.35rem] h-[11px] w-[11px] rounded-full border transition-colors duration-300 lg:top-1/2 lg:-mt-[5px] ${
          active ? 'border-accent bg-accent' : 'border-rule-strong bg-paper'
        }`}
      />
      <div className="pb-16 lg:pb-0">
        <p className="label">
          <span className={active ? 'text-accent-ink' : ''}>{String(index + 1).padStart(2, '0')}</span>
          <span className="mx-2">/</span>
          {step.label}
        </p>
        <h4 className="mt-3 font-serif text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.05]">{step.title}</h4>
        <p className="mt-4 max-w-[46ch] text-[16.5px] leading-relaxed text-ink-2">{step.body}</p>
        <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11.5px] text-ink-3">
          {step.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
        {children}
      </div>
    </li>
  );
}

function AgentPipeline() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [approved, setApproved] = useState(false);
  const listRef = useRef(null);
  const activeKey = STEP_KEYS[activeIndex];
  const phase = useTestLoop(activeKey === 'execute');

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('[data-step]');
    if (!items?.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveIndex(Number(e.target.getAttribute('data-step')));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const status = activeIndex < 0 ? 'idle' : statusLine(activeKey, phase, approved);

  return (
    <article id="agent" aria-labelledby="agent-title" className="scroll-mt-20">
      {/* --- title block */}
      <div className="grid-12 gap-y-8">
        <div className="col-span-4 sm:col-span-8 lg:col-span-3">
          <p className="label">
            <span className="text-accent-ink">03.1</span> / Featured
          </p>
          <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11.5px] text-ink-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            {agent.status} · {agent.period}
          </p>
        </div>
        <div className="col-span-4 sm:col-span-8 lg:col-span-9">
          <h3 id="agent-title" className="font-serif text-[clamp(2.8rem,7vw,6.2rem)] leading-[0.92] tracking-[-0.02em]">
            <MaskLine>AI Software</MaskLine>
            <MaskLine delay={0.08}>
              <em>Engineering Agent</em>
            </MaskLine>
          </h3>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-3">{agent.subtitle}</p>
          <p className="mt-8 max-w-[58ch] text-[19px] leading-[1.55] text-ink">{agent.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={agent.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 border border-rule-strong px-5 font-mono text-[12px] uppercase tracking-[0.12em] hover:border-ink"
            >
              Repository ↗
            </a>
            <p className="font-mono text-[11.5px] leading-6 text-ink-3">{agent.stack.join(' · ')}</p>
          </div>
        </div>
      </div>

      {/* --- the story: steps on the left, the system on the right */}
      <div className="mt-20 grid-12 lg:mt-24">
        <ol ref={listRef} className="col-span-4 sm:col-span-8 lg:col-span-5 lg:py-[10vh]">
          {agent.steps.map((step, i) => (
            <Step key={step.key} step={step} index={i} active={i === activeIndex}>
              {step.key === 'execute' && (
                <p className="mt-5 font-mono text-[12px] text-ink-2 lg:hidden" aria-hidden="true">
                  tests: {activeKey === 'execute' ? TEST_LABEL[phase] : 'fail → revise → pass'}
                </p>
              )}
              {step.key === 'approve' && (
                <div className="mt-7 border border-rule p-4">
                  <p className="font-mono text-[12px] text-ink-2" aria-live="polite">
                    <span className="text-ink-3">graph.state ·</span>{' '}
                    {approved ? 'resumed — change applied, pull request opened' : 'interrupted — waiting for a human'}
                  </p>
                  <div className="mt-4 flex gap-3">
                    {!approved ? (
                      <button
                        type="button"
                        onClick={() => setApproved(true)}
                        className="min-h-[44px] bg-ink px-5 font-mono text-[12px] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-accent hover:text-[#0f0e0c]"
                      >
                        Approve change
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setApproved(false)}
                        className="min-h-[44px] border border-rule-strong px-5 font-mono text-[12px] uppercase tracking-[0.12em] hover:border-ink"
                      >
                        Run again
                      </button>
                    )}
                  </div>
                  <p className="mt-3 font-mono text-[10.5px] text-ink-3">This is a demo of the gate, not a live agent.</p>
                </div>
              )}
            </Step>
          ))}
        </ol>

        <div className="hidden lg:col-span-7 lg:col-start-6 lg:block">
          <div className="sticky top-[4.5rem] flex h-[calc(100vh-5.5rem)] flex-col border-l border-rule pl-8">
            <div className="flex items-baseline justify-between border-b border-rule py-3">
              <ol className="flex gap-3 font-mono text-[10.5px] uppercase tracking-[0.12em]">
                {agent.steps.map((s, i) => (
                  <li key={s.key}>
                    <a
                      href={`#agent-step-${s.key}`}
                      className={`transition-colors ${
                        i === activeIndex ? 'text-accent-ink' : i < activeIndex ? 'text-ink-2' : 'text-ink-3'
                      } hover:text-ink`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex min-h-0 flex-1 items-center justify-center py-4">
              <PipelineDiagram activeIndex={activeIndex} phase={phase} approved={approved} />
            </div>
            <div className="flex items-baseline justify-between border-t border-rule py-3 font-mono text-[11px]">
              <span className="text-ink-3">state</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={status}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="text-ink"
                >
                  {status}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default AgentPipeline;
