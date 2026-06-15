import { Link } from "@tanstack/react-router";
import { Atom } from "lucide-react";

const items: { to: "/" | "/laws" | "/lab"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Bosh sahifa", exact: true },
  { to: "/laws", label: "Qonunlar" },
  { to: "/lab", label: "Laboratoriya" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.62_0.21_275)] via-[oklch(0.74_0.16_210)] to-[oklch(0.65_0.21_305)] shadow-[var(--shadow-glow)]">
            <Atom className="h-5 w-5 text-white" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Physics<span className="gradient-text">Lab</span>
          </span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {items.map((it) => (
            <li key={it.to}>
              <Link
                to={it.to}
                activeOptions={{ exact: it.exact }}
                activeProps={{
                  className:
                    "px-3 py-1.5 rounded-full bg-white/10 text-foreground border border-white/10",
                }}
                inactiveProps={{
                  className:
                    "px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors",
                }}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
