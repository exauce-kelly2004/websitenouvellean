"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { announcements } from "@/data/site";
import { splitDuration, useNewYearRemaining } from "@/components/motion/useNewYear";
import styles from "./AnnouncementBar.module.css";

function NewYearTicker() {
  const remaining = useNewYearRemaining();
  if (remaining === null) return <span className={styles.ticker}>Nouvel An lunaire le 6 février</span>;
  const { days, hours, minutes } = splitDuration(remaining);
  return (
    <span className={styles.ticker}>
      Nouvel An lunaire dans{" "}
      <strong className="tabular">
        {days} j {hours} h {minutes} min
      </strong>
    </span>
  );
}

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % announcements.length), 5000);
    return () => window.clearInterval(id);
  }, [paused]);

  const go = (step: number) => setIndex((i) => (i + step + announcements.length) % announcements.length);

  return (
    <div
      className={styles.bar}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Desktop : les trois messages côte à côte, comme dans la structure de référence */}
      <ul role="list" className={styles.all}>
        <li>{announcements[0]}</li>
        <li>
          <NewYearTicker />
        </li>
        <li>{announcements[2]}</li>
      </ul>
      {/* Mobile : un message à la fois */}
      <div className={styles.single}>
        <button type="button" onClick={() => go(-1)} aria-label="Message précédent" className={styles.nav}>
          <ChevronLeft size={14} aria-hidden />
        </button>
        <p aria-live="off" key={index} className={styles.message}>
          {index === 1 ? <NewYearTicker /> : announcements[index]}
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Message suivant" className={styles.nav}>
          <ChevronRight size={14} aria-hidden />
        </button>
      </div>
    </div>
  );
}
