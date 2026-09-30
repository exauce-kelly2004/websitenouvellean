import { categories, categoryMap } from "@/data/categories";
import { products, productMap } from "@/data/products";
import type { CatalogFilters, CategorySlug, CollectionSlug, Product, SortKey } from "@/types";
import { normalize } from "./format";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "pertinence", label: "Pertinence" },
  { value: "nouveautes", label: "Nouveautés" },
  { value: "popularite", label: "Popularité" },
  { value: "meilleures-notes", label: "Meilleures notes" },
  { value: "prix-croissant", label: "Prix croissant" },
  { value: "prix-decroissant", label: "Prix décroissant" },
];

export const priceSteps = [100, 150, 250, 400];

export const defaultFilters: CatalogFilters = {
  query: "",
  categories: [],
  audiences: [],
  colors: [],
  priceMax: null,
  onSale: false,
  inStock: false,
  sort: "pertinence",
};

export function getProduct(slug: string): Product | undefined {
  return productMap[slug];
}

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProductsByCollection(slug: CollectionSlug): Product[] {
  if (slug === "meilleures-ventes") {
    return products.filter((p) => p.isBestSeller).sort((a, b) => b.reviewCount - a.reviewCount);
  }
  return products.filter((p) => p.collections.includes(slug));
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew).sort((a, b) => b.addedAt.localeCompare(a.addedAt));
}

export function getBestSellers(limit?: number): Product[] {
  const list = products.filter((p) => p.isBestSeller).sort((a, b) => b.reviewCount - a.reviewCount);
  return limit ? list.slice(0, limit) : list;
}

export function getSaleProducts(): Product[] {
  return products.filter((p) => isOnSale(p));
}

export function isOnSale(p: Product): boolean {
  return Boolean(p.compareAtPrice && p.compareAtPrice > p.price);
}

export function isInStock(p: Product): boolean {
  return p.sizes ? p.sizes.some((s) => s.stock > 0) : p.stock > 0;
}

/** Produits associés déclarés, complétés par la même catégorie si besoin. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const declared = product.related.map((slug) => productMap[slug]).filter(Boolean);
  const fallback = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category && !product.related.includes(p.slug),
  );
  return [...declared, ...fallback].slice(0, limit);
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  const sameCategory = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const sameAudience = products.filter(
    (p) => p.slug !== product.slug && p.category !== product.category && p.audience === product.audience && p.collections.some((c) => product.collections.includes(c)),
  );
  return [...sameCategory, ...sameAudience].slice(0, limit);
}

/* ------------------------------------------------------------------ */
/* Recherche, filtres, tri                                             */
/* ------------------------------------------------------------------ */

function searchScore(p: Product, terms: string[]): number {
  const name = normalize(p.name);
  const subtitle = normalize(p.subtitle);
  const category = normalize(categoryMap[p.category].name);
  const tags = p.tags.map(normalize).join(" ");
  const colors = p.colors.map((c) => normalize(c.name)).join(" ");
  const description = normalize(p.description);
  const audience = p.audience === "homme" ? "homme lui" : p.audience === "femme" ? "femme elle" : "mixte homme femme";

  let score = 0;
  for (const term of terms) {
    let termScore = 0;
    if (name.includes(term)) termScore += 10;
    if (category.includes(term)) termScore += 6;
    if (tags.includes(term)) termScore += 5;
    if (colors.includes(term)) termScore += 4;
    if (subtitle.includes(term)) termScore += 3;
    if (audience.includes(term)) termScore += 3;
    if (description.includes(term)) termScore += 1;
    // Tous les termes doivent correspondre à quelque chose.
    if (termScore === 0) return 0;
    score += termScore;
  }
  return score;
}

export function searchProducts(query: string, source: Product[] = products): Product[] {
  const terms = normalize(query)
    .split(/\s+/)
    .filter((t) => t.length > 1)
    // Singulier approximatif : « robes » → « robe »
    .map((t) => (t.length > 3 && t.endsWith("s") ? t.slice(0, -1) : t));
  if (terms.length === 0) return source;
  return source
    .map((p) => ({ p, score: searchScore(p, terms) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p);
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const copy = [...list];
  switch (sort) {
    case "nouveautes":
      return copy.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    case "prix-croissant":
      return copy.sort((a, b) => a.price - b.price);
    case "prix-decroissant":
      return copy.sort((a, b) => b.price - a.price);
    case "meilleures-notes":
      return copy.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "popularite":
      return copy.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return copy;
  }
}

export function applyFilters(source: Product[], filters: CatalogFilters): Product[] {
  let list = filters.query ? searchProducts(filters.query, source) : source;
  if (filters.categories.length) list = list.filter((p) => filters.categories.includes(p.category));
  if (filters.audiences.length)
    list = list.filter((p) => filters.audiences.includes(p.audience) || (p.audience === "mixte" && filters.audiences.length > 0));
  if (filters.colors.length) list = list.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
  if (filters.priceMax !== null) list = list.filter((p) => p.price <= filters.priceMax!);
  if (filters.onSale) list = list.filter(isOnSale);
  if (filters.inStock) list = list.filter(isInStock);
  return sortProducts(list, filters.sort);
}

/** Facettes disponibles pour un ensemble de produits (avec compteurs). */
export function getFacets(source: Product[]) {
  const categoryCounts = new Map<CategorySlug, number>();
  const colorCounts = new Map<string, { hex: string; count: number }>();
  for (const p of source) {
    categoryCounts.set(p.category, (categoryCounts.get(p.category) ?? 0) + 1);
    for (const c of p.colors) {
      const entry = colorCounts.get(c.name);
      colorCounts.set(c.name, { hex: c.hex, count: (entry?.count ?? 0) + 1 });
    }
  }
  return {
    categories: categories
      .filter((c) => categoryCounts.has(c.slug))
      .map((c) => ({ slug: c.slug, name: c.name, count: categoryCounts.get(c.slug)! })),
    colors: [...colorCounts.entries()]
      .map(([name, v]) => ({ name, hex: v.hex, count: v.count }))
      .sort((a, b) => b.count - a.count),
    audiences: (["femme", "homme"] as const).filter((a) => source.some((p) => p.audience === a || p.audience === "mixte")),
  };
}

/* ------------------------------------------------------------------ */
/* Filtres <-> paramètres d'URL (URLs partageables)                    */
/* ------------------------------------------------------------------ */

export type RawSearchParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
const list = (v: string | string[] | undefined) => first(v).split(",").map((s) => s.trim()).filter(Boolean);

export function parseFilters(params: RawSearchParams, base: Partial<CatalogFilters> = {}): CatalogFilters {
  const categorySlugs = new Set(categories.map((c) => c.slug));
  const sort = first(params.tri) as SortKey;
  const price = Number(first(params.prix));
  return {
    ...defaultFilters,
    ...base,
    query: first(params.q).slice(0, 80),
    categories: list(params.cat).filter((c): c is CategorySlug => categorySlugs.has(c as CategorySlug)),
    audiences: list(params.pour).filter((a): a is "femme" | "homme" => a === "femme" || a === "homme"),
    colors: list(params.couleur),
    priceMax: priceSteps.includes(price) ? price : null,
    onSale: first(params.promo) === "1" || Boolean(base.onSale),
    inStock: first(params.stock) === "1",
    sort: sortOptions.some((o) => o.value === sort) ? sort : (base.sort ?? "pertinence"),
  };
}

export function filtersToQuery(filters: CatalogFilters, base: Partial<CatalogFilters> = {}): string {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query);
  if (filters.categories.length) params.set("cat", filters.categories.join(","));
  if (filters.audiences.length) params.set("pour", filters.audiences.join(","));
  if (filters.colors.length) params.set("couleur", filters.colors.join(","));
  if (filters.priceMax !== null) params.set("prix", String(filters.priceMax));
  if (filters.onSale && !base.onSale) params.set("promo", "1");
  if (filters.inStock) params.set("stock", "1");
  if (filters.sort !== (base.sort ?? "pertinence")) params.set("tri", filters.sort);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}
