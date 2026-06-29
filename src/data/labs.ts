export type LabCategory = "Mexanika" | "Termodinamika" | "Elektromagnetizm" | "Optika" | "Atom va yadro" | "To'lqinlar";

export interface LabMeta {
  slug: string;
  title: string;
  shortDesc: string;
  category: LabCategory;
  formula: string;
  accent: "indigo" | "cyan" | "violet";
}

export const LABS: LabMeta[] = [
  { slug: "snaryad", title: "Snaryad harakati", category: "Mexanika",
    shortDesc: "Tezlik, burchak va tortishish kuchi bilan tajriba qiling.",
    formula: "x(t) = v_0\\cos\\theta \\cdot t,\\; y(t) = v_0\\sin\\theta\\cdot t - \\tfrac{1}{2}g t^2", accent: "indigo" },
  { slug: "mayatnik", title: "Matematik mayatnik", category: "Mexanika",
    shortDesc: "Uzunlik va tortishishni o'zgartiring, davrni kuzating.",
    formula: "T = 2\\pi\\sqrt{L/g}", accent: "cyan" },
  { slug: "tolqin", title: "To'lqin interferensiyasi", category: "To'lqinlar",
    shortDesc: "Ikki manba qanday qilib naqsh hosil qiladi?",
    formula: "y = A_1\\sin(kr_1-\\omega t)+A_2\\sin(kr_2-\\omega t+\\varphi)", accent: "violet" },
  { slug: "prujina", title: "Prujina-massa (Guk)", category: "Mexanika",
    shortDesc: "Tebranishni va energiya almashinuvini kuzating.",
    formula: "F = -kx,\\; \\omega = \\sqrt{k/m}", accent: "indigo" },
  { slug: "om", title: "Om zanjiri", category: "Elektromagnetizm",
    shortDesc: "Kuchlanish va qarshilikni o'zgartirib, tokni ko'ring.",
    formula: "I = U/R", accent: "cyan" },
  { slug: "erkin-tushish", title: "Erkin tushish", category: "Mexanika",
    shortDesc: "Sayyora tortishishida jismning erkin tushishini kuzating.",
    formula: "h = \\tfrac{1}{2}g t^2,\\; v = gt", accent: "indigo" },
  { slug: "aylanma", title: "Aylanma harakat", category: "Mexanika",
    shortDesc: "Markazga intilma tezlanish va chiziqli tezlik.",
    formula: "a = \\omega^2 r,\\; v = \\omega r", accent: "cyan" },
  { slug: "garmonik", title: "Garmonik tebranish", category: "Mexanika",
    shortDesc: "Sinusoidal tebranish va uning grafigi.",
    formula: "x(t) = A\\cos(\\omega t + \\varphi)", accent: "violet" },
  { slug: "ideal-gaz", title: "Ideal gaz (PV)", category: "Termodinamika",
    shortDesc: "Bosim, hajm va haroratning bog'liqligi.",
    formula: "PV = nRT", accent: "indigo" },
  { slug: "karno", title: "Karno sikli", category: "Termodinamika",
    shortDesc: "Issiqlik dvigateli — 4 fazali aylana.",
    formula: "\\eta = 1 - T_2/T_1", accent: "cyan" },
  { slug: "kulon", title: "Kulon kuchi", category: "Elektromagnetizm",
    shortDesc: "Ikki zaryad o'rtasidagi kuchni hisoblang.",
    formula: "F = k\\dfrac{|q_1 q_2|}{r^2}", accent: "violet" },
  { slug: "elektr-maydon", title: "Elektr maydon", category: "Elektromagnetizm",
    shortDesc: "Nuqtaviy zaryad atrofidagi maydon chiziqlari.",
    formula: "E = k\\dfrac{q}{r^2}", accent: "indigo" },
  { slug: "magnit-maydon", title: "Magnit maydon", category: "Elektromagnetizm",
    shortDesc: "Tokli o'tkazgich atrofidagi maydon.",
    formula: "B = \\dfrac{\\mu_0 I}{2\\pi r}", accent: "cyan" },
  { slug: "kondensator", title: "Kondensator zaryadlanishi", category: "Elektromagnetizm",
    shortDesc: "RC zanjirda zaryadlanish dinamikasi.",
    formula: "q(t) = CU(1 - e^{-t/RC})", accent: "violet" },
  { slug: "snell", title: "Snell sinishi", category: "Optika",
    shortDesc: "Yorug'likning bir muhitdan ikkinchisiga sinishi.",
    formula: "n_1\\sin\\theta_1 = n_2\\sin\\theta_2", accent: "indigo" },
  { slug: "linza", title: "Yupqa linza", category: "Optika",
    shortDesc: "Linza orqali tasvir hosil bo'lishi.",
    formula: "\\tfrac{1}{F} = \\tfrac{1}{d} + \\tfrac{1}{f}", accent: "cyan" },
  { slug: "yung", title: "Yung tajribasi", category: "Optika",
    shortDesc: "Ikki tirqishli interferensiya naqshi.",
    formula: "\\Delta x = \\dfrac{\\lambda L}{d}", accent: "violet" },
  { slug: "doppler", title: "Doppler effekti", category: "To'lqinlar",
    shortDesc: "Harakatdagi manba va kuzatuvchi.",
    formula: "f' = f\\dfrac{v \\pm v_o}{v \\mp v_s}", accent: "indigo" },
  { slug: "radioaktiv", title: "Radioaktiv parchalanish", category: "Atom va yadro",
    shortDesc: "Yadrolar soni qanday kamayishini kuzating.",
    formula: "N(t) = N_0 e^{-\\lambda t}", accent: "cyan" },
  { slug: "foto-effekt", title: "Foto-effekt", category: "Atom va yadro",
    shortDesc: "Yorug'lik metaldan elektronni urib chiqarishi.",
    formula: "h\\nu = A + \\tfrac{m v^2}{2}", accent: "violet" },
  { slug: "lorentz", title: "Lorentz omili", category: "Atom va yadro",
    shortDesc: "Maxsus nisbiylik: vaqt cho'zilishi.",
    formula: "\\gamma = \\dfrac{1}{\\sqrt{1-v^2/c^2}}", accent: "indigo" },
];

export function getLab(slug: string) {
  return LABS.find((l) => l.slug === slug);
}

export const LAB_CATEGORIES: LabCategory[] = [
  "Mexanika", "Termodinamika", "Elektromagnetizm", "Optika", "To'lqinlar", "Atom va yadro",
];
