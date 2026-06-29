import { useState } from "react";
import { LabShell, ResultRow } from "./LabShell";
import { LabSlider } from "./LabSlider";
import { useCanvas2D } from "./useCanvas2D";

function wavelengthToRGB(nm: number): string {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 780) { r = 1; }
  return `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`;
}

export function YoungLab() {
  const [lambda, setLambda] = useState(550);
  const [d, setD] = useState(0.2); // mm
  const [L, setL] = useState(2); // m
  const dx = ((lambda * 1e-9) * L) / (d * 1e-3); // m
  const color = wavelengthToRGB(lambda);

  const ref = useCanvas2D((ctx, W, H, dpr) => {
    ctx.clearRect(0, 0, W, H);
    // Screen intensity pattern across width
    const cx = W / 2;
    const spacing = dx * 1000; // mm
    const pxPerMm = (W * 0.9) / 40; // 40mm screen
    ctx.fillStyle = "black"; ctx.fillRect(0, 0, W, H);
    for (let x = 0; x < W; x++) {
      const pos = (x - cx) / (pxPerMm * dpr);
      const phase = (Math.PI * pos) / spacing;
      const I = Math.cos(phase) ** 2;
      const [r, g, b] = color.match(/\d+/g)!.map(Number);
      ctx.fillStyle = `rgba(${r},${g},${b},${I})`;
      ctx.fillRect(x, H * 0.25, 1, H * 0.5);
    }
    // Frame
    ctx.strokeStyle = "rgba(255,255,255,0.15)";
    ctx.strokeRect(0, H * 0.25, W, H * 0.5);
    ctx.fillStyle = "rgba(255,255,255,0.6)"; ctx.font = `${11 * dpr}px monospace`;
    ctx.fillText(`Δx = ${(dx * 1000).toFixed(2)} mm`, 12 * dpr, 18 * dpr);
    ctx.fillStyle = color;
    ctx.fillText(`λ = ${lambda} nm`, 12 * dpr, 32 * dpr);
  });

  return (
    <LabShell
      canvas={<canvas ref={ref} className="h-full w-full" />}
      formula="\Delta x = \dfrac{\lambda L}{d}"
      explanation={`Ikki tirqishdan o'tgan yorug'lik ekranda yorug' va qorong'i yo'l-yo'l naqsh beradi. Maksimumlar oralig'i Δx = ${(dx * 1000).toFixed(2)} mm.`}
      controls={
        <>
          <LabSlider label="To'lqin uzunligi λ" value={lambda} onChange={setLambda} min={380} max={750} step={5} unit="nm" />
          <LabSlider label="Tirqishlar oralig'i d" value={d} onChange={setD} min={0.05} max={1} step={0.01} unit="mm" />
          <LabSlider label="Ekrangacha L" value={L} onChange={setL} min={0.5} max={5} step={0.1} unit="m" />
        </>
      }
      results={
        <>
          <ResultRow k="Naqsh qadami Δx" v={`${(dx * 1000).toFixed(3)} mm`} />
          <ResultRow k="Rang" v={`${lambda < 450 ? "binafsha/ko'k" : lambda < 510 ? "zangori" : lambda < 580 ? "yashil" : lambda < 645 ? "sariq/qizg'ish" : "qizil"}`} />
        </>
      }
    />
  );
}
