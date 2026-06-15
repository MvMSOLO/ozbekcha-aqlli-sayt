// Pure physics functions for projectile motion.
export interface ProjectileParams {
  v0: number; // m/s
  angleDeg: number; // 0-90
  g: number; // m/s^2
}

export interface ProjectileMetrics {
  range: number;
  maxHeight: number;
  flightTime: number;
}

export function projectileMetrics({ v0, angleDeg, g }: ProjectileParams): ProjectileMetrics {
  const a = (angleDeg * Math.PI) / 180;
  const vx = v0 * Math.cos(a);
  const vy = v0 * Math.sin(a);
  const flightTime = (2 * vy) / g;
  const range = vx * flightTime;
  const maxHeight = (vy * vy) / (2 * g);
  return { range, maxHeight, flightTime };
}

export function projectilePoint(t: number, p: ProjectileParams) {
  const a = (p.angleDeg * Math.PI) / 180;
  return {
    x: p.v0 * Math.cos(a) * t,
    y: p.v0 * Math.sin(a) * t - 0.5 * p.g * t * t,
  };
}
