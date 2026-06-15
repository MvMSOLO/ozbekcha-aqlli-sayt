import { createFileRoute, Link } from "@tanstack/react-router";
import { ParticleField } from "@/components/site/ParticleField";
import { GlassCard } from "@/components/site/GlassCard";
import { Formula } from "@/components/site/Formula";
import { LAWS } from "@/data/laws";
import { LABS } from "@/data/labs";
import { ArrowRight, BookOpen, FlaskConical, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PhysicsLab — Fizikani interaktiv o'rganing" },
      { name: "description", content: "Fizika qonunlari, formulalar va jonli laboratoriya tajribalari — barchasi bir joyda, o'zbek tilida." },
      { property: "og:title", content: "PhysicsLab — Fizikani interaktiv o'rganing" },
      { property: "og:description", content: "Fizika qonunlari, formulalar va jonli laboratoriya tajribalari — barchasi bir joyda, o'zbek tilida." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <ParticleField className="absolute inset-0 h-full w-full opacity-70" />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" /> Interaktiv fizika platformasi
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
              Fizikani <span className="gradient-text">ko'rib</span>, <br className="hidden sm:block" />
              his qilib o'rganing
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Qonunlar, formulalar va jonli laboratoriya tajribalari — bir vaqtning o'zida.
              O'zgartiring, sinab ko'ring, tushuning.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/lab"
                className="group inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
                style={{ background: "var(--gradient-hero)" }}
              >
                Laboratoriyani ochish
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/laws"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium hover:bg-white/10"
              >
                Qonunlarni ko'rish
              </Link>
            </div>

            {/* Floating formulae */}
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["F = ma", "E = mc^2", "T = 2\\pi\\sqrt{L/g}", "I = U/R"].map((t) => (
                <GlassCard key={t} className="px-3 py-4 text-center">
                  <Formula tex={t} />
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FeatureCard
            icon={<BookOpen className="h-5 w-5" />}
            title="Qonunlar kutubxonasi"
            desc="11 ta asosiy fizika qonuni, chiroyli formulalar va real hayotdagi misollar."
            to="/laws"
            ctaText="Qonunlarni o'rganish"
          />
          <FeatureCard
            icon={<FlaskConical className="h-5 w-5" />}
            title="Interaktiv laboratoriya"
            desc="5 ta jonli simulyatsiya — slayderlarni harakatlantiring va natijani darhol ko'ring."
            to="/lab"
            ctaText="Tajribani boshlash"
          />
        </div>

        {/* Preview labs */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Mashhur laboratoriyalar</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LABS.slice(0, 3).map((lab) => (
              <Link key={lab.slug} to="/lab/$slug" params={{ slug: lab.slug }}>
                <GlassCard className="group h-full p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{lab.category}</p>
                  <h3 className="mt-2 text-lg font-semibold">{lab.title}</h3>
                  <div className="mt-3 rounded-lg bg-black/30 p-3">
                    <Formula tex={lab.formula} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{lab.shortDesc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs text-foreground/80 group-hover:gap-2 transition-all">
                    Ochish <ArrowRight className="h-3 w-3" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>

        {/* Preview laws */}
        <div className="mt-16">
          <h2 className="mb-6 text-2xl font-semibold sm:text-3xl">Asosiy qonunlar</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LAWS.slice(0, 6).map((law) => (
              <Link key={law.slug} to="/laws/$slug" params={{ slug: law.slug }}>
                <GlassCard className="h-full p-4 transition-all hover:-translate-y-0.5">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{law.category}</p>
                  <h3 className="mt-1 text-base font-semibold">{law.title}</h3>
                  <div className="mt-2"><Formula tex={law.formula} /></div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon, title, desc, to, ctaText,
}: { icon: React.ReactNode; title: string; desc: string; to: "/laws" | "/lab"; ctaText: string }) {
  return (
    <Link to={to} className="block">
      <GlassCard className="group h-full p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.62_0.21_275)] to-[oklch(0.74_0.16_210)]">
            {icon}
          </span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{desc}</p>
        <div className="mt-4 inline-flex items-center gap-1 text-sm text-foreground group-hover:gap-2 transition-all">
          {ctaText} <ArrowRight className="h-4 w-4" />
        </div>
      </GlassCard>
    </Link>
  );
}
