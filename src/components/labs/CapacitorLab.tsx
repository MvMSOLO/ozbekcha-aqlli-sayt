import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

export function CapacitorLab() {
  const [C, setC] = useState(100); // µF
  const [R, setR] = useState(10000); // Ω
  const [U, setU] = useState(9); // V

  const tau = (C * 1e-6) * R;

  const ref = useCanvas2D((ctx, W, H, dpr, t) => {
    ctx.clearRect(0, 0, W, H);
    const padL = 50 * dpr, padB = 30 * dpr;
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.beginPath(); ctx.moveTo(padL, 10 * dpr); ctx.lineTo(padL, H - padB); ctx.lineTo(W - 10 * dpr, H - padB); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,0.5)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText("U_C", 8 * dpr, 14 * dpr); ctx.fillText("t", W - 20 * dpr, H - 8 * dpr);
    // Plot u(t) = U(1 - e^{-t/τ}) and current
    const tWin = 5 * tau;
    const phase = (t % (tWin * 1.4)) / tWin;
    function draw(fn: (tt: number) => number, col: string, w = 2) {
      ctx.strokeStyle = col; ctx.lineWidth = w * dpr;
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const tt = (i / 200) * tWin;
        const v = fn(tt);
        const x = padL + (tt / tWin) * (W - padL - 10 * dpr);
        const y = H - padB - v * (H - padB - 10 * dpr);
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
    draw((tt) => 1 - Math.exp(-tt / tau), "rgba(99,102,241,0.95)");
    draw((tt) => Math.exp(-tt / tau), "rgba(244,114,182,0.7)", 1.5);
    // marker
    if (phase <= 1) {
      const tt = phase * tWin;
      const v = 1 - Math.exp(-tt / tau);
      const x = padL + (tt / tWin) * (W - padL - 10 * dpr);
      const y = H - padB - v * (H - padB - 10 * dpr);
      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(x, y, 5 * dpr, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = "rgba(99,102,241,0.9)";
    ctx.fillText("Uc(t)", W - 70 * dpr, 30 * dpr);
    ctx.fillStyle = "rgba(244,114,182,0.9)";
    ctx.fillText("i(t)", W - 70 * dpr, 44 * dpr);
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="u_C(t) = U(1 - e^{-t/RC}),\quad \tau = RC"
      explanation={`Vaqt doimiysi τ = ${tau.toFixed(3)} s. 5τ vaqtdan keyin kondensator deyarli to'la zaryadlanadi.`}
      controls={
        <>
          <LabSlider label="Sig'im C" value={C} onChange={setC} min={10} max={1000} step={10} unit="µF" />
          <LabSlider label="Qarshilik R" value={R / 1000} onChange={(v) => setR(v * 1000)} min={1} max={100} step={1} unit="kΩ" />
          <LabSlider label="Kuchlanish U" value={U} onChange={setU} min={1} max={24} step={0.5} unit="V" />
        </>
      }
      results={
        <>
          <ResultRow k="τ = RC" v={`${tau.toFixed(3)} s`} />
          <ResultRow k="Maksimal zaryad" v={`${(C * 1e-6 * U * 1000).toFixed(2)} mC`} />
          <ResultRow k="Energiya" v={`${(0.5 * C * 1e-6 * U * U * 1000).toFixed(2)} mJ`} />
        </>
      }
    />
  );
}
