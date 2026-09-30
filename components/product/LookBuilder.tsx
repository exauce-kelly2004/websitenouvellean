"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useShop, useUI } from "@/components/providers/StoreProvider";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/format";
import { actions } from "@/lib/store";
import type { Product } from "@/types";
import styles from "./LookBuilder.module.css";

/**
 * Cross-selling « look complet » : l'utilisateur coche les pièces,
 * choisit ses tailles et ajoute l'ensemble en un clic.
 */
export function LookBuilder({ products, title = "Ajouter le look" }: { products: Product[]; title?: string }) {
  const { openCart } = useUI();
  const { isFavorite } = useShop();
  const [selected, setSelected] = useState<Record<string, boolean>>(() => Object.fromEntries(products.map((p) => [p.slug, true])));
  const [sizes, setSizes] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const chosen = products.filter((p) => selected[p.slug]);
  const total = useMemo(() => chosen.reduce((sum, p) => sum + p.price, 0), [chosen]);

  const addAll = () => {
    const missing = chosen.filter((p) => p.sizes && !sizes[p.slug]);
    if (missing.length) {
      setError(`Choisissez ${missing.length > 1 ? "les tailles" : "la taille"} : ${missing.map((p) => p.name).join(", ")}.`);
      return;
    }
    setError(null);
    for (const p of chosen) {
      const size = sizes[p.slug];
      const stock = size ? p.sizes?.find((s) => s.name === size)?.stock : p.stock;
      actions.addToCart(p.slug, { color: p.colors[0]?.name, size, max: Math.min(10, stock ?? 10) });
    }
    openCart();
  };

  return (
    <div className={styles.look}>
      <ul role="list" className={styles.list}>
        {products.map((p) => {
          const id = `look-${p.slug}`;
          return (
            <li key={p.slug} className={styles.item} data-off={!selected[p.slug] || undefined}>
              <input
                id={id}
                type="checkbox"
                className={styles.check}
                checked={!!selected[p.slug]}
                onChange={(e) => setSelected((s) => ({ ...s, [p.slug]: e.target.checked }))}
                aria-label={`Inclure ${p.name}`}
              />
              <Link href={`/product/${p.slug}`} className={styles.thumb} tabIndex={-1} aria-hidden>
                <Image src={p.images[0].src} alt="" fill sizes="72px" />
              </Link>
              <div className={styles.info}>
                <Link href={`/product/${p.slug}`} className={styles.name}>
                  {p.name}
                  {isFavorite(p.slug) && <span className="visually-hidden"> (dans vos favoris)</span>}
                </Link>
                <span className={styles.sub}>{p.subtitle}</span>
                <Price price={p.price} compareAt={p.compareAtPrice} />
              </div>
              {p.sizes && (
                <div className={styles.size}>
                  <label htmlFor={`${id}-size`} className="visually-hidden">
                    {p.sizeLabel} pour {p.name}
                  </label>
                  <select
                    id={`${id}-size`}
                    value={sizes[p.slug] ?? ""}
                    onChange={(e) => setSizes((s) => ({ ...s, [p.slug]: e.target.value }))}
                    disabled={!selected[p.slug]}
                    aria-invalid={Boolean(error && selected[p.slug] && !sizes[p.slug]) || undefined}
                  >
                    <option value="">{p.sizeLabel}</option>
                    {p.sizes.map((s) => (
                      <option key={s.name} value={s.name} disabled={s.stock === 0}>
                        {s.name}
                        {s.stock === 0 ? " — épuisé" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </li>
          );
        })}
      </ul>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
      <div className={styles.footer}>
        <p>
          <span className={styles.totalLabel}>
            {chosen.length} pièce{chosen.length > 1 ? "s" : ""} sélectionnée{chosen.length > 1 ? "s" : ""}
          </span>
          <strong className="tabular">{formatPrice(total)}</strong>
        </p>
        <Button onClick={addAll} disabled={chosen.length === 0} size="lg" fullWidth>
          {title}
        </Button>
      </div>
    </div>
  );
}
