export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5">
      <div
        className="h-px w-full"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} PhysicsLab — interaktiv fizika platformasi.</p>
        <p>O'quvchilar va o'qituvchilar uchun ❤️ bilan yaratildi.</p>
      </div>
    </footer>
  );
}
