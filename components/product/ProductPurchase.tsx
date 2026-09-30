"use client";

import Link from "next/link";
import { Check, Clock, Gift, Heart, Package, RotateCcw, Ruler, Share2, ShoppingBag, Truck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { commerce, site } from "@/data/site";
import { categoryMap } from "@/data/categories";
import { sellingPoints } from "@/data/sellingPoints";
import { useShop, useUI } from "@/components/providers/StoreProvider";
import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { Price, ProductBadgeTag, QuantityStepper, Rating } from "@/components/ui/primitives";
import { discountPercent, formatPrice } from "@/lib/format";
import { unitCompareAt, unitPrice } from "@/lib/pricing";
import type { Product } from "@/types";
import styles from "./ProductPurchase.module.css";

export function ProductPurchase({ product }: { product: Product }) {
  const { addToCart, isFavorite, toggleFavorite } = useShop();
  const { notify } = useUI();
  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState<string | undefined>(() => (product.sizes?.length === 1 ? product.sizes[0].name : undefined));
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [showSticky, setShowSticky] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const selectedSize = product.sizes?.find((s) => s.name === size);
  const stock = selectedSize ? selectedSize.stock : product.stock;
  const soldOut = product.sizes ? product.sizes.every((s) => s.stock === 0) : product.stock === 0;
  const price = unitPrice(product, size);
  const compareAt = unitCompareAt(product, size);
  const off = discountPercent(price, compareAt);
  const favorite = isFavorite(product.slug);
  const hasGuide = ["Taille", "Pointure", "Tour de doigt"].includes(product.sizeLabel ?? "");
  const maxQty = Math.max(1, Math.min(10, stock));

  // Barre d'achat collante (mobile) quand le bouton principal est passé au-dessus de l'écran.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const add = () => {
    if (product.sizes && !size) {
      setSizeError(true);
      document.getElementById("size-picker")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    addToCart(product.slug, { color, size, quantity });
    setQuantity(1);
  };

  const share = async () => {
    const url = window.location.href;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: product.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      notify("Lien copié dans le presse-papiers.");
    } catch {
      // Partage annulé par l'utilisateur : rien à signaler.
    }
  };

  let stockMessage: { tone: "ok" | "low" | "out"; text: string };
  if (soldOut) stockMessage = { tone: "out", text: "Épuisé — de retour en janvier" };
  else if (product.sizes && !size) stockMessage = { tone: "ok", text: "En stock — expédié sous 24 h" };
  else if (stock === 0) stockMessage = { tone: "out", text: `${product.sizeLabel} ${size} épuisée` };
  else if (stock <= commerce.lowStockThreshold) stockMessage = { tone: "low", text: `Plus que ${stock} en stock — commandez vite` };
  else stockMessage = { tone: "ok", text: "En stock — expédié sous 24 h" };

  const sizePrompt = product.sizeLabel === "Pointure" ? "votre pointure" : product.sizeLabel === "Montant" ? "un montant" : product.sizeLabel === "Contenance" ? "une contenance" : "votre taille";

  return (
    <div className={styles.purchase}>
      <div className={styles.head}>
        <div className={styles.badges}>
          <Link href={`/category/${product.category}`} className={styles.category}>
            {categoryMap[product.category].name}
          </Link>
          {product.badge && <ProductBadgeTag badge={product.badge} />}
        </div>
        <h1 className={styles.title}>{product.name}</h1>
        <p className={styles.subtitle}>{product.subtitle}</p>
        <a href="#avis" className={styles.ratingLink}>
          <Rating value={product.rating} count={product.reviewCount} />
        </a>
      </div>

      <div className={styles.priceRow}>
        <Price price={price} compareAt={compareAt} large showOff />
        {off && compareAt && <span className={styles.saving}>Vous économisez {formatPrice(compareAt - price)}</span>}
      </div>
      <p className={styles.installments}>ou 3 × {formatPrice(Math.round((price / 3) * 100) / 100)} sans frais</p>

      <div className={styles.why}>
        <p className={styles.whyTitle}>Pourquoi vous allez l&apos;adorer</p>
        <ul role="list">
          {sellingPoints[product.category].map((point) => (
            <li key={point}>
              <Check size={15} aria-hidden /> {point}
            </li>
          ))}
        </ul>
      </div>

      {product.colors.length > 0 && (
        <fieldset className={styles.option}>
          <legend>
            Coloris : <strong>{color}</strong>
          </legend>
          <div className={styles.swatches}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                className={styles.swatch}
                aria-pressed={color === c.name}
                aria-label={c.name}
                title={c.name}
                onClick={() => setColor(c.name)}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </fieldset>
      )}

      {product.sizes && (
        <fieldset className={styles.option} id="size-picker">
          <legend className={styles.sizeLegend}>
            <span>
              {product.sizeLabel}
              {size && <strong> : {size}</strong>}
            </span>
          </legend>
          {hasGuide && (
            <button type="button" className={styles.guideLink} onClick={() => setGuideOpen(true)}>
              <Ruler size={14} aria-hidden /> Guide des tailles
            </button>
          )}
          <div className={styles.sizes} role="radiogroup" aria-label={product.sizeLabel} aria-describedby={sizeError ? "size-error" : undefined}>
            {product.sizes.map((s) => (
              <button
                key={s.name}
                type="button"
                role="radio"
                aria-checked={size === s.name}
                disabled={s.stock === 0}
                className={styles.size}
                data-invalid={sizeError || undefined}
                onClick={() => {
                  setSize(s.name);
                  setSizeError(false);
                  setQuantity(1);
                }}
              >
                {s.name}
                {s.stock > 0 && s.stock <= 2 && <span className={styles.sizeLow} title="Dernières pièces" />}
              </button>
            ))}
          </div>
          {sizeError && (
            <p id="size-error" className={styles.error} role="alert">
              Choisissez {sizePrompt} pour continuer.
            </p>
          )}
        </fieldset>
      )}

      <p className={styles.stock} data-tone={stockMessage.tone}>
        <span aria-hidden className={styles.stockDot} />
        {stockMessage.text}
      </p>

      {!soldOut && (
        <p className={styles.promise}>
          <Clock size={15} aria-hidden /> Commandez aujourd&apos;hui : <strong>reçu avant le réveillon</strong>, emballage cadeau offert.
        </p>
      )}

      <div ref={ctaRef} className={styles.cta}>
        {!soldOut && <QuantityStepper value={Math.min(quantity, maxQty)} onChange={setQuantity} max={maxQty} label="Quantité" large />}
        <Button size="lg" onClick={add} disabled={soldOut || stock === 0} icon={<ShoppingBag size={18} aria-hidden />} className={styles.addButton}>
          {soldOut ? "Épuisé" : "Ajouter au panier"}
        </Button>
        <button
          type="button"
          className={styles.fav}
          onClick={() => toggleFavorite(product.slug)}
          aria-pressed={favorite}
          aria-label={favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={20} fill={favorite ? "currentColor" : "none"} strokeWidth={1.6} aria-hidden />
        </button>
      </div>

      <ul role="list" className={styles.perks}>
        <li>
          <Truck size={18} strokeWidth={1.5} aria-hidden />
          <span>
            <strong>{price >= commerce.freeShippingThreshold ? "Livraison offerte" : `Livraison offerte dès ${commerce.freeShippingThreshold} €`}</strong> — standard en 2 à 3 jours, express le lendemain.
          </span>
        </li>
        <li>
          <Gift size={18} strokeWidth={1.5} aria-hidden />
          <span>
            <strong>Emballage cadeau offert</strong> avec carte manuscrite, à cocher dans le panier.
          </span>
        </li>
        <li>
          <RotateCcw size={18} strokeWidth={1.5} aria-hidden />
          <span>
            <strong>Retours gratuits sous {commerce.returnsDays} jours</strong>, prolongés jusqu&apos;au 31 janvier.
          </span>
        </li>
        <li>
          <Package size={18} strokeWidth={1.5} aria-hidden />
          <span>{commerce.giftDeadline}</span>
        </li>
      </ul>

      <button type="button" className={styles.share} onClick={share}>
        <Share2 size={15} aria-hidden /> Partager
      </button>

      <div className={styles.sticky} data-visible={showSticky && !soldOut} inert={!showSticky || soldOut}>
        <div className={styles.stickyText}>
          <p className={styles.stickyName}>{product.name}</p>
          <Price price={price} compareAt={compareAt} />
        </div>
        <Button onClick={add} icon={<ShoppingBag size={16} aria-hidden />}>
          {product.sizes && !size ? "Choisir" : "Ajouter"}
        </Button>
      </div>

      <Drawer open={guideOpen} onClose={() => setGuideOpen(false)} side="center" title="Guide des tailles">
        <SizeGuide label={product.sizeLabel ?? "Taille"} audience={product.audience} />
      </Drawer>
    </div>
  );
}

function SizeGuide({ label, audience }: { label: string; audience: Product["audience"] }) {
  if (label === "Pointure") {
    return (
      <div className="prose">
        <p>Mesurez votre pied du talon à l&apos;orteil le plus long, de préférence en fin de journée.</p>
        <table>
          <thead>
            <tr>
              <th scope="col">Pointure</th>
              <th scope="col">Longueur du pied</th>
            </tr>
          </thead>
          <tbody>
            {[36, 37, 38, 39, 40, 41, 42, 43, 44, 45].map((p) => (
              <tr key={p}>
                <td>{p}</td>
                <td>{((p * 2) / 3 - 1.5).toFixed(1).replace(".", ",")} cm</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  if (label === "Tour de doigt") {
    return (
      <div className="prose">
        <p>Le tour de doigt correspond à la circonférence intérieure de la bague, en millimètres. Enroulez un fil autour de votre doigt, marquez-le, puis mesurez-le à plat.</p>
        <p>Entre deux tailles, choisissez la plus grande : nos bagues se réajustent gratuitement d&apos;une taille en boutique.</p>
      </div>
    );
  }
  const women = audience !== "homme";
  const rows = women
    ? [
        ["34", "80", "62", "88"],
        ["36", "84", "66", "92"],
        ["38", "88", "70", "96"],
        ["40", "92", "74", "100"],
        ["42", "96", "78", "104"],
        ["44", "100", "82", "108"],
      ]
    : [
        ["S · 46", "88–92", "76–80"],
        ["M · 48", "92–96", "80–84"],
        ["L · 50", "96–100", "84–88"],
        ["XL · 52", "100–104", "88–92"],
      ];
  return (
    <div className="prose">
      <p>Mesures du corps en centimètres. Entre deux tailles, prenez la plus grande pour les coupes ajustées.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Taille</th>
            <th scope="col">Poitrine</th>
            <th scope="col">Tour de taille</th>
            {women && <th scope="col">Hanches</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Un doute ? Nos stylistes vous conseillent au <a href={`tel:${site.phoneHref}`}>{site.phone}</a>, {site.hours.toLowerCase()}.
      </p>
    </div>
  );
}
