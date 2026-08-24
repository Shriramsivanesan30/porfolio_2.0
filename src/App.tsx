import { useCallback, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { Challenge } from "./components/Challenge";
import { Stack } from "./components/Stack";
import { Recognition } from "./components/Recognition";
import { Contact, Footer } from "./components/Contact";
import { IntroGate } from "./components/IntroGate";
import { Cursor } from "./components/Cursor";
import { Marquee } from "./components/Marquee";
import { profile } from "./data/content";

export default function App() {
  const [visitorName, setVisitorName] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  const handleDone = useCallback((name: string) => setVisitorName(name), []);

  return (
    <>
      <IntroGate onDone={handleDone} />
      <Cursor />

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-accent via-violet to-hot"
      />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99] focus:rounded-full focus:bg-text focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Skip to content
      </a>

      <Nav />

      <main>
        <Hero visitorName={visitorName} />

        <Marquee
          items={[profile.name.toUpperCase(), "FULL STACK", "AI AGENTS", "SHIPPED"]}
          className="border-y border-line/60 py-4"
        />

        <Work />
        <Challenge />

        <Marquee
          items={["52 WEEKS", "52 PROJECTS", "ONE PER WEEK"]}
          reverse
          className="border-y border-line/60 py-4"
        />

        <Stack />
        <Recognition />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
