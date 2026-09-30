"use client";

import { CircleCheck } from "lucide-react";
import { useSyncExternalStore } from "react";
import { commerce } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/format";
import type { ShippingMethod } from "@/types";
import { LAST_ORDER_KEY } from "./CheckoutView";
import styles from "./Pages.module.css";

interface LastOrder {
  number: string;
  email: string;
  firstName: string;
  total: number;
  items: number;
  shipping: ShippingMethod;
}

const noop = () => () => {};
const read = () => {
  try {
    return window.sessionStorage.getItem(LAST_ORDER_KEY);
  } catch {
    return null;
  }
};

export function ConfirmationView() {
  const raw = useSyncExternalStore(noop, read, () => undefined);
  if (raw === undefined) return <Skeleton height={280} />;

  let order: LastOrder | null = null;
  try {
    order = raw ? (JSON.parse(raw) as LastOrder) : null;
  } catch {
    order = null;
  }

  return (
    <div className={styles.confirmation}>
      <CircleCheck size={48} strokeWidth={1.2} aria-hidden className={styles.confirmIcon} />
      <h1>{order ? `Merci, ${order.firstName} !` : "Merci pour votre visite"}</h1>
      {order ? (
        <>
          <p className="lead">
            Votre commande <strong>{order.number}</strong> est confirmée. Un récapitulatif vient d&apos;être envoyé à {order.email} (simulation).
          </p>
          <dl className={styles.confirmDetails}>
            <div>
              <dt>Articles</dt>
              <dd>{order.items}</dd>
            </div>
            <div>
              <dt>Total payé</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
            <div>
              <dt>Livraison</dt>
              <dd>
                {commerce.shipping[order.shipping].label} — {commerce.shipping[order.shipping].delay.toLowerCase()}
              </dd>
            </div>
          </dl>
        </>
      ) : (
        <p className="lead">Aucune commande récente n&apos;a été trouvée sur cet appareil.</p>
      )}
      <div className={styles.confirmActions}>
        <ButtonLink href="/shop" arrow>
          Continuer mes achats
        </ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Retour à l&apos;accueil
        </ButtonLink>
      </div>
      <p className={styles.confirmNote}>Démonstration front-end : aucun paiement n&apos;a été débité et aucun colis ne sera expédié.</p>
    </div>
  );
}
