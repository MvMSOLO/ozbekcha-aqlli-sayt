import { useState } from "react";
import { Copy, Check, Heart } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { Formula as FormulaRender } from "./Formula";
import { useFavorites } from "@/hooks/useFavorites";
import type { Formula } from "@/data/formulas";

export function FormulaCard({ formula }: { formula: Formula }) {
  const { has, toggle } = useFavorites();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const fav = has("formula", formula.id);

  const copy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(formula.tex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { /* noop */ }
  };

  return (
    <GlassCard id={formula.id} className="group overflow-hidden transition-colors hover:border-white/20">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">
            <span>{formula.section}</span>
          </div>
          <h3 className="mt-1 truncate text-sm font-semibold text-foreground">{formula.name}</h3>
          <div className="mt-2"><FormulaRender tex={formula.tex} /></div>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{formula.desc}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); toggle("formula", formula.id); }}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-white/5 hover:text-[oklch(0.65_0.22_25)]"
            aria-label={fav ? "Sevimlidan olib tashlash" : "Sevimliga qo'shish"}
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-[oklch(0.65_0.22_25)] text-[oklch(0.65_0.22_25)]" : ""}`} />
          </button>
          <button
            onClick={copy}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-white/5 hover:text-foreground"
            aria-label="Formulani nusxalash"
          >
            {copied ? <Check className="h-4 w-4 text-[oklch(0.74_0.16_210)]" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </button>
      {open && (formula.symbols || formula.example) && (
        <div className="border-t border-white/5 bg-white/[0.02] px-4 py-3 space-y-3">
          {formula.symbols && (
            <div>
              <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Belgilar</p>
              <ul className="space-y-1 text-xs">
                {formula.symbols.map((s) => (
                  <li key={s.sym} className="flex items-baseline gap-2">
                    <span className="font-mono text-[oklch(0.74_0.16_210)]">{s.sym}</span>
                    <span className="text-muted-foreground">— {s.desc}</span>
                    {s.unit && <span className="ml-auto text-muted-foreground">[{s.unit}]</span>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {formula.example && (
            <div className="rounded-lg border border-white/5 bg-[oklch(0.2_0.05_150_/_0.15)] p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.78_0.15_150)]">Misol</p>
              <p className="mt-1 text-xs text-foreground">{formula.example.problem}</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">→ {formula.example.solution}</p>
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
}
