# 📚 PhysicsLab - Interaktiv Fizika Platformasi

> **O'zbek tilida fizikani interaktiv va ko'ringi chiroyli tarzda o'rganing!**

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

---

## 🎯 Loyihaning Maqsadi

**PhysicsLab** — o'zbek tili qo'llab-quvvatlaydigan interaktiv fizika o'quv platformasi. Maqsad:
- ✅ Fizika qonunlarini **simple va tushunarli** tarzda tushuntirish
- ✅ **Jonli simulyatsiyalar** orqali fizikani amaliy tarzda o'rganing
- ✅ **Formulalar kutubxonasi** bilan qonunlarni tezda topish
- ✅ **Responsive dizayn** — kompyuter, tablet, telefonda ishlaydi

---

## 📁 Loyihaning Tuzilishi

```
ozbekcha-aqlli-sayt/
├── src/
│   ├── routes/                    # TanStack Router sahifalari
│   │   ├── __root.tsx             # Root layout va global komponenlar
│   │   ├── index.tsx              # Bosh sahifa (Home)
│   │   ├── laws.index.tsx         # Qonunlar ro'yxati
│   │   ├── laws.$slug.tsx         # Alohida qonun sahifasi
│   │   ├── lab.index.tsx          # Laboratoriyalar ro'yxati
│   │   ├── lab.$slug.tsx          # Alohida laboratoriya simulyatsiyasi
│   │   ├── formulas.tsx           # Formulalar to'plami
│   │   └── favorites.tsx          # Saqlangan sevimlilar
│   │
│   ├── components/
│   │   ├── site/                  # Sayt-specific komponenlar
│   │   │   ├── Navbar.tsx         # Yuqori navigatsiya
│   │   │   ├── Footer.tsx         # Pastki qism
│   │   │   ├── MobileTabBar.tsx   # Mobil tab bari
│   │   │   ├── CommandPalette.tsx # Qidiruv/command palette
│   │   │   ├── SettingsDrawer.tsx # Sozlamalar
│   │   │   ├── ParticleField.tsx  # Animatsiyalangan fon
│   │   │   ├── GlassCard.tsx      # Glassmorphism karta
│   │   │   └── Formula.tsx        # KaTeX formulalar
│   │   ├── labs/                  # Laboratoriya-specific komponenlar
│   │   └── ui/                    # Radix UI komponentlari
│   │
│   ├── lib/
│   │   ├── api/                   # API chaqiruvlari (agar bo'lsa)
│   │   ├── physics/               # Fizika hisoblash funksiyalari
│   │   ├── error-capture.ts       # Xato jadvallari
│   │   ├── error-page.ts          # Xato sahifasi
│   │   ├── config.server.ts       # Server sozlamalari
│   │   └── utils.ts               # Foydalanuvchi funksiyalari
│   │
│   ├── data/
│   │   ├── laws.ts                # Fizika qonunlari ma'lumotlari
│   │   ├── labs.ts                # Laboratoriya simulyatsiyalari
│   │   └── formulas.ts            # Formulalar to'plami
│   │
│   ├── styles.css                 # Global CSS (Tailwind + kustom stillar)
│   ├── router.tsx                 # Router konfiguratsiyasi
│   ├── start.ts                   # TanStack Start kirish nuqtasi
│   ├── server.ts                  # Server handler
│   └── routeTree.gen.ts           # Auto-generated route tree
│
├── package.json                   # Loyiha bog'lantilari
├── vite.config.ts                 # Vite konfiguratsiyasi
├── tsconfig.json                  # TypeScript sozlamalari
├── tailwind.config.ts             # Tailwind CSS sozlamalari
├── eslint.config.js               # ESLint qoidalari
└── .prettierrc                    # Prettier formatlash qoidalari
```

---

## 🎨 Asosiy Xususiyatlar

### 1. **Bosh Sahifa (Home)**
- Partizan animatsiyali fon
- Qvantik stilida kartalar
- Mashhur laboratoriyalar bo'limi
- Asosiy qonunlar bo'limi
- CTA tugmalari ("/lab", "/laws")

### 2. **Qonunlar Bo'limi**
- 11 ta asosiy fizika qonuni
- Har bir qonun:
  - Formulasi (KaTeX)
  - Tushuntirilishi
  - Real hayotdagi misollar
  - Matematik tahlili

### 3. **Interaktiv Laboratoriyalar**
- 5 ta jonli simulyatsiya
- Slayderlar bilan parametrlarni o'zgartirish
- Real vaqtda natijalarni ko'rish
- Hisoblash grafiklari (Recharts)

### 4. **Formulalar Kutubxonasi**
- Barcha formulalar qidiruvi
- Kategoriya bo'yicha filtrlash
- KaTeX bilan chiroyli renderlenish

### 5. **Sevimlilar Sistemi**
- Saqlangan qonun va laboratoriyalar
- Local Storage bilan saqlanadi

### 6. **Qidiruv va Filtrlash**
- Command Palette (Cmd+K)
- Qonun va laboratoriya qidiruvi
- Tezda navigatsiya

---

## 🛠️ Texnologiyalar

| Texnologiya | Maqsadi |
|---|---|
| **React 19** | UI framework |
| **TypeScript** | Statik tipizatsiya |
| **TanStack Router** | File-based routing |
| **TanStack Start** | Full-stack React framework |
| **TailwindCSS** | Utility-first CSS |
| **Radix UI** | Accessible komponenlar |
| **KaTeX** | Matematik formulalar |
| **Recharts** | Grafik vizualizatsiya |
| **Framer Motion** | Animatsiyalar |
| **Vite** | Modulli bundler |
| **Bun** | JavaScript runtime |

---

## 🚀 Boshlash

### O'rnatish
```bash
# Barcha bog'lantilari o'rnatish
bun install

# Yoki npm/yarn bilan
npm install
yarn install
```

### Ishga Tushurish
```bash
# Development server
bun dev
# Yoki
npm run dev

# http://localhost:5173 da ochiladi
```

### Build Qilish
```bash
# Production build
bun run build
# Yoki
npm run build

# Build ni preview qilish
bun run preview
```

### Linting va Formatting
```bash
# ESLint tekshiruvi
bun run lint

# Prettier formatlash
bun run format
```

---

## 📊 Ma'lumot Tuzilishi

### Laws Data (`src/data/laws.ts`)
```typescript
interface Law {
  id: string;
  slug: string;
  title: string;
  category: string;
  formula: string;
  description: string;
  explanation: string;
  examples: string[];
  mathDetails: string;
}
```

### Labs Data (`src/data/labs.ts`)
```typescript
interface Lab {
  id: string;
  slug: string;
  title: string;
  category: string;
  formula: string;
  shortDesc: string;
  description: string;
  component: React.ComponentType;
}
```

### Formulas Data (`src/data/formulas.ts`)
- 100+ ta asosiy formulalar
- Har bir formula kategoriya bilan
- LaTeX/KaTeX formatlashda

---

## 🎮 Laboratoriya Simulyatsiyalari

### Qaysi Simulyatsiyalar Mavjud?
1. **Erkin Tushish** - G kuchini o'rganing
2. **Osiluvchi Shunal** - Tezlik va davr
3. **Elektr Zari** - Elektr maydoni
4. **Magnit Quvvati** - Magnit yuraklari
5. **Ideal Gaz Qonuni** - Gaz fizikasi

---

## 🌐 Routing Map

```
/ ............................ Bosh sahifa
├── /laws ..................... Qonunlar sahifasi
│   └── /laws/:slug .......... Alohida qonun
├── /lab ..................... Laboratoriyalar
│   ├── /lab ................ Laboratoriyalar ro'yxati
│   └── /lab/:slug .......... Alohida laboratoriya
├── /formulas ............... Formulalar
└── /favorites .............. Sevimlilar
```

---

## 📱 Responsive Dizayn

- ✅ **Desktop** (1024px+)
- ✅ **Tablet** (768px - 1023px)
- ✅ **Mobile** (<768px)
  - Mobil tab bar pastda
  - Tugma o'lchami optimallashtirilgan
  - Touch-friendly elementlar

---

## 🎨 Dizayn Sistema

### Ranglar
- **Primary**: Gradient (ilon ko'k → ko'k)
- **Secondary**: Oq / Ko'k
- **Background**: Qora tema (dark mode)
- **Aksentlar**: Sirpanch effektlari

### Tipografiya
- **Asosiy**: Inter (400, 500, 600, 700, 800)
- **Kod**: JetBrains Mono (400, 500, 600)

### Komponent Stilyulari
- **Glass Cards**: Glassmorphism effekti
- **Gradient Text**: Animatsiyalangan gradientlar
- **Shadow Glow**: Nurlovchi soya
- **Particles**: Animatsiyalangan fon

---

## 🔧 Konfiguratsiya

### `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100
}
```

### `tsconfig.json`
- TypeScript 5.8+
- Strict mode yoqilgan
- Path aliaslar (`@/*`)

### `vite.config.ts`
- TanStack Start ssistemasi
- Cloudflare target
- Optimization enabled

---

## 📚 Loyihani Kengaytirish

### Yangi Qonun Qo'shish
1. `src/data/laws.ts`da yangi element qo'shing
2. Formulasi va tavsiflash yozing
3. Category tanlang

### Yangi Laboratoriya Qo'shish
1. `src/components/labs/`da component yarating
2. `src/data/labs.ts`da ro'yxatga qo'shing
3. Simulyatsiya mantiqini yozing

### Yangi Formula Qo'shhing
1. `src/data/formulas.ts`da qo'shing
2. KaTeX formatda yozing
3. Category bilan mislash

---

## 🐛 Xato Boshqaruvi

- **Error Boundary** - React komponentlarda xatolar
- **Server Error Handler** - SSR xatolar
- **Custom Error Page** - User-friendly xato sahifasi
- **Lovable Error Reporting** - Xato reporti

---

## 📄 Qo'shimcha Fayllar

| Fayl | Maqsadi |
|---|---|
| `.gitignore` | Git ignored fayllar |
| `.prettierignore` | Prettier ignored fayllar |
| `.replit` | Replit konfiguratsiyasi |
| `bunfig.toml` | Bun runtime sozlamalari |
| `components.json` | Shadcn komponentlar |
| `eslint.config.js` | ESLint sozlamalari |

---

## 👨‍💻 Ishlab Chiqish

### Development Workflow
1. `bun dev` bilan server ishga tushiring
2. `src/` papkadagi fayllarni o'zgartiring
3. Hot Module Replacement (HMR) avtomatik reload qiladi
4. Browser DevTools bilan debug qiling

### Best Practices
- ✅ TypeScript bilan strict tipizatsiya
- ✅ Radix UI accessible komponentlari
- ✅ TailwindCSS utility classlar
- ✅ File-based routing bilan clean struktura
- ✅ Reusable komponentlar
- ✅ Performance optimizatsiyasi

---

## 📊 Statalar

Loyihada qanday statlar bilan ishlayotgan:
- React Query - Data fetching
- React Router Context - Navigation state
- useState - Local state management
- Local Storage - Favorites

---

## 🎯 Qadamni Keyingi

1. ✅ Core laboratoriyalar
2. 🔲 Foydalanuvchi profili
3. 🔲 Turli tillar (uz, en, ru)
4. 🔲 Dark/Light mode toggle
5. 🔲 Oson o'quv yo'li
6. 🔲 Community qonunlari

---

## 📝 Litsenziya

Bu loyiha **open source** va barcha qochib surmaring! 🎉

---

## 🤝 Hissa Qo'shish

Xatolarni topibsiz? O'zgartirishlarga mulohaza? 
- Issues yarating
- Pull requests yuboring
- Feedback bering

---

## 📞 Aloqa

**Loyiha Muallifi**: [@MvMSOLO](https://github.com/MvMSOLO)

Savollaringiz bo'lsa, GitHub Issues orqali murojaat qiling! 💬

---

## 🎓 Fizika Haqida

Bu sayt **asosiy fizika qonunlarini** va **matematik formulalarni** o'qitadi:
- **Klassik Mexanika** - Nyuton qonunlari
- **Termodinamika** - Issiqlik va energiya
- **Elektromagnetizm** - Elektr va magnit
- **Osillanishlar** - Tezlik va davr
- **Gaz Fizikasi** - Ideal gaz qonuni

> "Fizika — tabiatning tilida yozilgan kitob" - Galileo 📖

---

**Saytni zavq olib o'rganing! 🚀✨**
