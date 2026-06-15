export type LawCategory =
  | "Mexanika"
  | "Elektromagnetizm"
  | "Termodinamika"
  | "Optika"
  | "Zamonaviy fizika";

export interface Law {
  slug: string;
  title: string;
  category: LawCategory;
  shortDesc: string;
  formula: string; // KaTeX
  statement: string;
  variables: { symbol: string; name: string; unit: string }[];
  example: string;
  image: string;
  imageAlt: string;
  relatedLab?: string; // lab slug
}

export const LAWS: Law[] = [
  {
    slug: "nyuton-1",
    title: "Nyutonning birinchi qonuni",
    category: "Mexanika",
    shortDesc: "Inertsiya qonuni — jism o'z holatini saqlaydi.",
    formula: "\\sum \\vec{F} = 0 \\implies \\vec{v} = \\text{const}",
    statement:
      "Tashqi kuchlar ta'sir qilmasa yoki ularning yig'indisi nolga teng bo'lsa, jism tinch holatda turaveradi yoki to'g'ri chiziqli tekis harakatda davom etadi.",
    variables: [
      { symbol: "\\vec{F}", name: "Tashqi kuch vektori", unit: "N" },
      { symbol: "\\vec{v}", name: "Tezlik vektori", unit: "m/s" },
    ],
    example:
      "Avtomobil to'satdan tormoz bossa, ichidagi yo'lovchi inertsiya tufayli oldinga intiladi. Xavfsizlik kamarining mohiyati ham shu.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Yo'ldagi avtomobil — inertsiya namunasi",
  },
  {
    slug: "nyuton-2",
    title: "Nyutonning ikkinchi qonuni",
    category: "Mexanika",
    shortDesc: "Kuch jismga tezlanish beradi: F = ma.",
    formula: "\\vec{F} = m\\vec{a}",
    statement:
      "Jismning olgan tezlanishi unga ta'sir etayotgan kuchga to'g'ri, massasiga teskari proporsionaldir.",
    variables: [
      { symbol: "F", name: "Kuch", unit: "N" },
      { symbol: "m", name: "Massa", unit: "kg" },
      { symbol: "a", name: "Tezlanish", unit: "m/s²" },
    ],
    example:
      "1 kg massali jismni 1 m/s² tezlanish bilan harakatlantirish uchun 1 N kuch kerak bo'ladi. Raketa dvigatellari aynan shu qonun asosida loyihalanadi.",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Raketa uchirilishi",
    relatedLab: "snaryad",
  },
  {
    slug: "nyuton-3",
    title: "Nyutonning uchinchi qonuni",
    category: "Mexanika",
    shortDesc: "Har bir ta'sirga teng va qarama-qarshi qarshi ta'sir mavjud.",
    formula: "\\vec{F}_{12} = -\\vec{F}_{21}",
    statement:
      "Ikki jism bir-biriga moduli teng va yo'nalishi qarama-qarshi kuchlar bilan ta'sir qiladi.",
    variables: [
      { symbol: "F_{12}", name: "1-jismning 2-ga ta'siri", unit: "N" },
      { symbol: "F_{21}", name: "2-jismning 1-ga ta'siri", unit: "N" },
    ],
    example:
      "Suzuvchi suvni orqaga itargani uchun oldinga harakatlanadi. Reaktiv harakatning asosi.",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Suzuvchi",
  },
  {
    slug: "butun-olam-tortishish",
    title: "Butun olam tortishish qonuni",
    category: "Mexanika",
    shortDesc: "Har qanday ikki jism bir-birini tortadi.",
    formula: "F = G\\,\\dfrac{m_1 m_2}{r^2}",
    statement:
      "Koinotdagi har bir jism boshqa jismni o'zaro tortish kuchi bilan tortadi; bu kuch massalar ko'paytmasiga to'g'ri, masofa kvadratiga teskari proporsional.",
    variables: [
      { symbol: "G", name: "Gravitatsiya doimiysi", unit: "6.674\\times10^{-11}\\,\\text{N·m}^2/\\text{kg}^2" },
      { symbol: "m_1, m_2", name: "Jismlar massalari", unit: "kg" },
      { symbol: "r", name: "Markazlar orasidagi masofa", unit: "m" },
    ],
    example:
      "Oyning Yerni tortishi okeanlarda ko'tarilish-pasayish (suv toshqini) hodisasini keltirib chiqaradi.",
    image: "https://images.unsplash.com/photo-1532686255137-be3eafbc02f8?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Yer va Oy",
  },
  {
    slug: "energiya-saqlanishi",
    title: "Energiyaning saqlanish qonuni",
    category: "Mexanika",
    shortDesc: "Energiya yo'qolmaydi va yo'qdan paydo bo'lmaydi.",
    formula: "E_{\\text{to'liq}} = E_k + E_p = \\text{const}",
    statement:
      "Yopiq sistemada to'liq mexanik energiya saqlanadi: kinetik va potensial energiya yig'indisi vaqt o'tishi bilan o'zgarmaydi.",
    variables: [
      { symbol: "E_k", name: "Kinetik energiya", unit: "J" },
      { symbol: "E_p", name: "Potensial energiya", unit: "J" },
    ],
    example:
      "Tog' yonbag'ridan tushayotgan chang'ichi: yuqorida potensial energiya, pastda esa kinetik energiyaga aylanadi.",
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Tog'dan tushayotgan chang'ichi",
    relatedLab: "prujina",
  },
  {
    slug: "impuls-saqlanishi",
    title: "Impulsning saqlanish qonuni",
    category: "Mexanika",
    shortDesc: "Yopiq sistema umumiy impulsi o'zgarmas.",
    formula: "\\sum m_i \\vec{v}_i = \\text{const}",
    statement:
      "Tashqi kuchlar yo'q yoki ular kompensatsiyalangan bo'lsa, sistemadagi jismlar impulslari yig'indisi saqlanadi.",
    variables: [
      { symbol: "m_i", name: "i-jism massasi", unit: "kg" },
      { symbol: "v_i", name: "i-jism tezligi", unit: "m/s" },
    ],
    example:
      "Bilyard sharlari to'qnashganda umumiy impuls saqlanadi — bu o'yindagi barcha urilishlarning asosi.",
    image: "https://images.unsplash.com/photo-1615722440048-da4fd9202c45?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Bilyard sharlari",
  },
  {
    slug: "kulon",
    title: "Kulon qonuni",
    category: "Elektromagnetizm",
    shortDesc: "Ikki zaryad orasidagi elektrostatik kuch.",
    formula: "F = k\\,\\dfrac{|q_1 q_2|}{r^2}",
    statement:
      "Ikki nuqtaviy zaryadning o'zaro ta'sir kuchi zaryadlar moduli ko'paytmasiga to'g'ri, ular orasidagi masofa kvadratiga teskari proporsionaldir.",
    variables: [
      { symbol: "k", name: "Kulon doimiysi", unit: "8.99\\times10^{9}\\,\\text{N·m}^2/\\text{C}^2" },
      { symbol: "q", name: "Zaryad", unit: "C" },
      { symbol: "r", name: "Masofa", unit: "m" },
    ],
    example:
      "Sochni taroqlaganda statik elektr paydo bo'ladi — soch tolalari bir-birini itara boshlaydi.",
    image: "https://images.unsplash.com/photo-1620283085439-39620a1e21c4?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Chaqmoq — elektr kuch",
  },
  {
    slug: "om",
    title: "Om qonuni",
    category: "Elektromagnetizm",
    shortDesc: "Tok kuchi, kuchlanish va qarshilik orasidagi bog'liqlik.",
    formula: "I = \\dfrac{U}{R}",
    statement:
      "O'tkazgichdagi tok kuchi unga qo'yilgan kuchlanishga to'g'ri, qarshiligiga teskari proporsionaldir.",
    variables: [
      { symbol: "I", name: "Tok kuchi", unit: "A" },
      { symbol: "U", name: "Kuchlanish", unit: "V" },
      { symbol: "R", name: "Qarshilik", unit: "Ω" },
    ],
    example:
      "Uy lampochkasi: 220 V kuchlanish va 484 Ω qarshilikda ~0.45 A tok o'tadi.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Elektron sxema",
    relatedLab: "om",
  },
  {
    slug: "boyl",
    title: "Boyl–Mariott qonuni",
    category: "Termodinamika",
    shortDesc: "Izotermik jarayonda P·V = const.",
    formula: "P_1 V_1 = P_2 V_2",
    statement:
      "Ideal gazning massasi va harorati o'zgarmas bo'lsa, bosim va hajm ko'paytmasi doimiy qoladi.",
    variables: [
      { symbol: "P", name: "Bosim", unit: "Pa" },
      { symbol: "V", name: "Hajm", unit: "m³" },
    ],
    example:
      "Shprits porshenini bosganda ichkaridagi havo hajmi kamayadi, bosimi esa proporsional ravishda oshadi.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Tibbiy shprits",
  },
  {
    slug: "guk",
    title: "Guk qonuni",
    category: "Mexanika",
    shortDesc: "Elastik kuch deformatsiyaga proporsional.",
    formula: "F = -k\\,x",
    statement:
      "Elastik jism kichik deformatsiyalarida unda paydo bo'ladigan qaytaruvchi kuch deformatsiya kattaligiga to'g'ri proporsional bo'ladi.",
    variables: [
      { symbol: "k", name: "Elastiklik koeffitsienti", unit: "N/m" },
      { symbol: "x", name: "Deformatsiya", unit: "m" },
    ],
    example:
      "Avtomobil amortizatorlari va matraslardagi prujinalar — barchasi Guk qonuni asosida ishlaydi.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Metall prujina",
    relatedLab: "prujina",
  },
  {
    slug: "snell",
    title: "Snell (sinish) qonuni",
    category: "Optika",
    shortDesc: "Yorug'lik bir muhitdan ikkinchisiga o'tganda sinadi.",
    formula: "n_1 \\sin\\theta_1 = n_2 \\sin\\theta_2",
    statement:
      "Yorug'lik nurining tushish va sinish burchaklari sinuslari nisbati muhitlarning sindirish ko'rsatkichlariga teskari proporsional.",
    variables: [
      { symbol: "n", name: "Sindirish ko'rsatkichi", unit: "—" },
      { symbol: "\\theta", name: "Burchak (normaldan)", unit: "°" },
    ],
    example:
      "Stakandagi suvga botirilgan qoshiq «singan» ko'rinadi — chunki yorug'lik suvdan havoga o'tganda sinadi.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&q=80&auto=format&fit=crop",
    imageAlt: "Kamalak — yorug'likning sinishi",
  },
];

export function getLaw(slug: string) {
  return LAWS.find((l) => l.slug === slug);
}

export const CATEGORIES: LawCategory[] = [
  "Mexanika",
  "Elektromagnetizm",
  "Termodinamika",
  "Optika",
  "Zamonaviy fizika",
];
