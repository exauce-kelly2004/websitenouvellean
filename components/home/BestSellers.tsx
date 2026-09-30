import Image from "next/image";
import Link from "next/link";
import { getBestSellers } from "@/lib/catalog";
import { ArrowLink } from "@/components/ui/Button";
import { Badge, Price, Rating, SectionHeader } from "@/components/ui/primitives";
import { FavoriteButton } from "@/components/product/FavoriteButton";
import { AddToCartInline } from "@/components/product/AddToCartInline";
import { Tilt } from "@/components/motion/Tilt";
import styles from "./home.module.css";

/** Trois cartes horizontales (image + argumentaire + ajout rapide), comme dans la structure de référence. */
export function BestSellers() {
  const items = getBestSellers(3);
  return (
    <section className="section" aria-labelledby="best-title">
      <div className="container">
        <SectionHeader
          id="best-title"
          eyebrow="Les plus aimés"
          title="Les valeurs sûres de la saison"
          description="Les pièces les plus commandées et les mieux notées : impossible de se tromper, pour soi comme pour offrir."
          action={<ArrowLink href="/collections/meilleures-ventes">Toutes les meilleures ventes</ArrowLink>}
        />
        <ul role="list" className={styles.best}>
          {items.map((p) => (
            <li key={p.slug}>
              <Tilt max={6}>
              <div className={styles.bestCard}>
              <Link href={`/product/${p.slug}`} className={styles.bestMedia} tabIndex={-1} aria-hidden>
                <Image src={p.images[0].src} alt="" fill sizes="(min-width: 1200px) 14vw, (min-width: 700px) 22vw, 40vw" />
              </Link>
              <div className={styles.bestBody}>
                <Badge>Best-seller</Badge>
                <h3 className={styles.bestName}>
                  <Link href={`/product/${p.slug}`}>{p.name}</Link>
                </h3>
                <Rating value={p.rating} count={p.reviewCount} size={12} />
                <p className={styles.bestText}>{p.subtitle}</p>
                <Price price={p.price} compareAt={p.compareAtPrice} />
                <div className={styles.bestActions}>
                  <AddToCartInline product={p} />
                  <FavoriteButton slug={p.slug} name={p.name} filled={false} />
                </div>
              </div>
              </div>
              </Tilt>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
