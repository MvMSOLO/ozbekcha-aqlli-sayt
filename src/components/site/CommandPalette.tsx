import { useNavigate } from "@tanstack/react-router";
import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { Atom, Beaker, FlaskConical, Heart, Search, Settings } from "lucide-react";
import { LAWS } from "@/data/laws";
import { LABS } from "@/data/labs";
import { FORMULAS, CATEGORIES } from "@/data/formulas";

export function CommandPalette({
  open,
  onOpenChange,
  onOpenSettings,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onOpenSettings: () => void;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  const go = (path: string) => {
    onOpenChange(false);
    setQ("");
    navigate({ to: path as never });
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm p-4 pt-[10vh]"
      onClick={() => onOpenChange(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-xl">
        <Command
          className="glass overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
          label="Qidiruv"
        >
          <div className="flex items-center gap-2 border-b border-white/5 px-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Command.Input
              value={q}
              onValueChange={setQ}
              placeholder="Qonun, lab, formula qidiring..."
              className="h-12 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              autoFocus
            />
            <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-muted-foreground">
              ESC
            </kbd>
          </div>
          <Command.List className="max-h-[60vh] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              Hech narsa topilmadi
            </Command.Empty>

            <Command.Group heading="Tezkor" className="text-xs text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5">
              <Item icon={<Atom className="h-4 w-4 text-[oklch(0.74_0.16_210)]" />} label="Bosh sahifa" onSelect={() => go("/")} />
              <Item icon={<Beaker className="h-4 w-4 text-[oklch(0.62_0.21_275)]" />} label="Qonunlar" onSelect={() => go("/laws")} />
              <Item icon={<FlaskConical className="h-4 w-4 text-[oklch(0.65_0.21_305)]" />} label="Laboratoriya" onSelect={() => go("/lab")} />
              <Item icon={<Atom className="h-4 w-4 text-[oklch(0.74_0.16_210)]" />} label="Formulalar" onSelect={() => go("/formulas")} />
              <Item icon={<Heart className="h-4 w-4 text-[oklch(0.65_0.22_25)]" />} label="Sevimlilar" onSelect={() => go("/favorites")} />
              <Item icon={<Settings className="h-4 w-4 text-muted-foreground" />} label="Sozlamalar" onSelect={() => { onOpenChange(false); onOpenSettings(); }} />
            </Command.Group>

            <Command.Group heading="Qonunlar">
              {LAWS.map((law) => (
                <Item key={law.slug} label={law.title} hint={law.category} onSelect={() => go(`/laws/${law.slug}`)} />
              ))}
            </Command.Group>

            <Command.Group heading="Laboratoriyalar">
              {LABS.map((lab) => (
                <Item key={lab.slug} label={lab.title} hint={lab.category} onSelect={() => go(`/lab/${lab.slug}`)} />
              ))}
            </Command.Group>

            <Command.Group heading="Formulalar">
              {FORMULAS.slice(0, 200).map((fr) => (
                <Item
                  key={fr.id}
                  label={fr.name}
                  hint={CATEGORIES.find((c) => c.id === fr.category)?.title}
                  onSelect={() => go(`/formulas?cat=${fr.category}#${fr.id}`)}
                />
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Item({ icon, label, hint, onSelect }: { icon?: React.ReactNode; label: string; hint?: string; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground aria-selected:bg-white/10"
    >
      {icon}
      <span className="flex-1 truncate">{label}</span>
      {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
    </Command.Item>
  );
}
