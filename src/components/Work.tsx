import { motion } from "motion/react";
import { Reveal, Section, Tag } from "./primitives";
import { useTilt } from "../hooks/useTilt";
import { work, type Work as WorkItem } from "../data/content";

function ProjectCard({ project, index }: { project: WorkItem; index: number }) {
  const { rotateX, rotateY, onPointerMove, onPointerLeave } = useTilt(7);

  return (
    <motion.article
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-ink-card p-7 transition-colors hover:border-accent/60 md:p-9"
    >
      {/* Glow that follows the hover state. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(400px circle at 50% 0%, rgba(91,140,255,0.10), transparent 70%)" }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span className="font-mono text-[11px] tracking-widest text-faint">
          PROJ. {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-live" />
          <span className="font-mono text-[11px] tracking-wider text-faint uppercase">
            {project.status}
          </span>
        </span>
      </div>

      <h3 className="display relative mt-6 text-4xl transition-colors group-hover:text-accent md:text-5xl">
        {project.name}
      </h3>
      <p className="relative mt-2 text-lg text-text">{project.subtitle}</p>
      <p className="relative mt-4 flex-1 leading-relaxed text-muted text-pretty">
        {project.description}
      </p>

      <div className="relative mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      {project.href && (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer noopener"
          className="relative mt-6 inline-flex items-center gap-2 font-mono text-xs text-accent transition-opacity hover:opacity-75"
        >
          {project.hrefLabel}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            ↗
          </span>
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      )}
    </motion.article>
  );
}

export function Work() {
  return (
    <Section id="work" index="01" title="Selected Work">
      <Reveal>
        <h2 className="display mb-4 max-w-3xl text-6xl md:text-8xl">
          Three platforms,
          <br />
          <span className="gradient-text">all in real use</span>
        </h2>
        <p className="mb-14 max-w-xl text-lg text-muted text-pretty">
          Not course projects — deployed systems that staff and administrators depend on daily.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-3">
        {work.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
