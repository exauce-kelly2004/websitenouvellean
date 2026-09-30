import { Truck } from "lucide-react";
import { commerce } from "@/data/site";
import { formatPrice } from "@/lib/format";
import styles from "./Cart.module.css";

export function FreeShippingProgress({ remaining }: { remaining: number }) {
  const pct = Math.min(100, ((commerce.freeShippingThreshold - remaining) / commerce.freeShippingThreshold) * 100);
  return (
    <div className={styles.progress}>
      <p>
        <Truck size={16} aria-hidden />
        {remaining > 0 ? (
          <span>
            Plus que <strong>{formatPrice(remaining)}</strong> pour profiter de la livraison offerte.
          </span>
        ) : (
          <span>
            <strong>La livraison standard vous est offerte.</strong>
          </span>
        )}
      </p>
      <div
        className={styles.progressTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={commerce.freeShippingThreshold}
        aria-valuenow={Math.round(commerce.freeShippingThreshold - remaining)}
        aria-label="Progression vers la livraison offerte"
      >
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
