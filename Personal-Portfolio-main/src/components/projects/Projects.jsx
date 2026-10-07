import { earlier } from '../../data/content';
import SectionHeader from '../SectionHeader';
import AgentPipeline from './AgentPipeline';
import FoodBridge from './FoodBridge';
import MovieNest from './MovieNest';

function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 lg:py-28">
      <div className="page">
        <SectionHeader
          id="projects-title"
          index="03"
          label="Projects"
          title={['Things I’ve built,', <em key="e">biggest first.</em>]}
        />

        <AgentPipeline />

        <div className="mt-32 border-t border-rule-strong pt-12 lg:mt-40">
          <FoodBridge />
        </div>

        <div className="mt-28 border-t border-rule-strong pt-12 lg:mt-36">
          <MovieNest />
        </div>

        <details className="group mt-24 border-y border-rule">
          <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
            <span className="label">Earlier, smaller projects ({earlier.length})</span>
            <span aria-hidden="true" className="font-mono text-[14px] text-ink-3 transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <ul className="pb-4">
            {earlier.map((p) => (
              <li key={p.title} className="border-t border-rule">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/row grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-3 sm:grid-cols-[12rem_1fr_auto]"
                >
                  <span className="text-[15.5px] text-ink">{p.title}</span>
                  <span className="order-3 col-span-2 font-mono text-[11.5px] text-ink-3 sm:order-none sm:col-span-1">
                    {p.body} · {p.stack}
                  </span>
                  <span className="font-mono text-[11.5px] text-ink-3 transition-colors group-hover/row:text-accent-ink">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}

export default Projects;
