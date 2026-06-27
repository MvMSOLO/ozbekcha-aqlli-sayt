import { useCallback, useEffect, useState } from "react";

export type FavKind = "formula" | "law" | "lab";

const KEY = "physicslab:favorites:v1";

function read(): Record<FavKind, string[]> {
  if (typeof window === "undefined") return { formula: [], law: [], lab: [] };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { formula: [], law: [], lab: [] };
    const p = JSON.parse(raw);
    return { formula: p.formula ?? [], law: p.law ?? [], lab: p.lab ?? [] };
  } catch {
    return { formula: [], law: [], lab: [] };
  }
}

export function useFavorites() {
  const [favs, setFavs] = useState<Record<FavKind, string[]>>({ formula: [], law: [], lab: [] });

  useEffect(() => {
    setFavs(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setFavs(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: Record<FavKind, string[]>) => {
    setFavs(next);
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(next));
  }, []);

  const toggle = useCallback(
    (kind: FavKind, id: string) => {
      const cur = favs[kind];
      const exists = cur.includes(id);
      const nextList = exists ? cur.filter((x) => x !== id) : [...cur, id];
      persist({ ...favs, [kind]: nextList });
    },
    [favs, persist],
  );

  const has = useCallback((kind: FavKind, id: string) => favs[kind].includes(id), [favs]);

  return { favs, toggle, has };
}
