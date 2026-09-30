"use client";

import { useEffect, useRef } from "react";

/**
 * Poussière dorée : particules qui tombent lentement et scintillent,
 * dessinées sur un canvas (léger, pas de DOM par particule).
 */
export function GoldDust({ density = 70, className }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; r: number; vy: number; vx: number; phase: number; speed: number; hue: number };
    let particles: P[] = [];

    const spawn = (anywhere: boolean): P => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : -10,
      r: Math.random() * 1.8 + 0.4,
      vy: Math.random() * 0.35 + 0.12,
      vx: (Math.random() - 0.5) * 0.18,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.03 + 0.01,
      hue: 38 + Math.random() * 14,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((density * width) / 1200);
      particles = Array.from({ length: count }, () => spawn(true));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.phase += p.speed;
        const twinkle = 0.45 + Math.sin(p.phase) * 0.45;
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        g.addColorStop(0, `hsla(${p.hue}, 85%, 72%, ${twinkle})`);
        g.addColorStop(1, `hsla(${p.hue}, 85%, 60%, 0)`);
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
        if (!reduce) {
          p.y += p.vy;
          p.x += p.vx + Math.sin(p.phase * 0.5) * 0.15;
          if (p.y > height + 10) Object.assign(p, spawn(false));
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    // Met l'animation en pause quand le hero n'est plus visible.
    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      if (entry.isIntersecting && !reduce) raf = requestAnimationFrame(draw);
    });
    visibility.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      visibility.disconnect();
    };
  }, [density]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
