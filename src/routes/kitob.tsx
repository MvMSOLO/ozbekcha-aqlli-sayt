import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { get, set, del } from "idb-keyval";
import { GlassCard } from "@/components/site/GlassCard";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, BookOpen } from "lucide-react";

const KEY_FILE = "kitob:file";
const KEY_NAME = "kitob:name";
const KEY_OFFSET = "kitob:offset";

export const Route = createFileRoute("/kitob")({
  head: () => ({
    meta: [
      { title: "Kitob — PhysicsLab" },
      { name: "description", content: "Fizika darsligini brauzerda oching, sahifa raqami offset bilan sinxronlang." },
      { property: "og:title", content: "Kitob — PhysicsLab" },
      { property: "og:description", content: "PDF darslikni faqat brauzerda saqlab o'qing." },
    ],
  }),
  component: KitobPage,
});

function KitobPage() {
  const [url, setUrl] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [bookPage, setBookPage] = useState<string>("1");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const blob = await get<Blob>(KEY_FILE);
      const n = await get<string>(KEY_NAME);
      const o = await get<number>(KEY_OFFSET);
      if (blob) setUrl(URL.createObjectURL(blob));
      if (n) setName(n);
      if (typeof o === "number") setOffset(o);
    })();
  }, []);

  async function onFile(file: File) {
    if (file.type !== "application/pdf") {
      alert("Iltimos, PDF fayl tanlang");
      return;
    }
    await set(KEY_FILE, file);
    await set(KEY_NAME, file.name);
    setName(file.name);
    if (url) URL.revokeObjectURL(url);
    setUrl(URL.createObjectURL(file));
  }

  async function clearFile() {
    await del(KEY_FILE);
    await del(KEY_NAME);
    if (url) URL.revokeObjectURL(url);
    setUrl(null);
    setName("");
  }

  async function saveOffset(v: number) {
    setOffset(v);
    await set(KEY_OFFSET, v);
  }

  const pdfPage = Number(bookPage) + offset;
  const pdfUrl = url ? `${url}#page=${pdfPage}&toolbar=1&navpanes=0` : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="mb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Kitob</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          PDF <span className="gradient-text">o'qish</span>
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Darsligingizni yuklang — fayl faqat brauzerda saqlanadi (IndexedDB), hech qaerga jo'natilmaydi.
          Kitob va PDF sahifalari farq qilsa, "Offset" bilan moslang.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        <GlassCard className="overflow-hidden">
          {pdfUrl ? (
            <iframe
              key={pdfPage}
              src={pdfUrl}
              title={name}
              className="h-[78vh] w-full bg-white"
            />
          ) : (
            <div className="flex h-[60vh] flex-col items-center justify-center gap-4 p-8 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground/50" />
              <p className="text-muted-foreground">PDF fayl tanlanmagan</p>
              <Button onClick={() => inputRef.current?.click()}>
                <Upload className="mr-2 h-4 w-4" /> PDF tanlash
              </Button>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFile(f);
            }}
          />
        </GlassCard>

        <div className="space-y-4">
          <GlassCard className="p-4">
            <h3 className="mb-3 text-sm font-semibold">Fayl</h3>
            {name ? (
              <div className="space-y-3">
                <p className="break-words text-xs text-muted-foreground">{name}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary" onClick={() => inputRef.current?.click()}>
                    <Upload className="mr-1 h-3 w-3" /> Almashtirish
                  </Button>
                  <Button size="sm" variant="secondary" onClick={clearFile}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <Button size="sm" onClick={() => inputRef.current?.click()}>
                <Upload className="mr-1 h-3 w-3" /> PDF yuklash
              </Button>
            )}
          </GlassCard>

          {url && (
            <GlassCard className="p-4">
              <h3 className="mb-3 text-sm font-semibold">Sahifa</h3>
              <label className="block text-xs text-muted-foreground">Kitob sahifasi</label>
              <input
                type="number"
                value={bookPage}
                onChange={(e) => setBookPage(e.target.value)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm"
              />
              <label className="mt-3 block text-xs text-muted-foreground">
                Offset (PDF − kitob)
              </label>
              <input
                type="number"
                value={offset}
                onChange={(e) => saveOffset(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm"
              />
              <p className="mt-2 text-[11px] text-muted-foreground">
                PDF sahifa: <span className="font-mono">{pdfPage}</span>
              </p>
            </GlassCard>
          )}

          <GlassCard className="p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Maxfiylik</p>
            <p className="mt-1">PDF brauzeringizdan chiqmaydi. Hech qanday server uni ko'rmaydi.</p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
