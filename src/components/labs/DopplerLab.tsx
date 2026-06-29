import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function DopplerLab() {
  const [vs, setVs] = useState(60); // source speed m/s
  const [f, setF] = useState(440);
  const v = 343;
  const fApproach = f * (v / (v - vs));
  const fRecede = f * (v / (v + vs));

  const ref = useCanvas2D((ctx, W, H, dpr, t) => {
    ctx.clearRect(0, 0, W, H);
    const cy = H / 2;
    const sx = (((t * vs * 5) % (W * 1.4)) - W * 0.2);
    // Emit ring at constant intervals
    const period = 0.04;
    const tNow = t;
    const oldest = tNow - 12 * period;
    for (let tt = oldest; tt < tNow; tt += period) {
      const age = tNow - tt;
      const emitX = ((tt * vs * 5) % (W * 1.4)) - W * 0.2;
      const r = age * 250 * dpr;
      const alpha = Math.max(0, 0.5 - age * 0.15);
      ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
      ctx.lineWidth = 1.5 * dpr;
      ctx.beginPath(); ctx.arc(emitX, cy, r, 0, Math.PI * 2); ctx.stroke();
    }
    // Source
    ctx.fillStyle = "rgba(244,114,182,1)";
    ctx.beginPath(); ctx.arc(sx, cy, 8 * dpr, 0, Math.PI * 2); ctx.fill();
    // Observers
    ctx.fillStyle = "rgba(6,182,212,1)";
    ctx.beginPath(); ctx.arc(W - 30 * dpr, cy, 7 * dpr, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(30 * dpr, cy, 7 * dpr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText(`${fApproach.toFixed(0)} Hz`, W - 60 * dpr, cy - 14 * dpr);
    ctx.fillText(`${fRecede.toFixed(0)} Hz`, 24 * dpr, cy - 14 * dpr);
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="f' = f\dfrac{v}{v \mp v_s}"
      explanation={`Manba o'ngga harakatlanmoqda: o'ngdagi kuzatuvchi yuqoriroq (${fApproach.toFixed(0)} Hz), chapdagi pastroq (${fRecede.toFixed(0)} Hz) chastotani eshitadi.`}
      controls={
        <>
          <LabSlider label="Manba tezligi vₛ" value={vs} onChange={setVs} min={0} max={200} step={1} unit="m/s" />
          <LabSlider label="Asl chastota f" value={f} onChange={setF} min={100} max={1000} step={10} unit="Hz" />
        </>
      }
      results={
        <>
          <ResultRow k="Yaqinlashgan f'" v={`${fApproach.toFixed(1)} Hz`} />
          <ResultRow k="Uzoqlashgan f'" v={`${fRecede.toFixed(1)} Hz`} />
          <ResultRow k="Tovush tezligi" v={`${v} m/s`} />
        </>
      }
    />
  );
}
