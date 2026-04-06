"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

const SYMBOLS = ["$", "€", "£", "¥", "₹", "₽", "₿", "₩", "₦", "฿"];

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  symbol: string;
  opacity: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 18 + 14,
          speedY: Math.random() * 0.3 + 0.1,
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          opacity: Math.random() * 0.15 + 0.1, // Increased opacity for better visibility
        });
      }
    };

    const isLight = resolvedTheme !== "dark";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < -p.size) {
          p.y = canvas.height + p.size;
          p.x = Math.random() * canvas.width;
        }
        ctx.font = `500 ${p.size}px Inter, system-ui, sans-serif`;
        ctx.fillStyle = isLight
          ? `rgba(0, 0, 0, ${p.opacity})`
          : `rgba(255, 255, 255, ${p.opacity})`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, p.x, p.y);
      });
      animationId = requestAnimationFrame(draw);
    };

    init();
    draw();
    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
