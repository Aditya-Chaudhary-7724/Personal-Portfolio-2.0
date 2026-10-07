import { motion } from 'framer-motion';
import { movienest } from '../../data/content';

const ease = [0.2, 0.7, 0.2, 1];

function MovieNest() {
  return (
    <article id="movienest" aria-labelledby="movienest-title" className="scroll-mt-20">
      <div className="grid-12 gap-y-6">
        <p className="label col-span-4 sm:col-span-8 lg:col-span-3">
          <span className="text-accent-ink">03.3</span> / {movienest.period}
        </p>
        <div className="col-span-4 sm:col-span-8 lg:col-span-9">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h3 id="movienest-title" className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] leading-none tracking-[-0.01em]">
              MovieNest
            </h3>
            <a
              href={movienest.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] uppercase tracking-[0.12em] text-ink-2 hover:text-ink"
            >
              <span className="link-underline">Live app ↗</span>
            </a>
          </div>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-3">{movienest.subtitle}</p>
          <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-ink-2">{movienest.intro}</p>

          {/* the recommender, as a two-phase pipeline */}
          <ol className="relative mt-10 grid grid-cols-1 sm:grid-cols-4" aria-label="Recommendation pipeline">
            <motion.span
              aria-hidden="true"
              className="absolute left-0 right-0 top-0 hidden h-px origin-left bg-accent sm:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 1.4, ease }}
            />
            {movienest.pipeline.map((stage, i) => (
              <motion.li
                key={stage.key}
                className="border-l border-rule py-4 pl-4 pr-3 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '0px 0px -15% 0px' }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.3 }}
              >
                <p className="font-mono text-[11px] text-ink-3">
                  {String(i + 1).padStart(2, '0')}
                  {i < movienest.pipeline.length - 1 && <span className="ml-2 hidden sm:inline">→</span>}
                </p>
                <p className="mt-2 text-[16px] font-medium">{stage.label}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{stage.body}</p>
              </motion.li>
            ))}
          </ol>

          <div className="mt-8 grid gap-8 border-t border-rule pt-6 md:grid-cols-2">
            <div>
              <p className="label mb-3">Similarity signals (no ML APIs)</p>
              <ul className="font-mono text-[12px] leading-7 text-ink-2">
                {movienest.signals.map((s) => (
                  <li key={s}>
                    <span className="mr-2 text-ink-3">+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label mb-3">Shape of a “why” explanation</p>
              <div className="border border-rule p-4 font-mono text-[12px] leading-6">
                <p className="text-ink-3">recommended because</p>
                <p className="text-ink">
                  same director <span className="text-ink-3">·</span> genre overlap <span className="text-ink-3">·</span> shared
                  keywords
                </p>
              </div>
              <p className="mt-4 text-[14px] text-ink-3">{movienest.tests}</p>
            </div>
          </div>
          <p className="mt-6 font-mono text-[11.5px] leading-6 text-ink-3">{movienest.stack.join(' · ')}</p>
        </div>
      </div>
    </article>
  );
}

export default MovieNest;
