// 2D wave interference from two point sources.
export interface WaveSource {
  x: number;
  y: number;
  freq: number; // Hz
  amp: number;
  phase: number; // rad
}

const SPEED = 80; // arbitrary px/s
export function waveAt(px: number, py: number, t: number, sources: WaveSource[]) {
  let sum = 0;
  for (const s of sources) {
    const dx = px - s.x;
    const dy = py - s.y;
    const r = Math.sqrt(dx * dx + dy * dy);
    const k = (2 * Math.PI * s.freq) / SPEED;
    const omega = 2 * Math.PI * s.freq;
    sum += s.amp * Math.cos(k * r - omega * t + s.phase);
  }
  return sum;
}
