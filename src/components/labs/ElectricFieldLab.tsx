import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function ElectricFieldLab() {
  const [q, setQ] = useState(2);
  const ref = useCanvas2D((ctx, W, H, dpr) => {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    // Field arrows (radial)
    const layers = 5;
    for (let layer = 1; layer <= layers; layer++) {
      const rad = (layer / layers) * Math.min(W, H) * 0.4;
      const count = 6 + layer * 4;
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const x = cx + Math.cos(a) * rad;
        const y = cy + Math.sin(a) * rad;
        const dir = q >= 0 ? 1 : -1;
        const ax = Math.cos(a) * 14 * dpr * dir;
        const ay = Math.sin(a) * 14 * dpr * dir;
        const alpha = 0.15 + (1 - layer / layers) * 0.5;
        ctx.strokeStyle = `rgba(6,182,212,${alpha})`; ctx.fillStyle = ctx.strokeStyle;
        ctx.lineWidth = 1.5 * dpr;
        ctx.beginPath(); ctx.moveTo(x - ax / 2, y - ay / 2); ctx.lineTo(x + ax / 2, y + ay / 2); ctx.stroke();
      }
    }
    // Central charge
    const col = q >= 0 ? "rgba(239,68,68,1)" : "rgba(59,130,246,1)";
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 22 * dpr);
    grad.addColorStop(0, "white"); grad.addColorStop(1, col);
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(cx, cy, 20 * dpr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "white"; ctx.font = `bold ${18 * dpr}px sans-serif`; ctx.textAlign = "center";
    ctx.fillText(q >= 0 ? "+" : "−", cx, cy + 6 * dpr);
    ctx.textAlign = "left";
  });

  const r = 0.1;
  const E = (8.99e9 * Math.abs(q) * 1e-6) / (r * r);

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="\vec{E} = k\dfrac{q}{r^2}\hat{r}"
      explanation={`Musbat zaryad maydon chiziqlari tashqariga, manfiy zaryadda ichkariga yo'naladi. 10 sm masofada E ≈ ${(E / 1000).toFixed(2)} kV/m.`}
      controls={<LabSlider label="Zaryad q" value={q} onChange={setQ} min={-5} max={5} step={0.1} unit="µC" />}
      results={
        <>
          <ResultRow k="E (10 sm)" v={`${(E / 1000).toFixed(2)} kV/m`} />
          <ResultRow k="Potensial (10 sm)" v={`${((8.99e9 * q * 1e-6) / r / 1000).toFixed(2)} kV`} />
        </>
      }
    />
  );
}
