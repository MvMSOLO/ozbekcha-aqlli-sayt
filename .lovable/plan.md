Bugun bitta katta turn'da quyidagilarni bajaramiz. Hajm katta — soddalashtirilgan, lekin ishlaydigan implementatsiya bilan boramiz.

## 1. PWA + Install (Task 1)
- `public/manifest.webmanifest` — `PhysicsLab`, dark theme (#0a0a0f / #6366f1), `display: standalone`, shortcuts (Qonunlar, Lab, Formulalar)
- Ikonlar: `imagegen` bilan 192/512 maskable PNG + apple-touch-icon
- `vite-plugin-pwa` (`generateSW`, `autoUpdate`, NetworkFirst HTML, CacheFirst assets)
- Registratsiya wrapper (`src/lib/pwa/register.ts`) — Lovable preview/iframe/dev'da register qilmaydi, `?sw=off` kill-switch
- `<InstallButton />` — `beforeinstallprompt` ushlaydi, navbarda ko'rinadi
- iOS meta teglari (`apple-mobile-web-app-capable`, status bar style, theme-color)

## 2. Yangi laboratoriyalar — jami 20+ (Task 2 + 4)
Hozir 5 ta. +16 ta qo'shamiz = **21 ta lab**:
1. Snaryad (bor) 2. Mayatnik (bor) 3. To'lqin (bor) 4. Prujina (bor) 5. Om zanjiri (bor)
6. **Erkin tushish** 7. **Aylanma harakat** 8. **Garmonik tebranish (grafik)** 9. **Ideal gaz (PV)** 10. **Karno sikli**
11. **Kulon kuchi** 12. **Elektr maydon chiziqlari** 13. **Magnit maydon (tok atrofida)** 14. **Kondensator zaryadlanishi**
15. **Snell sinishi** 16. **Yupqa linza** 17. **Yorug'lik interferensiyasi (Yung)** 18. **Doppler effekti**
19. **Radioaktiv parchalanish** 20. **Foto-effekt** 21. **Nisbiylik (Lorentz)**

Har bir lab standart layout: chap controls (sliderlar), markaz Canvas 2D, o'ng natijalar paneli, pastda formula + "hozir nima sodir bo'lyapti" izoh. `LabShell` komponentini chiqaramiz — barcha labs shu shellda. Pragmatik bo'lib, ba'zi yangi labs soddaroq vizual bilan (lekin to'g'ri fizika hisob-kitobi bilan) keladi.

## 3. Formulalar va Qonunlar (Task 3)
- `src/data/formulas.ts` hozir ~140 ta — to'liq tekshirib **160+** ga yetkazamiz (yetishmayotgan SNN, atom, magnit qismlari)
- `src/data/laws.ts` hozir 11 ta → **22 ta** qonun (Arximed, Bernulli, Paskal, Faraday induksiya, Lenz, Lorentz kuchi, Joul-Lens, Boyl-Mariot to'ldirish, Sharl, Gey-Lyussak, Klapeyron, Plank kvant)
- Yangi qonunlarning hammasi formula + tushuntirish + belgilar + real misol + image bilan

## 4. UX yaxshilash (Task 4)
- Allaqachon bor: Ctrl+K search, favorites, mobile tabbar, settings drawer
- Qo'shamiz: lab list'iga kategoriya filtri (Mexanika/Elektr/Optika/Atom/Termo), formula cards'ga JSON-LD, skip-link

## 5. Standart Lab UI (Task 5)
`src/components/labs/LabShell.tsx` — title, ko'rsatma, controls slot, canvas slot, results slot, formula slot, explanation slot. Barcha eski 5 ta lab ham shu shell'ga ko'chiriladi.

## 6. PDF kitob reader (Task 6)
- `/kitob` route — `react-pdf` (pdf.js)
- Drag&drop yoki file picker (faqat brauzerda, serverga jo'natilmaydi)
- Sahifa navigatsiyasi, zoom (+/−), aylantirish, sahifa raqami offset sozlamasi
- Tanlangan PDF IndexedDB'da saqlanadi (idb-keyval), favoritga olish mumkin
- Bookmark va oxirgi o'qigan sahifa eslab qolinadi

## Texnik
- Yangi paketlar: `vite-plugin-pwa`, `workbox-window`, `react-pdf`, `pdfjs-dist`, `idb-keyval`
- Code-splitting: barcha labs `.lazy.tsx` orqali
- Build/typecheck verify
- Dizayn: hozirgi dark glassmorphic saqlanadi
- Til: hammasi o'zbekcha

## Ogohlantirish
6 tasknii bitta turn'da 100% pollished qilish real emas — lekin har biri **ishlaydigan va sifatli** holatda yetkaziladi. Ba'zi yangi labs (Foto-effekt, Nisbiylik) vizual jihatdan minimal, ammo fizik hisob to'g'ri. Keyingi turn'larda har birini sayqallaymiz.

Tasdiqlasangiz boshlayman.