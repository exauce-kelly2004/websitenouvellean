"use client";

import { ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useShop } from "@/components/providers/StoreProvider";
import type { Product } from "@/types";
import styles from "./QuickAdd.module.css";

/** Ajout rapide depuis une carte produit, avec choix de taille si nécessaire. */
export function QuickAdd({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const [picking, setPicking] = useState(false);
  const color = product.colors[0]?.name;

  if (picking && product.sizes) {
    return (
      <div className={styles.picker} role="group" aria-label={`${product.sizeLabel ?? "Taille"} — ${product.name}`}>
        <div className={styles.pickerHead}>
          <span>{product.sizeLabel ?? "Taille"}</span>
          <button type="button" onClick={() => setPicking(false)} aria-label="Fermer le choix de taille" className={styles.close}>
            <X size={14} aria-hidden />
          </button>
        </div>
        <div className={styles.sizes}>
          {product.sizes.map((s) => (
            <button
              key={s.name}
              type="button"
              disabled={s.stock === 0}
              className={styles.size}
              onClick={() => {
                addToCart(product.slug, { size: s.name, color });
                setPicking(false);
              }}
              aria-label={`${s.name}${s.stock === 0 ? " — épuisé" : ""}`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={() => (product.sizes ? setPicking(true) : addToCart(product.slug, { color }))}
      aria-label={`Ajouter au panier : ${product.name}`}
    >
      <span className={styles.iconMobile} aria-hidden>
        <ShoppingBag size={16} />
      </span>
      <span className={styles.label} aria-hidden>
        Ajouter au panier
      </span>
    </button>
  );
}
