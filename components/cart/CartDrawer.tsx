"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus, ShoppingBag } from "lucide-react";
import { useMemo } from "react";
import { productMap } from "@/data/products";
import { useCart, useHydrated, useShop, useUI } from "@/components/providers/StoreProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { EmptyState, Price, Skeleton } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/format";
import { getBestSellers } from "@/lib/catalog";
import { CartLineItem } from "./CartLineItem";
import { FreeShippingProgress } from "./FreeShippingProgress";
import styles from "./Cart.module.css";

/** Mini-panier latéral, ouvert après chaque ajout. */
export function CartDrawer() {
  const { cartOpen, closeCart } = useUI();
  const { lines, totals } = useCart();
  const { addToCart } = useShop();
  const hydrated = useHydrated();

  // Suggestions de cross-selling : produits associés aux articles du panier, sans taille à choisir.
  const suggestions = useMemo(() => {
    const inCart = new Set(lines.map((l) => l.slug));
    const pool = lines.flatMap((l) => l.product.related).map((slug) => productMap[slug]);
    const fallback = getBestSellers();
    return [...pool, ...fallback].filter((p, i, arr) => p && !inCart.has(p.slug) && !p.sizes && arr.indexOf(p) === i).slice(0, 2);
  }, [lines]);

  const title = (
    <span>
      Votre panier {hydrated && totals.itemCount > 0 && <span className={styles.titleCount}>({totals.itemCount})</span>}
    </span>
  );

  return (
    <Drawer
      open={cartOpen}
      onClose={closeCart}
      title={title}
      ariaLabel="Panier"
      footer={
        hydrated && lines.length > 0 ? (
          <div className={styles.drawerFooter}>
            <div className={styles.summaryRow}>
              <span>Sous-total</span>
              <strong className="tabular">{formatPrice(totals.subtotal)}</strong>
            </div>
            <p className={styles.footnote}>Livraison et codes promo calculés à l&apos;étape suivante.</p>
            <ButtonLink href="/checkout" onClick={closeCart} fullWidth size="lg" arrow>
              Commander
            </ButtonLink>
            <ButtonLink href="/cart" onClick={closeCart} fullWidth variant="secondary">
              Voir le panier
            </ButtonLink>
          </div>
        ) : undefined
      }
    >
      {!hydrated ? (
        <div className={styles.loading} aria-busy="true">
          <Skeleton height={96} />
          <Skeleton height={96} />
        </div>
      ) : lines.length === 0 ? (
        <EmptyState
          icon={<ShoppingBag size={26} strokeWidth={1.5} />}
          title="Votre panier est vide"
          actions={
            <>
              <ButtonLink href="/new" onClick={closeCart}>
                Voir les nouveautés
              </ButtonLink>
              <ButtonLink href="/gifts" onClick={closeCart} variant="secondary">
                Idées cadeaux
              </ButtonLink>
            </>
          }
        >
          Nos pièces de la saison vous attendent — la livraison est offerte dès 150 €.
        </EmptyState>
      ) : (
        <div className={styles.drawerBody}>
          <FreeShippingProgress remaining={totals.remainingForFreeShipping} />
          <ul role="list" className={styles.lines}>
            {lines.map((line, i) => (
              <CartLineItem key={line.id} line={line} index={i} onNavigate={closeCart} />
            ))}
          </ul>

          {suggestions.length > 0 && (
            <section aria-labelledby="drawer-suggest" className={styles.suggest}>
              <h2 id="drawer-suggest" className={styles.suggestTitle}>
                Pour compléter
              </h2>
              <ul role="list" className={styles.suggestList}>
                {suggestions.map((p) => (
                  <li key={p.slug} className={styles.suggestItem}>
                    <Link href={`/product/${p.slug}`} onClick={closeCart} className={styles.suggestMedia} tabIndex={-1} aria-hidden>
                      <Image src={p.images[0].src} alt="" fill sizes="72px" />
                    </Link>
                    <div className={styles.suggestText}>
                      <Link href={`/product/${p.slug}`} onClick={closeCart} className={styles.lineName}>
                        {p.name}
                      </Link>
                      <Price price={p.price} compareAt={p.compareAtPrice} />
                    </div>
                    <Button
                      size="sm"
                      variant="secondary"
                      icon={<Plus size={14} aria-hidden />}
                      onClick={() => addToCart(p.slug, { color: p.colors[0]?.name })}
                      aria-label={`Ajouter ${p.name} au panier`}
                    >
                      Ajouter
                    </Button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </Drawer>
  );
}
