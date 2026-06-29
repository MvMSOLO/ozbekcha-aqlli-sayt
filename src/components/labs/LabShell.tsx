import type { ReactNode } from "react";
import { GlassCard } from "@/components/site/GlassCard";
import { Formula } from "@/components/site/Formula";

export function LabShell({
  canvas,
  controls,
  results,
  formula,
  explanation,
  canvasHeight = "h-[420px]",
}: {
  canvas: ReactNode;
  controls: ReactNode;
  results?: ReactNode;
  formula?: string;
  explanation?: ReactNode;
  canvasHeight?: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4 min-w-0">
        <GlassCard className={`overflow-hidden ${canvasHeight}`}>{canvas}</GlassCard>
        {(formula || explanation) && (
          <GlassCard className="space-y-3 p-5">
            {formula && (
              <div className="rounded-lg bg-black/30 p-3">
                <Formula tex={formula} />
              </div>
            )}
            {explanation && <p className="text-sm text-muted-foreground">{explanation}</p>}
          </GlassCard>
        )}
      </div>
      <div className="space-y-4">
        <GlassCard className="p-5">
          <h3 className="mb-4 text-sm font-semibold">Boshqaruv</h3>
          <div className="space-y-5">{controls}</div>
        </GlassCard>
        {results && (
          <GlassCard className="p-5">
            <h3 className="mb-3 text-sm font-semibold">Natijalar</h3>
            <dl className="space-y-2 font-mono text-sm">{results}</dl>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

export function ResultRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-2 border-b border-white/5 pb-1">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  );
}
