import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/site/GlassCard";
import { LabSlider } from "./LabSlider";
import { pendulumPeriod, pendulumStep } from "@/lib/physics/pendulum";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

export function PendulumLab() {
  const [L, setL] = useState(1.2);
  const [g, setG] = useState(9.81);
  const [angle0, setAngle0] = useState(35);
  const [damping, setDamping] = useState(0.05);
  const [playing, setPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef<HTMLCanvasElement>(null);

  const T = pendulumPeriod(L, g);

  useEffect(() => {
    const c = canvasRef.current;
    const pc = phaseRef.current;
    if (!c || !pc) return;
    const ctx = c.getContext("2d")!;
    const pctx = pc.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const fit = (el: HTMLCanvasElement) => {
      el.width = el.clientWidth * dpr;
      el.height = el.clientHeight * dpr;
    };
    fit(c);
    fit(pc);

    let state = { theta: (angle0 * Math.PI) / 180, omega: 0 };
    let raf = 0;
    const phasePts: { x: number; y: number }[] = [];

    const draw = () => {
      const W = c.width;
      const H = c.height;
      ctx.clearRect(0, 0, W, H);

      if (playing) {
        for (let i = 0; i < 4; i++) {
          state = pendulumStep(state, L, g, damping, 0.012);
        }
      }

      const cx = W / 2;
      const cy = 40 * dpr;
      const len = Math.min(H - 100 * dpr, 220 * dpr);
      const bx = cx + Math.sin(state.theta) * len;
      const by = cy + Math.cos(state.theta) * len;

      // Pivot
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath();
      ctx.arc(cx, cy, 4 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Rod
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(bx, by);
      ctx.stroke();

      // Bob with glow
      const grad = ctx.createRadialGradient(bx, by, 0, bx, by, 24 * dpr);
      grad.addColorStop(0, "rgba(6,182,212,1)");
      grad.addColorStop(1, "rgba(79,70,229,0.2)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bx, by, 16 * dpr, 0, Math.PI * 2);
      ctx.fill();

      // Phase plot
      const PW = pc.width;
      const PH = pc.height;
      pctx.clearRect(0, 0, PW, PH);
      pctx.strokeStyle = "rgba(255,255,255,0.08)";
      pctx.beginPath();
      pctx.moveTo(PW / 2, 0);
      pctx.lineTo(PW / 2, PH);
      pctx.moveTo(0, PH / 2);
      pctx.lineTo(PW, PH / 2);
      pctx.stroke();
      phasePts.push({ x: state.theta, y: state.omega });
      if (phasePts.length > 600) phasePts.shift();
      pctx.strokeStyle = "rgba(139,92,246,0.8)";
      pctx.lineWidth = 1.4 * dpr;
      pctx.beginPath();
      phasePts.forEach((p, i) => {
        const px = PW / 2 + (p.x / Math.PI) * (PW / 2 - 6);
        const py = PH / 2 - (p.y / 6) * (PH / 2 - 6);
        if (i === 0) pctx.moveTo(px, py);
        else pctx.lineTo(px, py);
      });
      pctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [L, g, angle0, damping, playing]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <GlassCard className="overflow-hidden">
          <canvas ref={canvasRef} className="h-[360px] w-full" />
        </GlassCard>
        <GlassCard className="overflow-hidden">
          <div className="px-4 pt-3 text-xs text-muted-foreground">Faza fazo (θ vs ω)</div>
          <canvas ref={phaseRef} className="h-[140px] w-full" />
        </GlassCard>
      </div>
      <div className="space-y-4">
        <GlassCard className="p-5">
          <div className="space-y-5">
            <LabSlider label="Uzunlik L" value={L} onChange={setL} min={0.2} max={3} step={0.01} unit="m" />
            <LabSlider label="Tortishish g" value={g} onChange={setG} min={1} max={25} step={0.01} unit="m/s²" />
            <LabSlider label="Boshlang'ich burchak" value={angle0} onChange={setAngle0} min={5} max={80} unit="°" />
            <LabSlider label="So'nish" value={damping} onChange={setDamping} min={0} max={1} step={0.01} />
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={() => setPlaying((p) => !p)}>
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <Button size="sm" variant="secondary" onClick={() => { setL(1.2); setG(9.81); setAngle0(35); setDamping(0.05); }}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="mb-3 text-sm font-semibold">Davr</h3>
          <p className="font-mono text-2xl">T = {T.toFixed(3)} s</p>
          <p className="mt-1 text-xs text-muted-foreground">Kichik tebranishlar uchun T = 2π√(L/g)</p>
        </GlassCard>
      </div>
    </div>
  );
}
