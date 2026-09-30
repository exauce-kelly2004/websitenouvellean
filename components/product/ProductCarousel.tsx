"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { IconButton } from "@/components/ui/Button";
import styles from "./ProductCarousel.module.css";

/**
 * Rail horizontal à défilement natif (scroll-snap), navigable au clavier,
 * au doigt et via les flèches. Les enfants sont rendus côté serveur.
 */
export function ProductCarousel({ children, label, header }: { children: ReactNode; label: string; header?: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    el.addEventListener("scroll", measure, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", measure);
    };
  }, [measure]);

  const scroll = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={styles.carousel} role="region" aria-roledescription="carrousel" aria-label={label}>
      <div className={styles.top}>
        <div className={styles.header}>{header}</div>
        <div className={styles.controls}>
        <IconButton label="Produits précédents" filled onClick={() => scroll(-1)} disabled={edges.start}>
          <ChevronLeft size={18} aria-hidden />
        </IconButton>
        <IconButton label="Produits suivants" filled onClick={() => scroll(1)} disabled={edges.end}>
          <ChevronRight size={18} aria-hidden />
        </IconButton>
        </div>
      </div>
      <ul ref={trackRef} role="list" className={styles.track} tabIndex={0} aria-label={label}>
        {children}
      </ul>
    </div>
  );
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return <li className={styles.item}>{children}</li>;
}
