import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSettings, type FontSize } from "@/hooks/useSettings";
import { Switch } from "@/components/ui/switch";

export function SettingsDrawer({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { settings, update } = useSettings();
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="border-l border-white/10 bg-background/95 backdrop-blur-xl">
        <SheetHeader>
          <SheetTitle>Sozlamalar</SheetTitle>
          <SheetDescription>Ko'rinish va qulayliklarni o'zgartiring</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6 px-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Animatsiyalarni kamaytirish</p>
              <p className="text-xs text-muted-foreground">Tinch va kam harakatli rejim</p>
            </div>
            <Switch checked={settings.reducedMotion} onCheckedChange={(v) => update({ reducedMotion: v })} />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Shrift o'lchami</p>
            <div className="grid grid-cols-3 gap-2">
              {(["sm", "md", "lg"] as FontSize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => update({ fontSize: size })}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    settings.fontSize === size
                      ? "border-primary bg-primary/15 text-foreground"
                      : "border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {size === "sm" ? "Kichik" : size === "md" ? "O'rta" : "Katta"}
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-muted-foreground">
            <p>Tezkor maslahatlar:</p>
            <ul className="mt-2 space-y-1">
              <li>• Qidiruv: <kbd className="rounded border border-white/10 px-1">Ctrl/⌘ + K</kbd></li>
              <li>• Sevimlilar har sahifada yurak orqali</li>
              <li>• Formulani nusxalash uchun bir bosish kifoya</li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
