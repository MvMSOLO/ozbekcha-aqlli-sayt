import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { LAWS, CATEGORIES, type LawCategory } from "@/data/laws";
import { GlassCard } from "@/components/site/GlassCard";
import { Formula } from "@/components/site/Formula";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/laws")({
  head: () => ({
    meta: [
      { title: "Qonunlar kutubxonasi — PhysicsLab" },
      { name: "description", content: "Fizika qonunlari: formulalar, izohlar va real hayotdagi misollar." },
      { property: "og:title", content: "Qonunlar kutubxonasi — PhysicsLab" },
      { property: "og:description", content: "Fizika qonunlari: formulalar, izohlar va real hayotdagi misollar." },
    ],
  }),
  component: LawsPage,
});

function LawsPage() {
  const [active, setActive] = useState<LawCategory | "Hammasi">("Hammasi");
  const filtered = useMemo(
    () => (active === "Hammasi" ? LAWS : LAWS.filter((l) => l.category === active)),
    [active],
  );

  const tabs: (LawCategory | "Hammasi")[] = ["Hammasi", ...CATEGORIES];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Qonunlar</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Fizika <span className="gradient-text">qonunlari</span> kutubxonasi
        </h1>
        <p className="mt-3 text-muted-foreground">
          Har bir qonun — chiroyli formula, sodda tushuntirish va hayotiy misol bilan.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={
              "rounded-full px-3 py-1.5 text-xs transition-colors " +
              (active === t
                ? "bg-white/15 text-foreground border border-white/20"
                : "border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((law) => (
          <Link key={law.slug} to="/laws/$slug" params={{ slug: law.slug }}>
            <GlassCard className="group h-full p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{law.category}</p>
              <h2 className="mt-1 text-base font-semibold leading-tight">{law.title}</h2>
              <div className="mt-3 rounded-lg bg-black/30 p-3">
                <Formula tex={law.formula} />
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{law.shortDesc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs text-foreground/80 group-hover:gap-2 transition-all">
                Batafsil <ArrowRight className="h-3 w-3" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
