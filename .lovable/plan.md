PDF'lardagi 6 ta task juda katta hajm (PWA + 10 yangi lab + 150+ formula + UX + ideal lab UI + PDF reader). Bularni bitta turn'da sifatli qilish imkonsiz, shuning uchun fazalarga bo'lib bajaramiz. Har bir faza alohida ishonchli, build-verified bo'ladi.

## Faza 1 — Asos: Formulalar bazasi + UX (HOZIR)
Bu hozirgi sayt uchun eng katta qiymat beradi.

**1.1 To'liq formulalar bazasi (`/formulas`)**
- `src/data/formulas.ts` — 12 bo'lim, 150+ formula (PDF'dagi barcha): Kinematika, Dinamika, Saqlanish qonunlari, Statika/Gidrodinamika, Tebranishlar, Termodinamika, Elektrostatika, O'zgarmas tok, Elektromagnit induksiya, Optika, Atom/yadro, SNN
- Har bir formula: KaTeX, tavsif (uz), belgilar (uz, birlik), kategoriya
- `/formulas` sahifa: kategoriya filtri, qidiruv (nom + formula matn), nusxa olish tugmasi, sevimlilar (localStorage)
- Har bir formula card ochilganda kengaytirilgan tushuncha (belgilar jadvali, misol)

**1.2 Easy-to-use UX qatlamasi**
- Global qidiruv (Ctrl+K / `Cmd+K`) — qonun, lab, formula bo'yicha (`cmdk` ishlatib shadcn `command` komponenti)
- Sevimlilar tizimi (`useFavorites` hook, localStorage) — qonun/formula/lab
- `/favorites` sahifa
- Mobil pastki navigatsiya (Bosh / Qonunlar / Lab / Formulalar)
- Sozlamalar drawer: animatsiyalarni o'chirish (reduced-motion), shrift o'lchami (sm/md/lg)
- Accessibility: ARIA labels, keyboard nav, focus rings, skip-link

## Faza 2 — PWA (keyingi turn)
- `public/manifest.webmanifest` + icons (192/512 maskable, imagegen)
- `vite-plugin-pwa` generateSW, NetworkFirst HTML, CacheFirst assets
- Lovable preview guards (bizning skill rules)
- O'rnatish tugmasi (`beforeinstallprompt`)
- iOS meta teglari

## Faza 3 — Yangi laboratoriyalar (6 ta priority)
Eng yuqori qiymat beruvchilar:
- Garmonik tebranish (vaqt grafigi)
- Ideal gaz (PV diagramma)
- Elektr maydon (Coulomb, kuch chiziqlari)
- Snell qonuni (sinish)
- Linza optikasi
- Doppler effekti
Har biri yangi sxema: chap controls, markaz canvas, o'ng natijalar paneli, pastda nazariya tushunchasi.

## Faza 4 — Qolgan labs + ideal lab UI redesign
Magnit maydon, Yorug'lik interferensiyasi, Om zanjiri 2.0, Radioaktiv parchalanish.
Barcha labslarga play/pause/reset, real vaqt natija paneli, formula display, "hozir nima sodir bo'lyapti" izoh.

## Faza 5 — PDF kitob reader (`/book`)
`react-pdf` (pdf.js) bilan: drag&drop upload, page nav, zoom, mundarija, izlash, bookmark, page offset sozlash. Faqat brauzerda saqlanadi (IndexedDB), serverga jo'natilmaydi.

---

## Texnik qarorlar
- Hech qanday backend kerak emas — hammasi statik + localStorage/IndexedDB
- Dizayn: hozirgi dark glassmorphic saqlanadi
- Yangi paketlar (faza bo'yicha): `cmdk` (faza 1), `vite-plugin-pwa` + `workbox-window` (faza 2), `react-pdf` (faza 5)
- Build/typecheck har fazadan keyin verify qilinadi

## Hozirgi turn'da nima quriladi
**FAQAT Faza 1**: formulalar bazasi to'liq, `/formulas` sahifa, global qidiruv (Ctrl+K), sevimlilar, mobil pastki nav, sozlamalar drawer. Bu o'zi katta hajm — sifatli qilish uchun bitta faza.

Tasdiqlasangiz Faza 1'dan boshlayman. Keyingi fazalarni xohlagan tartibda qilamiz.