import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getLaw } from "@/data/laws";
import { GlassCard } from "@/components/site/GlassCard";
import { Formula } from "@/components/site/Formula";
import { ArrowLeft, FlaskConical } from "lucide-react";

export const Route = createFileRoute("/laws/$slug")({
  loader: ({ params }) => {
    const law = getLaw(params.slug);
    if (!law) throw notFound();
    return { law };
  },
  head: ({ loaderData }) => {
    const law = loaderData?.law;
    const title = law ? `${law.title} — PhysicsLab` : "Qonun — PhysicsLab";
    const desc = law?.shortDesc ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        ...(law?.image ? [{ property: "og:image" as const, content: law.image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Qonun topilmadi</h1>
      <Link to="/laws" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← Qonunlar ro'yxatiga
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Xatolik yuz berdi</h1>
      <button onClick={reset} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm">Qayta urinish</button>
    </div>
  ),
  component: LawDetail,
});

function LawDetail() {
  const { law } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link to="/laws" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Qonunlar
      </Link>

      <header className="mt-4">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{law.category}</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{law.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{law.shortDesc}</p>
      </header>

      <GlassCard className="mt-8 p-6" glow>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Formula</p>
        <div className="mt-3 text-2xl">
          <Formula tex={law.formula} />
        </div>
      </GlassCard>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <GlassCard className="p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ta'rif</h2>
          <p className="text-base leading-relaxed">{law.statement}</p>
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">O'zgaruvchilar</h2>
          <table className="w-full text-sm">
            <tbody>
              {law.variables.map((v) => (
                <tr key={v.symbol} className="border-b border-white/5 last:border-0">
                  <td className="py-2 pr-3 align-top">
                    <Formula tex={v.symbol} inline />
                  </td>
                  <td className="py-2 pr-3 text-muted-foreground">{v.name}</td>
                  <td className="py-2 text-right font-mono text-xs text-foreground/80">
                    <Formula tex={v.unit} inline />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <GlassCard className="overflow-hidden">
          <img
            src={law.image}
            alt={law.imageAlt}
            loading="lazy"
            className="h-64 w-full object-cover md:h-full"
          />
        </GlassCard>
        <GlassCard className="p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Hayotdan misol
          </h2>
          <p className="text-base leading-relaxed">{law.example}</p>
          {law.relatedLab && (
            <Link
              to="/lab/$slug"
              params={{ slug: law.relatedLab }}
              className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
              style={{ background: "var(--gradient-hero)" }}
            >
              <FlaskConical className="h-4 w-4" /> Tegishli laboratoriya
            </Link>
          )}
        </GlassCard>
      </section>
    </article>
  );
}
