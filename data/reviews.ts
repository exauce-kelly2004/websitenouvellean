import type { CategorySlug, Review } from "@/types";

/** Avis mis en avant sur l'accueil. */
export const featuredReviews: Review[] = [
  {
    id: "r-home-1",
    author: "Camille R.",
    city: "Lyon",
    rating: 5,
    title: "On m'a demandé toute la soirée où je l'avais trouvée",
    body: "La robe Minuit tombe exactement comme sur les photos. J'ai pris ma taille habituelle, rien à retoucher. Reçue en deux jours, avec un petit mot manuscrit dans le paquet.",
    date: "2026-01-02",
    productSlug: "robe-minuit-drapee",
    verified: true,
  },
  {
    id: "r-home-2",
    author: "Julien M.",
    city: "Bordeaux",
    rating: 5,
    title: "Le cadeau parfait, sans stress",
    body: "J'ai commandé la montre Crépuscule le 27 décembre au soir, livrée le 29. L'écrin est très beau, pas besoin de papier cadeau. Ma compagne l'a portée le soir même.",
    date: "2026-01-04",
    productSlug: "montre-crepuscule",
    verified: true,
  },
  {
    id: "r-home-3",
    author: "Sofia B.",
    city: "Paris",
    rating: 5,
    title: "J'ai dansé jusqu'à 5 h du matin",
    body: "Je n'y croyais pas pour des talons de 8,5 cm, mais les escarpins Cristal sont vraiment confortables. Et ils brillent sans faire toc.",
    date: "2026-01-03",
    productSlug: "escarpins-cristal",
    verified: true,
  },
  {
    id: "r-home-4",
    author: "Hélène D.",
    city: "Nantes",
    rating: 4,
    title: "Service client au top",
    body: "J'ai dû échanger mon manteau pour une taille au-dessus : étiquette de retour dans le colis, nouvelle taille reçue quatre jours plus tard. Très belle qualité de laine.",
    date: "2025-12-18",
    productSlug: "manteau-long-camel",
    verified: true,
  },
];

/* Avis par famille de produits, attribués de façon déterministe aux fiches. */
const pool: Record<"mode" | "chaussures" | "bijoux" | "objets", Omit<Review, "id" | "productSlug">[]> = {
  mode: [
    { author: "Léa P.", city: "Lille", rating: 5, title: "Coupe impeccable", body: "La coupe est exactement celle décrite, le tissu est épais et ne se froisse pas. J'ai reçu beaucoup de compliments.", date: "2026-01-05", verified: true },
    { author: "Nora K.", city: "Marseille", rating: 5, title: "Taille parfaitement", body: "J'ai suivi le guide des tailles et c'est juste. La couleur est encore plus belle en vrai.", date: "2025-12-29", verified: true },
    { author: "Inès G.", city: "Toulouse", rating: 4, title: "Très belle pièce", body: "Belle finition et matière agréable. Un tout petit peu long pour moi (1,62 m) mais rien de gênant avec des talons.", date: "2025-12-20", verified: true },
    { author: "Thomas V.", city: "Rennes", rating: 5, title: "Qualité au rendez-vous", body: "Offert à mon conjoint, qui ne le quitte plus. La matière est douce et semble vraiment solide.", date: "2026-01-08", verified: true },
  ],
  chaussures: [
    { author: "Margaux F.", city: "Paris", rating: 5, title: "Confortables toute la nuit", body: "Portées de 20 h à 4 h sans douleur. La semelle rembourrée fait vraiment la différence.", date: "2026-01-02", verified: true },
    { author: "Élodie S.", city: "Nice", rating: 4, title: "Superbes", body: "Chaussent un peu petit à mon goût, j'ai pris une demi-pointure au-dessus. Sinon parfaites.", date: "2025-12-27", verified: true },
    { author: "Antoine L.", city: "Strasbourg", rating: 5, title: "Cuir magnifique", body: "Finitions soignées, le cuir est souple dès le premier port. Livrées avec des embauchoirs, belle attention.", date: "2025-12-15", verified: true },
  ],
  bijoux: [
    { author: "Claire A.", city: "Montpellier", rating: 5, title: "Brille sans être clinquant", body: "Exactement ce que je cherchais : visible, élégant, et assez léger pour le porter toute la soirée.", date: "2026-01-01", verified: true },
    { author: "Sarah T.", city: "Grenoble", rating: 5, title: "Cadeau très apprécié", body: "L'écrin est superbe, pas besoin d'emballage. Ma sœur était ravie.", date: "2025-12-26", verified: true },
    { author: "Manon E.", city: "Dijon", rating: 4, title: "Joli et bien fini", body: "Très joli rendu, fermoir solide. Un peu plus petit que je l'imaginais mais très fin.", date: "2025-12-19", verified: true },
  ],
  objets: [
    { author: "Paul C.", city: "Lyon", rating: 5, title: "Parfait pour offrir", body: "Emballage soigné, livraison rapide, et le produit est à la hauteur des photos.", date: "2025-12-30", verified: true },
    { author: "Aurélie M.", city: "Angers", rating: 5, title: "Je recommande", body: "Belle qualité, on sent que c'est fait pour durer. Service client réactif pour ma question sur la gravure.", date: "2025-12-22", verified: true },
    { author: "Karim B.", city: "Lille", rating: 4, title: "Très satisfait", body: "Conforme à la description. Seul bémol : j'aurais aimé plus de choix de couleurs.", date: "2025-12-17", verified: true },
  ],
};

const familyByCategory: Record<CategorySlug, keyof typeof pool> = {
  robes: "mode",
  "vestes-blazers": "mode",
  "tops-chemises": "mode",
  pantalons: "mode",
  chaussures: "chaussures",
  sacs: "objets",
  bijoux: "bijoux",
  montres: "objets",
  "beaute-parfums": "objets",
  accessoires: "objets",
  "coffrets-cadeaux": "objets",
};

export function getProductReviews(slug: string, category: CategorySlug): Review[] {
  const list = pool[familyByCategory[category]];
  const seed = [...slug].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return [0, 1, 2].map((offset) => {
    const review = list[(seed + offset) % list.length];
    return { ...review, id: `${slug}-${offset}`, productSlug: slug };
  });
}
