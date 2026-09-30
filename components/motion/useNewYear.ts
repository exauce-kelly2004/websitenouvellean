"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const id = window.setInterval(callback, 1000);
  return () => window.clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000);
const getServerNow = () => null;

/** Dates du Nouvel An lunaire (minuit, heure locale). */
const LUNAR_NEW_YEARS = ["2027-02-06", "2028-01-26", "2029-02-13", "2030-02-03"];

export function nextLunarNewYear(nowSeconds: number) {
  for (const d of LUNAR_NEW_YEARS) {
    const t = new Date(`${d}T00:00:00`).getTime() / 1000;
    if (t > nowSeconds) return t;
  }
  return nowSeconds;
}

/** Secondes restantes avant minuit du prochain 1er janvier (null côté serveur). */
export function useNewYearRemaining(): number | null {
  const now = useSyncExternalStore(subscribe, getNow, getServerNow);
  if (now === null) return null;
  const target = nextLunarNewYear(now);
  return Math.max(0, target - now);
}

export function splitDuration(seconds: number) {
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}
