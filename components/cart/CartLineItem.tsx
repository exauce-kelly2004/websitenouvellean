"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useUI } from "@/components/providers/StoreProvider";
import { Price, QuantityStepper } from "@/components/ui/primitives";
import { formatPrice } from "@/lib/format";
import type { ResolvedLine } from "@/lib/pricing";
import { actions } from "@/lib/store";
import styles from "./Cart.module.css";

export function CartLineItem({ line, index, onNavigate, large }: { line: ResolvedLine; index: number; onNavigate?: () => void; large?: boolean }) {
  const { notify } = useUI();
  const { product } = line;
  const href = `/product/${product.slug}`;

  const remove = () => {
    const snapshot = { id: line.id, slug: line.slug, color: line.color, size: line.size, quantity: line.quantity };
    actions.removeLine(line.id);
    notify(`${product.name} a été retiré du panier.`, {
      action: { label: "Annuler", onClick: () => actions.restoreLine(snapshot, index) },
    });
  };

  const variant = [line.color, line.size && `${product.sizeLabel ?? "Taille"} ${line.size}`].filter(Boolean).join(" · ");

  return (
    <li className={`${styles.line} ${large ? styles.lineLarge : ""}`}>
      <Link href={href} className={styles.lineMedia} onClick={onNavigate} tabIndex={-1} aria-hidden>
        <Image src={product.images[0].src} alt="" fill sizes={large ? "140px" : "96px"} />
      </Link>
      <div className={styles.lineBody}>
        <div className={styles.lineTop}>
          <div>
            <Link href={href} className={styles.lineName} onClick={onNavigate}>
              {product.name}
            </Link>
            {variant && <p className={styles.lineVariant}>{variant}</p>}
            <p className={styles.lineUnit}>
              <Price price={line.unitPrice} compareAt={line.compareAt} />
            </p>
          </div>
          {large && <p className={`${styles.lineTotal} tabular`}>{formatPrice(line.total)}</p>}
        </div>
        <div className={styles.lineActions}>
          <QuantityStepper
            value={line.quantity}
            max={line.maxQuantity}
            onChange={(q) => (q < 1 ? remove() : actions.setQuantity(line.id, q))}
            label={`Quantité pour ${product.name}`}
          />
          <button type="button" className={styles.remove} onClick={remove}>
            <Trash2 size={15} aria-hidden />
            <span>Retirer</span>
          </button>
        </div>
        {line.quantity >= line.maxQuantity && <p className={styles.lineWarn}>Quantité maximale disponible atteinte.</p>}
      </div>
    </li>
  );
}
