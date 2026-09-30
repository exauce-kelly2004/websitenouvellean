"use client";

import { splitDuration, useNewYearRemaining } from "@/components/motion/useNewYear";

/** « encore 130 jours » — compte à rebours discret vers le Nouvel An lunaire. */
export function LunarCountdownText({ prefix = "encore" }: { prefix?: string }) {
  const remaining = useNewYearRemaining();
  if (remaining === null) return <span>bientôt</span>;
  const { days, hours } = splitDuration(remaining);
  return (
    <span className="tabular">
      {prefix} {days > 0 ? `${days} jours` : `${hours} heures`}
    </span>
  );
}
