export type CategorySlug =
  | "robes"
  | "vestes-blazers"
  | "tops-chemises"
  | "pantalons"
  | "chaussures"
  | "sacs"
  | "bijoux"
  | "montres"
  | "beaute-parfums"
  | "accessoires"
  | "coffrets-cadeaux";

export type Audience = "femme" | "homme" | "mixte";

export type ProductBadge = "Nouveau" | "Best-seller" | "Édition limitée" | "Dernières pièces";

export interface ProductImage {
  src: string;
  alt: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface SizeOption {
  name: string;
  /** Prix spécifique à l'option (contenance, montant de carte cadeau…). */
  price?: number;
  /** Stock fictif de l'option — 0 = épuisé. */
  stock: number;
}

export interface Product {
  slug: string;
  name: string;
  /** Sous-titre court affiché sous le nom (matière, usage). */
  subtitle: string;
  category: CategorySlug;
  audience: Audience;
  description: string;
  details: string[];
  composition: string;
  price: number;
  compareAtPrice?: number;
  images: ProductImage[];
  colors: ColorOption[];
  sizeLabel?: string;
  sizes?: SizeOption[];
  /** Stock global fictif (utilisé quand il n'y a pas de tailles). */
  stock: number;
  badge?: ProductBadge;
  tags: string[];
  rating: number;
  reviewCount: number;
  related: string[];
  collections: CollectionSlug[];
  isNew: boolean;
  isBestSeller: boolean;
  /** Date fictive de mise en ligne (tri « Nouveautés »). */
  addedAt: string;
}

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Libellé court pour la navigation et les tuiles. */
  shortName: string;
  title: string;
  metaDescription: string;
  intro: string;
  guide: { heading: string; body: string }[];
  image: ProductImage;
}

export type CollectionSlug = "nuit-avant-lan-neuf" | "le-premier-janvier" | "vestiaire-homme" | "meilleures-ventes";

export interface Collection {
  slug: CollectionSlug;
  name: string;
  eyebrow: string;
  title: string;
  metaDescription: string;
  intro: string;
  story: string;
  image: ProductImage;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  productSlug?: string;
  verified: boolean;
}

export interface CartLine {
  /** Identifiant unique produit + couleur + taille. */
  id: string;
  slug: string;
  color?: string;
  size?: string;
  quantity: number;
}

export type SortKey = "pertinence" | "nouveautes" | "prix-croissant" | "prix-decroissant" | "meilleures-notes" | "popularite";

export interface CatalogFilters {
  query: string;
  categories: CategorySlug[];
  audiences: Audience[];
  colors: string[];
  priceMax: number | null;
  onSale: boolean;
  inStock: boolean;
  sort: SortKey;
}

export type ShippingMethod = "standard" | "express" | "retrait";
