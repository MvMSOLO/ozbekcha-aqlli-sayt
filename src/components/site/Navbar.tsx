import { Link } from "@tanstack/react-router";
import { Atom, Search, Settings as SettingsIcon, Heart } from "lucide-react";

const items: { to: "/" | "/laws" | "/lab" | "/formulas"; label: string; exact?: boolean }[] = [
  { to: "/", label: "Bosh sahifa", exact: true },
  { to: "/laws", label: "Qonunlar" },
  { to: "/lab", label: "Laboratoriya" },
  { to: "/formulas", label: "Formulalar" },
];

export function Navbar({
  onOpenSearch,
  onOpenSettings,
}: {
  onOpenSearch: () => void;
  onOpenSettings: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[oklch(0.62_0.21_275)] via-[oklch(0.74_0.16_210)] to-[oklch(0.65_0.21_305)] shadow-[var(--shadow-glow)]">
            <Atom className="h-5 w-5 text-white" />
          </span>
          <span className="text-base font-semibold tracking-tight">
            Physics<span className="gradient-text">Lab</span>
          </span>
        </Link>
        <ul className="hidden items-center gap-1 text-sm md:flex">
          {items.map((it) => (
            <li key={it.to}>
              <Link
                to={it.to}
                activeOptions={{ exact: it.exact }}
                activeProps={{ className: "px-3 py-1.5 rounded-full bg-white/10 text-foreground border border-white/10" }}
                inactiveProps={{ className: "px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors" }}
              >
                {it.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-1">
          <button
            onClick={onOpenSearch}
            className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground sm:flex"
            aria-label="Qidiruv"
          >
            <Search className="h-3.5 w-3.5" />
            <span>Qidiruv</span>
            <kbd className="ml-1 rounded border border-white/10 px-1 text-[10px]">⌘K</kbd>
          </button>
          <button onClick={onOpenSearch} className="rounded-md p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground sm:hidden" aria-label="Qidiruv">
            <Search className="h-4 w-4" />
          </button>
          <Link to="/favorites" className="rounded-md p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground" aria-label="Sevimlilar">
            <Heart className="h-4 w-4" />
          </Link>
          <button onClick={onOpenSettings} className="rounded-md p-2 text-muted-foreground hover:bg-white/5 hover:text-foreground" aria-label="Sozlamalar">
            <SettingsIcon className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
