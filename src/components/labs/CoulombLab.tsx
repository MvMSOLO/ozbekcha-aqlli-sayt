import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function CoulombLab() {
  const [q1, setQ1] = useState(2);
  const [q2, setQ2] = useState(-1);
  const [r, setR] = useState(0.1);
  const k = 8.99e9;
  const F = (k * Math.abs(q1 * q2) * 1e-12) / (r * r); // µC -> C

  const ref = useCanvas2D((ctx, W, H, dpr) => {
    ctx.clearRect(0, 0, W, H);
    const cy = H / 2;
    const margin = 60 * dpr;
    const usable = W - 2 * margin;
    const px = (val: number) => margin + ((val + 0.25) / 0.5) * usable;
    const x1 = px(-r / 2), x2 = px(r / 2);
    // Force arrows
    const arrowLen = Math.min(120 * dpr, Math.max(20 * dpr, Math.log10(F + 1) * 14 * dpr));
    const attractive = q1 * q2 < 0;
    const dir1 = attractive ? 1 : -1;
    const dir2 = attractive ? -1 : 1;
    function arrow(x: number, y: number, dx: number, col: string) {
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2 * dpr;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + dx, y); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + dx, y - 5 * dpr); ctx.lineTo(x + dx + Math.sign(dx) * 8 * dpr, y); ctx.lineTo(x + dx, y + 5 * dpr); ctx.closePath(); ctx.fill();
    }
    arrow(x1, cy, dir1 * arrowLen, "rgba(244,114,182,1)");
    arrow(x2, cy, dir2 * arrowLen, "rgba(244,114,182,1)");
    // Charges
    function charge(x: number, q: number) {
      const radius = 18 * dpr + Math.min(Math.abs(q) * 3, 14) * dpr;
      const col = q >= 0 ? "rgba(239,68,68,1)" : "rgba(59,130,246,1)";
      const grad = ctx.createRadialGradient(x, cy, 0, x, cy, radius);
      grad.addColorStop(0, "rgba(255,255,255,0.9)");
      grad.addColorStop(1, col);
      ctx.fillStyle = grad;
      ctx.beginPath(); ctx.arc(x, cy, radius, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "white"; ctx.font = `bold ${14 * dpr}px sans-serif`; ctx.textAlign = "center";
      ctx.fillText(q >= 0 ? "+" : "−", x, cy + 5 * dpr);
    }
    charge(x1, q1); charge(x2, q2);
    ctx.textAlign = "left";
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="F = k\dfrac{|q_1 q_2|}{r^2}"
      explanation={q1 * q2 < 0 ? "Zaryadlar belgilari qarama-qarshi — bir-birini tortadi." : "Zaryadlar bir xil belgili — bir-birini itaradi."}
      controls={
        <>
          <LabSlider label="Zaryad q₁" value={q1} onChange={setQ1} min={-5} max={5} step={0.1} unit="µC" />
          <LabSlider label="Zaryad q₂" value={q2} onChange={setQ2} min={-5} max={5} step={0.1} unit="µC" />
          <LabSlider label="Masofa r" value={r * 100} onChange={(v) => setR(v / 100)} min={2} max={25} step={0.5} unit="sm" />
        </>
      }
      results={
        <>
          <ResultRow k="Kuch F" v={`${F.toFixed(3)} N`} />
          <ResultRow k="Belgi" v={q1 * q2 < 0 ? "tortishish" : "itarilish"} />
        </>
      }
    />
  );
}
