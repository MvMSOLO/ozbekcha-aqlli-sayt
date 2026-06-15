import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/site/GlassCard";
import { LabSlider } from "./LabSlider";
import { angularFreq, springEnergy, springStep } from "@/lib/physics/spring";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";

export function SpringLab() {
  const [k, setK] = useState(20);
  const [m, setM] = useState(1.2);
  const [x0, setX0] = useState(1.2);
  const [damping, setDamping] = useState(0.1);
  const [playing, setPlaying] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const energyRef = useRef<{ Ek: number; Ep: number; total: number }>({ Ek: 0, Ep: 0, total: 0 });
  const [energy, setEnergy] = useState({ Ek: 0, Ep: 0, total: 0 });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = c.clientWidth * dpr;
    c.height = c.clientHeight * dpr;

    let state = { x: x0, v: 0 };
    let raf = 0;
    let frameCount = 0;

    const draw = () => {
      const W = c.width;
      const H = c.height;
      ctx.clearRect(0, 0, W, H);

      if (playing) {
        for (let i = 0; i < 4; i++) state = springStep(state, k, m, damping, 0.012);
      }

      // Wall + spring + mass
      const wallX = 40 * dpr;
      const restX = W / 2;
      const pxPerM = 80 * dpr;
      const massX = restX + state.x * pxPerM;
      const cy = H / 2;

      // Wall
      ctx.fillStyle = "rgba(255,255,255,0.15)";
      ctx.fillRect(wallX - 6 * dpr, cy - 60 * dpr, 6 * dpr, 120 * dpr);

      // Spring (zig-zag)
      ctx.strokeStyle = "rgba(6,182,212,0.9)";
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      const coils = 14;
      const span = massX - wallX;
      ctx.moveTo(wallX, cy);
      for (let i = 1; i < coils; i++) {
        const px = wallX + (span * i) / coils;
        const py = cy + (i % 2 === 0 ? -10 : 10) * dpr;
        ctx.lineTo(px, py);
      }
      ctx.lineTo(massX, cy);
      ctx.stroke();

      // Mass
      const size = 36 * dpr;
      const grad = ctx.createLinearGradient(massX, cy - size / 2, massX, cy + size / 2);
      grad.addColorStop(0, "rgba(139,92,246,1)");
      grad.addColorStop(1, "rgba(79,70,229,0.7)");
      ctx.fillStyle = grad;
      ctx.fillRect(massX - size / 2, cy - size / 2, size, size);

      // Force vector
      const fx = -k * state.x;
      ctx.strokeStyle = fx > 0 ? "rgba(74,222,128,0.9)" : "rgba(248,113,113,0.9)";
      ctx.lineWidth = 2 * dpr;
      const arrowLen = Math.sign(fx) * Math.min(Math.abs(fx) * 1.5 * dpr, 100 * dpr);
      ctx.beginPath();
      ctx.moveTo(massX, cy - size / 2 - 8 * dpr);
      ctx.lineTo(massX + arrowLen, cy - size / 2 - 8 * dpr);
      ctx.stroke();

      frameCount++;
      if (frameCount % 6 === 0) {
        energyRef.current = springEnergy(state, k, m);
        setEnergy(energyRef.current);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [k, m, x0, damping, playing]);

  const total = Math.max(energy.total, 0.001);
  const ekPct = (energy.Ek / total) * 100;
  const epPct = (energy.Ep / total) * 100;
  const omega = angularFreq(k, m);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <GlassCard className="overflow-hidden">
          <canvas ref={canvasRef} className="h-[320px] w-full" />
        </GlassCard>
        <GlassCard className="p-5">
          <h3 className="mb-3 text-sm font-semibold">Energiya almashinuvi</h3>
          <div className="space-y-2">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Kinetik (Ek)</span>
                <span className="font-mono">{energy.Ek.toFixed(2)} J</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full bg-[oklch(0.74_0.16_210)] transition-all" style={{ width: `${ekPct}%` }} />
              </div>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Potensial (Ep)</span>
                <span className="font-mono">{energy.Ep.toFixed(2)} J</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/5">
                <div className="h-full bg-[oklch(0.65_0.21_305)] transition-all" style={{ width: `${epPct}%` }} />
              </div>
            </div>
            <p className="pt-2 font-mono text-xs text-muted-foreground">ω = {omega.toFixed(2)} rad/s · T = {(2 * Math.PI / omega).toFixed(2)} s</p>
          </div>
        </GlassCard>
      </div>
      <GlassCard className="p-5">
        <div className="space-y-5">
          <LabSlider label="Qattiqlik k" value={k} onChange={setK} min={1} max={80} step={0.1} unit="N/m" />
          <LabSlider label="Massa m" value={m} onChange={setM} min={0.1} max={5} step={0.01} unit="kg" />
          <LabSlider label="Boshlang'ich siljish" value={x0} onChange={setX0} min={-2} max={2} step={0.01} unit="m" />
          <LabSlider label="So'nish" value={damping} onChange={setDamping} min={0} max={2} step={0.01} />
          <div className="flex gap-2">
            <Button size="sm" variant="secondary" onClick={() => setPlaying((p) => !p)}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => { setK(20); setM(1.2); setX0(1.2); setDamping(0.1); }}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
