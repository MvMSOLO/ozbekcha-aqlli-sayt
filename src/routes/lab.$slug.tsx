import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { getLab } from "@/data/labs";
import { Formula } from "@/components/site/Formula";
import { ArrowLeft } from "lucide-react";

const ProjectileLab = lazy(() => import("@/components/labs/ProjectileLab").then((m) => ({ default: m.ProjectileLab })));
const PendulumLab = lazy(() => import("@/components/labs/PendulumLab").then((m) => ({ default: m.PendulumLab })));
const WaveLab = lazy(() => import("@/components/labs/WaveLab").then((m) => ({ default: m.WaveLab })));
const SpringLab = lazy(() => import("@/components/labs/SpringLab").then((m) => ({ default: m.SpringLab })));
const OhmLab = lazy(() => import("@/components/labs/OhmLab").then((m) => ({ default: m.OhmLab })));

export const Route = createFileRoute("/lab/$slug")({
  loader: ({ params }) => {
    const lab = getLab(params.slug);
    if (!lab) throw notFound();
    return { lab };
  },
  head: ({ loaderData }) => {
    const lab = loaderData?.lab;
    const title = lab ? `${lab.title} — Laboratoriya` : "Laboratoriya — PhysicsLab";
    const desc = lab?.shortDesc ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Laboratoriya topilmadi</h1>
      <Link to="/lab" className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← Barcha laboratoriyalar
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold">Xatolik yuz berdi</h1>
      <button onClick={reset} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm">Qayta urinish</button>
    </div>
  ),
  component: LabPage,
});

function LabPage() {
  const { lab } = Route.useLoaderData();
  const Component = pick(lab.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link to="/lab" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3 w-3" /> Laboratoriya
      </Link>
      <header className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{lab.category}</p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{lab.title}</h1>
          <p className="mt-2 text-muted-foreground">{lab.shortDesc}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
          <Formula tex={lab.formula} />
        </div>
      </header>

      <div className="mt-8">
        <Suspense fallback={<div className="h-[420px] animate-pulse rounded-2xl bg-white/5" />}>
          <Component />
        </Suspense>
      </div>
    </div>
  );
}

function pick(slug: string) {
  switch (slug) {
    case "snaryad": return ProjectileLab;
    case "mayatnik": return PendulumLab;
    case "tolqin": return WaveLab;
    case "prujina": return SpringLab;
    case "om": return OhmLab;
    default: return ProjectileLab;
  }
}
