import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categoryMap, featuredCategorySlugs } from "@/data/categories";
import { getProductsByCategory } from "@/lib/catalog";
import { ArrowLink } from "@/components/ui/Button";
import { Tilt } from "@/components/motion/Tilt";
import { SectionHeader } from "@/components/ui/primitives";
import styles from "./home.module.css";

export function CategoryTiles() {
  return (
    <section className="section" aria-labelledby="categories-title">
      <div className="container">
        <SectionHeader
          id="categories-title"
          eyebrow="Explorer"
          title="Composez votre tenue de réveillon"
          action={<ArrowLink href="/shop">Toutes les catégories</ArrowLink>}
        />
        <ul role="list" className={styles.tiles}>
          {featuredCategorySlugs.map((slug) => {
            const c = categoryMap[slug];
            const count = getProductsByCategory(slug).length;
            return (
              <li key={slug}>
                <Tilt max={10}>
                <Link href={`/category/${slug}`} className={styles.tile}>
                  <span className={styles.tileMedia}>
                    <Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width: 1200px) 16vw, (min-width: 600px) 30vw, 45vw" />
                  </span>
                  <span className={styles.tileText}>
                    <span className={styles.tileName}>{c.shortName}</span>
                    <span className={styles.tileMeta}>
                      {count} pièces <ArrowRight size={14} aria-hidden />
                    </span>
                  </span>
                </Link>
                </Tilt>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
