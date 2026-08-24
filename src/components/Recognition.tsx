import { Reveal, Section } from "./primitives";
import { recognition } from "../data/content";

export function Recognition() {
  return (
    <Section id="recognition" index="04" title="Recognition">
      <Reveal>
        <div className="relative mb-12 overflow-hidden rounded-2xl border border-violet/40 p-8 md:p-12">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60"
            style={{
              background:
                "radial-gradient(600px circle at 15% 0%, rgba(155,107,255,0.16), transparent 65%)",
            }}
          />
          <div className="relative">
            <p className="eyebrow mb-4 text-violet">Featured</p>
            <h2 className="display text-5xl md:text-7xl">{recognition.featured.title}</h2>
            <p className="mt-4 text-lg text-muted">{recognition.featured.detail}</p>
          </div>
        </div>
      </Reveal>

      <ul className="divide-y divide-line/60 border-y border-line/60">
        {recognition.awards.map((award, i) => (
          <Reveal key={`${award.title}-${award.event}`} delay={i * 0.05}>
            <li className="group flex flex-wrap items-baseline gap-x-6 gap-y-1 py-5 transition-colors hover:bg-ink-raised/50">
              <span className="display w-16 shrink-0 text-2xl text-hot">{award.place}</span>
              <span className="flex-1 text-lg text-text">{award.title}</span>
              <span className="font-mono text-xs text-faint">{award.event}</span>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={0.1}>
        <div className="mt-12">
          <p className="eyebrow mb-5">Certifications</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {recognition.certifications.map((cert) => (
              <li
                key={cert}
                className="rounded-lg border border-line bg-ink-card px-4 py-3 text-sm text-muted"
              >
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
