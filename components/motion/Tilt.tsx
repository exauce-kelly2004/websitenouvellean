"use client";

import { useRef, type ReactNode } from "react";
import styles from "./motion.module.css";

/**
 * Carte inclinable en 3D : suit le pointeur (souris uniquement),
 * avec un reflet lumineux. Inactif au toucher et si l'utilisateur
 * préfère réduire les animations.
 */
export function Tilt({ children, max = 8, className }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--rx", `${(0.5 - y) * max * 2}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * max * 2}deg`);
      el.style.setProperty("--gx", `${x * 100}%`);
      el.style.setProperty("--gy", `${y * 100}%`);
      el.dataset.active = "true";
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    delete el.dataset.active;
  };

  return (
    <div className={[styles.tiltScene, className].filter(Boolean).join(" ")}>
      <div ref={ref} className={styles.tilt} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
        <span className={styles.glare} aria-hidden />
      </div>
    </div>
  );
}
