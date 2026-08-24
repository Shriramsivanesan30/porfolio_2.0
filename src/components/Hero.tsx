import { lazy, Suspense, useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll } from "motion/react";
import { ParticleField } from "./ParticleField";
import { Portrait } from "./Portrait";
import { useParallax } from "../hooks/useTilt";
import {
  ArrowUpRightIcon,
  CodeIcon,
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
} from "./Icons";
import { heroCards, heroStack, profile } from "../data/content";

const Scene3D = lazy(() => import("./Scene3D").then((m) => ({ default: m.Scene3D })));

export function Hero({ visitorName }: { visitorName: string }) {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const yCopy = useParallax(scrollY, 110);
  const yPortrait = useParallax(scrollY, 25);
  const yScene = useParallax(scrollY, 170);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerX.set(e.clientX / window.innerWidth - 0.5);
      pointerY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const socials = [
    { label: "GitHub", href: profile.github, Icon: GitHubIcon, external: true },
    { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon, external: true },
    { label: "Email", href: `mailto:${profile.email}`, Icon: MailIcon },
    { label: "Phone", href: `tel:${profile.phone.replace(/\s/g, "")}`, Icon: PhoneIcon },
  ];

  return (
    <section id="top" className="relative min-h-svh overflow-hidden px-6 pt-28 pb-12 md:px-10 lg:pt-32">
      <div aria-hidden="true" className="absolute inset-0 z-0 opacity-45">
        <ParticleField density={0.00006} />
      </div>

      {/* Outlined ghost word, anchored to the bottom-right behind the figure. */}
      <span
        aria-hidden="true"
        className="ghost-type display absolute right-[-2%] bottom-2 z-[15] hidden text-[13vw] leading-none select-none lg:block"
      >
        Developer
      </span>

      {/* WebGL core, dimmed and tucked behind the portrait. */}
      <motion.div
        style={{ y: yScene }}
        aria-hidden="true"
        className="pointer-events-none absolute top-[30%] right-[8%] z-10 hidden h-[520px] w-[520px] opacity-45 lg:block"
      >
        <Suspense fallback={null}>
          <Scene3D reduced={!!reduced} />
        </Suspense>
      </motion.div>

      <Portrait pointerX={pointerX} pointerY={pointerY} y={yPortrait} reduced={!!reduced} />

      {/* Floating credential cards. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-30 hidden lg:block">
        {heroCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.75 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute flex items-center gap-3 rounded-2xl border border-line/70 bg-ink-raised/70 px-4 py-3 backdrop-blur-md"
            style={{
              top: i === 0 ? "22%" : "70%",
              right: i === 0 ? "5%" : "12%",
              animation: reduced ? undefined : `float ${8 + i * 1.6}s ease-in-out ${i * 0.8}s infinite`,
            }}
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/12 text-accent">
              <CodeIcon />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-medium text-text">{card.title}</span>
              <span className="block text-xs text-muted">{card.detail}</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Left copy rail. */}
      <motion.div
        style={{ y: yCopy }}
        className="relative z-30 mx-auto flex min-h-[74svh] max-w-7xl flex-col justify-center"
      >
        <div className="max-w-2xl">
          <motion.p {...fade(0.1)} className="mb-5 text-lg text-muted">
            {visitorName ? (
              <>
                Hi <span className="text-accent">{visitorName}</span>, I'm Shriram
              </>
            ) : (
              <>Hi, I'm Shriram</>
            )}{" "}
            <span className="inline-block">👋</span>
          </motion.p>

          <motion.h1
            {...fade(0.2)}
            className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl"
          >
            {profile.headline.lead}
            <br />
            <span className="text-accent">{profile.headline.accent}</span>
          </motion.h1>

          <motion.p
            {...fade(0.3)}
            className="mt-7 max-w-lg text-lg leading-relaxed text-muted text-pretty"
          >
            {profile.subhead}
          </motion.p>

          <motion.div {...fade(0.4)} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-ink transition-opacity hover:opacity-88"
            >
              View my work
              <ArrowUpRightIcon className="h-[17px] w-[17px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-raised/60 px-6 py-3.5 font-medium text-text backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
            >
              Download CV
              <DownloadIcon className="h-[17px] w-[17px]" />
            </a>
          </motion.div>

          {/* Stack chips. */}
          <motion.ul {...fade(0.5)} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            {heroStack.map((tech) => (
              <li key={tech} className="flex items-center gap-2.5">
                <span className="grid h-7 w-7 place-items-center rounded-md border border-line bg-ink-raised font-mono text-[11px] text-accent">
                  {tech.slice(0, 2)}
                </span>
                <span className="text-sm text-muted">{tech}</span>
              </li>
            ))}
          </motion.ul>

          <motion.ul {...fade(0.6)} className="mt-12 flex items-center gap-3">
            {socials.map(({ label, href, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-raised/60 text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
