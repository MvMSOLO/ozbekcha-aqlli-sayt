import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function GlassCard({
  children,
  className,
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass rounded-2xl",
        glow && "shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
