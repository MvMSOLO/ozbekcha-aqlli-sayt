import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function LorentzLab() {
  const [vc, setVc] = useState(0.5); // v/c
  const gamma = 1 / Math.sqrt(1 - vc * vc);

  const ref = useCanvas2D((ctx, W, H, dpr) => {
    ctx.clearRect(0, 0, W, H);
    const padL = 50 * dpr, padB = 30 * dpr;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath(); ctx.moveTo(padL, 10 * dpr); ctx.lineTo(padL, H - padB); ctx.lineTo(W - 10 * dpr, H - padB); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText("γ", 8 * dpr, 14 * dpr); ctx.fillText("v/c", W - 30 * dpr, H - 8 * dpr);
    // Plot γ vs v/c up to 0.99
    const yMax = 8;
    ctx.strokeStyle = "rgba(99,102,241,0.95)"; ctx.lineWidth = 2.5 * dpr;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const v = (i / 200) * 0.99;
      const g = 1 / Math.sqrt(1 - v * v);
      const x = padL + v * (W - padL - 10 * dpr);
      const y = H - padB - Math.min(g, yMax) / yMax * (H - padB - 10 * dpr);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // marker
    const x = padL + vc * (W - padL - 10 * dpr);
    const y = H - padB - Math.min(gamma, yMax) / yMax * (H - padB - 10 * dpr);
    ctx.fillStyle = "white";
    ctx.beginPath(); ctx.arc(x, y, 6 * dpr, 0, Math.PI * 2); ctx.fill();
    // y-axis ticks
    for (let g = 1; g <= yMax; g++) {
      const yt = H - padB - g / yMax * (H - padB - 10 * dpr);
      ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fillText(`${g}`, 28 * dpr, yt + 3 * dpr);
    }
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="\gamma = \dfrac{1}{\sqrt{1 - v^2/c^2}}"
      explanation={`v/c = ${vc.toFixed(2)} bo'lganda γ = ${gamma.toFixed(3)}. Bu — vaqt cho'zilishi (1 s harakatdagi soatda Yer uchun ${gamma.toFixed(2)} s o'tadi).`}
      controls={<LabSlider label="Tezlik v/c" value={vc} onChange={(v) => setVc(Math.min(v, 0.99))} min={0} max={0.99} step={0.01} />}
      results={
        <>
          <ResultRow k="Lorentz omili γ" v={`${gamma.toFixed(3)}`} />
          <ResultRow k="Vaqt cho'zilishi" v={`×${gamma.toFixed(3)}`} />
          <ResultRow k="Uzunlik qisqarishi" v={`×${(1 / gamma).toFixed(3)}`} />
        </>
      }
    />
  );
}
