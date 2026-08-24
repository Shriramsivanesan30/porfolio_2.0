import { motion, useReducedMotion } from "motion/react";
import { Counter, Reveal, Section } from "./primitives";
import { challenge } from "../data/content";

const weeks = Array.from({ length: challenge.total }, (_, i) => i);

export function Challenge() {
  const reduced = useReducedMotion();

  return (
    <Section id="challenge" index="02" title="Ongoing">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="display text-6xl md:text-8xl">
              52 Weeks
              <br />
              <span className="gradient-text">52 Projects</span>
            </h2>
            <p className="mt-4 font-mono text-xs text-faint">{challenge.window}</p>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted text-pretty">
              {challenge.blurb}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex items-baseline gap-4">
              <span className="display text-7xl text-accent md:text-8xl">
                <Counter to={challenge.completed} />
              </span>
              <span className="font-mono text-sm text-faint">/ {challenge.total} complete</span>
            </div>

            <div
              role="img"
              aria-label={`${challenge.completed} of ${challenge.total} weekly projects completed`}
              className="mt-8 grid max-w-lg grid-cols-13 gap-2"
            >
              {weeks.map((week) => {
                const done = week < challenge.completed;
                return (
                  <motion.span
                    key={week}
                    initial={{ opacity: 0, scale: reduced ? 1 : 0.3 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      duration: 0.4,
                      delay: reduced ? 0 : week * 0.014,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`aspect-square rounded-[3px] ${
                      done ? "bg-accent shadow-[0_0_12px_rgba(91,140,255,0.5)]" : "bg-line"
                    }`}
                  />
                );
              })}
            </div>
          </Reveal>
        </div>

        <ul className="space-y-5">
          {challenge.highlights.map((item, i) => (
            <Reveal key={item.name} delay={0.15 + i * 0.09}>
              <li className="group relative overflow-hidden rounded-xl border border-line bg-ink-card p-7 transition-colors hover:border-hot/50">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-accent via-violet to-hot opacity-0 transition-opacity group-hover:opacity-100"
                />
                <h3 className="text-xl font-medium tracking-[-0.01em]">{item.name}</h3>
                <p className="mt-3 leading-relaxed text-muted text-pretty">{item.detail}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
