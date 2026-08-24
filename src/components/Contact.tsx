import { Reveal } from "./primitives";
import { profile } from "../data/content";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", value: "shriram-sivanesan", href: profile.linkedin, external: true },
  { label: "GitHub", value: "shriramsivanesan30", href: profile.github, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="relative border-t border-line/60 px-6 py-28 md:px-10 md:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "radial-gradient(800px circle at 50% 100%, rgba(91,140,255,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow mb-4">[ 05 — Contact ]</p>
          <h2 className="display max-w-4xl text-7xl md:text-[9rem]">
            Let's build
            <br />
            <span className="gradient-text">something real</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted text-pretty">
            Based in {profile.location} and open to full stack roles. The fastest way to reach me is
            email.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-16 grid gap-x-12 gap-y-8 border-t border-line/60 pt-12 sm:grid-cols-2">
            {channels.map((channel) => (
              <div key={channel.label}>
                <dt className="eyebrow mb-3">{channel.label}</dt>
                <dd>
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                    className="text-xl text-text underline decoration-line underline-offset-[8px] transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {channel.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line/60 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-faint">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-[11px] text-faint">
          React · Three.js · Motion · Tailwind
        </p>
      </div>
    </footer>
  );
}
