import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { FORMULAS } from "@/data/formulas";
import { LAWS } from "@/data/laws";
import { LABS } from "@/data/labs";
import { FormulaCard } from "@/components/site/FormulaCard";
import { GlassCard } from "@/components/site/GlassCard";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Sevimlilar — PhysicsLab" },
      { name: "description", content: "Sevimli qonun, lab va formulalaringizni bir joyda saqlang." },
      { property: "og:url", content: "https://ozbekcha-aqlli-sayt.lovable.app/favorites" },
    ],
    links: [{ rel: "canonical", href: "https://ozbekcha-aqlli-sayt.lovable.app/favorites" }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favs } = useFavorites();
  const favLaws = LAWS.filter((l) => favs.law.includes(l.slug));
  const favLabs = LABS.filter((l) => favs.lab.includes(l.slug));
  const favFormulas = FORMULAS.filter((f) => favs.formula.includes(f.id));
  const empty = favLaws.length + favLabs.length + favFormulas.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-24 sm:px-6 md:py-16">
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.65_0.22_25)]">Sizning to'plamingiz</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-5xl">
          <span className="gradient-text">Sevimlilar</span>
        </h1>
      </header>

      {empty ? (
        <GlassCard className="py-16 text-center">
          <Heart className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 text-sm text-muted-foreground">Hozircha sevimlilar yo'q. Yurak belgisi bilan qo'shing.</p>
        </GlassCard>
      ) : (
        <div className="space-y-10">
          {favLaws.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Qonunlar</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {favLaws.map((l) => (
                  <Link key={l.slug} to="/laws/$slug" params={{ slug: l.slug }}>
                    <GlassCard className="p-4 hover:border-white/20">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{l.category}</p>
                      <p className="mt-1 font-semibold">{l.title}</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {favLabs.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Laboratoriyalar</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {favLabs.map((l) => (
                  <Link key={l.slug} to="/lab/$slug" params={{ slug: l.slug }}>
                    <GlassCard className="p-4 hover:border-white/20">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{l.category}</p>
                      <p className="mt-1 font-semibold">{l.title}</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {favFormulas.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Formulalar</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {favFormulas.map((f) => <FormulaCard key={f.id} formula={f} />)}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
