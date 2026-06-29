import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function CircularLab() {
  const [r, setR] = useState(1.5);
  const [omega, setOmega] = useState(2);
  const ref = useCanvas2D((ctx, W, H, dpr, t) => {
    ctx.clearRect(0, 0, W, H);
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) * 0.35;
    // Orbit
    ctx.strokeStyle = "rgba(139,92,246,0.4)";
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
    // Center
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.beginPath(); ctx.arc(cx, cy, 3 * dpr, 0, Math.PI * 2); ctx.fill();
    const ang = omega * t;
    const x = cx + Math.cos(ang) * R;
    const y = cy + Math.sin(ang) * R;
    // Radius
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
    // Velocity vector (tangent)
    const vx = -Math.sin(ang) * 40 * dpr;
    const vy = Math.cos(ang) * 40 * dpr;
    ctx.strokeStyle = "rgba(6,182,212,1)"; ctx.lineWidth = 2 * dpr;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + vx, y + vy); ctx.stroke();
    // Acceleration vector (toward center)
    const ax = (cx - x) * 0.3, ay = (cy - y) * 0.3;
    ctx.strokeStyle = "rgba(244,114,182,1)";
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + ax, y + ay); ctx.stroke();
    // Ball
    const grad = ctx.createRadialGradient(x, y, 0, x, y, 14 * dpr);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(99,102,241,0.5)");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.arc(x, y, 8 * dpr, 0, Math.PI * 2); ctx.fill();
  });

  const v = omega * r;
  const a = omega * omega * r;
  const T = (2 * Math.PI) / omega;

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="v = \omega r,\; a_c = \omega^2 r,\; T = \dfrac{2\pi}{\omega}"
      explanation={`Ko'k strelka — chiziqli tezlik (tangensial), pushti strelka — markazga intilma tezlanish. ${T.toFixed(2)} s davrda bir aylanma yasaydi.`}
      controls={
        <>
          <LabSlider label="Radius r" value={r} onChange={setR} min={0.5} max={5} step={0.1} unit="m" />
          <LabSlider label="Burchak tezlik ω" value={omega} onChange={setOmega} min={0.2} max={6} step={0.1} unit="rad/s" />
        </>
      }
      results={
        <>
          <ResultRow k="Chiziqli tezlik v" v={`${v.toFixed(2)} m/s`} />
          <ResultRow k="Markazga intilma a" v={`${a.toFixed(2)} m/s²`} />
          <ResultRow k="Davr T" v={`${T.toFixed(2)} s`} />
          <ResultRow k="Chastota ν" v={`${(1 / T).toFixed(2)} Hz`} />
        </>
      }
    />
  );
}
