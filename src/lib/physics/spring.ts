// Hooke's law spring-mass oscillator.
export interface SpringState {
  x: number; // displacement (m)
  v: number; // velocity (m/s)
}

export function springStep(state: SpringState, k: number, m: number, damping: number, dt: number): SpringState {
  const a = (-k * state.x - damping * state.v) / m;
  const v = state.v + a * dt;
  const x = state.x + v * dt;
  return { x, v };
}

export function springEnergy(state: SpringState, k: number, m: number) {
  const Ek = 0.5 * m * state.v * state.v;
  const Ep = 0.5 * k * state.x * state.x;
  return { Ek, Ep, total: Ek + Ep };
}

export function angularFreq(k: number, m: number) {
  return Math.sqrt(k / m);
}
