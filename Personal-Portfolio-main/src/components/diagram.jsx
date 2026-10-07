import { motion, useReducedMotion } from 'framer-motion';

// Minimal SVG primitives shared by the system diagrams.
// state: 'idle' (dimmed), 'on' (visited), 'focus' (current step).

const STROKE = {
  idle: 'var(--rule-strong)',
  on: 'var(--ink-2)',
  focus: 'var(--accent)',
};

export function Node({ x, y, w = 132, h = 40, label, sub, state = 'idle', shape = 'rect' }) {
  const focus = state === 'focus';
  const idle = state === 'idle';
  return (
    <g style={{ transition: 'opacity 0.4s' }} opacity={idle ? 0.45 : 1}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={shape === 'pill' ? h / 2 : 2}
        fill={focus ? 'var(--raised)' : 'var(--paper)'}
        stroke={STROKE[state]}
        strokeWidth={focus ? 1.5 : 1}
        strokeDasharray={shape === 'gate' ? '4 3' : undefined}
        style={{ transition: 'stroke 0.4s, fill 0.4s' }}
      />
      <text
        x={x + 12}
        y={sub ? y + h / 2 - 3 : y + h / 2 + 4}
        className="font-mono"
        fontSize="11.5"
        fill="var(--ink)"
      >
        {label}
      </text>
      {sub && (
        <text x={x + 12} y={y + h / 2 + 12} className="font-mono" fontSize="9.5" fill="var(--ink-3)">
          {sub}
        </text>
      )}
    </g>
  );
}

export function Edge({ d, state = 'idle', packet = false, dashed = false, label, labelAt }) {
  const reduce = useReducedMotion();
  const lit = state !== 'idle';
  return (
    <g>
      <path d={d} fill="none" stroke="var(--rule-strong)" strokeWidth="1" strokeDasharray={dashed ? '3 4' : undefined} />
      <motion.path
        d={d}
        fill="none"
        stroke={STROKE[state === 'idle' ? 'on' : state]}
        strokeWidth={state === 'focus' ? 1.5 : 1.1}
        strokeDasharray={dashed ? '3 4' : undefined}
        initial={false}
        animate={{ pathLength: lit ? 1 : 0, opacity: lit ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      />
      {packet && !reduce && (
        <circle r="3" fill="var(--accent)">
          <animateMotion dur="1.6s" repeatCount="indefinite" path={d} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.5 0 0.5 1" />
        </circle>
      )}
      {label && labelAt && (
        <text x={labelAt[0]} y={labelAt[1]} className="font-mono" fontSize="9.5" fill={lit ? 'var(--ink-2)' : 'var(--ink-3)'}>
          {label}
        </text>
      )}
    </g>
  );
}

