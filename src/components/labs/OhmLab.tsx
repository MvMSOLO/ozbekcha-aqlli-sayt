import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/site/GlassCard";
import { LabSlider } from "./LabSlider";

export function OhmLab() {
  const [U, setU] = useState(12);
  const [R, setR] = useState(6);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const I = U / R;

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.clientWidth * dpr;
    c.height = c.clientHeight * dpr;

    let raf = 0;
    const start = performance.now();
    // Particle positions along wire path (0..1)
    const N = 24;
    const particles = Array.from({ length: N }, (_, i) => i / N);

    const draw = () => {
      const W = c.width;
      const H = c.height;
      ctx.clearRect(0, 0, W, H);

      const pad = 40 * dpr;
      const cx1 = pad;
      const cx2 = W - pad;
      const cy1 = pad;
      const cy2 = H - pad;

      // Wire rectangle path
      const path = (tt: number) => {
        // 4 sides; tt 0..1 ; top, right, bottom, left
        const w = cx2 - cx1;
        const h = cy2 - cy1;
        const perim = 2 * (w + h);
        const d = (tt % 1) * perim;
        if (d < w) return { x: cx1 + d, y: cy1 };
        if (d < w + h) return { x: cx2, y: cy1 + (d - w) };
        if (d < 2 * w + h) return { x: cx2 - (d - w - h), y: cy2 };
        return { x: cx1, y: cy2 - (d - 2 * w - h) };
      };

      // Wire
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 4 * dpr;
      ctx.strokeRect(cx1, cy1, cx2 - cx1, cy2 - cy1);

      // Battery on left edge
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillRect(cx1 - 6 * dpr, (cy1 + cy2) / 2 - 24 * dpr, 12 * dpr, 16 * dpr);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(cx1 - 4 * dpr, (cy1 + cy2) / 2 + 8 * dpr, 8 * dpr, 16 * dpr);
      ctx.font = `${11 * dpr}px ui-monospace, monospace`;
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText(`${U.toFixed(1)} V`, cx1 - 30 * dpr, (cy1 + cy2) / 2 + 4 * dpr);

      // Resistor on right edge (zigzag)
      ctx.strokeStyle = "rgba(255,255,255,0.9)";
      ctx.lineWidth = 2.5 * dpr;
      ctx.beginPath();
      const rx = cx2;
      const ry1 = (cy1 + cy2) / 2 - 30 * dpr;
      const ry2 = (cy1 + cy2) / 2 + 30 * dpr;
      ctx.moveTo(rx, ry1);
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(rx + (i % 2 === 0 ? 10 * dpr : -10 * dpr), ry1 + ((ry2 - ry1) * (i + 1)) / 6);
      }
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      ctx.fillText(`${R.toFixed(1)} Ω`, rx + 14 * dpr, (cy1 + cy2) / 2 + 4 * dpr);

      // Animate particles
      const t = (performance.now() - start) / 1000;
      const speed = Math.max(0.05, Math.min(0.6, I / 10));
      for (let i = 0; i < N; i++) {
        const pos = path(particles[i] + t * speed);
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 6 * dpr);
        grad.addColorStop(0, "rgba(6,182,212,1)");
        grad.addColorStop(1, "rgba(6,182,212,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 4 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [U, R, I]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <GlassCard className="overflow-hidden">
        <canvas ref={canvasRef} className="h-[420px] w-full" />
      </GlassCard>
      <div className="space-y-4">
        <GlassCard className="p-5">
          <div className="space-y-5">
            <LabSlider label="Kuchlanish U" value={U} onChange={setU} min={0} max={48} step={0.1} unit="V" />
            <LabSlider label="Qarshilik R" value={R} onChange={setR} min={0.5} max={50} step={0.1} unit="Ω" />
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <p className="text-xs text-muted-foreground">Tok kuchi</p>
          <p className="mt-1 font-mono text-3xl gradient-text">{I.toFixed(2)} A</p>
          <p className="mt-2 font-mono text-xs text-muted-foreground">I = U/R = {U.toFixed(1)} / {R.toFixed(1)}</p>
          <p className="mt-3 text-xs text-muted-foreground">Quvvat: <span className="font-mono">{(U * I).toFixed(2)} W</span></p>
        </GlassCard>
      </div>
    </div>
  );
}
