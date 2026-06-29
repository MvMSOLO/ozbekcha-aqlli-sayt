import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function FreeFallLab() {
  const [g, setG] = useState(9.81);
  const [h0, setH0] = useState(80);
  const ref = useCanvas2D((ctx, W, H, dpr, t) => {
    ctx.clearRect(0, 0, W, H);
    const tFall = Math.sqrt((2 * h0) / g);
    const tt = t % (tFall + 0.6);
    const y = Math.max(0, h0 - 0.5 * g * tt * tt);
    const scale = (H - 40 * dpr) / h0;
    const cx = W / 2;
    const cy = H - 20 * dpr - y * scale;
    // Ground
    ctx.fillStyle = "rgba(6,182,212,0.18)";
    ctx.fillRect(0, H - 20 * dpr, W, 20 * dpr);
    // Height markers
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.font = `${10 * dpr}px monospace`;
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    for (let i = 0; i <= 4; i++) {
      const hi = (h0 / 4) * i;
      const yi = H - 20 * dpr - hi * scale;
      ctx.beginPath();
      ctx.moveTo(20 * dpr, yi);
      ctx.lineTo(W - 20 * dpr, yi);
      ctx.stroke();
      ctx.fillText(`${hi.toFixed(0)} m`, 4 * dpr, yi - 2 * dpr);
    }
    // Ball
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16 * dpr);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(1, "rgba(99,102,241,0.6)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, 10 * dpr, 0, Math.PI * 2);
    ctx.fill();
  });

  const tFall = Math.sqrt((2 * h0) / g);
  const vEnd = g * tFall;

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="h = \tfrac{1}{2} g t^2,\; v = g t"
      explanation={`Boshlang'ich balandlikdan jism faqat tortishish ta'sirida tushadi. Yerga ${tFall.toFixed(2)} s ichida ${vEnd.toFixed(1)} m/s tezlikda yetadi.`}
      controls={
        <>
          <LabSlider label="Balandlik h" value={h0} onChange={setH0} min={5} max={300} unit="m" />
          <LabSlider label="Tortishish g" value={g} onChange={setG} min={1.6} max={25} step={0.01} unit="m/s²" />
        </>
      }
      results={
        <>
          <ResultRow k="Tushish vaqti" v={`${tFall.toFixed(2)} s`} />
          <ResultRow k="Oxirgi tezlik" v={`${vEnd.toFixed(2)} m/s`} />
          <ResultRow k="Kinetik energiya (1 kg)" v={`${(0.5 * vEnd * vEnd).toFixed(1)} J`} />
        </>
      }
    />
  );
}
