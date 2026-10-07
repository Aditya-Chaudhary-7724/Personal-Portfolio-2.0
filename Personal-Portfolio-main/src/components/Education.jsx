import { certifications, education } from '../data/content';
import SectionHeader from './SectionHeader';

function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="page py-20 lg:py-28">
      <SectionHeader id="education-title" index="05" label="Education" title="Education & certifications" />

      <div className="grid-12 gap-y-14">
        <div className="col-span-4 sm:col-span-8 lg:col-span-5">
          <p className="label mb-4">Degree</p>
          <h3 className="font-serif text-[clamp(1.8rem,3vw,2.4rem)] leading-tight">{education.school}</h3>
          <dl className="mt-6 grid grid-cols-[6rem_1fr] gap-y-2 border-t border-rule pt-4 font-mono text-[12.5px]">
            <dt className="text-ink-3">course</dt>
            <dd className="text-ink-2">{education.degree}</dd>
            <dt className="text-ink-3">graduating</dt>
            <dd className="text-ink-2">{education.period}</dd>
            <dt className="text-ink-3">cgpa</dt>
            <dd className="text-ink">{education.cgpa}</dd>
          </dl>
        </div>

        <div className="col-span-4 sm:col-span-8 lg:col-span-6 lg:col-start-7">
          <p className="label mb-4">Certifications</p>
          <ul className="border-b border-rule">
            {certifications.map((c) => (
              <li key={c.name} className="grid grid-cols-1 gap-1 border-t border-rule py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                <div>
                  <p className="text-[15.5px] text-ink">{c.name}</p>
                  <p className="text-[13.5px] text-ink-3">{c.issuer}</p>
                </div>
                <p className="font-mono text-[11.5px] text-ink-3 sm:text-right">{c.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Education;
