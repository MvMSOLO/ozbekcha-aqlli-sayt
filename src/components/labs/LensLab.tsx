import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function LensLab() {
  const [F, setF] = useState(8); // focal length in cm (positive = converging)
  const [d, setD] = useState(20); // object distance cm
  const [h, setH] = useState(4); // object height cm

  // 1/F = 1/d + 1/f  =>  f = 1/(1/F - 1/d)
  const f = 1 / (1 / F - 1 / d);
  const M = -f / d;
  const hi = M * h;

  const ref = useCanvas2D((ctx, W, H, dpr) => {
    ctx.clearRect(0, 0, W, H);
    const cy = H / 2, cx = W / 2;
    const sc = (W * 0.5) / 40; // 40cm wide
    // Axis
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath(); ctx.moveTo(20 * dpr, cy); ctx.lineTo(W - 20 * dpr, cy); ctx.stroke();
    // Lens (vertical ellipse)
    ctx.strokeStyle = "rgba(6,182,212,0.9)"; ctx.lineWidth = 2 * dpr;
    ctx.beginPath(); ctx.ellipse(cx, cy, 8 * dpr, H * 0.35, 0, 0, Math.PI * 2); ctx.stroke();
    // Foci
    ctx.fillStyle = "rgba(244,114,182,1)";
    [-F, F].forEach((ff) => {
      ctx.beginPath(); ctx.arc(cx + ff * sc * dpr, cy, 3 * dpr, 0, Math.PI * 2); ctx.fill();
    });
    // Object (left of lens, h up)
    const ox = cx - d * sc * dpr;
    const oy = cy - h * sc * dpr;
    ctx.strokeStyle = "rgba(244,114,182,1)"; ctx.lineWidth = 2 * dpr;
    ctx.beginPath(); ctx.moveTo(ox, cy); ctx.lineTo(ox, oy); ctx.stroke();
    // Arrow head
    ctx.beginPath(); ctx.moveTo(ox - 4 * dpr, oy + 6 * dpr); ctx.lineTo(ox, oy); ctx.lineTo(ox + 4 * dpr, oy + 6 * dpr); ctx.stroke();
    // Image
    if (Number.isFinite(f)) {
      const ix = cx + f * sc * dpr;
      const iy = cy - hi * sc * dpr;
      ctx.strokeStyle = "rgba(6,182,212,1)";
      ctx.beginPath(); ctx.moveTo(ix, cy); ctx.lineTo(ix, iy); ctx.stroke();
      const dir = hi >= 0 ? -1 : 1;
      ctx.beginPath(); ctx.moveTo(ix - 4 * dpr, iy + 6 * dpr * dir); ctx.lineTo(ix, iy); ctx.lineTo(ix + 4 * dpr, iy + 6 * dpr * dir); ctx.stroke();
      // Principal rays
      ctx.strokeStyle = "rgba(255,255,255,0.35)"; ctx.lineWidth = 1 * dpr;
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(cx, oy); ctx.lineTo(ix, iy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(cx, cy); ctx.lineTo(ix, iy); ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${10 * dpr}px monospace`;
    ctx.fillText("F", cx + F * sc * dpr - 4 * dpr, cy + 14 * dpr);
    ctx.fillText("F", cx - F * sc * dpr - 4 * dpr, cy + 14 * dpr);
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="\dfrac{1}{F} = \dfrac{1}{d} + \dfrac{1}{f},\quad \Gamma = -\dfrac{f}{d}"
      explanation={d > F
        ? "Predmet linzadan F dan uzoqroqda — haqiqiy, teskari tasvir hosil bo'ladi."
        : "Predmet F ichida — mavhum, to'g'ri va kattalashtirilgan tasvir."}
      controls={
        <>
          <LabSlider label="Fokus F" value={F} onChange={setF} min={3} max={20} step={0.5} unit="sm" />
          <LabSlider label="Masofa d" value={d} onChange={setD} min={4} max={40} step={0.5} unit="sm" />
          <LabSlider label="Bo'y h" value={h} onChange={setH} min={1} max={8} step={0.5} unit="sm" />
        </>
      }
      results={
        <>
          <ResultRow k="Tasvir masofasi f" v={`${f.toFixed(2)} sm`} />
          <ResultRow k="Kattalashtirish Γ" v={`${M.toFixed(2)}×`} />
          <ResultRow k="Tasvir bo'yi" v={`${hi.toFixed(2)} sm`} />
        </>
      }
    />
  );
}
