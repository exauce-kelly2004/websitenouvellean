"use client";

import { useShop } from "@/components/providers/StoreProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { Product } from "@/types";

/**
 * Bouton d'ajout direct. Pour un produit à tailles, il mène à la fiche :
 * choisir une taille à l'aveugle génère des retours.
 */
export function AddToCartInline({ product, label = "Ajouter au panier" }: { product: Product; label?: string }) {
  const { addToCart } = useShop();
  if (product.sizes) {
    const what = product.sizeLabel === "Pointure" ? "ma pointure" : product.sizeLabel === "Taille" ? "ma taille" : "une option";
    return (
      <ButtonLink href={`/product/${product.slug}`} size="sm">
        Choisir {what}
      </ButtonLink>
    );
  }
  return (
    <Button size="sm" onClick={() => addToCart(product.slug, { color: product.colors[0]?.name })}>
      {label}
    </Button>
  );
}
