import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/primitives";
import { categories } from "@/data/categories";
import { getBestSellers } from "@/lib/catalog";
import styles from "./system.module.css";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <section className={styles.system}>
        <div className="container-text">
          <p className={styles.code}>404</p>
          <h1>Cette page a pris un peu d&apos;avance sur la nouvelle année</h1>
          <p className="lead">Le lien est peut-être ancien, ou la pièce n&apos;est plus disponible. Voici de quoi reprendre le fil.</p>
          <div className={styles.actions}>
            <ButtonLink href="/shop" arrow>
              Voir la boutique
            </ButtonLink>
            <ButtonLink href="/search" variant="secondary">
              Rechercher
            </ButtonLink>
          </div>
          <ul role="list" className={styles.links}>
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader eyebrow="Valeurs sûres" title="Nos meilleures ventes" />
          <ProductGrid products={getBestSellers(4)} />
        </div>
      </section>
    </>
  );
}
