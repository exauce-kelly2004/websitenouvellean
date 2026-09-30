"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import styles from "./lunar.module.css";

/**
 * Rue de lanternes en 3D (CSS) : deux rangées qui s'enfoncent vers
 * un pavillon lumineux. La caméra avance quand on fait défiler la page
 * et suit légèrement le pointeur.
 */

// Positions déterministes (pas d'aléatoire : rendu identique serveur/client).
const ROWS = Array.from({ length: 14 }, (_, i) => i);
const jitter = (i: number, k: number) => ((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1 + 1) % 1;

export function LanternStreet() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const host = root.closest("section") as HTMLElement | null;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!host) return;
        const rect = host.getBoundingClientRect();
        const travel = Math.max(1, rect.height - window.innerHeight);
        const p = Math.min(1, Math.max(0, -rect.top / travel));
        root.style.setProperty("--p", p.toFixed(4));
      });
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      root.style.setProperty("--mx", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
      root.style.setProperty("--my", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.street} aria-hidden>
      <div className={styles.sky} />
      <div className={styles.world}>
        {/* Pavillon au bout de la rue */}
        <div className={styles.pavilion}>
          <svg viewBox="0 0 400 260" className={styles.pavilionSvg}>
            <defs>
              <linearGradient id="roof" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#3a0a0d" />
                <stop offset="1" stopColor="#140406" />
              </linearGradient>
            </defs>
            {/* toit supérieur */}
            <path d="M200 18 L214 40 C250 52 300 58 352 60 C330 70 300 76 262 78 L138 78 C100 76 70 70 48 60 C100 58 150 52 186 40 Z" fill="url(#roof)" />
            <rect x="120" y="78" width="160" height="34" fill="#240709" />
            <rect x="130" y="84" width="140" height="22" fill="#ff9a4a" opacity="0.55" />
            {/* toit inférieur */}
            <path d="M200 104 C260 116 330 120 390 122 C360 134 320 140 272 142 L128 142 C80 140 40 134 10 122 C70 120 140 116 200 104 Z" fill="url(#roof)" />
            {/* façade éclairée */}
            <rect x="70" y="142" width="260" height="98" fill="#1c0507" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={86 + i * 48} y="156" width="36" height="84" fill="#ffb15e" opacity={i === 2 ? 0.95 : 0.6} />
            ))}
            <rect x="60" y="240" width="280" height="10" fill="#2b0a0c" />
            {/* fines lignes dorées */}
            <path d="M48 60 C100 58 150 52 186 40 M352 60 C300 58 250 52 214 40 M10 122 C70 120 140 116 200 104 C260 116 330 120 390 122" stroke="#e6b85c" strokeWidth="1.5" fill="none" opacity="0.7" />
          </svg>
        </div>

        {/* Deux rangées de lanternes */}
        {ROWS.map((i) =>
          [-1, 1].map((side) => {
            const z = -i * 260;
            const x = Math.round(side * (300 + jitter(i, side) * 60));
            const y = Math.round(-150 + jitter(i, side + 3) * 70);
            return (
              <span
                key={`${i}-${side}`}
                className={`${styles.lamp} ${i < 2 ? styles.lampNear : ""}`}
                style={{ "--x": `${x}px`, "--y": `${y}px`, "--z": `${z}px`, "--d": `${Math.round(jitter(i, side + 7) * 30) / 10}s` } as CSSProperties}
              >
                <span className={styles.lampBody} />
              </span>
            );
          }),
        )}

        {/* Guirlande de petites lumières */}
        {ROWS.slice(0, 10).map((i) => (
          <span key={`g${i}`} className={styles.garland} style={{ "--z": `${-i * 260 - 130}px` } as CSSProperties} />
        ))}

        <div className={styles.floor} />
      </div>
      <div className={styles.vignette} />
    </div>
  );
}
