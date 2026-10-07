import { motion } from 'framer-motion';
import { education, profile } from '../data/content';
import SectionHeader from './SectionHeader';

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="page py-20 lg:py-28">
      <SectionHeader
        id="about-title"
        index="01"
        label="About"
        title={['Mostly, the system', <em key="e">around the model.</em>]}
      />

      <div className="grid-12 gap-y-12">
        <figure className="col-span-2 sm:col-span-3 lg:col-span-3">
          <div className="group relative aspect-[4/5] overflow-hidden bg-raised">
            <img
              src="/img/aditya.jpg"
              alt="Aditya Chaudhary, smiling, in a red polo shirt"
              width="560"
              height="785"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top grayscale-[0.85] transition-[filter] duration-700 group-hover:grayscale-0"
            />
          </div>
          <figcaption className="label mt-3">fig. 1 — Aditya</figcaption>
        </figure>

        <div className="col-span-4 sm:col-span-8 lg:col-span-6">
          {profile.about.map((para, i) => (
            <motion.p
              key={i}
              className={`max-w-[62ch] ${
                i === 0 ? 'text-[20px] leading-[1.55] text-ink sm:text-[22px]' : 'mt-6 text-[17px] leading-relaxed text-ink-2'
              }`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <aside className="col-span-4 sm:col-span-8 lg:col-span-3" aria-label="Quick facts">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-rule pt-4 lg:grid-cols-1">
            <div>
              <dt className="label">Studying</dt>
              <dd className="mt-2 text-[15px] text-ink-2">
                {education.degree}
                <br />
                {education.period} · CGPA {education.cgpa}
              </dd>
            </div>
            <div>
              <dt className="label">Interested in</dt>
              <dd className="mt-2">
                <ul className="text-[15px] leading-7 text-ink-2">
                  {profile.interests.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}

export default About;
