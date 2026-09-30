import Link from "next/link";
import { categories } from "@/data/categories";
import type { CategorySlug } from "@/types";
import styles from "./CategoryNav.module.css";

/** Raccourcis horizontaux vers les catégories (maillage interne + navigation rapide). */
export function CategoryNav({ current, label = "Catégories" }: { current?: CategorySlug; label?: string }) {
  return (
    <nav aria-label={label} className={styles.nav}>
      <ul role="list" className={styles.list}>
        <li>
          <Link href="/shop" className={styles.link} aria-current={!current ? "page" : undefined}>
            Tout voir
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/category/${c.slug}`} className={styles.link} aria-current={current === c.slug ? "page" : undefined}>
              {c.shortName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
