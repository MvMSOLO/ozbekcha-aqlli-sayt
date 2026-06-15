import { useEffect, useRef, useState } from "react";
import { GlassCard } from "@/components/site/GlassCard";
import { LabSlider } from "./LabSlider";
import { waveAt, type WaveSource } from "@/lib/physics/wave";

export function WaveLab() {
  const [f1, setF1] = useState(1.2);
  const [f2, setF2] = useState(1.2);
  const [a1, setA1] = useState(1);
  const [a2, setA2] = useState(1);
  const [phase, setPhase] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const dpr = 1; // heatmap; keep cheap
    c.width = c.clientWidth;
    c.height = c.clientHeight;

    let raf = 0;
    const start = performance.now();
    const STEP = 4; // pixel block size for perf

    const draw = () => {
      const W = c.width;
      const H = c.height;
      const t = (performance.now() - start) / 1000;
      const sources: WaveSource[] = [
        { x: W * 0.3, y: H * 0.5, freq: f1, amp: a1, phase: 0 },
        { x: W * 0.7, y: H * 0.5, freq: f2, amp: a2, phase: phase },
      ];
      const img = ctx.createImageData(W, H);
      for (let y = 0; y < H; y += STEP) {
        for (let x = 0; x < W; x += STEP) {
          const v = waveAt(x, y, t, sources);
          // map v [-2,2] -> 0..1
          const n = Math.max(0, Math.min(1, (v + 2) / 4));
          // gradient: indigo -> cyan -> violet
          const r = Math.round(79 * (1 - n) + 139 * n);
          const g = Math.round(70 * (1 - n) + 92 * n);
          const b = Math.round(229 * (1 - Math.abs(n - 0.5) * 2) + 200 * Math.abs(n - 0.5) * 2);
          for (let dy = 0; dy < STEP && y + dy < H; dy++) {
            for (let dx = 0; dx < STEP && x + dx < W; dx++) {
              const idx = ((y + dy) * W + (x + dx)) * 4;
              img.data[idx] = r;
              img.data[idx + 1] = g;
              img.data[idx + 2] = b;
              img.data[idx + 3] = 230;
            }
          }
        }
      }
      ctx.putImageData(img, 0, 0);

      // source markers
      sources.forEach((s) => {
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, 5 * dpr, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    const ro = new ResizeObserver(() => {
      c.width = c.clientWidth;
      c.height = c.clientHeight;
    });
    ro.observe(c);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [f1, f2, a1, a2, phase]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <GlassCard className="overflow-hidden">
        <canvas ref={canvasRef} className="h-[420px] w-full" />
      </GlassCard>
      <GlassCard className="p-5">
        <h3 className="mb-4 text-sm font-semibold">Manbalar</h3>
        <div className="space-y-5">
          <LabSlider label="1-manba chastotasi" value={f1} onChange={setF1} min={0.2} max={4} step={0.01} unit="Hz" />
          <LabSlider label="1-manba amplitudasi" value={a1} onChange={setA1} min={0} max={2} step={0.01} />
          <LabSlider label="2-manba chastotasi" value={f2} onChange={setF2} min={0.2} max={4} step={0.01} unit="Hz" />
          <LabSlider label="2-manba amplitudasi" value={a2} onChange={setA2} min={0} max={2} step={0.01} />
          <LabSlider label="Faza farqi" value={phase} onChange={setPhase} min={0} max={Math.PI * 2} step={0.01} unit="rad" />
        </div>
      </GlassCard>
    </div>
  );
}
