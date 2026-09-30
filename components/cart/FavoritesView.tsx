"use client";

import { Heart } from "lucide-react";
import { productMap } from "@/data/products";
import { useHydrated, useShop } from "@/components/providers/StoreProvider";
import { ProductGrid } from "@/components/product/ProductGrid";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState, SectionHeader, Skeleton } from "@/components/ui/primitives";
import { getBestSellers } from "@/lib/catalog";
import styles from "./Pages.module.css";

export function FavoritesView() {
  const hydrated = useHydrated();
  const { favorites } = useShop();
  const items = favorites.map((slug) => productMap[slug]).filter(Boolean);

  if (!hydrated) {
    return (
      <div className={styles.skeletonGrid} aria-busy="true" aria-label="Chargement de vos favoris">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} height={360} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <EmptyState
          icon={<Heart size={26} strokeWidth={1.5} />}
          title="Aucun favori pour l'instant"
          actions={
            <>
              <ButtonLink href="/new">Découvrir les nouveautés</ButtonLink>
              <ButtonLink href="/gifts" variant="secondary">
                Idées cadeaux
              </ButtonLink>
            </>
          }
        >
          Touchez le cœur sur une pièce pour la retrouver ici. Vos favoris sont conservés sur cet appareil.
        </EmptyState>
        <section className="section" aria-labelledby="fav-best">
          <SectionHeader id="fav-best" eyebrow="Pour commencer" title="Nos meilleures ventes" />
          <ProductGrid products={getBestSellers(4)} />
        </section>
      </>
    );
  }

  return (
    <>
      <p className={styles.lead}>
        {items.length} pièce{items.length > 1 ? "s" : ""} gardée{items.length > 1 ? "s" : ""} de côté. Les tailles partent vite en décembre : ajoutez-les au panier pour les
        réserver.
      </p>
      <ProductGrid products={items} />
      <RecentlyViewed exclude={favorites} />
    </>
  );
}
