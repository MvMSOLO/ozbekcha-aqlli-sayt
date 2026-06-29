import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function RadioactiveLab() {
  const [halfLife, setHalfLife] = useState(5);
  const [N0, setN0] = useState(1000);
  const lambda = Math.LN2 / halfLife;

  const ref = useCanvas2D((ctx, W, H, dpr, t) => {
    ctx.clearRect(0, 0, W, H);
    const padL = 50 * dpr, padB = 30 * dpr;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath(); ctx.moveTo(padL, 10 * dpr); ctx.lineTo(padL, H - padB); ctx.lineTo(W - 10 * dpr, H - padB); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText("N", 8 * dpr, 14 * dpr); ctx.fillText("t", W - 20 * dpr, H - 8 * dpr);
    const tMax = halfLife * 6;
    // half-life grid
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    for (let k = 1; k <= 6; k++) {
      const x = padL + ((halfLife * k) / tMax) * (W - padL - 10 * dpr);
      ctx.beginPath(); ctx.moveTo(x, 10 * dpr); ctx.lineTo(x, H - padB); ctx.stroke();
    }
    // Curve
    ctx.strokeStyle = "rgba(244,114,182,0.95)"; ctx.lineWidth = 2.5 * dpr;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const tt = (i / 200) * tMax;
      const N = N0 * Math.exp(-lambda * tt);
      const x = padL + (tt / tMax) * (W - padL - 10 * dpr);
      const y = H - padB - (N / N0) * (H - padB - 10 * dpr);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // animated dot
    const tNow = (t * 0.5) % tMax;
    const Nn = N0 * Math.exp(-lambda * tNow);
    const xN = padL + (tNow / tMax) * (W - padL - 10 * dpr);
    const yN = H - padB - (Nn / N0) * (H - padB - 10 * dpr);
    ctx.fillStyle = "white";
    ctx.beginPath(); ctx.arc(xN, yN, 6 * dpr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillText(`t=${tNow.toFixed(1)} → N=${Nn.toFixed(0)}`, xN + 10 * dpr, yN);
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="N(t) = N_0 e^{-\lambda t},\; \lambda = \dfrac{\ln 2}{T_{1/2}}"
      explanation={`Har ${halfLife} birlik vaqtdan keyin yadrolar soni ikki barobar kamayadi. Bu C-14 va U-238 kabi izotoplar uchun universal qoida.`}
      controls={
        <>
          <LabSlider label="Yarim parchalanish T₁/₂" value={halfLife} onChange={setHalfLife} min={1} max={20} step={0.5} unit="yil" />
          <LabSlider label="Boshlang'ich N₀" value={N0} onChange={setN0} min={100} max={5000} step={50} />
        </>
      }
      results={
        <>
          <ResultRow k="λ (parchalanish doimiysi)" v={`${lambda.toFixed(4)} 1/yil`} />
          <ResultRow k="O'rtacha umr τ" v={`${(1 / lambda).toFixed(2)} yil`} />
        </>
      }
    />
  );
}
