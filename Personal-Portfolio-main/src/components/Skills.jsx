import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { skills, workIndex } from '../data/content';
import { handleTabKeys } from '../lib/tabs';
import SectionHeader from './SectionHeader';

const KEYS = skills.map((s) => s.key);

function Skills() {
  const [active, setActive] = useState(KEYS[0]);
  const group = skills.find((s) => s.key === active);

  return (
    <section id="skills" aria-labelledby="skills-title" className="page py-20 lg:py-28">
      <SectionHeader
        id="skills-title"
        index="04"
        label="Skills"
        title={['Tools, and where', <em key="e">they show up.</em>]}
        aside="Pick a category. Next to each tool is the work on this page that uses it."
      />

      <div className="grid-12 gap-y-8">
        <div
          role="tablist"
          aria-label="Skill categories"
          className="col-span-4 flex gap-x-5 overflow-x-auto pb-2 no-scrollbar [mask-image:linear-gradient(to_right,black_80%,transparent)] lg:[mask-image:none] sm:col-span-8 lg:col-span-5 lg:flex-col lg:overflow-visible lg:pb-0"
        >
          {skills.map((s, i) => {
            const selected = s.key === active;
            return (
              <button
                key={s.key}
                id={`skill-tab-${s.key}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls="skill-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(s.key)}
                onMouseEnter={() => setActive(s.key)}
                onKeyDown={(e) => handleTabKeys(e, KEYS, active, setActive, 'skill-tab-')}
                className={`group flex shrink-0 items-baseline gap-3 py-2 text-left transition-colors lg:border-t lg:border-rule lg:py-3 ${
                  selected ? 'text-ink' : 'text-ink-3 hover:text-ink-2'
                }`}
              >
                <span className={`font-mono text-[11px] ${selected ? 'text-accent-ink' : ''}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`whitespace-nowrap font-serif text-[1.6rem] leading-none transition-transform duration-300 lg:text-[clamp(1.8rem,2.6vw,2.4rem)] ${
                    selected ? 'italic lg:translate-x-2' : ''
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id="skill-panel"
          role="tabpanel"
          aria-labelledby={`skill-tab-${active}`}
          className="col-span-4 min-h-[22rem] sm:col-span-8 lg:col-span-6 lg:col-start-7"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="border-b border-rule"
            >
              {group.items.map((item, i) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.025 }}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-t border-rule py-3"
                >
                  <span className="text-[16.5px] text-ink">{item.name}</span>
                  <span className="flex flex-wrap justify-end gap-x-3 font-mono text-[11px] text-ink-3">
                    {(item.usedIn ?? []).map((id) => (
                      <a key={id} href={workIndex[id].href} className="hover:text-accent-ink">
                        {workIndex[id].label}
                      </a>
                    ))}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Skills;
