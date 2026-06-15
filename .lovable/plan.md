# Reja: PhysicsLab (O'zbekcha)

Premium darajadagi, dark-mode, glassmorphic dizaynli interaktiv fizika sayti. Barcha matn — **o'zbek tilida** (prompt'dagi "English" talabidan ustun, foydalanuvchi so'rovi bo'yicha). Stack — loyihadagi TanStack Start + React + Tailwind (Next.js o'rniga, lekin barcha funksional talablar bajariladi).

## Sahifalar (TanStack file-based routing)

- `/` — Hero (animatsiyali zarrachalar fon, sarlavha reveal, "Boshlash" CTA)
- `/laws` — Qonunlar katalogi (grid, filtr: Mexanika / Elektromagnetizm / Termodinamika / Optika / Zamonaviy fizika)
- `/laws/$slug` — har bir qonunning batafsil sahifasi (KaTeX formula, izoh, o'zgaruvchilar jadvali, real misol + rasm)
- `/lab` — laboratoriyalar ro'yxati
- `/lab/$slug` — interaktiv simulyatsiya

Har bir route'da head() bilan unikal SEO meta.

## Qonunlar (10 ta, KaTeX bilan)

Nyuton I/II/III, Butun olam tortishish qonuni, Energiya saqlanishi, Impuls saqlanishi, Kulon qonuni, Om qonuni, Boyl qonuni, Guk qonuni, Snell qonuni. Ma'lumotlar `src/data/laws.ts` da strukturalangan.

Har bir qonun kartasida:
- O'zbekcha nom + kategoriya tegi
- KaTeX formula (chiroyli render)
- 2–3 jumlali tushuntirish
- O'zgaruvchilar legendasi (jadval)
- Real hayotdan misol + Unsplash rasm (lazy-load, blur placeholder)
- "Ko'rsatish/Vizualizatsiya" toggle (mavjud joyda mini-diagramma)

## Laboratoriyalar (5 ta, hammasi)

Har biri Canvas 2D + requestAnimationFrame, sof fizika funksiyalari `src/lib/physics/` da:

1. **Snaryad harakati** — v₀, burchak, g (Yer/Oy/Mars/Yupiter presetlari), traektoriya izi, max balandlik / masofa / vaqt
2. **Mayatnik** — uzunlik L, g, boshlang'ich burchak, so'nish toggle, faza-fazoviy mini-grafik, T=2π√(L/g)
3. **To'lqin interferensiyasi** — 2 manba (chastota, amplituda, faza), 2D rang xaritasi / ko'ndalang ko'rinish
4. **Prujina-massa (Guk)** — k va m slayderi, kuch vektori, kinetik vs potensial energiya bar grafigi
5. **Om zanjiri** — V va R slayderi, simdagi zarracha oqimi animatsiyasi, I=V/R

Umumiy `LabControls` komponenti: qiymat ko'rsatuvchi slayderlar, play/pause, reset, preset dropdown.

## Dizayn tizimi

- Dark-only: bg `#0A0A0F`–`#111118`, accent gradient indigo `#4F46E5` → cyan `#06B6D4` → violet `#8B5CF6`
- Inter (UI) + JetBrains Mono (formula raqamlari uchun)
- Glassmorphic kartalar (backdrop-blur, 1px subtle border, soft glow)
- `src/styles.css` da semantic CSS o'zgaruvchilar (--background, --primary, --accent, --gradient-hero, --shadow-glow, easing curves)
- Framer Motion: hero reveal, scroll-triggered fade+translateY, shared-layout active nav indicator, slider press feedback, 60fps faqat transform/opacity
- `prefers-reduced-motion` hurmat qilinadi

## Komponentlar

`src/components/ui/`: `GlassCard`, `GradientButton`, `Slider` (qiymat bubble bilan), `FormulaRenderer` (KaTeX), `AnimatedSection`, `Navbar` (sticky glass + aktiv pill), `Footer`, `ParticleHero` (canvas zarrachalar)

`src/components/laws/`: `LawCard`, `LawDetail`, `VariableTable`

`src/components/labs/`: `LabShell`, `LabControls`, va har bir lab uchun alohida Canvas komponent

## Texnik

- KaTeX: `katex` + `react-katex`
- Animatsiya: `framer-motion` (loyihada bor) + minimal custom scroll observer
- Fizika hisoblari sof TS funksiyalar — render'dan ajratilgan
- Code-splitting: lab komponentlari `React.lazy` orqali
- To'liq responsive (320px → 4K), touch slayderlar
- ARIA labels, klaviatura navigatsiyasi
- Rasmlar Unsplash'dan (yoki AI-generated hero rasm)
- Backend / DB kerak emas — to'liq statik

## Bajarish bosqichlari

1. Bog'liqliklar: `katex`, `react-katex`, `@types/katex` qo'shish
2. Design tokens — `src/styles.css` yangilash
3. `src/data/laws.ts` — 10 ta qonun kontenti (o'zbekcha)
4. `src/lib/physics/` — 5 ta lab uchun sof funksiyalar
5. Umumiy UI komponentlari (GlassCard, Slider, FormulaRenderer, Navbar, ParticleHero)
6. Route'lar: `/`, `/laws`, `/laws/$slug`, `/lab`, `/lab/$slug`
7. 5 ta Canvas lab komponenti
8. SEO meta + responsive sayqal
9. Build verifikatsiya

## Eslatma

Prompt'da Next.js so'ralgan, lekin loyiha TanStack Start asosida — barcha funksional/dizayn talablari saqlanadi, faqat router/SSR sintaksisi farq qiladi. Sayt to'liq **o'zbek tilida** bo'ladi (sizning so'rovingiz bo'yicha).
