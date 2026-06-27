export type FormulaCategory =
  | "kinematika"
  | "dinamika"
  | "saqlanish"
  | "statika"
  | "tebranish"
  | "termodinamika"
  | "elektrostatika"
  | "tok"
  | "induksiya"
  | "optika"
  | "atom"
  | "snn";

export interface FormulaSymbol {
  sym: string;
  desc: string;
  unit?: string;
}

export interface Formula {
  id: string;
  category: FormulaCategory;
  section: string;
  name: string;
  tex: string;
  desc: string;
  symbols?: FormulaSymbol[];
  example?: { problem: string; solution: string };
}

export const CATEGORIES: { id: FormulaCategory; title: string; emoji: string }[] = [
  { id: "kinematika", title: "Kinematika", emoji: "🏃" },
  { id: "dinamika", title: "Dinamika", emoji: "💪" },
  { id: "saqlanish", title: "Saqlanish qonunlari", emoji: "⚖️" },
  { id: "statika", title: "Statika va gidrodinamika", emoji: "💧" },
  { id: "tebranish", title: "Tebranish va to'lqinlar", emoji: "🌊" },
  { id: "termodinamika", title: "Termodinamika", emoji: "🔥" },
  { id: "elektrostatika", title: "Elektrostatika", emoji: "⚡" },
  { id: "tok", title: "O'zgarmas tok", emoji: "🔋" },
  { id: "induksiya", title: "Elektromagnit induksiya", emoji: "🧲" },
  { id: "optika", title: "Optika", emoji: "💡" },
  { id: "atom", title: "Atom va yadro", emoji: "☢️" },
  { id: "snn", title: "Maxsus nisbiylik nazariyasi", emoji: "🌀" },
];

const f = (
  id: string,
  category: FormulaCategory,
  section: string,
  name: string,
  tex: string,
  desc: string,
  symbols?: FormulaSymbol[],
  example?: Formula["example"],
): Formula => ({ id, category, section, name, tex, desc, symbols, example });

export const FORMULAS: Formula[] = [
  // 1. KINEMATIKA
  f("k-vsr", "kinematika", "Tekis harakat", "O'rtacha tezlik", "v = \\frac{s}{t}", "Tekis harakatda o'rtacha tezlik bosib o'tilgan yo'lning ketgan vaqtga nisbati.", [
    { sym: "v", desc: "tezlik", unit: "m/s" },
    { sym: "s", desc: "yo'l", unit: "m" },
    { sym: "t", desc: "vaqt", unit: "s" },
  ], { problem: "Mashina 120 m yo'lni 8 s da bosib o'tdi. Tezligi?", solution: "v = 120/8 = 15 m/s" }),
  f("k-svt", "kinematika", "Tekis harakat", "Bosib o'tilgan yo'l", "s = v t", "Tekis harakatda yo'l tezlik bilan vaqtning ko'paytmasiga teng."),
  f("k-vat", "kinematika", "Tekis o'zg. harakat", "Tezlik tenglamasi", "v = v_0 + a t", "Tekis tezlanuvchan harakatda tezlik vaqt bo'yicha chiziqli o'zgaradi.", [
    { sym: "v_0", desc: "boshlang'ich tezlik", unit: "m/s" },
    { sym: "a", desc: "tezlanish", unit: "m/s²" },
  ]),
  f("k-sat", "kinematika", "Tekis o'zg. harakat", "Yo'l tenglamasi", "s = v_0 t + \\tfrac{1}{2} a t^2", "Tekis tezlanuvchan harakatda bosib o'tilgan yo'l."),
  f("k-vsr2", "kinematika", "Tekis o'zg. harakat", "O'rtacha tezlik orqali", "s = \\frac{v_0 + v}{2}\\,t", "Boshlang'ich va oxirgi tezliklarning o'rtachasiga ko'paytirilgan vaqt."),
  f("k-galiley", "kinematika", "Tekis o'zg. harakat", "Galileo formulasi", "v^2 - v_0^2 = 2 a s", "Tezliklar kvadratlari farqi tezlanish va yo'lga bog'liq."),
  f("k-vgt", "kinematika", "Erkin tushish", "Erkin tushish tezligi", "v = g t", "Vakuum sharoitida erkin tushuvchi jism tezligi.", [
    { sym: "g", desc: "erkin tushish tezlanishi (≈9.8)", unit: "m/s²" },
  ]),
  f("k-hgt", "kinematika", "Erkin tushish", "Tushish balandligi", "h = \\tfrac{1}{2} g t^2", "Erkin tushish balandligi vaqtning kvadratiga proporsional."),
  f("k-torr", "kinematika", "Erkin tushish", "Torricelli formulasi", "v = \\sqrt{2 g h}", "Balandlikdan tushgandagi tezlik."),
  f("k-tdown", "kinematika", "Erkin tushish", "Tushish vaqti", "t = \\sqrt{\\tfrac{2 h}{g}}", "Berilgan balandlikdan tushish vaqti."),
  f("k-omega", "kinematika", "Aylanma harakat", "Burchak tezlik", "\\omega = \\frac{\\varphi}{t}", "Burchak tezlik burchakning vaqtga nisbati.", [
    { sym: "\\omega", desc: "burchak tezlik", unit: "rad/s" },
    { sym: "\\varphi", desc: "burchak", unit: "rad" },
  ]),
  f("k-vr", "kinematika", "Aylanma harakat", "Chiziqli tezlik", "v = \\omega R", "Aylana bo'ylab harakatda chiziqli tezlik radius va burchak tezlik ko'paytmasi."),
  f("k-an", "kinematika", "Aylanma harakat", "Markazga intilma tezlanish", "a_n = \\frac{v^2}{R} = \\omega^2 R", "Aylanma harakatda doim markazga yo'nalgan tezlanish."),
  f("k-T", "kinematika", "Aylanma harakat", "Aylanish davri", "T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi R}{v}", "Bir to'liq aylanish uchun ketgan vaqt."),
  f("k-nu", "kinematika", "Aylanma harakat", "Aylanish chastotasi", "\\nu = \\frac{1}{T}", "Bir sekundda nechta to'liq aylanish."),
  f("k-snaryad-x", "kinematika", "Snaryad harakati", "Gorizontal koordinata", "x = v_0 \\cos\\alpha \\cdot t", "Burchak ostida otilgan jismning gorizontal harakati."),
  f("k-snaryad-y", "kinematika", "Snaryad harakati", "Vertikal koordinata", "y = v_0 \\sin\\alpha \\cdot t - \\tfrac{g t^2}{2}", "Burchak ostida otilgan jismning vertikal harakati."),
  f("k-snaryad-R", "kinematika", "Snaryad harakati", "Uchish masofasi", "L = \\frac{v_0^2 \\sin 2\\alpha}{g}", "Gorizontal tekislikka qaytguncha bosib o'tgan masofa."),
  f("k-snaryad-h", "kinematika", "Snaryad harakati", "Maksimal balandlik", "H = \\frac{v_0^2 \\sin^2\\alpha}{2 g}", "Snaryadning ko'tarilgan eng yuqori nuqtasi."),

  // 2. DINAMIKA
  f("d-n2", "dinamika", "Nyuton qonunlari", "Nyutonning 2-qonuni", "\\vec F = m \\vec a", "Kuch jism massasini tezlanishiga ko'paytirishga teng.", [
    { sym: "F", desc: "kuch", unit: "N" },
    { sym: "m", desc: "massa", unit: "kg" },
    { sym: "a", desc: "tezlanish", unit: "m/s²" },
  ], { problem: "2 kg massali jism 3 m/s² tezlanish oldi. Kuch?", solution: "F = 2·3 = 6 N" }),
  f("d-n3", "dinamika", "Nyuton qonunlari", "Nyutonning 3-qonuni", "\\vec F_{12} = -\\vec F_{21}", "Ta'sir kuchi teskari ta'sir kuchiga miqdoran teng, yo'nalishi qarama-qarshi."),
  f("d-grav", "dinamika", "Gravitatsiya", "Butun olam tortishish qonuni", "F = G\\frac{m_1 m_2}{r^2}", "Ikki jism o'rtasidagi tortishish kuchi.", [
    { sym: "G", desc: "gravitatsion doimiy (6.67·10⁻¹¹)", unit: "N·m²/kg²" },
  ]),
  f("d-g", "dinamika", "Gravitatsiya", "Erkin tushish tezlanishi", "g = G\\frac{M}{R^2}", "Yer yuzasida erkin tushish tezlanishi."),
  f("d-gh", "dinamika", "Gravitatsiya", "Balandlikdagi g", "g_h = G\\frac{M}{(R+h)^2}", "Yer yuzasidan h balandlikdagi g qiymati."),
  f("d-P", "dinamika", "Gravitatsiya", "Og'irlik kuchi", "P = m g", "Jismning og'irlik kuchi."),
  f("d-hook", "dinamika", "Elastiklik", "Guk qonuni", "F = k x", "Prujinaning cho'zilishidagi elastik kuch.", [
    { sym: "k", desc: "qattiqlik koeffitsienti", unit: "N/m" },
    { sym: "x", desc: "deformatsiya", unit: "m" },
  ]),
  f("d-fren", "dinamika", "Ishqalanish", "Ishqalanish kuchi", "F_{ishq} = \\mu N", "Sirpanish ishqalanish kuchi normal bosim va koeffitsientga bog'liq."),
  f("d-Mom", "dinamika", "Statika", "Kuch momenti", "M = F \\cdot l", "Aylanma harakat hosil qiluvchi kuch momenti."),
  f("d-qiya", "dinamika", "Maxsus holatlar", "Qiya tekislikda tezlanish", "a = g(\\sin\\alpha - \\mu\\cos\\alpha)", "Ishqalanishli qiya tekislikda sirpanish tezlanishi."),
  f("d-fcent", "dinamika", "Maxsus holatlar", "Markazga intilma kuch", "F_c = m\\omega^2 R = \\frac{m v^2}{R}", "Aylana bo'ylab harakatdagi kuch."),
  f("d-cosmic1", "dinamika", "Kosmik tezliklar", "1-kosmik tezlik", "v_1 = \\sqrt{g R} \\approx 7.9\\;\\text{km/s}", "Yer atrofida aylana orbitada harakatlanish uchun zarur tezlik."),
  f("d-cosmic2", "dinamika", "Kosmik tezliklar", "2-kosmik tezlik", "v_2 = \\sqrt{2 g R} \\approx 11.2\\;\\text{km/s}", "Yer tortishishidan qutulish tezligi."),

  // 3. SAQLANISH
  f("s-p", "saqlanish", "Impuls", "Mexanik impuls", "\\vec p = m\\vec v", "Impuls — jism massasini tezligiga ko'paytmasi.", [
    { sym: "p", desc: "impuls", unit: "kg·m/s" },
  ]),
  f("s-imp", "saqlanish", "Impuls", "Impuls o'zgarishi", "\\vec F \\Delta t = \\Delta \\vec p", "Kuch impulsi impulsning o'zgarishiga teng."),
  f("s-impsohr", "saqlanish", "Impuls", "Impuls saqlanish qonuni", "m_1 \\vec v_1 + m_2 \\vec v_2 = m_1 \\vec v_1' + m_2 \\vec v_2'", "Yopiq tizimda umumiy impuls saqlanadi."),
  f("s-A", "saqlanish", "Ish va energiya", "Mexanik ish", "A = F s \\cos\\alpha", "Kuch tomonidan bajarilgan ish.", [
    { sym: "A", desc: "ish", unit: "J" },
  ]),
  f("s-Ek", "saqlanish", "Ish va energiya", "Kinetik energiya", "E_k = \\frac{m v^2}{2}", "Harakat energiyasi."),
  f("s-Ep", "saqlanish", "Ish va energiya", "Potensial energiya (h)", "E_p = m g h", "Yer tortishish maydonida potensial energiya."),
  f("s-Epr", "saqlanish", "Ish va energiya", "Prujina energiyasi", "E_{pr} = \\frac{k x^2}{2}", "Elastik deformatsiyalangan prujinaning potensial energiyasi."),
  f("s-Et", "saqlanish", "Ish va energiya", "Energiya saqlanish qonuni", "E_k + E_p = const", "Konservativ kuchlar uchun to'liq mexanik energiya saqlanadi."),
  f("s-N", "saqlanish", "Quvvat", "Quvvat", "N = \\frac{A}{t} = F v \\cos\\alpha", "Bajarilgan ishning vaqtga nisbati.", [
    { sym: "N", desc: "quvvat", unit: "Vt" },
  ]),
  f("s-eta", "saqlanish", "Quvvat", "Foydali ish koeffitsienti", "\\eta = \\frac{A_{foyd}}{A_{um}}\\cdot 100\\%", "FIK — foydali ishning umumiy ishga nisbati."),

  // 4. STATIKA / GIDRODINAMIKA
  f("st-rho", "statika", "Suyuqliklar", "Zichlik", "\\rho = \\frac{m}{V}", "Modda zichligi.", [
    { sym: "\\rho", desc: "zichlik", unit: "kg/m³" },
  ]),
  f("st-p", "statika", "Bosim", "Bosim", "p = \\frac{F}{S}", "Yuzaga ta'sir etayotgan kuchning yuzaga nisbati."),
  f("st-ph", "statika", "Gidrostatika", "Gidrostatik bosim", "p = \\rho g h", "Suyuqlikning chuqurlikdagi bosimi."),
  f("st-arx", "statika", "Gidrostatika", "Arximed kuchi", "F_A = \\rho_s g V", "Suyuqlikka botirilgan jismga ta'sir etuvchi ko'taruvchi kuch."),
  f("st-bern", "statika", "Gidrodinamika", "Bernulli tenglamasi", "p + \\tfrac{\\rho v^2}{2} + \\rho g h = const", "Gidrodinamikada energiya saqlanish qonuni."),
  f("st-Q", "statika", "Gidrodinamika", "Uzluksizlik tenglamasi", "S_1 v_1 = S_2 v_2", "Siqilmas suyuqlikda hajm sarfi doimiy."),

  // 5. TEBRANISH / TO'LQIN
  f("t-x", "tebranish", "Garmonik", "Garmonik tebranish tenglamasi", "x(t) = A\\cos(\\omega t + \\varphi_0)", "Garmonik tebranishlardagi siljish.", [
    { sym: "A", desc: "amplituda", unit: "m" },
    { sym: "\\omega", desc: "siklik chastota", unit: "rad/s" },
  ]),
  f("t-omega", "tebranish", "Garmonik", "Siklik chastota", "\\omega = 2\\pi\\nu = \\frac{2\\pi}{T}", "Davr va chastota orqali siklik chastota."),
  f("t-Tpr", "tebranish", "Garmonik", "Prujinali mayatnik davri", "T = 2\\pi\\sqrt{\\frac{m}{k}}", "Prujina-massa tizimining tebranish davri."),
  f("t-Tmay", "tebranish", "Garmonik", "Matematik mayatnik davri", "T = 2\\pi\\sqrt{\\frac{L}{g}}", "Kichik tebranishlarda matematik mayatnik davri."),
  f("t-Wpr", "tebranish", "Garmonik", "Prujina burchak chastotasi", "\\omega = \\sqrt{\\frac{k}{m}}", "Prujinali mayatnikning siklik chastotasi."),
  f("t-Wmay", "tebranish", "Garmonik", "Mayatnik burchak chastotasi", "\\omega = \\sqrt{\\frac{g}{L}}", "Matematik mayatnikning siklik chastotasi."),
  f("t-lambda", "tebranish", "To'lqinlar", "To'lqin uzunligi", "\\lambda = v T = \\frac{v}{\\nu}", "Tarqalish tezligi va davr orqali to'lqin uzunligi."),
  f("t-y", "tebranish", "To'lqinlar", "Yoyiluvchi to'lqin", "y = A\\sin(\\omega t - k x)", "Bir o'lchamda yoyiluvchi tekis to'lqin."),
  f("t-k", "tebranish", "To'lqinlar", "To'lqin soni", "k = \\frac{2\\pi}{\\lambda}", "Fazoviy chastota."),

  // 6. TERMODINAMIKA
  f("td-nu", "termodinamika", "Molekulyar", "Modda miqdori", "\\nu = \\frac{m}{M} = \\frac{N}{N_A}", "Mol soni massa va molyar massa orqali.", [
    { sym: "N_A", desc: "Avogadro doimiysi", unit: "1/mol" },
  ]),
  f("td-mkt", "termodinamika", "Molekulyar", "MKT asosiy tenglamasi", "p = \\tfrac{1}{3} n m_0 \\overline{v^2}", "Bosim molekulalarning o'rtacha kinetik energiyasiga bog'liq."),
  f("td-Ek", "termodinamika", "Molekulyar", "Molekulaning o'rt. kin. energiyasi", "\\overline{E_k} = \\tfrac{3}{2} k T", "Bir molekulaning o'rtacha kinetik energiyasi.", [
    { sym: "k", desc: "Boltsman doimiysi", unit: "J/K" },
  ]),
  f("td-mendele", "termodinamika", "Ideal gaz", "Mendeleyev-Klapeyron tenglamasi", "p V = \\nu R T", "Ideal gaz holat tenglamasi.", [
    { sym: "R", desc: "universal gaz doimiysi (8.31)", unit: "J/(mol·K)" },
  ]),
  f("td-pVNkT", "termodinamika", "Ideal gaz", "Bosim va zarrachalar soni", "p V = N k T", "Zarracha soni orqali holat tenglamasi."),
  f("td-iso-T", "termodinamika", "Gaz jarayonlari", "Izotermik (Boyl-Mariott)", "p V = const", "T = const bo'lganda gaz qonuni."),
  f("td-iso-p", "termodinamika", "Gaz jarayonlari", "Izobarik (Gey-Lyussak)", "\\frac{V}{T} = const", "p = const bo'lganda hajm haroratga proporsional."),
  f("td-iso-V", "termodinamika", "Gaz jarayonlari", "Izoxorik (Sharl)", "\\frac{p}{T} = const", "V = const bo'lganda bosim haroratga proporsional."),
  f("td-Q", "termodinamika", "Issiqlik", "Isitish issiqligi", "Q = c m \\Delta T", "Moddani isitish/sovutish uchun zarur issiqlik miqdori."),
  f("td-Qmelt", "termodinamika", "Issiqlik", "Erish issiqligi", "Q = \\lambda m", "Qattiq moddani eritish uchun zarur issiqlik."),
  f("td-Qvap", "termodinamika", "Issiqlik", "Bug'lanish issiqligi", "Q = r m", "Suyuqlikni bug'latish uchun zarur issiqlik."),
  f("td-Qyon", "termodinamika", "Issiqlik", "Yonish issiqligi", "Q = q m", "Yoqilg'ining yonish issiqligi."),
  f("td-1law", "termodinamika", "Qonunlar", "Termodinamika 1-qonuni", "\\Delta U = Q - A", "Ichki energiya o'zgarishi olingan issiqlik va bajarilgan ish farqi."),
  f("td-karno", "termodinamika", "Qonunlar", "Karno siklining FIK", "\\eta = \\frac{T_1 - T_2}{T_1}", "Ideal issiqlik mashinasining FIK."),
  f("td-U", "termodinamika", "Qonunlar", "Ideal gazning ichki energiyasi", "U = \\tfrac{i}{2}\\nu R T", "i — erkinlik darajalari soni."),

  // 7. ELEKTROSTATIKA
  f("e-coulomb", "elektrostatika", "Asosiy", "Kulon qonuni", "F = k\\frac{q_1 q_2}{r^2}", "Ikki nuqtaviy zaryad o'rtasidagi kuch.", [
    { sym: "k", desc: "Kulon doimiysi (9·10⁹)", unit: "N·m²/C²" },
    { sym: "q", desc: "zaryad", unit: "C" },
  ]),
  f("e-E", "elektrostatika", "Maydon", "Elektr maydon kuchlanishi", "E = \\frac{F}{q}", "Zaryadga ta'sir etuvchi kuch zaryadga nisbati.", [
    { sym: "E", desc: "kuchlanish", unit: "V/m" },
  ]),
  f("e-Eq", "elektrostatika", "Maydon", "Nuqtaviy zaryad maydoni", "E = k\\frac{q}{r^2}", "Nuqtaviy zaryad atrofidagi maydon kuchlanishi."),
  f("e-phi", "elektrostatika", "Potensial", "Nuqtaviy zaryad potensiali", "\\varphi = k\\frac{q}{r}", "Nuqtaviy zaryad atrofidagi potensial."),
  f("e-U", "elektrostatika", "Potensial", "Potensiallar farqi", "U = \\varphi_1 - \\varphi_2 = \\frac{A}{q}", "Bir zaryadni ko'chirish uchun bajarilgan ish."),
  f("e-EU", "elektrostatika", "Potensial", "Bir jinsli maydon", "E = \\frac{U}{d}", "Tekis kondensator ichidagi maydon."),
  f("e-C", "elektrostatika", "Kondensator", "Elektr sig'imi", "C = \\frac{q}{U}", "Sig'im — zaryadning kuchlanishga nisbati.", [
    { sym: "C", desc: "sig'im", unit: "F" },
  ]),
  f("e-Cplane", "elektrostatika", "Kondensator", "Tekis kondensator", "C = \\frac{\\varepsilon \\varepsilon_0 S}{d}", "Tekis kondensator sig'imi."),
  f("e-WC", "elektrostatika", "Kondensator", "Kondensator energiyasi", "W = \\frac{C U^2}{2} = \\frac{q U}{2}", "Zaryadlangan kondensatorda to'plangan energiya."),
  f("e-Cpar", "elektrostatika", "Ulanish", "Parallel ulash", "C = C_1 + C_2 + \\dots", "Parallel ulanganda sig'imlar qo'shiladi."),
  f("e-Cseq", "elektrostatika", "Ulanish", "Ketma-ket ulash", "\\frac{1}{C} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots", "Ketma-ket ulanganda teskari sig'imlar qo'shiladi."),

  // 8. O'ZGARMAS TOK
  f("i-I", "tok", "Asosiy", "Tok kuchi", "I = \\frac{q}{t}", "Vaqt birligida o'tgan zaryad.", [
    { sym: "I", desc: "tok kuchi", unit: "A" },
  ]),
  f("i-ohm", "tok", "Asosiy", "Om qonuni (zanjir uchastkasi)", "I = \\frac{U}{R}", "Tok kuchlanishga to'g'ri, qarshilikka teskari proporsional.", [
    { sym: "R", desc: "qarshilik", unit: "Ω" },
  ], { problem: "12 V kuchlanish, 6 Ω qarshilik. Tok?", solution: "I = 12/6 = 2 A" }),
  f("i-R", "tok", "Qarshilik", "O'tkazgich qarshiligi", "R = \\rho\\frac{l}{S}", "Materialga, uzunlikka va kesimga bog'liq."),
  f("i-Rseq", "tok", "Ulanish", "Ketma-ket ulash", "R = R_1 + R_2 + \\dots", "Ketma-ket ulanganda qarshiliklar qo'shiladi."),
  f("i-Rpar", "tok", "Ulanish", "Parallel ulash", "\\frac{1}{R} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots", "Parallel ulanganda teskari qarshiliklar qo'shiladi."),
  f("i-A", "tok", "Energiya", "Tok ishi", "A = U I t = I^2 R t = \\frac{U^2 t}{R}", "Elektr toki bajaradigan ish."),
  f("i-P", "tok", "Energiya", "Tok quvvati", "P = U I = I^2 R = \\frac{U^2}{R}", "Tokning quvvati."),
  f("i-joule", "tok", "Energiya", "Joul-Lents qonuni", "Q = I^2 R t", "Tok o'tkazgichda hosil bo'ladigan issiqlik."),
  f("i-emk", "tok", "To'liq zanjir", "Om qonuni (to'liq zanjir)", "I = \\frac{\\varepsilon}{R + r}", "Manba EYK va ichki qarshiligi inobatga olinadi.", [
    { sym: "\\varepsilon", desc: "EYK", unit: "V" },
    { sym: "r", desc: "ichki qarshilik", unit: "Ω" },
  ]),
  f("i-kirch1", "tok", "Kirchgof", "1-qonun (tugun)", "\\sum I_k = 0", "Tugunga keluvchi va ketuvchi toklar yig'indisi nolga teng."),
  f("i-kirch2", "tok", "Kirchgof", "2-qonun (kontur)", "\\sum \\varepsilon_k = \\sum I_k R_k", "Kontur bo'ylab EYKlar yig'indisi kuchlanishlar yig'indisiga teng."),
  f("i-faraday", "tok", "Elektroliz", "Faraday qonuni", "m = k I t", "Elektrolizda ajralib chiqqan modda massasi."),

  // 9. INDUKSIYA
  f("ind-B", "induksiya", "Magnit maydon", "Magnit induksiya", "B = \\frac{F}{I l}", "Tokli o'tkazgichga ta'sir etuvchi kuch orqali.", [
    { sym: "B", desc: "magnit induksiya", unit: "Tl" },
  ]),
  f("ind-amper", "induksiya", "Kuchlar", "Amper kuchi", "F = B I l \\sin\\alpha", "Magnit maydondagi tokli o'tkazgichga ta'sir etuvchi kuch."),
  f("ind-lorenz", "induksiya", "Kuchlar", "Lorens kuchi", "F = q v B \\sin\\alpha", "Magnit maydonda harakatlanuvchi zaryadga ta'sir etuvchi kuch."),
  f("ind-flux", "induksiya", "Induksiya", "Magnit oqim", "\\Phi = B S \\cos\\alpha", "Yuzadan o'tuvchi magnit oqim.", [
    { sym: "\\Phi", desc: "magnit oqim", unit: "Vb" },
  ]),
  f("ind-faraday", "induksiya", "Induksiya", "Faraday qonuni", "\\varepsilon_i = -\\frac{d\\Phi}{dt}", "Induksiya EYK magnit oqim o'zgarish tezligi."),
  f("ind-movEMF", "induksiya", "Induksiya", "Harakat EYKsi", "\\varepsilon = B l v \\sin\\alpha", "Magnit maydonda harakatlanuvchi o'tkazgichda EYK."),
  f("ind-L", "induksiya", "O'zinduksiya", "O'z induksiya EYKsi", "\\varepsilon_L = -L\\frac{dI}{dt}", "Tok o'zgarganda paydo bo'luvchi EYK.", [
    { sym: "L", desc: "induktivlik", unit: "Gn" },
  ]),
  f("ind-WL", "induksiya", "O'zinduksiya", "Magnit maydon energiyasi", "W = \\frac{L I^2}{2}", "Induktivlikdagi tokda to'plangan energiya."),
  f("ind-thomson", "induksiya", "Tebranishlar", "Tomson formulasi", "T = 2\\pi\\sqrt{LC}", "LC tebranish konturining xususiy davri."),
  f("ind-XL", "induksiya", "O'zg. tok", "Induktiv qarshilik", "X_L = \\omega L", "Cho'lg'amning o'zgaruvchan tok uchun qarshiligi."),
  f("ind-XC", "induksiya", "O'zg. tok", "Sig'im qarshiligi", "X_C = \\frac{1}{\\omega C}", "Kondensatorning o'zgaruvchan tok uchun qarshiligi."),
  f("ind-Z", "induksiya", "O'zg. tok", "Tola qarshilik", "Z = \\sqrt{R^2 + (X_L - X_C)^2}", "RLC zanjir tola qarshiligi."),

  // 10. OPTIKA
  f("o-c", "optika", "Tarqalish", "Yorug'lik tezligi", "v = \\frac{c}{n}", "Muhitdagi yorug'lik tezligi.", [
    { sym: "c", desc: "yorug'lik tezligi (3·10⁸)", unit: "m/s" },
    { sym: "n", desc: "sindirish ko'rsatkichi" },
  ]),
  f("o-snell", "optika", "Sinish", "Snell qonuni", "n_1 \\sin\\alpha = n_2 \\sin\\beta", "Yorug'likning ikki muhit chegarasida sinishi."),
  f("o-crit", "optika", "Sinish", "To'liq ichki akslanish", "\\sin\\alpha_{kr} = \\frac{n_2}{n_1}", "Kritik burchak."),
  f("o-refl", "optika", "Aks ettirish", "Aks ettirish qonuni", "\\alpha = \\beta", "Tushish burchagi aks ettirish burchagiga teng."),
  f("o-lens", "optika", "Linza", "Linza formulasi", "\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}", "Yupqa linza formulasi."),
  f("o-gamma", "optika", "Linza", "Chiziqli kattalashtirish", "\\Gamma = \\frac{H}{h} = \\frac{f}{d}", "Linzaning kattalashtirishi."),
  f("o-D", "optika", "Linza", "Linza optik kuchi", "D = \\frac{1}{F}", "Diopriyada o'lchanadi.", [
    { sym: "D", desc: "optik kuch", unit: "dptr" },
  ]),
  f("o-young", "optika", "Interferensiya", "Yang formulasi", "\\Delta x = \\frac{\\lambda L}{d}", "Ikki yoriqdan interferensiya naqshi orasi."),
  f("o-dmax", "optika", "Interferensiya", "Maksimum sharti", "d \\sin\\theta = m\\lambda", "Difraksion to'rda yorug'lik maksimumi."),
  f("o-hv", "optika", "Foton", "Foton energiyasi", "\\varepsilon = h\\nu = \\frac{hc}{\\lambda}", "Yorug'lik kvanti energiyasi.", [
    { sym: "h", desc: "Plank doimiysi (6.63·10⁻³⁴)", unit: "J·s" },
  ]),
  f("o-foto", "optika", "Foton", "Foto-effekt tenglamasi", "h\\nu = A_{ch} + \\tfrac{m v^2}{2}", "Eynshteyn fotoeffekt tenglamasi."),
  f("o-pphoton", "optika", "Foton", "Foton impulsi", "p = \\frac{h\\nu}{c} = \\frac{h}{\\lambda}", "Yorug'lik kvanti impulsi."),

  // 11. ATOM / YADRO
  f("a-balmer", "atom", "Atom", "Balmer formulasi", "\\frac{1}{\\lambda} = R\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right)", "Vodorod spektri to'lqin uzunliklari.", [
    { sym: "R", desc: "Ridberg doimiysi", unit: "1/m" },
  ]),
  f("a-bohr", "atom", "Atom", "Bor postulati", "E_n - E_m = h\\nu", "Atomning bir holatdan ikkinchisiga o'tishida foton."),
  f("a-decay", "atom", "Yadro", "Radioaktiv parchalanish", "N = N_0 \\cdot 2^{-t/T_{1/2}}", "Vaqt o'tgan sayin qolgan yadrolar soni."),
  f("a-decay2", "atom", "Yadro", "Eksponensial shakli", "N = N_0 e^{-\\lambda t}", "Parchalanish doimiysi orqali."),
  f("a-half", "atom", "Yadro", "Yarim parchalanish davri", "T_{1/2} = \\frac{\\ln 2}{\\lambda}", "Yadrolar yarmi parchalanish vaqti."),
  f("a-defect", "atom", "Yadro", "Massa defekti", "\\Delta m = Z m_p + N m_n - m_{yadro}", "Yadro massasi va nuklonlar massasi farqi."),
  f("a-bind", "atom", "Yadro", "Bog'lanish energiyasi", "E_{b} = \\Delta m \\cdot c^2", "Massa defektidan ajralib chiqadigan energiya."),

  // 12. SNN
  f("snn-g", "snn", "Asosiy", "Lorens faktor", "\\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}", "Nisbiylik omili."),
  f("snn-l", "snn", "Effektlar", "Uzunlik qisqarishi", "l = l_0 \\sqrt{1 - v^2/c^2}", "Harakatdagi sanoq tizimida uzunlik qisqaradi."),
  f("snn-t", "snn", "Effektlar", "Vaqt sekinlashishi", "\\tau = \\frac{\\tau_0}{\\sqrt{1 - v^2/c^2}}", "Harakatdagi sanoq tizimida vaqt sekinlashadi."),
  f("snn-m", "snn", "Effektlar", "Relativistik massa", "m = \\frac{m_0}{\\sqrt{1 - v^2/c^2}}", "Tezlik ortishi bilan massa ortadi."),
  f("snn-E", "snn", "Energiya", "Massa-energiya ekvivalentligi", "E = m c^2", "Eynshteyn formulasi."),
  f("snn-Ek", "snn", "Energiya", "Relativistik kinetik energiya", "E_k = (\\gamma - 1) m_0 c^2", "Relativistik tezliklarda kinetik energiya."),
];

export const formulasByCategory = (cat: FormulaCategory) =>
  FORMULAS.filter((x) => x.category === cat);

export const findFormula = (id: string) => FORMULAS.find((x) => x.id === id);
