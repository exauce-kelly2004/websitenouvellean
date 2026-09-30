import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { productMap } from "@/data/products";
import { AddToCartInline } from "@/components/product/AddToCartInline";
import { formatPrice } from "@/lib/format";
import { LanternStreet } from "./LanternStreet";
import { LunarCountdownText } from "./LunarCountdownText";
import styles from "./lunar.module.css";

export function LunarHero() {
  const featured = productMap["robe-minuit-drapee"];
  return (
    <section className={styles.hero} aria-labelledby="hero-title" data-no-reveal>
      <div className={styles.heroSticky}>
        <LanternStreet />

        <div className={styles.heroCopy}>
          <p className={styles.heroKicker}>
            Nouvel An lunaire · 6 février 2027 · <LunarCountdownText />
          </p>
          <h1 id="hero-title" className={styles.heroTitle}>
            <span className={styles.l1}>La nuit</span>
            <span className={styles.l2}>avant</span>
            <span className={styles.l3}>l&apos;An neuf</span>
            <span className="visually-hidden"> — tenues, bijoux et cadeaux pour le Nouvel An chinois</span>
          </h1>
          <p className={styles.heroLead}>
            Tenues rouges, bijoux dorés et cadeaux pour le Nouvel An chinois. Livrés avant le 6 février, dans un écrin laqué offert.
          </p>
          <div className={styles.heroLinks}>
            <Link href="/collections/nuit-avant-lan-neuf" className={styles.heroPrimary}>
              Voir la sélection du Nouvel An
            </Link>
            <a href="#la-ville" className={styles.heroScroll}>
              <ArrowDown size={16} aria-hidden /> Entrer dans la rue
            </a>
          </div>
        </div>

        {/* Vitrine : un produit dans la scène */}
        <aside className={styles.vitrine} aria-label="En vitrine ce soir">
          <span className={styles.vitrineLabel}>En vitrine ce soir</span>
          <Link href={`/product/${featured.slug}`} className={styles.vitrineMedia} tabIndex={-1} aria-hidden>
            <Image src={featured.images[0].src} alt="" fill sizes="140px" priority />
          </Link>
          <div className={styles.vitrineText}>
            <Link href={`/product/${featured.slug}`} className={styles.vitrineName}>
              {featured.name}
            </Link>
            <span>
              {featured.subtitle} — {formatPrice(featured.price)}
            </span>
            <AddToCartInline product={featured} />
          </div>
        </aside>
      </div>
    </section>
  );
}
