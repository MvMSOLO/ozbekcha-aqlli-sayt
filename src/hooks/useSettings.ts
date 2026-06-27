import { useCallback, useEffect, useState } from "react";

export type FontSize = "sm" | "md" | "lg";
export interface Settings {
  reducedMotion: boolean;
  fontSize: FontSize;
}
const KEY = "physicslab:settings:v1";
const DEFAULT: Settings = { reducedMotion: false, fontSize: "md" };

function read(): Settings {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return DEFAULT;
  }
}

function apply(s: Settings) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.dataset.fontSize = s.fontSize;
  root.dataset.reducedMotion = s.reducedMotion ? "true" : "false";
  const sizes: Record<FontSize, string> = { sm: "15px", md: "16px", lg: "18px" };
  root.style.fontSize = sizes[s.fontSize];
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  useEffect(() => {
    const s = read();
    setSettings(s);
    apply(s);
  }, []);
  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(KEY, JSON.stringify(next));
      apply(next);
      return next;
    });
  }, []);
  return { settings, update };
}
