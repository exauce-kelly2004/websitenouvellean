"use client";

import { useEffect } from "react";
import { productMap } from "@/data/products";
import { useHydrated, useStoreState } from "@/components/providers/StoreProvider";
import { SectionHeader } from "@/components/ui/primitives";
import { actions } from "@/lib/store";
import { ProductGrid } from "./ProductGrid";

/** Enregistre la consultation d'une fiche produit (localStorage). */
export function RecentlyViewedTracker({ slug }: { slug: string }) {
  useEffect(() => {
    actions.addRecent(slug);
  }, [slug]);
  return null;
}

/** Affiche les derniers produits consultés, hors exclusions. */
export function RecentlyViewed({ exclude = [], title = "Vus récemment", limit = 4 }: { exclude?: string[]; title?: string; limit?: number }) {
  const hydrated = useHydrated();
  const { recent } = useStoreState();
  if (!hydrated) return null;
  const items = recent
    .filter((slug) => !exclude.includes(slug))
    .map((slug) => productMap[slug])
    .filter(Boolean)
    .slice(0, limit);
  if (items.length === 0) return null;
  return (
    <section className="section" aria-labelledby="recent-title">
      <SectionHeader id="recent-title" eyebrow="Votre sélection" title={title} />
      <ProductGrid products={items} />
    </section>
  );
}
