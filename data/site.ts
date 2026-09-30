export const site = {
  name: "Maison Aube",
  tagline: "La première impression de l'année",
  description:
    "Maison Aube, boutique en ligne de mode et d'accessoires pour le Nouvel An : robes du soir, blazers, escarpins, bijoux, montres et idées cadeaux. Livraison offerte dès 150 €, retours 30 jours.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maison-aube.vercel.app",
  locale: "fr_FR",
  email: "bonjour@maison-aube.fr",
  phone: "01 84 60 21 31",
  phoneHref: "+33184602131",
  address: "18 rue Vieille-du-Temple, 75004 Paris",
  hours: "Du lundi au samedi, 9 h – 19 h",
  campaignYear: 2027,
} as const;

export const commerce = {
  currency: "EUR",
  freeShippingThreshold: 150,
  shipping: {
    standard: { label: "Livraison standard", delay: "2 à 3 jours ouvrés", price: 5.9 },
    express: { label: "Livraison express", delay: "Livraison le lendemain avant 13 h", price: 12.9 },
    retrait: { label: "Retrait en boutique — Paris 4e", delay: "Disponible sous 2 h", price: 0 },
  },
  returnsDays: 30,
  lowStockThreshold: 4,
  giftDeadline: "Commandez avant le 2 février, 12 h, pour être livré avant le Nouvel An lunaire du 6 février.",
} as const;

export interface PromoCode {
  code: string;
  rate: number;
  label: string;
  minSubtotal?: number;
}

export const promoCodes: PromoCode[] = [
  { code: "ANNEUF", rate: 0.15, label: "An neuf — 15 % sur votre commande", minSubtotal: 100 },
  { code: "BIENVENUE10", rate: 0.1, label: "Bienvenue — 10 % sur votre première commande" },
];

export const mainNav = [
  { label: "Nouvel An", href: "/collections/nuit-avant-lan-neuf" },
  { label: "Collections", href: "/shop", mega: true },
  { label: "Cadeaux", href: "/gifts" },
  { label: "Nouveautés", href: "/new" },
  { label: "La Maison", href: "/about" },
] as const;

export const announcements = [
  "Livraison offerte dès 150 € d'achat",
  "Écrin laqué et carte manuscrite offerts",
  "Retours gratuits sous 30 jours",
];

export const popularSearches = ["robe rouge", "escarpins", "sac", "bijoux or", "montre", "cadeau homme"];

export const footerNav = [
  {
    title: "Boutique",
    links: [
      { label: "Nouveautés", href: "/new" },
      { label: "Toute la boutique", href: "/shop" },
      { label: "Robes", href: "/category/robes" },
      { label: "Chaussures", href: "/category/chaussures" },
      { label: "Bijoux", href: "/category/bijoux" },
      { label: "Offres", href: "/sale" },
    ],
  },
  {
    title: "Collections",
    links: [
      { label: "La Nuit avant l'An neuf", href: "/collections/nuit-avant-lan-neuf" },
      { label: "Le Premier Janvier", href: "/collections/le-premier-janvier" },
      { label: "Vestiaire homme", href: "/collections/vestiaire-homme" },
      { label: "Meilleures ventes", href: "/collections/meilleures-ventes" },
      { label: "Idées cadeaux", href: "/gifts" },
    ],
  },
  {
    title: "Service client",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Livraison & retours", href: "/shipping-returns" },
      { label: "Mes favoris", href: "/favorites" },
      { label: "Mon panier", href: "/cart" },
    ],
  },
  {
    title: "La Maison",
    links: [
      { label: "Notre histoire", href: "/about" },
      { label: "Conditions générales", href: "/terms" },
      { label: "Confidentialité", href: "/privacy" },
    ],
  },
];
