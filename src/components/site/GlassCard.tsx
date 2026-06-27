import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function GlassCard({ children, className, glow = false, ...rest }: GlassCardProps) {
  return (
    <div
      {...rest}
      className={cn("glass rounded-2xl", glow && "shadow-[var(--shadow-glow)]", className)}
    >
      {children}
    </div>
  );
}
