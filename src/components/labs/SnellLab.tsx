import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function SnellLab() {
  const [a1, setA1] = useState(30);
  const [n1, setN1] = useState(1.0);
  const [n2, setN2] = useState(1.33);
  const sinA2 = (n1 / n2) * Math.sin((a1 * Math.PI) / 180);
  const tir = Math.abs(sinA2) > 1;
  const a2 = tir ? null : (Math.asin(sinA2) * 180) / Math.PI;

  const ref = useCanvas2D((ctx, W, H, dpr) => {
    ctx.clearRect(0, 0, W, H);
    const midY = H / 2;
    // Top medium
    ctx.fillStyle = "rgba(99,102,241,0.07)";
    ctx.fillRect(0, 0, W, midY);
    ctx.fillStyle = "rgba(6,182,212,0.17)";
    ctx.fillRect(0, midY, W, H - midY);
    // Boundary
    ctx.strokeStyle = "rgba(255,255,255,0.3)"; ctx.lineWidth = 1 * dpr;
    ctx.beginPath(); ctx.moveTo(0, midY); ctx.lineTo(W, midY); ctx.stroke();
    // Normal
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
    ctx.setLineDash([]);
    const cx = W / 2;
    const len = Math.min(W, H) * 0.4;
    // Incident ray (top-left -> origin)
    const ra1 = (a1 * Math.PI) / 180;
    const ix = cx - Math.sin(ra1) * len;
    const iy = midY - Math.cos(ra1) * len;
    ctx.strokeStyle = "rgba(244,114,182,1)"; ctx.lineWidth = 2.5 * dpr;
    ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(cx, midY); ctx.stroke();
    // Refracted or reflected
    if (a2 === null) {
      // TIR — reflect
      const rx = cx + Math.sin(ra1) * len;
      const ry = midY - Math.cos(ra1) * len;
      ctx.strokeStyle = "rgba(239,68,68,1)";
      ctx.beginPath(); ctx.moveTo(cx, midY); ctx.lineTo(rx, ry); ctx.stroke();
    } else {
      const ra2 = (a2 * Math.PI) / 180;
      const tx = cx + Math.sin(ra2) * len;
      const ty = midY + Math.cos(ra2) * len;
      ctx.strokeStyle = "rgba(6,182,212,1)";
      ctx.beginPath(); ctx.moveTo(cx, midY); ctx.lineTo(tx, ty); ctx.stroke();
    }
    ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText(`n₁ = ${n1.toFixed(2)}`, 10 * dpr, midY - 10 * dpr);
    ctx.fillText(`n₂ = ${n2.toFixed(2)}`, 10 * dpr, midY + 20 * dpr);
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="n_1 \sin\theta_1 = n_2 \sin\theta_2"
      explanation={tir
        ? "To'liq ichki qaytish — kritik burchakdan kattaroq tushish burchagida nur muhitdan chiqolmaydi."
        : `Sinish burchagi ${a2!.toFixed(1)}°. Zichroq muhitga o'tganda nur normalga yaqinlashadi.`}
      controls={
        <>
          <LabSlider label="Tushish burchagi θ₁" value={a1} onChange={setA1} min={0} max={89} unit="°" />
          <LabSlider label="n₁ (yuqori)" value={n1} onChange={setN1} min={1} max={2.5} step={0.01} />
          <LabSlider label="n₂ (pastki)" value={n2} onChange={setN2} min={1} max={2.5} step={0.01} />
        </>
      }
      results={
        <>
          <ResultRow k="Sinish burchagi" v={a2 === null ? "TIR" : `${a2.toFixed(1)}°`} />
          <ResultRow k="Kritik burchak" v={n1 > n2 ? `${((Math.asin(n2 / n1) * 180) / Math.PI).toFixed(1)}°` : "—"} />
        </>
      }
    />
  );
}
