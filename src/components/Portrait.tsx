import { motion, useSpring, useTransform, type MotionValue } from "motion/react";

/**
 * Right-hand hero portrait. Bottom-aligned and bleeding to the page edge, lit
 * from behind so the greyscale figure separates from the dark canvas.
 */
export function Portrait({
  pointerX,
  pointerY,
  y,
  reduced,
}: {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  y: MotionValue<number>;
  reduced: boolean;
}) {
  const driftX = useSpring(useTransform(pointerX, [-0.5, 0.5], [reduced ? 0 : 12, reduced ? 0 : -12]), {
    stiffness: 90,
    damping: 20,
  });
  const driftY = useSpring(useTransform(pointerY, [-0.5, 0.5], [reduced ? 0 : 9, reduced ? 0 : -9]), {
    stiffness: 90,
    damping: 20,
  });

  return (
    <motion.div
      style={{ x: driftX, y }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute right-0 bottom-0 z-20 h-[58svh] w-[76%] sm:h-[70svh] sm:w-[58%] lg:h-[92svh] lg:w-[47%]"
    >
      {/* Key light behind the subject. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -translate-y-[6%] scale-[0.86] rounded-full opacity-[0.22] blur-[90px]"
        style={{ background: "radial-gradient(circle at 50% 38%, #ffffff 0%, #a3e635 38%, transparent 70%)" }}
      />

      <motion.div
        style={{ y: driftY }}
        initial={{ clipPath: reduced ? "inset(0% 0 0% 0)" : "inset(100% 0 0% 0)" }}
        animate={{ clipPath: "inset(0% 0 0% 0)" }}
        transition={{ duration: 1.15, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full"
      >
        <img
          src="/shriram.webp"
          width={735}
          height={869}
          alt="Shriram Sivanesan"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-contain object-bottom brightness-[1.06] contrast-[1.12] grayscale"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, #000 74%, rgba(0,0,0,0.55) 90%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, #000 74%, rgba(0,0,0,0.55) 90%, transparent 100%)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
