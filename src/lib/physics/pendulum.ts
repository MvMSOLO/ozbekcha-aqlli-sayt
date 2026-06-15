// Simple pendulum (small-angle period; full dynamics via numerical integration).
export function pendulumPeriod(L: number, g: number) {
  return 2 * Math.PI * Math.sqrt(L / g);
}

export interface PendulumState {
  theta: number; // rad
  omega: number; // rad/s
}

export function pendulumStep(
  state: PendulumState,
  L: number,
  g: number,
  damping: number,
  dt: number,
): PendulumState {
  // theta'' = -(g/L) sin(theta) - damping * theta'
  const alpha = -(g / L) * Math.sin(state.theta) - damping * state.omega;
  const omega = state.omega + alpha * dt;
  const theta = state.theta + omega * dt;
  return { theta, omega };
}
