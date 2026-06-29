import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function CarnotLab() {
  const [Th, setTh] = useState(600);
  const [Tc, setTc] = useState(300);
  const ref = useCanvas2D((ctx, W, H, dpr, t) => {
    ctx.clearRect(0, 0, W, H);
    const padL = 50 * dpr, padB = 30 * dpr;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath(); ctx.moveTo(padL, 10 * dpr); ctx.lineTo(padL, H - padB); ctx.lineTo(W - 10 * dpr, H - padB); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText("P", 8 * dpr, 14 * dpr); ctx.fillText("V", W - 20 * dpr, H - 8 * dpr);

    // Build cycle in V,P space using PV = const isotherms, adiabats P V^γ = const
    const γ = 1.4;
    const V1 = 0.02, V2 = 0.04, V3 = 0.08, V4 = 0.04;
    const P1 = Th * 50;
    // Map
    const Vmin = 0.015, Vmax = 0.09;
    const Pmin = 0, Pmax = Th * 60;
    const sx = (v: number) => padL + ((v - Vmin) / (Vmax - Vmin)) * (W - padL - 10 * dpr);
    const sy = (p: number) => H - padB - ((p - Pmin) / (Pmax - Pmin)) * (H - padB - 10 * dpr);

    const segs: [string, number, number, (v: number) => number, string][] = [
      ["iso-h", V1, V2, (v) => (P1 * V1) / v, "rgba(244,114,182,0.9)"],
      ["adi-1", V2, V3, (v) => ((P1 * V1) / V2) * Math.pow(V2 / v, γ), "rgba(139,92,246,0.9)"],
      ["iso-c", V3, V4, (v) => {
        const Pa = ((P1 * V1) / V2) * Math.pow(V2 / V3, γ);
        return (Pa * V3) / v;
      }, "rgba(6,182,212,0.9)"],
      ["adi-2", V4, V1, (v) => {
        const Pa = ((P1 * V1) / V2) * Math.pow(V2 / V3, γ);
        const Pb = (Pa * V3) / V4;
        return Pb * Math.pow(V4 / v, γ);
      }, "rgba(99,102,241,0.9)"],
    ];
    segs.forEach(([, vs, ve, fn, col]) => {
      ctx.strokeStyle = col; ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      const N = 40;
      for (let i = 0; i <= N; i++) {
        const v = vs + ((ve - vs) * i) / N;
        const p = fn(v);
        const x = sx(v), y = sy(p);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });
    // animated marker traversing cycle
    const phase = (t * 0.3) % 4;
    const seg = segs[Math.floor(phase)];
    const f = phase - Math.floor(phase);
    const v = seg[1] + (seg[2] - seg[1]) * f;
    const p = seg[3](v);
    ctx.fillStyle = "white";
    ctx.beginPath(); ctx.arc(sx(v), sy(p), 6 * dpr, 0, Math.PI * 2); ctx.fill();
  });

  const eta = 1 - Tc / Th;

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="\eta_{\text{Karno}} = 1 - \dfrac{T_{\text{sov}}}{T_{\text{iss}}}"
      explanation={`Issiq ${Th} K va sovuq ${Tc} K manbalarda Karno dvigatelining maksimal FIK = ${(eta * 100).toFixed(1)}%. Real dvigatellar bundan past.`}
      controls={
        <>
          <LabSlider label="Issiq manba T₁" value={Th} onChange={setTh} min={400} max={1200} step={10} unit="K" />
          <LabSlider label="Sovuq manba T₂" value={Tc} onChange={(v) => setTc(Math.min(v, Th - 10))} min={100} max={500} step={10} unit="K" />
        </>
      }
      results={
        <>
          <ResultRow k="Maksimal FIK" v={`${(eta * 100).toFixed(1)} %`} />
          <ResultRow k="Q₂ / Q₁" v={`${(Tc / Th).toFixed(3)}`} />
        </>
      }
    />
  );
}
