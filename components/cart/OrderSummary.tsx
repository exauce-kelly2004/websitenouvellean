"use client";

import { useState, type ReactNode } from "react";
import { Tag, X } from "lucide-react";
import { useCart } from "@/components/providers/StoreProvider";
import { formatPrice } from "@/lib/format";
import { actions } from "@/lib/store";
import styles from "./Pages.module.css";

/** Récapitulatif chiffré + saisie du code promo. */
export function OrderSummary({ children, compactLines }: { children?: ReactNode; compactLines?: boolean }) {
  const { lines, totals, promoCode, giftWrap } = useCart();
  const [code, setCode] = useState("");

  return (
    <div className={styles.summary}>
      <h2 className={styles.summaryTitle}>Récapitulatif</h2>

      {compactLines && (
        <ul role="list" className={styles.summaryLines}>
          {lines.map((l) => (
            <li key={l.id}>
              <span>
                {l.quantity} × {l.product.name}
                {l.size && <span className="muted"> · {l.size}</span>}
              </span>
              <span className="tabular">{formatPrice(l.total)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className={styles.totals}>
        <div>
          <dt>Sous-total ({totals.itemCount} article{totals.itemCount > 1 ? "s" : ""})</dt>
          <dd className="tabular">{formatPrice(totals.subtotal)}</dd>
        </div>
        {totals.savings > 0 && (
          <div className={styles.saving}>
            <dt>Vous économisez (prix barrés inclus)</dt>
            <dd className="tabular">{formatPrice(totals.savings)}</dd>
          </div>
        )}
        {totals.promo && (
          <div className={styles.saving}>
            <dt>Code {totals.promo.code}</dt>
            <dd className="tabular">−{formatPrice(totals.discount)}</dd>
          </div>
        )}
        <div>
          <dt>Livraison</dt>
          <dd className="tabular">{totals.shipping === 0 ? "Offerte" : formatPrice(totals.shipping)}</dd>
        </div>
        {giftWrap && (
          <div>
            <dt>Emballage cadeau</dt>
            <dd>Offert</dd>
          </div>
        )}
        <div className={styles.grandTotal}>
          <dt>Total TTC</dt>
          <dd className="tabular">{formatPrice(totals.total)}</dd>
        </div>
      </dl>

      {promoCode && totals.promo ? (
        <p className={styles.promoApplied}>
          <Tag size={14} aria-hidden /> {totals.promo.label}
          <button type="button" onClick={() => actions.setPromoCode("")} aria-label="Retirer le code promo">
            <X size={14} aria-hidden />
          </button>
        </p>
      ) : (
        <form
          className={styles.promoForm}
          onSubmit={(e) => {
            e.preventDefault();
            if (code.trim()) actions.setPromoCode(code);
          }}
        >
          <label htmlFor="promo-code" className={styles.promoLabel}>
            Code promo
          </label>
          <div className={styles.promoRow}>
            <input
              id="promo-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="ANNEUF"
              autoComplete="off"
              aria-invalid={Boolean(promoCode && totals.promoError) || undefined}
              aria-describedby={promoCode && totals.promoError ? "promo-error" : undefined}
            />
            <button type="submit">Appliquer</button>
          </div>
          {promoCode && totals.promoError && (
            <p id="promo-error" className={styles.promoError} role="alert">
              « {promoCode} » : {totals.promoError}
            </p>
          )}
        </form>
      )}

      {children}
    </div>
  );
}
