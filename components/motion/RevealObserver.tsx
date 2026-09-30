"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Apparition au défilement : chaque <section> du contenu (et tout
 * élément [data-reveal]) glisse et apparaît en entrant dans l'écran.
 * Le contenu reste visible sans JavaScript (classe posée côté client).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    root.classList.add("reveal-ready");

    const targets = Array.from(document.querySelectorAll<HTMLElement>("main section, [data-reveal]")).filter((el) => !el.dataset.visible && !el.closest("[data-no-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.06 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
