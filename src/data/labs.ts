export interface LabMeta {
  slug: string;
  title: string;
  shortDesc: string;
  category: string;
  formula: string;
  accent: "indigo" | "cyan" | "violet";
}

export const LABS: LabMeta[] = [
  {
    slug: "snaryad",
    title: "Snaryad harakati",
    shortDesc: "Tezlik, burchak va tortishish kuchi bilan tajriba qiling.",
    category: "Mexanika",
    formula: "x(t) = v_0\\cos\\theta \\cdot t,\\; y(t) = v_0\\sin\\theta\\cdot t - \\tfrac{1}{2}g t^2",
    accent: "indigo",
  },
  {
    slug: "mayatnik",
    title: "Matematik mayatnik",
    shortDesc: "Uzunlik va tortishishni o'zgartiring, davrni kuzating.",
    category: "Mexanika",
    formula: "T = 2\\pi\\sqrt{L/g}",
    accent: "cyan",
  },
  {
    slug: "tolqin",
    title: "To'lqin interferensiyasi",
    shortDesc: "Ikki manba qanday qilib naqsh hosil qiladi?",
    category: "To'lqinlar",
    formula: "y = A_1\\sin(k r_1 - \\omega t) + A_2\\sin(k r_2 - \\omega t + \\varphi)",
    accent: "violet",
  },
  {
    slug: "prujina",
    title: "Prujina-massa (Guk)",
    shortDesc: "Tebranishni va energiya almashinuvini kuzating.",
    category: "Mexanika",
    formula: "F = -kx,\\; \\omega = \\sqrt{k/m}",
    accent: "indigo",
  },
  {
    slug: "om",
    title: "Om zanjiri",
    shortDesc: "Kuchlanish va qarshilikni o'zgartirib, tokni ko'ring.",
    category: "Elektromagnetizm",
    formula: "I = U/R",
    accent: "cyan",
  },
];

export function getLab(slug: string) {
  return LABS.find((l) => l.slug === slug);
}
