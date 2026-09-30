import Image from "next/image";
import Link from "next/link";
import { discountPercent } from "@/lib/format";
import { isInStock } from "@/lib/catalog";
import { commerce } from "@/data/site";
import type { Product } from "@/types";
import { Badge, Price, ProductBadgeTag, Rating, Swatch } from "@/components/ui/primitives";
import { FavoriteButton } from "./FavoriteButton";
import { QuickAdd } from "./QuickAdd";
import { Tilt } from "@/components/motion/Tilt";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  /** Attribut `sizes` de next/image selon la grille parente. */
  sizes?: string;
  priority?: boolean;
  compact?: boolean;
  headingLevel?: "h2" | "h3";
}

export function ProductCard({
  product,
  sizes = "(min-width: 1200px) 22vw, (min-width: 900px) 30vw, 48vw",
  priority,
  compact,
  headingLevel = "h3",
}: ProductCardProps) {
  const href = `/product/${product.slug}`;
  const off = discountPercent(product.price, product.compareAtPrice);
  const inStock = isInStock(product);
  const lowStock = inStock && product.stock <= commerce.lowStockThreshold;
  const Heading = headingLevel;
  const [main, alt] = product.images;

  return (
    <Tilt>
    <article className={[styles.card, compact && styles.compact].filter(Boolean).join(" ")}>
      <div className={styles.media}>
        <Link href={href} className={styles.mediaLink} tabIndex={-1} aria-hidden>
          <Image src={main.src} alt={main.alt} fill sizes={sizes} className={styles.image} priority={priority} />
          {alt && <Image src={alt.src} alt="" fill sizes={sizes} className={`${styles.image} ${styles.imageAlt}`} />}
        </Link>
        <div className={styles.badges}>
          {off && <Badge tone="sale">−{off} %</Badge>}
          {product.badge && <ProductBadgeTag badge={product.badge} />}
          {!inStock && <Badge>Épuisé</Badge>}
        </div>
        <div className={styles.favorite}>
          <FavoriteButton slug={product.slug} name={product.name} />
        </div>
      </div>

      <div className={styles.info}>
        <Heading className={styles.name}>
          <Link href={href}>{product.name}</Link>
        </Heading>
        <p className={styles.subtitle}>{product.subtitle}</p>
        <div className={styles.meta}>
          <Price price={product.price} compareAt={product.compareAtPrice} />
          {!compact && <Rating value={product.rating} count={product.reviewCount} size={11} />}
        </div>
        {!compact && (product.colors.length > 1 || lowStock) && (
          <div className={styles.meta}>
            {product.colors.length > 1 ? (
              <span className={styles.swatches}>
                {product.colors.map((c) => (
                  <Swatch key={c.name} hex={c.hex} />
                ))}
                <span className="visually-hidden">Coloris : {product.colors.map((c) => c.name).join(", ")}</span>
              </span>
            ) : (
              <span />
            )}
            {lowStock && <span className={styles.stockNote}>Plus que {product.stock} en stock</span>}
          </div>
        )}
      </div>
      {!compact && (
        <div className={styles.quick}>
          {inStock ? <QuickAdd product={product} /> : <span className={styles.soldOut}>Épuisé</span>}
        </div>
      )}
    </article>
    </Tilt>
  );
}
