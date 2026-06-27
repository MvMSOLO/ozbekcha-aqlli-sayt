import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { CATEGORIES, FORMULAS, type FormulaCategory } from "@/data/formulas";
import { FormulaCard } from "@/components/site/FormulaCard";
import { useFavorites } from "@/hooks/useFavorites";

export const Route = createFileRoute("/formulas")({
  validateSearch: (s: Record<string, unknown>) => ({
    cat: (s.cat as string | undefined) ?? undefined,
    q: (s.q as string | undefined) ?? undefined,
  }),
  head: () => ({
    meta: [
      { title: "Formulalar — PhysicsLab" },
      { name: "description", content: "10-11 sinf fizika kursi bo'yicha 150+ formula: KaTeX, belgilar, misollar va kategoriya filtri." },
      { property: "og:title", content: "Formulalar — PhysicsLab" },
      { property: "og:description", content: "10-11 sinf fizika kursi bo'yicha 150+ formula: KaTeX, belgilar, misollar va kategoriya filtri." },
      { property: "og:url", content: "https://ozbekcha-aqlli-sayt.lovable.app/formulas" },
    ],
    links: [{ rel: "canonical", href: "https://ozbekcha-aqlli-sayt.lovable.app/formulas" }],
  }),
  component: FormulasPage,
});

function FormulasPage() {
  const { cat: initialCat, q: initialQ } = Route.useSearch();
  const [cat, setCat] = useState<FormulaCategory | "all" | "favorites">((initialCat as FormulaCategory) ?? "all");
  const [q, setQ] = useState(initialQ ?? "");
  const { favs } = useFavorites();

  const filtered = useMemo(() => {
    const lc = q.trim().toLowerCase();
    return FORMULAS.filter((f) => {
      if (cat === "favorites") {
        if (!favs.formula.includes(f.id)) return false;
      } else if (cat !== "all" && f.category !== cat) return false;
      if (!lc) return true;
      return (
        f.name.toLowerCase().includes(lc) ||
        f.desc.toLowerCase().includes(lc) ||
        f.tex.toLowerCase().includes(lc) ||
        f.section.toLowerCase().includes(lc)
      );
    });
  }, [cat, q, favs.formula]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    filtered.forEach((f) => {
      const key = `${f.category}::${f.section}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(f);
    });
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-24 sm:px-6 md:py-16 md:pb-16">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.74_0.16_210)]">Formulalar bazasi</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
          150+ <span className="gradient-text">fizika formulasi</span>
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          O'zbekiston 10-11 sinf dasturi bo'yicha barcha asosiy formulalar. Har biri tushuntirish, belgilar va misollar bilan.
        </p>
      </header>

      <div className="sticky top-[60px] z-30 -mx-4 mb-6 bg-background/70 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="relative mb-3">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Formula, mavzu yoki belgini qidiring..."
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-[oklch(0.62_0.21_275)] focus:outline-none focus:ring-2 focus:ring-[oklch(0.62_0.21_275)]/30"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-white/5"
              aria-label="Tozalash"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Pill active={cat === "all"} onClick={() => setCat("all")}>Barchasi ({FORMULAS.length})</Pill>
          <Pill active={cat === "favorites"} onClick={() => setCat("favorites")}>♥ Sevimlilar ({favs.formula.length})</Pill>
          {CATEGORIES.map((c) => (
            <Pill key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>
              <span className="mr-1">{c.emoji}</span>{c.title}
            </Pill>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-16 text-center">
          <p className="text-sm text-muted-foreground">Hech qanday formula topilmadi.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {grouped.map(([key, items]) => {
            const [catId, section] = key.split("::");
            const catMeta = CATEGORIES.find((c) => c.id === catId);
            return (
              <section key={key}>
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {catMeta?.emoji} {catMeta?.title} · <span className="text-foreground/80 normal-case tracking-normal">{section}</span>
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((f) => <FormulaCard key={f.id} formula={f} />)}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? "border-[oklch(0.62_0.21_275)]/60 bg-[oklch(0.62_0.21_275)]/20 text-foreground"
          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
