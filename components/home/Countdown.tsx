"use client";

import { splitDuration, useNewYearRemaining } from "@/components/motion/useNewYear";
import styles from "./home.module.css";

const units = [
  { key: "days", label: "Jours" },
  { key: "hours", label: "Heures" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Sec" },
] as const;

/** Compte à rebours jusqu'à minuit le 31 décembre ; chaque chiffre bascule en 3D quand il change. */
export function Countdown({ tone = "light" }: { tone?: "light" | "dark" }) {
  const remaining = useNewYearRemaining();
  const parts = remaining === null ? null : splitDuration(remaining);

  return (
    <div className={`${styles.countdown} ${tone === "dark" ? styles.countdownDark : ""}`} role="timer" aria-label="Temps restant avant minuit, le 31 décembre">
      {units.map(({ key, label }) => {
        const value = parts ? String(parts[key]).padStart(2, "0") : "--";
        return (
          <div key={key} className={styles.countdownCell}>
            <span className={styles.flipWrap} aria-hidden={key === "seconds" || undefined}>
              <span key={value} className={`${styles.countdownValue} tabular`}>
                {value}
              </span>
            </span>
            <span className={styles.countdownUnit}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
