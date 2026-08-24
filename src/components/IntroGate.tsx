import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "../data/content";

/**
 * Name-capture overlay shown once per session. Purely cosmetic: the name is
 * kept in sessionStorage and never sent anywhere.
 */
export function IntroGate({ onDone }: { onDone: (name: string) => void }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const stored = sessionStorage.getItem("visitorName");
    if (stored) {
      onDone(stored);
      return;
    }
    setOpen(true);
    const t = setTimeout(() => inputRef.current?.focus(), 650);
    return () => clearTimeout(t);
  }, [onDone]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = value.trim().slice(0, 24);
    sessionStorage.setItem("visitorName", name);
    onDone(name);
    setOpen(false);
  };

  const skip = () => {
    sessionStorage.setItem("visitorName", "");
    onDone("");
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gate"
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-90 flex items-center justify-center bg-ink px-6"
        >
          <div className="grid-field absolute inset-0 opacity-60" />

          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 26, scale: reduced ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md"
          >
            <p className="eyebrow mb-5 text-accent">Welcome to my universe</p>

            <h1 className="display mb-3 text-6xl md:text-7xl">
              Before we<br />
              <span className="gradient-text">begin</span>
            </h1>

            <p className="mb-8 text-muted">
              I'm {profile.shortName}. What should I call you?
            </p>

            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="visitor-name" className="sr-only">
                Your name
              </label>
              <input
                id="visitor-name"
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Your name"
                autoComplete="off"
                className="flex-1 rounded-full border border-line bg-ink-raised px-5 py-3 text-text placeholder:text-faint focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-text px-6 py-3 font-medium text-ink transition-opacity hover:opacity-85"
              >
                Continue
              </button>
            </form>

            <button
              type="button"
              onClick={skip}
              className="mt-5 font-mono text-xs text-faint underline underline-offset-4 transition-colors hover:text-text"
            >
              skip →
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
