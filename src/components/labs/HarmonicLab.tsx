import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function HarmonicLab() {
  const [A, setA] = useState(1);
  const [omega, setOmega] = useState(2);
  const [phi, setPhi] = useState(0);
  const ref = useCanvas2D((ctx, W, H, dpr, t) => {
    ctx.clearRect(0, 0, W, H);
    const midY = H / 2;
    const scaleY = (H - 40 * dpr) * 0.4;
    const tWindow = 8;
    const scaleX = (W - 40 * dpr) / tWindow;
    // axes
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.beginPath(); ctx.moveTo(20 * dpr, midY); ctx.lineTo(W - 20 * dpr, midY); ctx.stroke();
    // sine wave (current time at right edge)
    ctx.strokeStyle = "rgba(139,92,246,0.95)"; ctx.lineWidth = 2 * dpr;
    ctx.beginPath();
    for (let i = 0; i <= 200; i++) {
      const tt = t - tWindow + (i / 200) * tWindow;
      const x = 20 * dpr + (i / 200) * (W - 40 * dpr);
      const y = midY - A * Math.cos(omega * tt + phi) * scaleY;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    // moving bead at right edge
    const xNow = W - 20 * dpr;
    const yNow = midY - A * Math.cos(omega * t + phi) * scaleY;
    ctx.fillStyle = "rgba(6,182,212,1)";
    ctx.beginPath(); ctx.arc(xNow, yNow, 6 * dpr, 0, Math.PI * 2); ctx.fill();
    // Labels
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText("x(t)", 24 * dpr, 16 * dpr);
    void scaleX;
  });

  const T = (2 * Math.PI) / omega;

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="x(t) = A\cos(\omega t + \varphi),\; T = \dfrac{2\pi}{\omega}"
      explanation={`Amplituda ${A.toFixed(2)} m, davr ${T.toFixed(2)} s. Pastdan boshqaring va to'lqin shaklini kuzating.`}
      controls={
        <>
          <LabSlider label="Amplituda A" value={A} onChange={setA} min={0.1} max={2} step={0.05} unit="m" />
          <LabSlider label="Burchak chastota ω" value={omega} onChange={setOmega} min={0.5} max={8} step={0.1} unit="rad/s" />
          <LabSlider label="Boshlang'ich faza φ" value={phi} onChange={setPhi} min={0} max={6.28} step={0.05} unit="rad" />
        </>
      }
      results={
        <>
          <ResultRow k="Davr T" v={`${T.toFixed(2)} s`} />
          <ResultRow k="Chastota ν" v={`${(1 / T).toFixed(2)} Hz`} />
          <ResultRow k="Max tezlik" v={`${(A * omega).toFixed(2)} m/s`} />
        </>
      }
    />
  );
}
