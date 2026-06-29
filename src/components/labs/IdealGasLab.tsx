import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function IdealGasLab() {
  const [n, setN] = useState(1);
  const [T, setT] = useState(300);
  const [V, setV] = useState(0.025);
  const R = 8.314;
  const P = (n * R * T) / V; // Pa

  const ref = useCanvas2D((ctx, W, H, dpr) => {
    ctx.clearRect(0, 0, W, H);
    const padL = 50 * dpr, padB = 30 * dpr;
    // axes
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath(); ctx.moveTo(padL, 10 * dpr); ctx.lineTo(padL, H - padB); ctx.lineTo(W - 10 * dpr, H - padB); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText("P (kPa)", 6 * dpr, 14 * dpr);
    ctx.fillText("V (L)", W - 50 * dpr, H - 8 * dpr);
    // draw 3 isotherms
    const Vmax = 0.1, Pmax = 600_000;
    const colors = ["rgba(99,102,241,0.9)", "rgba(6,182,212,0.9)", "rgba(244,114,182,0.9)"];
    [200, T, 600].forEach((Ti, idx) => {
      ctx.strokeStyle = colors[idx]; ctx.lineWidth = (idx === 1 ? 2.5 : 1.5) * dpr;
      ctx.beginPath();
      for (let i = 0; i <= 100; i++) {
        const Vi = 0.002 + (i / 100) * (Vmax - 0.002);
        const Pi = (n * R * Ti) / Vi;
        const x = padL + (Vi / Vmax) * (W - padL - 10 * dpr);
        const y = H - padB - Math.min(Pi / Pmax, 1) * (H - padB - 10 * dpr);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = colors[idx];
      ctx.fillText(`${Ti} K`, W - 60 * dpr, 30 * dpr + idx * 14 * dpr);
    });
    // Marker
    const x = padL + (V / Vmax) * (W - padL - 10 * dpr);
    const y = H - padB - Math.min(P / Pmax, 1) * (H - padB - 10 * dpr);
    ctx.fillStyle = "white";
    ctx.beginPath(); ctx.arc(x, y, 6 * dpr, 0, Math.PI * 2); ctx.fill();
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="PV = nRT"
      explanation={`Tanlangan harorat izotermasi ajratilgan. Hajmni kamaytirsangiz bosim ortadi. Bosim hozir ${(P / 1000).toFixed(1)} kPa.`}
      controls={
        <>
          <LabSlider label="Modlar n" value={n} onChange={setN} min={0.1} max={3} step={0.05} unit="mol" />
          <LabSlider label="Harorat T" value={T} onChange={setT} min={100} max={800} step={10} unit="K" />
          <LabSlider label="Hajm V" value={V * 1000} onChange={(v) => setV(v / 1000)} min={2} max={100} step={1} unit="L" />
        </>
      }
      results={
        <>
          <ResultRow k="Bosim P" v={`${(P / 1000).toFixed(2)} kPa`} />
          <ResultRow k="Bosim (atm)" v={`${(P / 101325).toFixed(3)} atm`} />
          <ResultRow k="Ichki energiya U" v={`${((3 / 2) * n * R * T).toFixed(1)} J`} />
        </>
      }
    />
  );
}
