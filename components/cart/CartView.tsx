"use client";

import { Gift, Lock, RotateCcw, ShoppingBag, Truck } from "lucide-react";
import { useMemo } from "react";
import { productMap } from "@/data/products";
import { commerce } from "@/data/site";
import { useCart, useHydrated } from "@/components/providers/StoreProvider";
import { ProductGrid } from "@/components/product/ProductGrid";
import { RecentlyViewed } from "@/components/product/RecentlyViewed";
import { ButtonLink } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Field";
import { EmptyState, SectionHeader, Skeleton } from "@/components/ui/primitives";
import { getBestSellers } from "@/lib/catalog";
import { actions } from "@/lib/store";
import type { ShippingMethod } from "@/types";
import { CartLineItem } from "./CartLineItem";
import { FreeShippingProgress } from "./FreeShippingProgress";
import { OrderSummary } from "./OrderSummary";
import styles from "./Pages.module.css";

export function ShippingOptions({ value, freeEligible }: { value: ShippingMethod; freeEligible: boolean }) {
  return (
    <fieldset className={styles.shipping}>
      <legend>Mode de livraison</legend>
      {(Object.keys(commerce.shipping) as ShippingMethod[]).map((key) => {
        const option = commerce.shipping[key];
        const free = key === "retrait" || (key === "standard" && freeEligible);
        return (
          <label key={key} className={styles.shippingOption} data-checked={value === key || undefined}>
            <input type="radio" name="shipping" value={key} checked={value === key} onChange={() => actions.setShipping(key)} />
            <span className={styles.shippingText}>
              <span className={styles.shippingLabel}>{option.label}</span>
              <span className={styles.shippingDelay}>{option.delay}</span>
            </span>
            <span className={styles.shippingPrice}>{free ? "Offerte" : `${option.price.toFixed(2).replace(".", ",")} €`}</span>
          </label>
        );
      })}
    </fieldset>
  );
}

export function CartView() {
  const hydrated = useHydrated();
  const { lines, totals, shipping, giftWrap, giftMessage } = useCart();

  const crossSell = useMemo(() => {
    const inCart = new Set(lines.map((l) => l.slug));
    const related = lines.flatMap((l) => l.product.related).map((s) => productMap[s]);
    return [...related, ...getBestSellers()].filter((p, i, arr) => p && !inCart.has(p.slug) && arr.indexOf(p) === i).slice(0, 4);
  }, [lines]);

  if (!hydrated) {
    return (
      <div className={styles.cartLayout} aria-busy="true" aria-label="Chargement du panier">
        <div className={styles.skeletonStack}>
          <Skeleton height={140} />
          <Skeleton height={140} />
        </div>
        <Skeleton height={320} />
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <>
        <EmptyState
          icon={<ShoppingBag size={26} strokeWidth={1.5} />}
          title="Votre panier est vide"
          actions={
            <>
              <ButtonLink href="/shop">Continuer mes achats</ButtonLink>
              <ButtonLink href="/favorites" variant="secondary">
                Voir mes favoris
              </ButtonLink>
            </>
          }
        >
          Livraison offerte dès {commerce.freeShippingThreshold} €, emballage cadeau offert et retours gratuits sous {commerce.returnsDays} jours.
        </EmptyState>
        <RecentlyViewed />
        <section className="section" aria-labelledby="cart-best">
          <SectionHeader id="cart-best" eyebrow="Inspiration" title="Les pièces les plus aimées" />
          <ProductGrid products={getBestSellers(4)} />
        </section>
      </>
    );
  }

  return (
    <>
      <div className={styles.cartLayout}>
        <div className={styles.cartMain}>
          <FreeShippingProgress remaining={totals.remainingForFreeShipping} />
          <ul role="list" className={styles.cartLines}>
            {lines.map((line, i) => (
              <CartLineItem key={line.id} line={line} index={i} large />
            ))}
          </ul>

          <div className={styles.giftBox}>
            <Gift size={22} strokeWidth={1.4} aria-hidden />
            <div>
              <Checkbox
                checked={giftWrap}
                onChange={(e) => actions.setGiftWrap(e.target.checked)}
                label={
                  <>
                    <strong>C&apos;est un cadeau</strong> — emballage en écrin et carte manuscrite offerts, prix masqués sur le bon de livraison.
                  </>
                }
              />
              {giftWrap && (
                <div className={styles.giftMessage}>
                  <label htmlFor="gift-message">Message pour la carte manuscrite (facultatif)</label>
                  <textarea
                    id="gift-message"
                    rows={3}
                    maxLength={200}
                    value={giftMessage}
                    onChange={(e) => actions.setGiftMessage(e.target.value)}
                    placeholder="Belle année à toi…"
                  />
                  <span className="tabular">{giftMessage.length}/200</span>
                </div>
              )}
            </div>
          </div>

          <ShippingOptions value={shipping} freeEligible={totals.remainingForFreeShipping === 0} />
        </div>

        <aside className={styles.cartAside} aria-label="Récapitulatif de commande">
          <OrderSummary>
            <ButtonLink href="/checkout" size="lg" fullWidth arrow>
              Passer commande
            </ButtonLink>
            <ul role="list" className={styles.trust}>
              <li>
                <Lock size={15} aria-hidden /> Paiement sécurisé — carte, Apple Pay, PayPal
              </li>
              <li>
                <Truck size={15} aria-hidden /> {commerce.giftDeadline}
              </li>
              <li>
                <RotateCcw size={15} aria-hidden /> Retours gratuits sous {commerce.returnsDays} jours
              </li>
            </ul>
          </OrderSummary>
        </aside>
      </div>

      {crossSell.length > 0 && (
        <section className="section" aria-labelledby="cart-cross">
          <SectionHeader id="cart-cross" eyebrow="Pour compléter" title="Ils vont bien ensemble" />
          <ProductGrid products={crossSell} />
        </section>
      )}
    </>
  );
}
