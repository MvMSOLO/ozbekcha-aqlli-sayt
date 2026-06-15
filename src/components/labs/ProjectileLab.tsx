import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/site/GlassCard";
import { LabSlider } from "./LabSlider";
import { projectileMetrics, projectilePoint } from "@/lib/physics/projectile";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

const PRESETS = {
  Yer: 9.81,
  Oy: 1.62,
  Mars: 3.71,
  Yupiter: 24.79,
};

export function ProjectileLab() {
  const [v0, setV0] = useState(45);
  const [angle, setAngle] = useState(45);
  const [g, setG] = useState(9.81);
  const [playing, setPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const metrics = projectileMetrics({ v0, angleDeg: angle, g });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setupSize = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
    };
    setupSize();

    let raf = 0;
    let t = 0;
    const trail: { x: number; y: number }[] = [];

    const draw = () => {
      const W = c.width;
      const H = c.height;
      ctx.clearRect(0, 0, W, H);

      // Ground gradient
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "rgba(79,70,229,0.0)");
      grad.addColorStop(1, "rgba(6,182,212,0.15)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Axes
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.lineWidth = 1 * dpr;
      ctx.beginPath();
      ctx.moveTo(20 * dpr, H - 20 * dpr);
      ctx.lineTo(W - 10 * dpr, H - 20 * dpr);
      ctx.stroke();

      const range = Math.max(metrics.range, 10);
      const maxH = Math.max(metrics.maxHeight, 5);
      const scaleX = (W - 40 * dpr) / range;
      const scaleY = (H - 60 * dpr) / Math.max(maxH * 1.3, 10);
      const ox = 20 * dpr;
      const oy = H - 20 * dpr;

      // Sample trajectory full path
      ctx.strokeStyle = "rgba(139,92,246,0.35)";
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      for (let i = 0; i <= 80; i++) {
        const tt = (i / 80) * metrics.flightTime;
        const p = projectilePoint(tt, { v0, angleDeg: angle, g });
        const x = ox + p.x * scaleX;
        const y = oy - p.y * scaleY;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Animated ball
      if (playing) t += 0.016;
      if (t > metrics.flightTime) t = 0;
      const pt = projectilePoint(t, { v0, angleDeg: angle, g });
      const x = ox + pt.x * scaleX;
      const y = oy - pt.y * scaleY;
      trail.push({ x, y });
      if (trail.length > 60) trail.shift();

      // Trail
      ctx.strokeStyle = "rgba(6,182,212,0.9)";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      trail.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();

      // Ball
      const ballGrad = ctx.createRadialGradient(x, y, 0, x, y, 14 * dpr);
      ballGrad.addColorStop(0, "rgba(255,255,255,1)");
      ballGrad.addColorStop(1, "rgba(79,70,229,0.6)");
      ctx.fillStyle = ballGrad;
      ctx.beginPath();
      ctx.arc(x, y, 7 * dpr, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    draw();
    const ro = new ResizeObserver(() => {
      setupSize();
      trail.length = 0;
    });
    ro.observe(c);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [v0, angle, g, playing, metrics.flightTime, metrics.range, metrics.maxHeight]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <GlassCard className="overflow-hidden">
        <canvas ref={canvasRef} className="h-[420px] w-full" />
      </GlassCard>
      <div className="space-y-4">
        <GlassCard className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Boshqaruv</h3>
          <div className="space-y-5">
            <LabSlider label="Boshlang'ich tezlik v₀" value={v0} onChange={setV0} min={0} max={100} unit="m/s" />
            <LabSlider label="Burchak θ" value={angle} onChange={setAngle} min={0} max={90} unit="°" />
            <LabSlider label="Tortishish g" value={g} onChange={setG} min={1} max={25} step={0.01} unit="m/s²" />
            <div className="flex flex-wrap gap-1">
              {Object.entries(PRESETS).map(([name, val]) => (
                <button
                  key={name}
                  onClick={() => setG(val)}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs hover:bg-white/10"
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="secondary" onClick={() => setPlaying((p) => !p)}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setV0(45);
                  setAngle(45);
                  setG(9.81);
                }}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="mb-3 text-sm font-semibold">Natijalar</h3>
          <dl className="space-y-2 font-mono text-sm">
            <Row k="Maksimal balandlik" v={`${metrics.maxHeight.toFixed(2)} m`} />
            <Row k="Uchish masofasi" v={`${metrics.range.toFixed(2)} m`} />
            <Row k="Uchish vaqti" v={`${metrics.flightTime.toFixed(2)} s`} />
          </dl>
        </GlassCard>
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-1">
      <dt className="text-muted-foreground">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
