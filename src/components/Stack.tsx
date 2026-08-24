import { motion } from "motion/react";
import { Reveal, Section } from "./primitives";
import { useTilt } from "../hooks/useTilt";
import { education, languages, skills } from "../data/content";

function SkillCard({ group, items, index }: { group: string; items: readonly string[]; index: number }) {
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(8);

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl border border-line bg-ink-card p-6 transition-colors hover:border-violet/50"
    >
      <p className="eyebrow mb-4">{group}</p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-baseline gap-2.5 text-text">
            <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Stack() {
  return (
    <Section id="stack" index="03" title="Stack & Background">
      <Reveal>
        <h2 className="display mb-14 max-w-3xl text-6xl md:text-8xl">
          What I <span className="gradient-text">work with</span>
        </h2>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <SkillCard key={group.group} group={group.group} items={group.items} index={i} />
        ))}
      </div>

      <div className="mt-16 grid gap-10 border-t border-line/60 pt-12 md:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <div>
            <p className="eyebrow mb-4">Education</p>
            <h3 className="display text-4xl md:text-5xl">{education.degree}</h3>
            <p className="mt-3 text-muted">{education.institution}</p>
            <p className="mt-3 font-mono text-xs text-faint">
              {education.years} · CGPA {education.cgpa} · {education.note} · {education.status}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="eyebrow mb-4">Languages</p>
            <ul className="space-y-2.5">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-baseline justify-between gap-4 border-b border-line/50 pb-2">
                  <span className="text-text">{lang.name}</span>
                  <span className="font-mono text-xs text-faint">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
