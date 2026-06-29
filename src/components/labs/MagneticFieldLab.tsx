import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function MagneticFieldLab() {
  const [I, setI] = useState(5);
  const ref = useCanvas2D((ctx, W, H, dpr) => {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    // Wire (cross-section, current toward viewer)
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.beginPath(); ctx.arc(cx, cy, 10 * dpr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(99,102,241,1)";
    ctx.beginPath(); ctx.arc(cx, cy, 3 * dpr, 0, Math.PI * 2); ctx.fill();
    // Concentric field lines (right-hand rule, current out of page -> CCW field)
    const dir = I >= 0 ? 1 : -1;
    for (let layer = 1; layer <= 6; layer++) {
      const rad = layer * 30 * dpr;
      if (rad > Math.min(W, H) * 0.45) break;
      const alpha = 0.5 - layer * 0.06;
      ctx.strokeStyle = `rgba(6,182,212,${alpha})`;
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
      // arrows on each ring
      const arrows = 6;
      for (let a = 0; a < arrows; a++) {
        const ang = (a / arrows) * Math.PI * 2;
        const x = cx + Math.cos(ang) * rad;
        const y = cy + Math.sin(ang) * rad;
        const tx = -Math.sin(ang) * 8 * dpr * dir;
        const ty = Math.cos(ang) * 8 * dpr * dir;
        ctx.fillStyle = `rgba(139,92,246,${alpha + 0.2})`;
        ctx.beginPath();
        ctx.moveTo(x + tx, y + ty);
        ctx.lineTo(x - ty * 0.4, y + tx * 0.4);
        ctx.lineTo(x + ty * 0.4, y - tx * 0.4);
        ctx.closePath(); ctx.fill();
      }
    }
  });

  const r = 0.05;
  const B = (4e-7 * Math.PI * Math.abs(I)) / (2 * Math.PI * r);

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="B = \dfrac{\mu_0 I}{2\pi r}"
      explanation={`To'g'ri tokli o'tkazgich atrofida magnit maydon konsentrik chiziqlar shaklida. 5 sm masofada B ≈ ${(B * 1e6).toFixed(2)} µT.`}
      controls={<LabSlider label="Tok kuchi I" value={I} onChange={setI} min={-20} max={20} step={0.5} unit="A" />}
      results={
        <>
          <ResultRow k="B (5 sm)" v={`${(B * 1e6).toFixed(2)} µT`} />
          <ResultRow k="B (10 sm)" v={`${((4e-7 * Math.PI * Math.abs(I)) / (2 * Math.PI * 0.1) * 1e6).toFixed(2)} µT`} />
        </>
      }
    />
  );
}
