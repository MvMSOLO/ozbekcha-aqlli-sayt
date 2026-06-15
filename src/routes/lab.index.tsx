import { createFileRoute, Link } from "@tanstack/react-router";
import { LABS } from "@/data/labs";
import { GlassCard } from "@/components/site/GlassCard";
import { Formula } from "@/components/site/Formula";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "Interaktiv laboratoriya — PhysicsLab" },
      { name: "description", content: "5 ta jonli fizika simulyatsiyasi: snaryad, mayatnik, to'lqin, prujina, Om zanjiri." },
      { property: "og:title", content: "Interaktiv laboratoriya — PhysicsLab" },
      { property: "og:description", content: "5 ta jonli fizika simulyatsiyasi: snaryad, mayatnik, to'lqin, prujina, Om zanjiri." },
    ],
  }),
  component: LabsIndex,
});

function LabsIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Laboratoriya</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Jonli <span className="gradient-text">tajribalar</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Slayderlarni harakatlantiring, parametrlarni o'zgartiring va fizika qonunlarini
          o'z ko'zingiz bilan ko'ring.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LABS.map((lab) => (
          <Link key={lab.slug} to="/lab/$slug" params={{ slug: lab.slug }}>
            <GlassCard className="group h-full p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{lab.category}</p>
              <h2 className="mt-1 text-lg font-semibold">{lab.title}</h2>
              <div className="mt-3 rounded-lg bg-black/30 p-3">
                <Formula tex={lab.formula} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{lab.shortDesc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs group-hover:gap-2 transition-all">
                Ochish <ArrowRight className="h-3 w-3" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
