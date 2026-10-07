import { motion } from 'framer-motion';

const ease = [0.2, 0.7, 0.2, 1];

// Masked line reveal: the text slides up from behind its own baseline.
export function MaskLine({ children, delay = 0, className = '' }) {
  return (
    <span className={`block overflow-hidden pb-[0.08em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 0.8, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Section opener: a rule that draws across, a mono index on the left, a serif title.
function SectionHeader({ index, label, title, aside, id }) {
  return (
    <header className="mb-14 lg:mb-20">
      <motion.div
        aria-hidden="true"
        className="h-px origin-left bg-rule-strong"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
      />
      <div className="grid-12 pt-5">
        <p className="label col-span-4 mb-6 sm:col-span-8 lg:col-span-3 lg:mb-0">
          <span className="text-accent-ink">{index}</span>
          <span className="mx-2">/</span>
          {label}
        </p>
        <div className="col-span-4 sm:col-span-8 lg:col-span-9">
          <h2 id={id} className="font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] tracking-[-0.01em]">
            {(Array.isArray(title) ? title : [title]).map((line, i) => (
              <MaskLine key={i} delay={i * 0.08}>
                {line}
              </MaskLine>
            ))}
          </h2>
          {aside && <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">{aside}</p>}
        </div>
      </div>
    </header>
  );
}

export default SectionHeader;
