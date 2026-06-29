import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LABS, LAB_CATEGORIES, type LabCategory } from "@/data/labs";
import { GlassCard } from "@/components/site/GlassCard";
import { Formula } from "@/components/site/Formula";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/lab/")({
  head: () => ({
    meta: [
      { title: "Interaktiv laboratoriya — PhysicsLab" },
      { name: "description", content: "21 ta jonli fizika simulyatsiyasi: mexanika, optika, elektromagnetizm, atom va yadro." },
      { property: "og:title", content: "Interaktiv laboratoriya — PhysicsLab" },
      { property: "og:description", content: "21 ta jonli fizika simulyatsiyasi: mexanika, optika, elektromagnetizm, atom va yadro." },
    ],
  }),
  component: LabsIndex,
});

function LabsIndex() {
  const [cat, setCat] = useState<LabCategory | "Hammasi">("Hammasi");
  const list = useMemo(
    () => (cat === "Hammasi" ? LABS : LABS.filter((l) => l.category === cat)),
    [cat],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Laboratoriya</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          {LABS.length} ta jonli <span className="gradient-text">tajriba</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Slayderlarni harakatlantiring, parametrlarni o'zgartiring va fizika qonunlarini o'z ko'zingiz bilan ko'ring.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {(["Hammasi", ...LAB_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              cat === c
                ? "border-white/30 bg-white/15 text-foreground"
                : "border-white/10 bg-white/5 text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((lab) => (
          <Link key={lab.slug} to="/lab/$slug" params={{ slug: lab.slug }}>
            <GlassCard className="group h-full p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{lab.category}</p>
              <h2 className="mt-1 text-lg font-semibold">{lab.title}</h2>
              <div className="mt-3 rounded-lg bg-black/30 p-3">
                <Formula tex={lab.formula} />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{lab.shortDesc}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-xs transition-all group-hover:gap-2">
                Ochish <ArrowRight className="h-3 w-3" />
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
