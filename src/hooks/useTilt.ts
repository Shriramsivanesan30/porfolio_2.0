import { useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Pointer-driven 3D card tilt. Lives outside the component file so React Fast
 * Refresh keeps working (a module may export components or hooks, not both).
 */
export function useTilt(max = 9) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 220,
    damping: 22,
  });

  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, onPointerMove, onPointerLeave, reduced };
}

/** Maps page scroll to a translateY, for parallax layers. */
export function useParallax(scrollY: MotionValue<number>, distance: number) {
  const reduced = useReducedMotion();
  return useTransform(scrollY, [0, 1200], [0, reduced ? 0 : distance]);
}
