import { Link } from "@tanstack/react-router";
import { Home, Beaker, FlaskConical, Sigma, BookOpen } from "lucide-react";

const items = [
  { to: "/" as const, label: "Bosh", icon: Home, exact: true },
  { to: "/laws" as const, label: "Qonun", icon: Beaker },
  { to: "/lab" as const, label: "Lab", icon: FlaskConical },
  { to: "/formulas" as const, label: "Formula", icon: Sigma },
  { to: "/kitob" as const, label: "Kitob", icon: BookOpen },
];

export function MobileTabBar() {
  return (
    <nav
      aria-label="Asosiy navigatsiya"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-background/80 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 0px)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <li key={it.to} className="flex-1">
              <Link
                to={it.to}
                activeOptions={{ exact: it.exact }}
                activeProps={{ className: "flex flex-col items-center gap-0.5 py-2.5 text-[oklch(0.74_0.16_210)]" }}
                inactiveProps={{ className: "flex flex-col items-center gap-0.5 py-2.5 text-muted-foreground" }}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{it.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
