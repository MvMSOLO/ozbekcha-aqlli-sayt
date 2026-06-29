import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function PhotoelectricLab() {
  const [lambda, setLambda] = useState(400); // nm
  const [A, setA] = useState(2.3); // eV (work function, Na = 2.3, Cs = 2.1, Cu = 4.7)
  const h = 4.136e-15; // eV·s
  const c = 3e8;
  const E = (h * c) / (lambda * 1e-9); // eV photon energy
  const Ek = Math.max(0, E - A);
  const fired = E > A;

  const ref = useCanvas2D((ctx, W, H, dpr, t) => {
    ctx.clearRect(0, 0, W, H);
    const cy = H / 2;
    // Metal plate
    ctx.fillStyle = "rgba(255,255,255,0.15)";
    ctx.fillRect(W * 0.45, H * 0.2, 14 * dpr, H * 0.6);
    // Photons (incoming)
    const col = lambda < 450 ? "rgb(139,92,246)" : lambda < 510 ? "rgb(59,130,246)" : lambda < 580 ? "rgb(34,197,94)" : lambda < 645 ? "rgb(234,179,8)" : "rgb(239,68,68)";
    for (let i = 0; i < 6; i++) {
      const px = ((t * 200 + i * 80) % (W * 0.45));
      ctx.strokeStyle = col; ctx.lineWidth = 2 * dpr;
      ctx.beginPath(); ctx.moveTo(px, cy + Math.sin((px / 20) + t * 5) * 8 * dpr);
      ctx.lineTo(px + 18 * dpr, cy + Math.sin(((px + 18) / 20) + t * 5) * 8 * dpr);
      ctx.stroke();
    }
    // Ejected electrons
    if (fired) {
      const speed = 120 * dpr + Ek * 80 * dpr;
      for (let i = 0; i < 5; i++) {
        const off = i * 60;
        const ex = W * 0.5 + ((t * speed + off) % (W * 0.45));
        const ey = cy + (i - 2) * 14 * dpr;
        ctx.fillStyle = "rgba(6,182,212,1)";
        ctx.beginPath(); ctx.arc(ex, ey, 4 * dpr, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.font = `${8 * dpr}px sans-serif`; ctx.textAlign = "center";
        ctx.fillText("e⁻", ex, ey + 3 * dpr);
      }
    }
    ctx.textAlign = "left";
    ctx.fillStyle = "rgba(255,255,255,0.7)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText(`hν = ${E.toFixed(2)} eV`, 10 * dpr, 18 * dpr);
    ctx.fillText(`A = ${A.toFixed(2)} eV`, 10 * dpr, 32 * dpr);
    ctx.fillStyle = fired ? "rgba(34,197,94,0.9)" : "rgba(239,68,68,0.9)";
    ctx.fillText(fired ? `Elektron uchadi (Eₖ=${Ek.toFixed(2)} eV)` : "Foton energiyasi yetarli emas", 10 * dpr, 46 * dpr);
  });

  const lambdaMax = (h * c) / (A * 1e-9);

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="h\nu = A + \dfrac{m v^2}{2}"
      explanation={fired
        ? `Foton energiyasi ish chiqishidan ortiq — elektron metaldan uzilib chiqadi va ${Ek.toFixed(2)} eV kinetik energiyaga ega bo'ladi.`
        : `Foton energiyasi ${E.toFixed(2)} eV < A ${A.toFixed(2)} eV. Foto-effekt yuz bermaydi.`}
      controls={
        <>
          <LabSlider label="To'lqin uzunligi λ" value={lambda} onChange={setLambda} min={200} max={800} step={5} unit="nm" />
          <LabSlider label="Ish chiqishi A" value={A} onChange={setA} min={1.5} max={5.5} step={0.1} unit="eV" />
        </>
      }
      results={
        <>
          <ResultRow k="Foton energiyasi" v={`${E.toFixed(2)} eV`} />
          <ResultRow k="Kinetik energiya" v={`${Ek.toFixed(2)} eV`} />
          <ResultRow k="Qizil chegara λₘₐₓ" v={`${lambdaMax.toFixed(0)} nm`} />
        </>
      }
    />
  );
}
